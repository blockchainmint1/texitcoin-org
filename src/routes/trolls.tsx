import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Skull,
  Megaphone,
  Flame,
  Trophy,
  ExternalLink,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/trolls")({
  head: () => ({
    meta: [
      { title: "The Troll Index — A Hall of Fame for the Dedicated Loser's Club" },
      {
        name: "description",
        content:
          "Every keyboard warrior obsessed with TEXITcoin gets a shoutout here. Stay mad. Stay irrelevant. And thanks for the free publicity.",
      },
      { property: "og:title", content: "The Troll Index — TEXITcoin" },
      {
        property: "og:description",
        content:
          "We see you. Every sad, keyboard-warrior one of you. The official hall of fame for our most dedicated critics.",
      },
    ],
  }),
  component: TrollsPage,
});

const TROLLS = [
  {
    name: "Disruption Banking",
    url: "https://www.disruptionbanking.com/?s=texitcoin",
    blurb: "Searching the term repeatedly. Bookmark earned.",
  },
  {
    name: "CoinMLS on Medium",
    url: "https://coinmls.medium.com/",
    blurb: "Posting like rent's due. Keep the SEO juice flowing.",
  },
  {
    name: "Troy Dooly",
    url: "https://www.facebook.com/troydooly",
    blurb: "MLM-watcher who can't look away. Hi, Troy.",
  },
  {
    name: "BehindMLM",
    url: "https://behindmlm.com/search-results/?q=texitcoin",
    blurb: "Whole search page dedicated to us. We're flattered.",
  },
  {
    name: "texitscam.com",
    url: "https://texitscam.com/",
    blurb: "Bought the domain and everything. That's commitment.",
  },
];

const TRUTHS = [
  {
    icon: AlertTriangle,
    title: "Risk ≠ Scam",
    body: "Every worthwhile opportunity carries risk — Bitcoin, stocks, starting a business, moving to Texas. Risky doesn't mean fraudulent. Pay attention in econ class.",
  },
  {
    icon: Megaphone,
    title: "Accusation ≠ Conviction",
    body: "There's a massive difference between an accusation, a civil complaint, and an actual criminal charge with conviction. Screaming \"scam\" on the internet doesn't make it true.",
  },
  {
    icon: Flame,
    title: "Hating MLMs ≠ Calling Fraud",
    body: "You might personally hate multi-level marketing, but that doesn't make every MLM a scam. Millions of people participate in legitimate network businesses every year. Also: TEXITcoin isn't an MLM.",
  },
  {
    icon: Skull,
    title: "Bitter ≠ Discerning",
    body: "Most trolls are so jaded they wouldn't recognize a legitimate opportunity if it slapped them in the face. They'd rather stay miserable than admit someone might be building something real.",
  },
  {
    icon: Heart,
    title: "We're Not Replying",
    body: "You don't deserve our time, attention, or respect. Keep screaming into the void — we're too busy actually shipping to care.",
  },
  {
    icon: Trophy,
    title: "We Need You. Kind Of.",
    body: "Like David needs Goliath, Superman needs Lex Luthor, Batman needs the Joker, Rocky needs Apollo Creed — we actually benefit from a little friction. So you do you. We'll keep building.",
  },
];

function TrollsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto inline-flex items-center gap-3 rounded-full border-2 border-primary/40 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary"
            >
              <Skull className="h-4 w-4" />
              Hall of Fame · Population: Cope
              <Skull className="h-4 w-4" />
            </motion.div>

            <h1 className="mt-8 font-display text-6xl font-bold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
              The <span className="text-primary">Troll</span> Index
            </h1>
            <p className="mt-4 font-display text-xl italic text-muted-foreground md:text-2xl">
              A dedicated loser&apos;s club, lovingly curated.
            </p>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
              Ah, the trolls. We see you. Every sad, keyboard-warrior one of
              you. We genuinely appreciate the incredible amount of time and
              energy you waste every single day trying to spread lies, copium,
              and pathetic little hit pieces about TEXITcoin.{" "}
              <span className="text-foreground font-semibold">
                It must be exhausting being this obsessed.
              </span>
            </p>
          </motion.div>

          {/* Stats / vibes row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 grid gap-4 sm:grid-cols-3"
          >
            {[
              { stat: "0", label: "F's given" },
              { stat: "∞", label: "Free publicity received" },
              { stat: "100%", label: "Of trolls still seething" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="font-display text-5xl font-bold text-primary">
                  {s.stat}
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Pull quote */}
        <section className="relative mx-auto mt-24 max-w-4xl px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-primary/40 bg-card p-10 text-center shadow-glow md:p-14"
          >
            <div className="pointer-events-none absolute -left-12 -top-12 font-display text-[14rem] leading-none text-primary/10">
              &ldquo;
            </div>
            <div className="pointer-events-none absolute -right-12 -bottom-24 font-display text-[14rem] leading-none text-primary/10">
              &rdquo;
            </div>
            <p className="relative font-display text-2xl leading-snug md:text-4xl text-balance">
              History doesn&apos;t remember the losers.{" "}
              <span className="text-primary">It remembers who was still standing.</span>
            </p>
            <div className="relative mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              — TEXITcoin, every single day
            </div>
          </motion.blockquote>
        </section>

        {/* The Index */}
        <section className="relative mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Trophy className="h-4 w-4" /> The Index
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Today&apos;s <span className="text-primary">distinguished</span>{" "}
              honorees
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Click through if you&apos;re curious. Just remember to come back —
              they&apos;re really committed to the bit, and it&apos;s honestly
              kind of impressive.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TROLLS.map((t, i) => (
              <motion.a
                key={t.url}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/50 hover:shadow-glow transition"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Skull className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-display text-lg font-bold">
                    {t.name}
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {t.blurb}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* What the trolls don't seem to understand */}
        <section className="relative mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Megaphone className="h-4 w-4" /> A few things, for the record
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              What the trolls{" "}
              <span className="text-primary">don&apos;t seem to understand</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TRUTHS.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-gradient shadow-glow">
                  <t.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{t.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing kicker */}
        <section className="relative mx-auto mt-24 max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14 shadow-card"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-3xl font-bold leading-tight md:text-5xl text-balance">
                We&apos;re going to{" "}
                <span className="text-primary">out-think</span>,{" "}
                <span className="text-primary">out-work</span>, and{" "}
                <span className="text-primary">out-last</span> every one of you.
              </h3>
              <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
                Welcome to the Troll Index — the official hall of fame for our
                most dedicated clowns, schizos, and professional victims. Stay
                mad. Stay irrelevant. And thanks for the free publicity. We
                couldn&apos;t do it without you.{" "}
                <span className="text-foreground font-semibold">
                  There — the first untrue thing we&apos;ve said. Enjoy.
                </span>
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
