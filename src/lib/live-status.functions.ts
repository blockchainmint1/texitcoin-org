import { createServerFn } from "@tanstack/react-start";

// Allowlisted TEXITcoin wallets — the /zoom page goes live only when one of
// these channels is broadcasting on streamTXC. Add more here to authorize
// additional co-hosts or backup streaming accounts.
const LIVE_WALLETS = [
  "TeiqbqMxQG4JrDfrzdvTZcqhhai8KT5JTc", // Bobby
  "TsNCJDv4mK9Ge8gbfGAnsC1JNQc2GHEo5V",
];

// Server-fn RPC hash for streamTXC's getLiveStreamByWallet (extracted from
// stream.texitcoin.org's client bundle). If streamTXC redeploys and this hash
// changes, the probe falls back to "offline" and the time-window heuristic
// in useLiveWindow keeps the UI honest.
const STREAM_RPC = `https://streamtxc.com/_serverFn/07b17cf0463d4e0da413c25f9a47999b6c655e3e514f22f3547a5002e9f294d9`;

export type LiveStatus = {
  isLive: boolean;
  wallet: string | null;
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

async function probeWallet(wallet: string): Promise<LiveStatus> {
  const url = `${STREAM_RPC}?payload=${encodeURIComponent(serovalPayload(wallet))}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/x-tss-framed, application/x-ndjson, application/json",
        "x-tsr-serverfn": "true",
      },
    });
    if (!res.ok) {
      return { isLive: false, wallet: null, startedAt: null, checkedAt: Date.now() };
    }
    const text = await res.text();
    if (!text) {
      return { isLive: false, wallet: null, startedAt: null, checkedAt: Date.now() };
    }
    const fields: Record<string, string> = {};
    const walk = (node: unknown): void => {
      if (!node || typeof node !== "object") return;
      const n = node as {
        p?: { k?: unknown[]; v?: unknown[] };
        a?: unknown[];
      };
      if (n.p?.k && n.p?.v) {
        n.p.k.forEach((key, i) => {
          const val = n.p!.v![i] as { t?: number; s?: unknown } | undefined;
          if (typeof key === "string" && val && typeof val.s === "string") {
            fields[key] = val.s;
          }
          walk(val);
        });
      }
      if (Array.isArray(n.a)) n.a.forEach(walk);
    };
    try {
      walk(JSON.parse(text));
    } catch {
      // Not JSON — offline.
    }
    const status = (fields.status ?? "").toLowerCase();
    const live =
      status === "live" ||
      status === "starting" ||
      /^https?:/.test(fields.hls_url ?? "");
    return {
      isLive: live,
      wallet: live ? wallet : null,
      startedAt: fields.started_at ?? null,
      checkedAt: Date.now(),
    };
  } catch {
    return { isLive: false, wallet: null, startedAt: null, checkedAt: Date.now() };
  }
}

export const getLiveStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveStatus> => {
    // Probe every allowlisted wallet in parallel; first live one wins.
    const results = await Promise.all(LIVE_WALLETS.map(probeWallet));
    const liveHit = results.find((r) => r.isLive);
    if (liveHit) return liveHit;
    return { isLive: false, wallet: null, startedAt: null, checkedAt: Date.now() };
  },
);
