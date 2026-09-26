import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

export const Route = createFileRoute("/api/public/notify/new-content")({
  server: {
    handlers: {
      POST: async ({ request }) => run(request),
    },
  },
});

async function run(request: Request) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: secretData, error: rpcErr } = await supabaseAdmin.rpc(
      "read_cron_webhook_secret" as never,
    );
    const expected = typeof secretData === "string" ? secretData : null;
    if (rpcErr || !expected) return new Response("forbidden", { status: 401 });
    const a = Buffer.from(request.headers.get("x-cron-secret") ?? "");
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return new Response("forbidden", { status: 401 });
    }

    const { runNotifications } = await import("@/lib/notify-content.server");
    const sent = await runNotifications();
    return Response.json({ ok: true, sent });
  } catch (err) {
    console.error("notify/new-content failed", err);
    return Response.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
