import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Coins, Landmark, Bitcoin, Lock, Flag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/leadership-hero.jpg";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — TEXITcoin" },
      {
        name: "description",
        content:
          "TEXITcoin is led by Bobby Gray — nearly two decades of building honest, decentralized money. From the American Open Currency Standard to Congressional testimony to TXC.",
      },
      { property: "og:title", content: "Leadership — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Crypto needs principled leadership. Bobby Gray has been in this fight since 2008.",
      },
    ],
  }),
  component: LeadershipPage,
});

const TIMELINE = [
  {
    year: "2008",
    icon: Coins,
    title: "American Open Currency Standard",
    body: "Launched one of the earliest frameworks for private, competing complementary currencies — physical gold, silver, and copper coins that let people trade honestly and bypass broken fiat systems. The seed of everything that followed: a commitment to money that works for producers, not printers.",
  },
  {
    year: "2012",
    icon: Landmark,
    title: "Testifying Before Congress",
    body: "Served as an expert witness before the U.S. House Financial Services Committee's Domestic Monetary Policy Subcommittee on \"Parallel Currencies: The Roadmap to Monetary Freedom.\" Laid out the case for competing currencies, critiqued the failures of centralized money, and showed how everyday people could reclaim financial sovereignty.",
  },
  {
    year: "2012",
    icon: Bitcoin,
    title: "Discovering Bitcoin",
    body: "Brought to life what became the famous physical Bitcoin representation — a tangible bridge between digital crypto and real-world value. It helped normalize Bitcoin early on, giving the fledgling digital currency a physical identity that remains iconic today.",
  },
  {
    year: "2017",
    icon: Lock,
    title: "Bitcoin Cold Storage Coin",
    body: "Developed the original Bitcoin Cold Storage Coin — a secure, offline way to protect crypto assets from hacks and theft. In an era of rising threats, this work helped keep people's money safe and reinforced the core promise of self-custody and sovereignty.",
  },
  {
    year: "2024",
    icon: Flag,
    title: "Introducing TEXITcoin",
    body: "Amid the chaos of an ever-changing political landscape, Bobby encountered the concept of TEXIT — the idea that Texans may someday choose a political future for themselves outside a failing United States. Instead of designing another physical coin, he created TEXITcoin — an alternative to consider for an uncertain future.",
  },
];

function LeadershipPage() {
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
              Leading the Way for Honest Money
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Leadership: the <span className="text-primary">missing piece</span> in crypto
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Crypto promised freedom — decentralized money, no banks, no overlords. But
              without strong, principled leadership, it drifts into speculation,
              centralization, and capture by the very institutions it was meant to
              escape.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              When the original champions of honest, usable money stepped back, a void
              opened — and without a champion, the banks win quietly, turning crypto
              into another tool for control. TEXITcoin refuses to let that happen. We're
              led by someone who's been in this fight longer than most: Bobby Gray,
              founder of TEXITcoin and lifelong advocate for honest, alternative money.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://swap.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Join the Adventure <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/value"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
              >
                Community Value
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
                alt="A Texan looking out at the horizon"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                In the Fight Since
              </div>
              <div className="font-display text-3xl font-bold text-primary">
                2008
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Track Record
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
                A proven track record <span className="text-primary">since 2008</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Bobby Gray has dedicated nearly two decades to building systems that
              empower people with sound, voluntary money — free from inflation,
              manipulation, and government overreach.
            </p>
          </div>

          <div className="relative mt-20">
            {/* Vertical dashed rail */}
            <div
              className="pointer-events-none absolute left-6 top-4 bottom-4 w-px border-l border-dashed border-primary/30 md:left-[7.25rem]"
              aria-hidden
            />

            <ol className="space-y-10 md:space-y-14">
              {TIMELINE.map((t, i) => (
                <motion.li
                  key={`${t.year}-${t.title}`}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative pl-16 md:pl-44"
                >
                  {/* Node */}
                  <div className="absolute left-6 top-6 -translate-x-1/2 md:left-[7.25rem]">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-red-gradient text-primary-foreground shadow-glow">
                      <t.icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Year — oversized display number on the rail */}
                  <div
                    className="pointer-events-none hidden md:block absolute left-0 top-0 w-24 text-right select-none"
                    aria-hidden
                  >
                    <div className="font-display text-6xl font-black leading-none tracking-tight text-foreground/10">
                      {t.year}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                      Milestone {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 md:p-9 shadow-card hover:border-primary/60 transition-colors ${
                      i % 2 === 0 ? "md:translate-x-0" : "md:translate-x-6"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-10 font-display text-[10rem] font-black leading-none tracking-tighter text-primary/[0.06] md:text-[14rem]"
                      aria-hidden
                    >
                      {t.year}
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                      <span className="font-display text-3xl font-black text-primary">
                        {t.year}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Milestone {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-3 md:mt-0 font-display text-2xl font-bold leading-snug md:text-3xl">
                      {t.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-muted-foreground">{t.body}</p>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <p className="mt-16 max-w-3xl text-muted-foreground">
            Bobby lives this mission every day in Texas with his family — building,
            innovating, and fighting for money that's honest, decentralized, and usable.
            He's not a newcomer chasing trends; he's been here since the beginning,
            refusing to compromise.
          </p>
        </div>
      </section>

      {/* Steps Up */}
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Authenticity &amp; Accountability
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            When leadership mattered — <span className="text-primary">Bobby steps up</span>
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            Crypto needs more than code — it needs a voice. Someone to champion
            usability over speculation, community over corporations, and honest promises
            over endless printing. Without that, the dream fades.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Bobby Gray is that champion. He's watched the space evolve, seen the early
            grassroots spirit get co-opted, and now he's rebuilding it with TEXITcoin: a
            fast, low-fee Layer 1 for real transactions, capped mining for individuals,
            community tools like Downtown Digital Dollars and fair.money, and an
            unshakeable focus on people-powered money.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            You want to know how serious we are? Evaluate the man behind it. Bobby isn't
            asking for blind faith — he's asking you to look at the record, hear the
            speeches, and decide if this is the leadership crypto needs to win.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The Fight Continues
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Trust is <span className="text-primary">earned</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The banks and institutions want crypto tamed — regulated, diluted,
            controlled. Honest money threatens that. That's why strong leadership is
            non-negotiable.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Bobby Gray has been leading this charge for over 18 years. Now, with
            TEXITcoin, he's carrying the torch forward — for Texas, for freedom, for all
            of us. If you think he's earned it, join the adventure.
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

function TimelineCard({ t }: { t: (typeof TIMELINE)[number] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-7 shadow-card">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
        {t.year}
      </div>
      <h3 className="mt-2 font-display text-2xl font-bold leading-snug">{t.title}</h3>
      <p className="mt-3 text-muted-foreground">{t.body}</p>
    </div>
  );
}
