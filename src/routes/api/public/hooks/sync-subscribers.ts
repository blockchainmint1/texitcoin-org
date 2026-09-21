import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

const SUBSCRIBE_URL = "https://honest.money/api/public/subscribe";
const SOURCE = "texitcoin.org";
const INTERESTS = ["texitcoin", "honest-money"];

type Candidate = { id: string; email: string; signedUpAt: string | null };

export const Route = createFileRoute("/api/public/hooks/sync-subscribers")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ecoKey = process.env["HME_ECOSYSTEM"];
        if (!ecoKey) {
          return Response.json(
            { error: "HME_ECOSYSTEM not configured" },
            { status: 503 },
          );
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );

        // Verify the cron caller. The vault schema is not exposed over the
        // Data API, so read the secret through a SECURITY DEFINER RPC that
        // only service_role may execute.
        const { data: secretData, error: rpcErr } = await supabaseAdmin.rpc(
          "read_cron_webhook_secret",
        );
        const expected = typeof secretData === "string" ? secretData : null;
        if (rpcErr || !expected) return new Response("forbidden", { status: 401 });

        const got = request.headers.get("x-cron-secret") ?? "";
        const a = Buffer.from(got);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("forbidden", { status: 401 });
        }

        // Already-synced ids.
        const { data: syncedRows } = await supabaseAdmin
          .from("ecosystem_subscriber_sync" as never)
          .select("user_id");
        const synced = new Set(
          ((syncedRows ?? []) as Array<{ user_id: string }>).map((r) => r.user_id),
        );

        const pending: Candidate[] = [];

        // 1. Newsletter sign-ups.
        const { data: subs, error: subsErr } = await supabaseAdmin
          .from("newsletter_subscribers")
          .select("id, email, created_at")
          .limit(5000);
        if (subsErr) {
          return Response.json({ error: subsErr.message }, { status: 500 });
        }
        for (const s of subs ?? []) {
          if (!s.email || synced.has(s.id)) continue;
          pending.push({ id: s.id, email: s.email, signedUpAt: s.created_at });
        }

        // 2. Account holders.
        for (let page = 1; page <= 20; page++) {
          const { data, error } = await supabaseAdmin.auth.admin.listUsers({
            page,
            perPage: 200,
          });
          if (error) break;
          const users = data?.users ?? [];
          for (const u of users) {
            if (!u.email || synced.has(u.id)) continue;
            pending.push({ id: u.id, email: u.email, signedUpAt: u.created_at });
          }
          if (users.length < 200) break;
        }

        let sent = 0;
        const failures: Array<{ email: string; status: number; body: string }> = [];

        for (const acct of pending) {
          let res: Response;
          try {
            res = await fetch(SUBSCRIBE_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-subscribe-key": ecoKey,
              },
              body: JSON.stringify({
                email: acct.email,
                source: SOURCE,
                interests: INTERESTS,
              }),
            });
          } catch (err) {
            failures.push({ email: acct.email, status: 0, body: String(err) });
            continue;
          }

          const text = await res.text();
          if (!res.ok) {
            failures.push({
              email: acct.email,
              status: res.status,
              body: text.slice(0, 200),
            });
            continue;
          }

          let remoteId: string | null = null;
          let status = "active";
          try {
            const parsed = JSON.parse(text) as { id?: string; status?: string };
            remoteId = parsed.id ?? null;
            status = parsed.status ?? "active";
          } catch {
            /* non-JSON success body — still count it */
          }

          await supabaseAdmin.from("ecosystem_subscriber_sync" as never).upsert(
            {
              user_id: acct.id,
              email: acct.email,
              signed_up_at: acct.signedUpAt,
              synced_at: new Date().toISOString(),
              status,
              remote_id: remoteId,
            } as never,
            { onConflict: "user_id" },
          );
          sent++;
        }

        return Response.json({
          ok: true,
          candidates: pending.length,
          sent,
          failed: failures.length,
          failures: failures.slice(0, 10),
        });
      },
    },
  },
});
