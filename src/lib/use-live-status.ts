import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLiveStatus, type LiveStatus } from "./live-status.functions";
import { isLiveWindow } from "./live-window";

// Manual kill switch. Set to true to force the homepage banner and /zoom page
// into "offline" mode regardless of what the streamTXC probe says.
// Flip back to false when you want live detection to run normally again.
const FORCE_LIVE_OFF = false;

/**
 * Polls streamTXC every 30s (server-side, no CORS) to detect whether the
 * Honest Money Hour is actually on the air right now — regardless of the
 * clock. Sometimes we start early or run late; this flips the UI based on
 * reality, with the Thursday 7pm CT window as a graceful fallback if the
 * probe fails.
 */
export function useLiveStatus(): {
  isLive: boolean;
  wallet: string | null;
  source: "probe" | "window" | "loading";
} {
  const probe = useServerFn(getLiveStatus);
  const q = useQuery<LiveStatus>({
    queryKey: ["live-status"],
    queryFn: () => probe(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    staleTime: 15_000,
  });

  if (FORCE_LIVE_OFF) {
    return { isLive: false, wallet: null, source: "window" };
  }

  if (q.data) {
    // Probe is authoritative. If probe explicitly says offline, trust it —
    // even inside the Thursday window (we may be running behind schedule).
    return { isLive: q.data.isLive, wallet: q.data.wallet ?? null, source: "probe" };
  }
  // Before the first successful probe, use the time window as a friendly
  // default so returning viewers see the right countdown/live state.
  return {
    isLive: isLiveWindow(),
    wallet: null,
    source: q.isLoading ? "loading" : "window",
  };
}
