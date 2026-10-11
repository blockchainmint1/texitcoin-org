import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

const CALENDAR_URL = "https://honest.money/api/public/hub/calendar";
const DAYS_AHEAD = 28;

function chicagoYmdWeekday(d: Date) {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
  }).format(d);
  return { ymd, weekday };
}

function chicagoOffset(ymd: string) {
  const tz = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "short",
  })
    .formatToParts(new Date(`${ymd}T18:00:00Z`))
    .find((p) => p.type === "timeZoneName")?.value;
  return tz === "CDT" ? "-05:00" : "-06:00";
}

function upcomingCalls(now = new Date()) {
  const out: Array<Record<string, unknown>> = [];
  const seen = new Set<string>();
  for (let i = 0; i <= DAYS_AHEAD; i++) {
    const { ymd, weekday } = chicagoYmdWeekday(new Date(now.getTime() + i * 86400000));
    if (seen.has(ymd) || (weekday !== "Tue" && weekday !== "Thu")) continue;
    seen.add(ymd);
    const off = chicagoOffset(ymd);
    const ends = new Date(`${ymd}T14:00:00${off}`);
    if (ends.getTime() < now.getTime()) continue;
    out.push({
      id: `txc-live-${ymd}`,
      title: "Honest Money Hour — TEXITcoin Live",
      description:
        "Live call with Bobby Gray every Tuesday and Thursday at noon Central. TEXITcoin news, mining, and the honest money ecosystem.",
      starts_at: `${ymd}T12:00:00${off}`,
      ends_at: `${ymd}T14:00:00${off}`,
      location: "Online",
      url: "https://texitcoin.org/live",
      category: "live",
      status: "published",
    });
  }
  return out;
}

export const Route = createFileRoute("/api/public/hooks/sync-events")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const shared = process.env["HME_HMAC_SECRET"];
        if (!shared) return Response.json({ error: "not configured" }, { status: 503 });

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

        const events = upcomingCalls();
        const res = await fetch(CALENDAR_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${shared}` },
          body: JSON.stringify({ service: "texitcoin", events }),
        });
        const text = await res.text();
        return Response.json(
          { ok: res.ok, status: res.status, sent: events.length, reply: text.slice(0, 300) },
          { status: res.ok ? 200 : 502 },
        );
      },
    },
  },
});
