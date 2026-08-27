import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getPostImage } from "@/data/blog-images";
import {
  Scale,
  Landmark,
  Vote,
  Banknote,
  Zap,
  Shield,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Coins,
  ScrollText,
} from "lucide-react";

export const Route = createFileRoute("/texit")({
  head: () => ({
    meta: [
      { title: "TEXIT — Could Texas Really Leave? The Honest Deep Dive" },
      {
        name: "description",
        content:
          "Is Texas independence legally possible, what would it actually take, and is it a good idea? A straight look at the law, the economics, and where honest money fits in — whatever Texans choose.",
      },
      { property: "og:title", content: "TEXIT — Could Texas Really Leave?" },
      {
        property: "og:description",
        content:
          "The law, the ledger, and the hard questions behind Texas independence — plus why TEXITcoin builds honest money for Texas either way.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TexitPage,
});

const LEGAL_POINTS = [
  {
    icon: ScrollText,
    title: "The Constitution never mentions secession",
    body: "There is no exit clause. There is also no clause forbidding it by name. The founding document is simply silent — which is why the argument has never been settled by text alone, only by war, courts, and politics.",
  },
  {
    icon: Scale,
    title: "Texas v. White (1869) is the wall",
    body: "The Supreme Court held that the Union is \"an indestructible Union, composed of indestructible States,\" and that Texas's 1861 ordinance of secession was legally void. Crucially, the Court left one door open: separation could occur \"through revolution, or through consent of the States.\" Unilateral exit is off the table. Negotiated exit is not.",
  },
  {
    icon: Landmark,
    title: "The 1845 annexation myth",
    body: "Texas is often said to have reserved a right to leave, or to split into five states. The five-state provision is real — it's in the 1845 Joint Resolution of Annexation. A reserved right to withdraw is not. It appears nowhere in the resolution or the state constitution.",
  },
  {
    icon: Vote,
    title: "The realistic legal path",
    body: "A constitutional amendment (two-thirds of both houses of Congress plus 38 state legislatures), or an Article V convention, or an act of Congress with negotiated terms that survives judicial review. Each is a very high bar — and each requires the rest of America to agree.",
  },
];

const REQUIREMENTS = [
  {
    icon: Banknote,
    title: "A currency and a central-bank question",
    body: "An independent Texas needs a monetary system on day one. Keep using the dollar (and inherit the Fed's inflation with none of the vote), issue a new Texas currency (and earn credibility from zero), or build on hard, auditable money. This is the question most independence conversations skip — and the one that decides whether ordinary Texans get richer or poorer.",
  },
  {
    icon: Zap,
    title: "The grid is already halfway there",
    body: "ERCOT already runs Texas as its own interconnection, largely outside federal grid jurisdiction. It's the single strongest piece of existing infrastructure sovereignty — and also a reminder of what self-reliance costs when it fails, as Winter Storm Uri showed in 2021.",
  },
  {
    icon: Shield,
    title: "Defense, bases, and hardware",
    body: "Fort Cavazos, Fort Bliss, Lackland, Dyess, NASA Johnson, and Corpus Christi Army Depot are federal installations on Texas soil. Ownership, leaseback, or transfer would be one of the largest and most contentious line items in any negotiation.",
  },
  {
    icon: Globe,
    title: "Borders, trade, and treaties",
    body: "Texas would need its own customs regime, its own trade agreements (USMCA membership is not inherited), port authority at Houston and Corpus Christi, and 1,254 miles of international border with Mexico — plus a new one with the United States.",
  },
  {
    icon: Users,
    title: "Citizenship, benefits, and pensions",
    body: "Social Security, Medicare, VA benefits, federal pensions, and dual citizenship for 31 million people. These are not abstractions — they are the household-level questions that decide referendums.",
  },
  {
    icon: Coins,
    title: "The debt split",
    body: "Any negotiated separation includes a share of the national debt, federal asset valuation, and a settlement schedule. Independence movements worldwide live or die on this arithmetic.",
  },
];

const FOR_POINTS = [
  "Texas alone would rank among the top 10 economies on Earth — roughly $2.7 trillion in GDP, ahead of most G20 nations.",
  "It is the nation's #1 energy producer and its top exporting state for more than two decades running.",
  "It already operates its own power grid, and has a deep-water port complex, a world-class medical center, and a semiconductor corridor.",
  "Self-governance means decisions get made closer to the people they affect — the original American argument.",
  "A 2024 Newsweek/Redfield & Wilton poll found roughly two-thirds of Texas Republicans open to independence; the idea is no longer fringe.",
];

const AGAINST_POINTS = [
  "Texas v. White means there is no lawful unilateral route. Any real path runs through Washington and 38 other state capitals.",
  "Federal spending in Texas — defense, Medicare, Social Security, disaster relief, highways — is enormous and would need replacing or renegotiating.",
  "Trade access, currency stability, and capital markets are not automatic. New nations pay a risk premium, sometimes for decades.",
  "Texas is politically diverse. A referendum that splits the state 55/45 creates a governance problem, not a mandate.",
  "The last attempt ended in the deadliest war in American history. Everyone involved should say the quiet part out loud: the cost of getting this wrong is not theoretical.",
];

const MOVEMENT = [
  {
    year: "1861",
    title: "Texas secedes — and Sam Houston refuses",
    body: "The state convention votes to leave the Union. Governor Sam Houston, who warned the state it would be \"overwhelmed\" and drenched in blood, refuses the Confederate loyalty oath and is removed from office.",
  },
  {
    year: "1869",
    title: "Texas v. White",
    body: "The Supreme Court voids the 1861 ordinance and defines the Union as perpetual — while explicitly preserving \"consent of the States\" as a lawful route to separation.",
  },
  {
    year: "2005",
    title: "The Texas Nationalist Movement organizes",
    body: "TNM becomes the largest and most durable of the modern independence organizations, building a petition and legislative strategy rather than a rhetorical one.",
  },
  {
    year: "2021–2023",
    title: "TEXIT bills reach the Legislature",
    body: "Referendum bills are filed in successive sessions. None reach a floor vote, but they move the conversation from message boards into committee rooms.",
  },
  {
    year: "2024–2026",
    title: "Mainstream polling, mainstream debate",
    body: "Independence polls in the double digits statewide and far higher among Republican primary voters. The state GOP has repeatedly debated referendum planks. Whatever you think of it, it is now a live political question.",
  },
];

function TexitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pt-32 pb-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.35fr_1fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              The political question, answered honestly
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Could Texas actually{" "}
              <span className="text-primary">leave?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              We're not a political organization and we don't tell Texans how to vote. But TEXIT is
              the question hanging over our name, so we're going to treat it the way we treat
              everything else: with receipts, both sides, and no sugarcoating.
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              At the end, we'll tell you exactly where we stand — which is narrower, and more useful, than you might expect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#possible"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                Start with the law <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#stand"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary/60"
              >
                Where we stand
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-border shadow-card">
              <img
                src={getPostImage({ slug: "texit" })}
                alt="Texas landscape"
                loading="eager"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                A live political question
              </div>
              <div className="font-display text-3xl font-bold text-primary">
                Since 1869
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — Is it possible */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Part One</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Is it legally possible?</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            The honest answer: not the way most people imagine, and not unilaterally — but the door
            the Supreme Court left open in 1869 has never been closed.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {LEGAL_POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <p.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 rounded-2xl border-l-4 border-primary bg-muted/40 p-6">
            <p className="text-lg font-semibold italic">
              “There was no place for reconsideration, or revocation, except through revolution, or
              through consent of the States.”
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              — Chief Justice Salmon P. Chase, <em>Texas v. White</em>, 74 U.S. 700 (1869)
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Section 2 — What would it take */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Part Two</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">What would it actually take?</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            A vote is the easy part. Independence is a decade-long project of institutions,
            negotiations, and arithmetic. Here's the real punch list.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {REQUIREMENTS.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <r.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Is it a good idea */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Part Three</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Is it a good idea?</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Reasonable Texans land in different places. Here's the strongest version of each case —
            not the strawman version.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">The case for</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {FOR_POINTS.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                <h3 className="text-xl font-bold">The case against</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {AGAINST_POINTS.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">The record</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            How the question kept coming back
          </h2>
          <div className="mt-10 space-y-8 border-l border-border pl-8">
            {MOVEMENT.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[41px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{m.year}</p>
                <h3 className="mt-1 text-lg font-bold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we stand */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Where we stand</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            We don't know what Texans will choose. We know what money they'll need.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              TEXITcoin is not a secession campaign. We have no plank, no candidate, and no
              prediction. Texas independence is a decision for 31 million Texans and the ballot box
              — not for a mining company with an opinion.
            </p>
            <p>
              What we do have is a narrower conviction. Every scenario on this page — full
              independence, deeper federalism, or absolutely nothing changing at all — runs into the
              same problem: <strong className="text-foreground">the money.</strong> A currency you
              can't audit, issued by people you can't hold accountable, expanded at a rate you don't
              get to vote on, is a slow tax on everyone who works for a living. That's true in a
              republic of Texas and it's true in the United States of America.
            </p>
            <p>
              So we picked the part of the problem we can actually solve. Fixed supply. Proof of
              work. Open ledger. Mined in Texas, on Texas power, by Texans and their neighbors. No
              premine, no hidden treasury, no committee that can print more when it gets
              inconvenient. If you want to check our work, you don't have to trust us —{" "}
              <a
                href="https://explorer.texitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-4"
              >
                the chain is right here
              </a>
              .
            </p>
            <p>
              TEXIT, to us, has always meant an <em>exit from financial tyranny</em> first. Whatever
              Texans decide about their politics, we're going to spend the next decade making sure
              the future of Texas has honest money waiting for it.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/whitepaper"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Read the whitepaper <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/blog/$slug"
              params={{ slug: "texit-our-mission-to-save-america" }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold transition-colors hover:border-primary/50"
            >
              TEXIT: Our Mission to Save America
            </Link>
            <Link
              to="/texas"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold transition-colors hover:border-primary/50"
            >
              Why Texas
            </Link>
          </div>

          <p className="mt-10 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">A note on sources and neutrality.</strong> Legal
            history here is drawn from the U.S. Constitution, the 1845 Joint Resolution of
            Annexation, and <em>Texas v. White</em>, 74 U.S. 700 (1869). Economic figures reference
            publicly reported Texas GDP, export, and energy-production data. Polling references are
            publicly reported survey results and move over time. TEXITcoin is an independent
            monetary project and is not affiliated with the Texas Nationalist Movement or any
            political party or campaign. Nothing here is legal, political, or investment advice.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
