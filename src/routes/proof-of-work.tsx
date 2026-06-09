import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Gauge, Coins, Users, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/pow-hero.jpg";
import securityImg from "@/assets/pow-security.jpg";

export const Route = createFileRoute("/proof-of-work")({
  head: () => ({
    meta: [
      { title: "Proof of Work — TEXITcoin" },
      {
        name: "description",
        content:
          "TEXITcoin redefines proof-of-work mining: Texas-based, capped scale, merge-mined for sustainability, and built for individual miners — not institutions.",
      },
      { property: "og:title", content: "Proof of Work — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Permissionless, Scrypt-based, Texas-rooted mining designed for transparency, accessibility, and long-term sustainability.",
      },
    ],
  }),
  component: ProofOfWorkPage,
});

const FEATURES = [
  {
    icon: MapPin,
    title: "Exclusively Texas-Based Mining",
    body: "Our entire proof-of-work infrastructure is constructed and operated in Texas. Economic benefits stay local, supporting Texas energy infrastructure and our vision of financial independence rooted in our home state.",
  },
  {
    icon: Gauge,
    title: "Capped at 100,000,000 Megahash",
    body: "We are intentionally scaling the mine to a maximum of 100M MH/s. This 'big but not too big' approach prevents the hyper-centralization and wasteful inefficiency seen elsewhere, where a handful of players control the majority of hashrate.",
  },
  {
    icon: Coins,
    title: "Sustainable Block Reward Economics",
    body: "Once fully built, our operation captures a meaningful portion of LTC and DOGE blocks via merge mining. These rewards offset electricity costs, enabling efficient, low-overhead production of TXC coins.",
  },
  {
    icon: Users,
    title: "Prioritizing Individual Profitability",
    body: "By limiting scale, mining rewards stay accessible and profitable for individuals — not banks, megacorporations, institutions, or foreign nations. Everyday people can participate meaningfully in securing the network.",
  },
  {
    icon: HeartHandshake,
    title: "Empowering Community Involvement",
    body: "Money should be created and secured by the people who use it. TXC mining invites individuals to take an active role in the creation and security of their own currency — true decentralization and personal sovereignty.",
  },
  {
    icon: ShieldCheck,
    title: "Hardened by Merge Mining",
    body: "Merge mining with established Scrypt chains like Litecoin and Dogecoin adds robust security without reinventing the wheel — keeping the ecosystem balanced and resistant to centralization pressures.",
  },
];

function ProofOfWorkPage() {
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
              PoW · The Backbone of Trust
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Proof of Work <span className="text-primary">mining redefined</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              In a world where cryptocurrency mining has become dominated by massive
              corporations, banks, and institutional players, TXC is taking a different
              path — putting power back in the hands of individuals and communities,
              right here in Texas.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              TEXITcoin is a permissionless, Scrypt-based proof-of-work network designed
              for transparency, accessibility, and long-term sustainability. Anyone can
              run a node and join the chain, while our Texas-rooted mining operation is
              deliberately scaled to keep the network decentralized, profitable for
              everyday participants, and truly community-driven.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://pool.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Visit the Pool <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://explorer.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
              >
                Block Explorer
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
                alt="TEXITcoin mining facility in Texas"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Network Cap
              </div>
              <div className="font-display text-3xl font-bold text-primary">
                100,000,000 MH/s
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Origins
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                What makes <span className="text-primary">TXC mining</span> unique
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              The Republic of Texas was built on a simple principle: a people determined
              to govern themselves and control their own wealth. Those early years taught
              hard lessons about independence.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card hover:border-primary/60 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug">
                  {f.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{f.body}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security split */}
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
              src={securityImg}
              alt="Decentralized Texas mining network"
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
              Pressure
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Proof-of-Work: <span className="text-primary">secure, fair, and focused</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              TXC uses a permissioned mining model to maintain control over who
              participates in the network's hashrate. This ensures mining stays aligned
              with our core principles: Texas-centric operations, capped scale, and
              protection against external domination and 51% attacks.
            </p>
            <p className="mt-4 text-muted-foreground">
              Merge mining with established Scrypt chains like Litecoin and Dogecoin adds
              robust security without reinventing the wheel, while our deliberate design
              choices keep the ecosystem balanced and resistant to centralization
              pressures.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Algorithm</dt>
                <dd className="mt-1 font-display text-lg font-bold">Scrypt</dd>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Merge Mined</dt>
                <dd className="mt-1 font-display text-lg font-bold">LTC · DOGE</dd>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Based In</dt>
                <dd className="mt-1 font-display text-lg font-bold">Texas 🇺🇸</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The Bigger Picture
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Why this <span className="text-primary">matters</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Traditional proof-of-work networks often evolve into playgrounds for the
            ultra-wealthy and large-scale operators, leaving little room for the average
            person. TXC flips the script. By building in Texas, capping our growth, and
            using smart reward allocation, we're creating a mining ecosystem that rewards
            participation, supports local energy use, and promotes financial independence
            for individuals.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Join us in redefining what's possible with proof-of-work. TXC isn't just
            another coin — it's a movement for honest, accessible, and community-owned
            money.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://pool.texitcoin.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Start Mining <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/"
              hash="ecosystem"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
            >
              Explore the Ecosystem
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
