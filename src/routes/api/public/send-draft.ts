import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * One-off endpoint to email an unpublished blog draft to a reviewer.
 * Protected by a simple secret so it can't be used by random visitors.
 * This is intentionally minimal; for a recurring workflow, use the
 * transactional email route with a proper template and auth.
 */
export const Route = createFileRoute("/api/public/send-draft")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const { slug, recipient, secret } = body;

        if (secret !== process.env.DRAFT_EMAIL_SECRET) {
          return new Response("Unauthorized", { status: 401 });
        }

        if (!slug || !recipient || typeof slug !== "string" || typeof recipient !== "string") {
          return Response.json({ error: "slug and recipient required" }, { status: 400 });
        }

        const supabase = createClient<Database>(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const { data: post, error } = await supabase
          .from("blog_posts")
          .select("title, body_markdown")
          .eq("slug", slug)
          .maybeSingle();

        if (error || !post) {
          console.error("send-draft: lookup failed", { slug, error });
          return Response.json({ error: "Draft not found" }, { status: 404 });
        }

        const normalizedEmail = recipient.toLowerCase();

        // Fail-closed suppression check
        const { data: suppressed, error: suppressionError } = await supabase
          .from("suppressed_emails")
          .select("id")
          .eq("email", normalizedEmail)
          .maybeSingle();

        if (suppressionError) {
          console.error("send-draft: suppression check failed", suppressionError);
          return Response.json({ error: "Failed to verify suppression status" }, { status: 500 });
        }
        if (suppressed) {
          return Response.json({ ok: false, reason: "email_suppressed" });
        }

        // Get or create an unsubscribe token for this address
        const { data: existingToken } = await supabase
          .from("email_unsubscribe_tokens")
          .select("token, used_at")
          .eq("email", normalizedEmail)
          .maybeSingle();

        let unsubscribeToken: string;
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token;
        } else if (!existingToken) {
          unsubscribeToken = generateToken();
          await supabase
            .from("email_unsubscribe_tokens")
            .upsert({ token: unsubscribeToken, email: normalizedEmail }, { onConflict: "email", ignoreDuplicates: true });
          const { data: storedToken } = await supabase
            .from("email_unsubscribe_tokens")
            .select("token")
            .eq("email", normalizedEmail)
            .maybeSingle();
          unsubscribeToken = storedToken?.token ?? unsubscribeToken;
        } else {
          return Response.json({ ok: false, reason: "unsubscribe_token_used" });
        }

        const plainText = `DRAFT for review — ${post.title}\n\nThis is an unpublished draft. Do not share publicly.\n\n---\n\n${post.body_markdown}\n\n---\n\nSent from the TEXITcoin content system.\n\nUnsubscribe: https://texitcoin.org/email/unsubscribe?token=${unsubscribeToken}`;

        const htmlBody = post.body_markdown
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/^(#{1,2}) (.*$)/gm, (_match, _hashes, text) => `<h2 style="font-size:20px;margin-top:32px;margin-bottom:12px;">${text}</h2>`)
          .replace(/\n{2,}/g, "</p><p style='margin:16px 0;line-height:1.6;'>")
          .replace(/^/, "<p style='margin:16px 0;line-height:1.6;'>")
          .replace(/$/, "</p>");

        const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1a1a1a;background:#fff;">
  <p style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">DRAFT for review</p>
  <h1 style="font-size:26px;margin-top:0;margin-bottom:8px;">${post.title}</h1>
  <p style="color:#933;font-size:13px;margin-bottom:24px;">This is an unpublished draft. Do not share publicly.</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
  <article style="font-size:16px;line-height:1.7;color:#222;">
    ${htmlBody}
  </article>
  <hr style="border:none;border-top:1px solid #eee;margin:40px 0;" />
  <p style="color:#999;font-size:12px;">Sent from the TEXITcoin content system. · <a href="https://texitcoin.org/email/unsubscribe?token=${unsubscribeToken}" style="color:#999;">Unsubscribe</a></p>
</body>
</html>`;

        const messageId = crypto.randomUUID();
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: "draft-review",
          recipient_email: recipient,
          status: "pending",
        });

        const { error: enqueueError } = await supabase.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: recipient,
            from: "texitcoin-org <noreply@texitcoin.org>",
            sender_domain: "notify.texitcoin.org",
            subject: `DRAFT for review — ${post.title}`,
            html,
            text: plainText,
            purpose: "transactional",
            label: "draft-review",
            idempotency_key: messageId,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        });

        if (enqueueError) {
          console.error("send-draft: enqueue failed", enqueueError);
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: "draft-review",
            recipient_email: recipient,
            status: "failed",
            error_message: "Failed to enqueue email",
          });
          return Response.json({ error: "Failed to enqueue email" }, { status: 500 });
        }

        return Response.json({ ok: true, messageId });
      },
    },
  },
});
