import { motion } from "framer-motion";
import { Coins, Timer, Layers, TrendingDown, Check } from "lucide-react";

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
  "Timestamp: a Texan classic",
  "6 blocks to transaction confirmation",
];

export function Specs() {
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
              <div className="flex items-center gap-2 text-xs text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Healthy
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {[
                { l: "Block height", v: "1,284,621" },
                { l: "Hash rate", v: "84.2 GH/s" },
                { l: "Difficulty", v: "1.42 M" },
                { l: "Avg. fee", v: "0.0001 TXC" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 h-24 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 grid place-items-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Last block · 38s ago
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
