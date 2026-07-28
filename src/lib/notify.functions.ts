import { createServerFn } from "@tanstack/react-start";

/**
 * Scans blog posts, /zoom calls and the /legal timeline for anything that
 * hasn't been announced to the community Telegram chat yet, and sends it.
 * Safe to call repeatedly — every item is only announced once.
 */
export const checkNewContent = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const { runNotifications } = await import("./notify-content.server");
      const sent = await runNotifications();
      return { ok: true as const, sent };
    } catch (err) {
      console.error("checkNewContent failed", err);
      return { ok: false as const, sent: [] as string[] };
    }
  },
);
