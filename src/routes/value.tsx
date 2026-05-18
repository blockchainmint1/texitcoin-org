import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, ShoppingBag, Store, Pickaxe, ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/value-hero.jpg";
import networkImg from "@/assets/value-network.jpg";

export const Route = createFileRoute("/value")({
  head: () => ({
    meta: [
      { title: "Community-Driven Value — TEXITcoin" },
      {
        name: "description",
        content:
          "TEXITcoin's value comes from real people trading, spending, accepting, and mining it. Honest money powered by community participation, not speculation.",
      },
      { property: "og:title", content: "Community-Driven Value — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Currency is a promise. The more people who use, spend, accept, and mine TXC, the stronger the promise becomes.",
      },
    ],
  }),
  component: ValuePage,
});

const WAYS = [
  { icon: Handshake, title: "Trade", body: "TXC peer-to-peer, directly between people — no middlemen, no permission slips." },
  { icon: ShoppingBag, title: "Spend", body: "Use TXC on real goods and services at merchants, markets, and online stores." },
  { icon: Store, title: "Accept", body: "Take TXC from customers and vendors to keep value circulating locally." },
  { icon: Pickaxe, title: "Mine", body: "Help secure the network and earn TXC for contributing hashrate." },
];

const INITIATIVES = [
  {
    name: "Downtown Digital Dollars",
    href: "https://downtowndigitaldollars.com/",
    body: "A community currency layer for main street, small towns, and cities. Turn local economies into vibrant, digital cash systems where TXC powers seamless, low-cost payments — keeping value circulating locally.",
  },
  {
    name: "fair.money",
    href: "https://fair.money/",
    body: "Fair, transparent initiatives to make TXC the go-to for honest trade at markets, events, fairs, and festivals. No middlemen skimming, no inflation eroding trust — just people honoring promises directly.",
  },
];

function ValuePage() {
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
              The Strength of People-Powered Money
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Community-driven <span className="text-primary">value</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              At its heart, any true currency is a promise — a mutual agreement between
              traders that the medium you exchange today will be willingly accepted back
              tomorrow for goods, services, or value.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              This isn't abstract theory. It's the foundation of trade itself: "I'll
              give you this now, trusting you'll honor it later." Fiat can break that
              promise overnight — inflation printed from thin air erodes trust. Sound,
              decentralized crypto like TXC can't be inflated arbitrarily. The supply is
              fixed, the rules transparent, the promise immutable. That's why
              participation matters more than anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/buy"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Join the Circle <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/currency"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
              >
                Currency-First Tech
              </Link>
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
                alt="Texas community market with people trading"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Value Driver
              </div>
              <div className="font-display text-3xl font-bold text-primary">
                Participation
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metcalfe */}
      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-border shadow-card"
          >
            <img
              src={networkImg}
              alt="Network effect illustration"
              loading="lazy"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Growth
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              The Metcalfe effect: <span className="text-primary">value grows with the community</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              This isn't hype — it's math. Metcalfe's Law states that the value of a
              network is proportional to the square of its connected users. Double the
              participants and value doesn't just double — it quadruples.
            </p>
            <p className="mt-4 text-muted-foreground">
              Early Bitcoin lived this truth. In the grassroots days, enthusiasts set up
              tables at events, handed out trifolds, and evangelized peer-to-peer cash
              to friends, merchants, and strangers. Every new trader strengthened the
              network: more liquidity, more acceptance, more real-world use. The promise
              held because people believed in it — and proved it by using it.
            </p>
            <p className="mt-4 text-muted-foreground">
              But success drew the wrong crowd. Big banks, institutions, and speculators
              flooded in. Price soared into the stratosphere, turning Bitcoin into
              "digital gold" for HODLing rather than spending. The original vision —
              fast, cheap, everyday currency — got buried under speculation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Picking up */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Solution
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                TXC: picking up <span className="text-primary">where Bitcoin left off</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              We're not trying to repeat history's mistakes. We're reigniting that early
              Bitcoin spirit — community-first, usage-first — right here in Texas, for
              Texans and beyond.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WAYS.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-card hover:border-primary/60 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug">
                  {w.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{w.body}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-muted-foreground">
            The more participants join — merchants downtown, fair organizers, everyday
            folks — the tighter the promise becomes. Metcalfe's Law kicks in hard:
            exponential growth through real adoption, not pump-and-dump hype.
          </p>
        </div>
      </section>

      {/* Sound money lineage */}
      <section className="relative border-t border-border py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Lineage
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Sound-money DNA, <span className="text-primary">tested by history</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              TXC isn't the first attempt at a complementary currency built outside
              the state. The Liberty Dollar and the American Open Currency Standard
              ran the same experiment with silver: issue an honest medium of
              exchange, set its face value to reflect real worth, and let voluntary
              trade do the rest. Their playbook gave us two enduring lessons.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-primary">
                Lesson 1 · Gresham's Law
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">
                Bad money drives out good
              </h3>
              <p className="mt-4 text-muted-foreground">
                When two currencies circulate side-by-side, people spend the weaker
                one and hoard the stronger one. Silver coins disappeared from
                pockets the moment they were worth more as metal than as money.
                The same dynamic protects sound crypto today: holders quietly
                stack TXC while paying for everyday things in inflating fiat.
                That's not a bug — it's the market sorting honest money from
                dishonest money.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-primary">
                Lesson 2 · The move-up schedule
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">
                Value rises in disciplined steps
              </h3>
              <p className="mt-4 text-muted-foreground">
                The Liberty Dollar didn't pretend silver was worth more than it
                was — it raised its face value as silver appreciated, in
                deliberate steps the market could absorb. TXC inherits that
                discipline. Value isn't pumped; it ratchets up as the network
                grows, the mine matures, and liquidity deepens. Each step is
                only taken when the community can hold it.
              </p>
            </div>
          </div>

          <p className="mt-12 max-w-3xl text-muted-foreground">
            Stack Gresham's Law on top of Metcalfe's Law and the upward spiral
            takes care of itself. Early holders who exit at a profit hand the
            torch to new participants who see further still — and each cycle
            broadens the base of people who use, accept, and trust the currency.
            That's how honest money compounds: not on hype, but on history
            repeating itself with better tools.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Innovations
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Initiatives to drive <span className="text-primary">everyday use</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              To make TXC truly usable, we're launching tools that embed it into
              communities. These aren't side projects — they're the heartbeat: ways to
              get TXC into hands, wallets, and registers so the network grows through
              genuine participation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {INITIATIVES.map((it) => (
              <a
                key={it.name}
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card hover:border-primary/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-2xl font-bold leading-snug md:text-3xl">
                    {it.name}
                  </h3>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-4 text-muted-foreground">{it.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Why This Matters
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            The promise is <span className="text-primary">ours to keep</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Currencies only thrive when the people using them believe in the promise.
            Fiat breaks it with endless printing. Speculative coins break it by
            forgetting trade. TXC keeps it sacred: capped supply, community mining,
            real-world tools, and unwavering focus on usability.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Value doesn't come from whitepapers or hype — it comes from you. From
            traders shaking hands (or tapping wallets), from merchants saying "yes" to
            TXC, from communities choosing honest money over broken systems.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/buy"
              className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Get TXC <ArrowRight className="h-4 w-4" />
            </Link>
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
