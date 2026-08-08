import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const KEY = "txc_sid";

function getSessionId(): { id: string; isNew: boolean } {
  let id = sessionStorage.getItem(KEY);
  if (id) return { id, isNew: false };
  id = crypto.randomUUID();
  sessionStorage.setItem(KEY, id);
  return { id, isNew: true };
}

export function Tracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.top !== window.self) return; // skip editor preview iframes
    try {
      const { id, isNew } = getSessionId();
      void fetch("/api/public/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          sessionId: id,
          isNewSession: isNew,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
