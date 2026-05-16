import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Coins, TrendingDown, Lock, Pickaxe, Sparkles, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/tokenomics")({
  head: () => ({
    meta: [
      { title: "TEXITcoin Tokenomics — Supply, Emission & Distribution" },
      { name: "description", content: "TEXITcoin (TXC) is a fixed-supply, Proof-of-Work Layer 1. See the full breakdown: max supply, emission schedule, halvings, and distribution." },
      { property: "og:title", content: "TEXITcoin Tokenomics" },
      { property: "og:description", content: "Fixed supply. PoW emission. No pre-mine to insiders. The honest math behind TXC." },
      { property: "og:url", content: "https://texitcoin.org/tokenomics" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/tokenomics" }],
  }),
  component: TokenomicsPage,
});

const STATS = [
  { label: "Max supply", value: "353,396,296", suffix: "TXC", note: "Hard-capped. Forever." },
  { label: "Consensus", value: "PoW", suffix: "Scrypt", note: "Merge-mined with Litecoin & Dogecoin" },
  { label: "Block time", value: "~3", suffix: "minutes", note: "Built for everyday payments" },
  { label: "Premine", value: "0", suffix: "TXC", note: "No insider allocation" },
];

const PRINCIPLES = [
  { icon: Lock, title: "Fixed supply", body: "353,396,296 TXC. No governance vote can inflate it. No foundation treasury can dilute you." },
  { icon: Pickaxe, title: "Earn it or buy it", body: "Every TXC enters circulation through Scrypt Proof-of-Work mining. No airdrops to VCs, no team unlock cliffs." },
  { icon: TrendingDown, title: "Halving schedule", body: "Block reward starts at 254 TXC and halves every 695,662 blocks — a century-long emission curve, ~138 years to the final block." },
  { icon: Coins, title: "Sound-money math", body: "Scarcity + decentralized issuance + immutable rules. The properties that made gold money, in digital form." },
];


function TokenomicsPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="container relative mx-auto px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> The honest math
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                TXC <span className="text-primary">tokenomics</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                No premine. No VC allocation. No foundation tax. Just 353,396,296 coins, earned one block at a time.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto px-6 py-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-primary">{s.value}</span>
                    <span className="text-sm text-muted-foreground">{s.suffix}</span>
                  </div>
                  <div className="mt-2 text-sm text-foreground/80">{s.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Four rules. No exceptions.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-background p-8"
                >
                  <p.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Distribution</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">100% of TXC is issued through mining. No allocations, no vesting cliffs, no team tokens unlocking on your head.</p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <div className="flex h-12 w-full">
                <div className="flex h-full w-full items-center justify-center bg-primary text-sm font-semibold text-primary-foreground">
                  Mining rewards — 100%
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pre-mine</div>
                  <div className="mt-2 font-display text-3xl font-bold">0%</div>
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Team / Foundation</div>
                  <div className="mt-2 font-display text-3xl font-bold">0%</div>
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">VC / Private sale</div>
                  <div className="mt-2 font-display text-3xl font-bold">0%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Want the deeper dive?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">See how Proof-of-Work secures the network, or grab a wallet and start stacking.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/proof-of-work" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Proof of Work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/buy" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
                How to buy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
