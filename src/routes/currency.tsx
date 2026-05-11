import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Wallet, ShieldCheck, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/currency-hero.jpg";
import blankSlateImg from "@/assets/currency-blank-slate.jpg";

export const Route = createFileRoute("/currency")({
  head: () => ({
    meta: [
      { title: "Currency-First Layer 1 — TEXITcoin" },
      {
        name: "description",
        content:
          "TEXITcoin is a currency-first Layer 1 blockchain built for fast, low-cost, peer-to-peer payments — bringing crypto back to its roots as everyday digital cash.",
      },
      { property: "og:title", content: "Currency-First Layer 1 — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Fast confirmations, low fees, proof-of-work security, and permissionless access — the future of honest, spendable money.",
      },
    ],
  }),
  component: CurrencyPage,
});

const PILLARS = [
  {
    icon: Zap,
    title: "Fast Confirmations",
    body: "Big blocks every ~3 minutes mean transactions settle quickly — built for real-world use at the counter, not the trading desk.",
  },
  {
    icon: Wallet,
    title: "Low Transaction Costs",
    body: "Designed to stay cheap even as the network grows, so you can actually spend TXC without wincing at fees.",
  },
  {
    icon: ShieldCheck,
    title: "Proof-of-Work Security",
    body: "Merge mining with LTC and DOGE leverages battle-tested hashrate for robust protection from day one.",
  },
  {
    icon: Users,
    title: "Permissionless & Accessible",
    body: "Texas-based, capped mining keeps the network decentralized and individual-friendly — no room for megacorp domination.",
  },
];

const STACK = [
  "Block explorers for fully transparent transaction history",
  "Mempool explorers to monitor pending transactions in real time",
  "Secure, user-friendly wallets for holding and sending",
  "Exchange integrations for liquidity and accessibility",
  "Developer tools, APIs, nodes, and documentation — the full stack",
];

function CurrencyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Honest Money · Built for Everyday Use
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Currency-first <span className="text-primary">Layer 1 technology</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Bitcoin started with a bold promise: peer-to-peer electronic cash. Money
              anyone could use to buy, sell, and transfer value directly — no banks,
              no borders, no BS.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Somewhere along the way it got stuck — celebrated as "digital gold" for
              traders and institutions, but rarely used as money. High fees, slow
              confirmations, and congestion turned it into something to HODL, not spend.
              TXC is here to bring crypto back to where it belongs: as money, for
              people, by people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://swap.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Get TXC <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wallet.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
              >
                Open a Wallet
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
              <img
                src={heroImg}
                alt="Spending TEXITcoin at a Texas counter"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Block Time
              </div>
              <div className="font-display text-3xl font-bold text-primary">
                ~3 minutes
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where Bitcoin got it wrong */}
      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Differences
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Where Bitcoin <span className="text-primary">got it wrong</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Satoshi's whitepaper described Bitcoin as "a peer-to-peer electronic cash
              system" designed for everyday payments without intermediaries. As adoption
              grew, the network hit hard limits. The 1 MB block size cap couldn't handle
              rising demand, leading to skyrocketing fees and delays during peaks — like
              in 2017.
            </p>
            <p className="mt-4 text-muted-foreground">
              That year sparked the scaling debate: one side pushed off-chain solutions
              like Lightning; the other demanded bigger blocks for cheap, fast on-chain
              transactions. When compromise failed, Bitcoin Cash hard-forked to restore
              the original vision as usable cash. TXC learns from that history. We don't
              repeat the mistakes — we start fresh with a currency-first mindset.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-border shadow-card"
          >
            <img
              src={blankSlateImg}
              alt="A blank-slate approach to currency"
              loading="lazy"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Blank-slate pillars */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Solution
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                Our blank-slate approach: <span className="text-primary">built for transactions</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              TXC is a clean, modern Layer 1 blockchain refined from Litecoin's proven
              Scrypt-based code — designed from the ground up as digital cash with
              faster blocks, lower fees, and efficient mining.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-card hover:border-primary/60 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-muted-foreground">
            We needed a blank slate to build honest money without legacy baggage. No
            forced compromises, no decade-old debates holding us back. Just pure focus
            on what currency should be: fast, affordable, and empowering.
          </p>
        </div>
      </section>

      {/* The hard truth */}
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Pressure
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            The hard truth about Layer 1: <span className="text-primary">why most take the easy way out</span>
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            Launching a brand-new Layer 1 isn't glamorous. You can't just plug into
            someone else's ecosystem and call it done. You have to build everything
            from scratch:
          </p>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-muted-foreground">
            It's grueling work — years of development, testing, security audits, and
            community building. That's why most projects opt for the shortcut: launch
            tokens on Ethereum, Solana, or another established chain. Lower risk, faster
            go-to-market, instant infrastructure.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            But shortcuts come with strings. You surrender control to someone else's
            rules, governance, fees, and priorities. TXC refused that path. We did it
            the hard way because ultimate control matters — especially when the mission
            is honest, decentralized money.
          </p>
        </div>
      </section>

      {/* No sacred cows + closing */}
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Adaptable by Design
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Ready to adapt — <span className="text-primary">no sacred cows</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            If we ever face the same congestion Bitcoin hit in 2017, we won't hesitate.
            We'll upgrade block size, optimize transaction throughput, or implement
            whatever keeps TXC usable as everyday money. Flexibility is built in —
            because the goal isn't to be "digital gold" and get rich off transaction
            fees. It's to be digital cash that works.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            TXC isn't chasing hype or institutional approval. We're rebuilding crypto's
            original promise: money that's truly peer-to-peer, accessible, and in the
            hands of the people who use it.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            In a world of volatile stores-of-value and centralized stablecoins, TXC
            stands for something simpler and more powerful: usable, decentralized
            currency. Join the movement to make crypto spendable again.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://swap.texitcoin.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Get TXC <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/proof-of-work"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
            >
              How Mining Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
