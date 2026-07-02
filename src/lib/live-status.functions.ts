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

// TSR server functions expect a Seroval-encoded `payload` query param plus a
// couple of framing headers. This is the exact shape streamTXC's client sends
// for `getLiveStreamByWallet({ data: { wallet } })`.
function serovalPayload(wallet: string): string {
  return JSON.stringify({
    t: {
      t: 10,
      i: 0,
      p: {
        k: ["data"],
        v: [
          {
            t: 10,
            i: 1,
            p: { k: ["wallet"], v: [{ t: 1, s: wallet }] },
            o: 0,
          },
        ],
      },
      o: 0,
    },
    f: 63,
    m: [],
  });
}

export const getLiveStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveStatus> => {
    const url = `${STREAM_RPC}?payload=${encodeURIComponent(serovalPayload(LIVE_WALLET))}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/x-tss-framed, application/x-ndjson, application/json",
          "x-tsr-serverfn": "true",
        },
      });
      if (!res.ok) {
        return { isLive: false, startedAt: null, checkedAt: Date.now() };
      }
      const text = await res.text();
      if (!text) {
        return { isLive: false, startedAt: null, checkedAt: Date.now() };
      }
      // Response is a Seroval tree; the fields we care about are surfaced as
      // simple `"status":"live"` and `"hls_url":"https://..."` string nodes.
      const live =
        /"status"[^]{0,40}"(live|starting)"/i.test(text) ||
        /"hls_url"[^]{0,40}"https?:/i.test(text);
      let startedAt: string | null = null;
      const m = text.match(/"started_at"[^]{0,40}"([^"]+)"/);
      if (m) startedAt = m[1];
      return { isLive: live, startedAt, checkedAt: Date.now() };
    } catch {
      return { isLive: false, startedAt: null, checkedAt: Date.now() };
    }
  },
);
