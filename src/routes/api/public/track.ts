import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  path: z.string().min(1).max(300),
  referrer: z.string().max(500).optional().nullable(),
  sessionId: z.string().min(8).max(64),
  isNewSession: z.boolean().optional(),
});

function deviceFromUA(ua: string): string {
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(s)) return "tablet";
  if (/mobi|iphone|android|phone/.test(s)) return "mobile";
  return "desktop";
}

function hostOf(ref: string | null | undefined): string | null {
  if (!ref) return null;
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/public/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Bad request", { status: 400 });
        }
        const parsed = payloadSchema.safeParse(body);
        if (!parsed.success) return new Response("Bad request", { status: 400 });

        const ua = request.headers.get("user-agent") ?? "";
        if (/bot|crawler|spider|preview|lighthouse|headless/i.test(ua)) {
          return new Response(null, { status: 204 });
        }

        const selfHost = (() => {
          try {
            return new URL(request.url).hostname.replace(/^www\./, "");
          } catch {
            return null;
          }
        })();
        const refHost = hostOf(parsed.data.referrer);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("site_page_views").insert({
          path: parsed.data.path.slice(0, 300),
          referrer_host: !refHost || refHost === selfHost ? null : refHost,
          country: request.headers.get("cf-ipcountry") ?? null,
          device: deviceFromUA(ua),
          session_id: parsed.data.sessionId,
          is_new_session: parsed.data.isNewSession ?? false,
        });

        return new Response(null, { status: 204 });
      },
    },
  },
});
