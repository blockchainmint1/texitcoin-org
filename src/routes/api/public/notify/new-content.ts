import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/notify/new-content")({
  server: {
    handlers: {
      POST: async () => run(),
      GET: async () => run(),
    },
  },
});

async function run() {
  try {
    const { runNotifications } = await import("@/lib/notify-content.server");
    const sent = await runNotifications();
    return Response.json({ ok: true, sent });
  } catch (err) {
    console.error("notify/new-content failed", err);
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
