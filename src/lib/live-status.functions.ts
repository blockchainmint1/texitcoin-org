import { createServerFn } from "@tanstack/react-start";

// Bobby's TEXITcoin wallet — permanent identifier for the live channel on streamTXC.
const LIVE_WALLET = "TeiqbqMxQG4JrDfrzdvTZcqhhai8KT5JTc";

// Server-fn RPC hash for streamTXC's getLiveStreamByWallet (extracted from
// stream.texitcoin.org's client bundle). If streamTXC redeploys and this hash
// changes, the probe falls back to "offline" and the time-window heuristic
// in useLiveWindow keeps the UI honest.
const STREAM_RPC = `https://streamtxc.com/_serverFn/07b17cf0463d4e0da413c25f9a47999b6c655e3e514f22f3547a5002e9f294d9`;

export type LiveStatus = {
  isLive: boolean;
  startedAt: string | null;
  checkedAt: number;
};

export const getLiveStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveStatus> => {
    const url = `${STREAM_RPC}?data=${encodeURIComponent(
      JSON.stringify({ wallet: LIVE_WALLET }),
    )}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { accept: "application/json" },
      });
      if (!res.ok) {
        return { isLive: false, startedAt: null, checkedAt: Date.now() };
      }
      const text = await res.text();
      // streamTXC returns an empty body when there is no active stream row,
      // and a serialized `{ stream: { status, hls_url, started_at, ... } }`
      // payload when one exists in status 'live' or 'starting'.
      if (!text) {
        return { isLive: false, startedAt: null, checkedAt: Date.now() };
      }
      const live =
        /"status"\s*:\s*"(live|starting)"/i.test(text) ||
        /"hls_url"\s*:\s*"https?:/i.test(text);
      let startedAt: string | null = null;
      const m = text.match(/"started_at"\s*:\s*"([^"]+)"/);
      if (m) startedAt = m[1];
      return { isLive: live, startedAt, checkedAt: Date.now() };
    } catch {
      return { isLive: false, startedAt: null, checkedAt: Date.now() };
    }
  },
);
