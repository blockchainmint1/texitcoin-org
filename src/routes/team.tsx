import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — TEXITcoin" },
      {
        name: "description",
        content:
          "The people behind TEXITcoin. Public, named, and accountable — nearly two decades of experience in honest money.",
      },
      { property: "og:title", content: "The TEXITcoin Team" },
      {
        property: "og:description",
        content:
          "Meet the contributors building TXC — Bobby Gray and the core team.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/team" }],
  }),
  component: TeamPage,
});

type Member = {
  name: string;
  role: string;
  bio: string;
};

const FOUNDER: Member = {
  name: "Bobby Gray",
  role: "Founder",
  bio: "Founded the American Open Currency Standard in 2008. Created the original physical Bitcoin coin in 2012, testified before Congress on parallel currencies the same year, and launched Bitcoin Cold Storage Coins in 2017. Now bringing nearly two decades of honest-money experience to TXC.",
};

const TEAM: Member[] = [
  {
    name: "Bohdan Shlikhutka",
    role: "Application Architect",
    bio: "Lead on wallet, explorer, and pool infrastructure. The plumbing that makes TXC usable, day in and day out.",
  },
  {
    name: "Vitalii Ovodenko",
    role: "Network Security",
    bio: "Node operations, hardening, and incident response. The reason the chain stays standing.",
  },
  {
    name: "Eddie Allen",
    role: "Currency Director",
    bio: "Merchant adoption and complementary-currency operations. Turning TXC into something you can actually spend.",
  },
  {
    name: "Kira Gray",
    role: "Events",
    bio: "Conferences, the weekly Honest Money Hour, and the community programming that turns holders into believers.",
  },
  {
    name: "Wit Olszewski",
    role: "Creative",
    bio: "Brand, content, and storytelling. Makes sure the work doesn't look like every other crypto project.",
  },
];

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="grid h-20 w-20 place-items-center rounded-full bg-red-gradient font-display text-2xl font-bold text-primary-foreground shadow-glow">
      {initials}
    </div>
  );
}

function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Users className="h-3 w-3 text-primary" />
                Public · Named · Accountable
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
                The team behind <span className="text-primary">TEXITcoin</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Crypto has a pseudonymity problem. TXC doesn't. The people
                building this project are real, reachable, and have been
                fighting for honest money for nearly two decades.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder spotlight */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              The Founder
            </div>
            <div className="mt-6 flex flex-col gap-8 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-start md:p-10">
              <Initials name={FOUNDER.name} />
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  {FOUNDER.name}
                </h2>
                <div className="mt-1 text-sm uppercase tracking-[0.22em] text-primary">
                  {FOUNDER.role}
                </div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  {FOUNDER.bio}
                </p>
                <Link
                  to="/leadership"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Full leadership story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core team */}
        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Core Contributors
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
                  The people who ship
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground">
                Wallets, explorers, security, merchant networks, events, and
                story. Each contributor owns their corner.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-2xl border border-border bg-background p-6 hover:border-primary/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Initials name={m.name} />
                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight">
                        {m.name}
                      </h3>
                      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-primary">
                        {m.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">{m.bio}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-12 text-sm text-muted-foreground">
              More names dropping soon. This roster grows as the mine grows.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Want the full story?
            </h2>
            <p className="mt-4 text-muted-foreground">
              The whitepaper covers the team, tokenomics, ethos, and roadmap in
              one document.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/whitepaper"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Read the whitepaper <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/leadership"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Leadership <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
