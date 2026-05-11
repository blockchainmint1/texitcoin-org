import { motion } from "framer-motion";
import { Coins, Timer, Layers, TrendingDown, Check } from "lucide-react";
import { useEffect, useState } from "react";

const MEMPOOL_API = "https://mempool.texitcoin.org/api";

type LiveStats = {
  height: string;
  hashrate: string;
  difficulty: string;
  fee: string;
  lastBlockAgo: string;
};

const PLACEHOLDER: LiveStats = {
  height: "—",
  hashrate: "—",
  difficulty: "—",
  fee: "—",
  lastBlockAgo: "Connecting…",
};

function formatHashrate(hps: number): string {
  if (!isFinite(hps) || hps <= 0) return "—";
  const units = [
    { v: 1e18, s: "EH/s" },
    { v: 1e15, s: "PH/s" },
    { v: 1e12, s: "TH/s" },
    { v: 1e9, s: "GH/s" },
    { v: 1e6, s: "MH/s" },
    { v: 1e3, s: "KH/s" },
  ];
  for (const u of units) {
    if (hps >= u.v) return `${(hps / u.v).toFixed(2)} ${u.s}`;
  }
  return `${hps.toFixed(0)} H/s`;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatDifficulty(d: number): string {
  if (d >= 1e9) return `${(d / 1e9).toFixed(2)} B`;
  if (d >= 1e6) return `${(d / 1e6).toFixed(2)} M`;
  if (d >= 1e3) return `${(d / 1e3).toFixed(2)} K`;
  return d.toFixed(0);
}

function formatAgo(seconds: number): string {
  if (seconds < 60) return `${Math.max(0, Math.floor(seconds))}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>(PLACEHOLDER);
  const [healthy, setHealthy] = useState(false);
  const [tipTimestamp, setTipTimestamp] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [blocksRes, hashRes, feesRes] = await Promise.all([
          fetch(`${MEMPOOL_API}/blocks`),
          fetch(`${MEMPOOL_API}/v1/mining/hashrate/3d`),
          fetch(`${MEMPOOL_API}/v1/fees/recommended`),
        ]);
        if (!blocksRes.ok || !hashRes.ok) throw new Error("api");
        const blocks = await blocksRes.json();
        const hashData = await hashRes.json();
        const fees = feesRes.ok ? await feesRes.json() : null;

        const tip = blocks[0];
        const hashrates = hashData.hashrates ?? [];
        const latestHashrate = hashrates.length
          ? hashrates[hashrates.length - 1].avgHashrate
          : 0;

        if (cancelled) return;
        setTipTimestamp(tip.timestamp);
        setHealthy(true);
        setStats({
          height: formatNumber(tip.height),
          hashrate: formatHashrate(latestHashrate),
          difficulty: formatDifficulty(tip.difficulty),
          fee: fees ? `${fees.fastestFee} sat/vB` : "—",
          lastBlockAgo: formatAgo(Math.floor(Date.now() / 1000) - tip.timestamp),
        });
      } catch {
        if (!cancelled) setHealthy(false);
      }
    }

    load();
    const refresh = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, []);

  // tick "last block ago" every second
  useEffect(() => {
    if (tipTimestamp == null) return;
    const id = setInterval(() => {
      setStats((s) => ({
        ...s,
        lastBlockAgo: formatAgo(Math.floor(Date.now() / 1000) - tipTimestamp),
      }));
    }, 1000);
    return () => clearInterval(id);
  }, [tipTimestamp]);

  return { stats, healthy };
}

const SPECS = [
  { icon: Coins, title: "0.00 pre-mine", body: "Nobody starts with a head start. Mining is permissioned for Texas." },
  { icon: Coins, title: "254 block reward", body: "An inflation-resistant reward issued every 3 minutes to secure the chain." },
  { icon: Timer, title: "3-minute spacing", body: "Fast confirmations that keep the network nimble and responsive." },
  { icon: TrendingDown, title: "695,662 halving", body: "Engineered for a century-long emission curve — value preserved across generations." },
];

const FACTS = [
  "Scrypt Proof-of-Work algorithm",
  "353,396,296 max coin supply",
  "~138 years until the final block",
  "Genesis timestamp: \u201CYou may all go to hell and I will go to Texas.\u201D",
  "6 blocks to transaction confirmation",
];

export function Specs() {
  const { stats, healthy } = useLiveStats();
  return (
    <section id="specs" className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Under the hood
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Technical <span className="text-primary">specifications</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            TEXITcoin is a Layer 1 blockchain — structurally similar to the fast,
            battle-tested Litecoin network, tuned for everyday currency use.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-red-gradient shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              <Layers className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/5" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 items-center lg:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl text-balance">
              Built for growth, designed for <span className="text-primary">appreciation</span>.
            </h3>
            <p className="mt-4 text-muted-foreground">
              Crypto markets are heating up again, and that&apos;s exactly the moment to
              be in something built on principles rather than hype.
            </p>
            <ul className="mt-8 space-y-3">
              {FACTS.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl border border-border bg-card p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Live network
              </div>
              <div className={`flex items-center gap-2 text-xs ${healthy ? "text-accent" : "text-muted-foreground"}`}>
                <span className={`h-2 w-2 rounded-full ${healthy ? "bg-accent animate-pulse" : "bg-muted-foreground"}`} />
                {healthy ? "Healthy" : "Connecting"}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {[
                { l: "Block height", v: stats.height },
                { l: "Hash rate", v: stats.hashrate },
                { l: "Difficulty", v: stats.difficulty },
                { l: "Fastest fee", v: stats.fee },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 h-24 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 grid place-items-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Last block · {stats.lastBlockAgo}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
