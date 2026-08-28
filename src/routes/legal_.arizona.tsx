import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Scale,
  ScrollText,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LegalTimeline } from "@/components/site/LegalTimeline";
import { CaseDocket } from "@/components/site/CaseDocket";
import { AZ_ENTRIES, getCase } from "@/data/legal-cases";

export const Route = createFileRoute("/legal_/arizona")({
  head: () => ({
    meta: [
      { title: "Arizona Case File — AZCC v. IDMC | TEXITcoin" },
      {
        name: "description",
        content:
          "The Arizona Corporation Commission's temporary cease and desist naming Iskander Digital Mining Cooperative — full order, plain-English breakdown, and running timeline.",
      },
      { property: "og:title", content: "Arizona Case File — AZCC v. IDMC" },
      {
        property: "og:description",
        content:
          "Docket S-21421A-26-0387: what Arizona alleges, who is actually named, and what happens next.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArizonaCasePage,
});

const FACTS = [
  { label: "Regulator", value: "Arizona Corporation Commission, Securities Division" },
  { label: "Docket", value: "S-21421A-26-0387" },
  { label: "Order type", value: "Temporary C&D + Notice of Opportunity for Hearing" },
  { label: "Served", value: "27 August 2026" },
  { label: "Hearing request deadline", value: "20 days from service" },
  { label: "Answer deadline", value: "30 days from service" },
];

const ALLEGED = [
  "IDMC \"Seat on the Rocket Ship\" memberships ($1,000 each, 100 MH of hash power plus one vote) are investment contracts and therefore unregistered securities.",
  "IDMC, Patriot Trading Metals Group and Joseph Jaquint offered or sold those interests in or from Arizona without dealer or salesman registration.",
  "The two-leg affiliate program with twelve compensation tiers is characterized as multi-level marketing where commissions come from new revenue.",
  "Managerial effort — equipment, power, mining operations, accounting and reward distribution — sits with the Board and its committees rather than ordinary members.",
];

const CONTEXT = [
  "TEXITcoin, MineTXC and Blockchain Mint are not respondents in this action.",
  "The order does not allege that TXC or ISK is itself a security.",
  "This is a temporary order and a set of allegations — nothing has been proven or adjudicated.",
  "Every respondent has the right to request a hearing and file an answer; we publish what happens either way.",
];

function ArizonaCasePage() {
  const c = getCase("arizona")!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <section className="relative mx-auto max-w-5xl px-6">
          <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

          <Link
            to="/legal"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to the legal hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mt-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              Arizona case file · Active
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
              AZCC <span className="text-muted-foreground">vs.</span>{" "}
              <span className="text-primary">IDMC</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl text-balance">
              Days after the Texas hearing wrapped, Arizona&apos;s Securities
              Division issued a temporary cease and desist naming Iskander
              Digital Mining Cooperative and two Arizona promoters. Different
              state, different agency, different respondents — so it gets its
              own case file, its own timeline, and the same standard of
              transparency we set in Texas.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-3 rounded-3xl border border-border bg-card p-6 shadow-card sm:grid-cols-2 md:p-8">
            {FACTS.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-background/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {f.label}
                </div>
                <div className="mt-1.5 text-sm font-semibold">{f.value}</div>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-background/50 p-4 sm:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Respondents named
              </div>
              <div className="mt-1.5 text-sm font-semibold">
                {c.respondents.join(" · ")}
              </div>
            </div>
          </div>

          <a
            href="/api/public/ipfs/bafybeibh7lerry3ts5ba4425nk4uknmhyar4pvlsclt5ec2kk62bxwgvsa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
          >
            Read the full order on IPFS <ExternalLink className="h-4 w-4" />
          </a>

          {/* What they allege / what it isn't */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                <Scale className="h-4 w-4" /> What Arizona alleges
              </div>
              <ul className="mt-5 space-y-3">
                {ALLEGED.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-foreground/85">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <CheckCircle2 className="h-4 w-4" /> What this case is not
              </div>
              <ul className="mt-5 space-y-3">
                {CONTEXT.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <ScrollText className="h-4 w-4" /> Arizona chronology
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Every Arizona filing, as it lands.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Newest at the top. Primary documents pinned to IPFS — immutable,
              no edits, no spin.
            </p>
            <LegalTimeline entries={AZ_ENTRIES} />
          </div>

          <CaseDocket activeSlug="arizona" />

          <div className="mt-14 rounded-3xl border border-border bg-card/60 p-8 text-center shadow-card md:p-10">
            <h3 className="font-display text-3xl font-bold md:text-4xl">
              Same playbook, new state.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We published every filing in Texas the day we got it, win or lose.
              Arizona gets the same treatment.
            </p>
            <Link
              to="/legal"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-primary/50"
            >
              See the Texas case file <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
