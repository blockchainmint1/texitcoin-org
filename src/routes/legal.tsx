import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Scale,
  Shield,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Sparkles,
  ScrollText,
  Swords,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ENTRIES, type Entry } from "@/data/legal-timeline";
import { checkNewContent } from "@/lib/notify.functions";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal & Regulatory — TEXITcoin" },
      {
        name: "description",
        content:
          "TEXITcoin's legal and regulatory hub: the full TSSB case chronology, primary filings, and a deep dive on how the SEC has actually engaged with crypto.",
      },
      { property: "og:title", content: "Legal & Regulatory — TEXITcoin" },
      {
        property: "og:description",
        content:
          "The TSSB case timeline, primary filings, and the bigger regulatory picture — in plain English.",
      },
    ],
  }),

  component: LegalPage,
});

const LEGAL_FEES_API = "/api/public/legal-fees";

/** Announces any legal timeline entry that hasn't hit Telegram yet (once per browser session). */
function useLegalTelegramSync() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("legal-tg-sync")) return;
    sessionStorage.setItem("legal-tg-sync", "1");
    checkNewContent().catch(() => {});
  }, []);
}



function useLegalFees() {
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(LEGAL_FEES_API, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const total = data?.total_usd as number | undefined;
        if (typeof total === "number") {
          const rounded = Math.floor(total / 1000) * 1000;
          setAmount(`$${rounded.toLocaleString("en-US")}+`);
        }
      } catch {
        // silently fail — keep hardcoded fallback
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return amount;
}

function getTLDR(feesAmount: string | null) {
  return [
    "Texas SOAH hearing is scheduled for August 17–20, 2026",
    "Mining Packages are not available in Texas until the Cease & Desist is lifted",
    "Avi Perry from Quinn Emanuel leads our legal team",
    `${feesAmount ?? "$973,000+"} out of pocket so far on legal costs (and climbing)`,
    "TEXITcoin network remains active — no disruption in service to community",
  ];
}


const TONE_STYLES: Record<NonNullable<Entry["tone"]>, { label: string; bg: string; icon: typeof Gavel }> = {
  win: { label: "Win", bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: Sparkles },
  filing: { label: "PAINFUL", bg: "bg-primary/15 text-primary border-primary/30", icon: ScrollText },
  context: { label: "Context", bg: "bg-accent/15 text-accent border-accent/30", icon: Shield },
  regulator: { label: "Regulator", bg: "bg-amber-500/15 text-amber-300 border-amber-500/30", icon: Gavel },
};

function LegalPage() {
  const feesAmount = useLegalFees();
  useLegalTelegramSync();
  const tldr = getTLDR(feesAmount);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6">
          <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute top-32 left-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <Scale className="h-3.5 w-3.5 text-primary" />
                Real-time legal updates · No spin
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                TSSB <span className="text-muted-foreground">vs.</span>{" "}
                <span className="text-primary">TEXITcoin</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
                Transparency as far as attorney-client privilege allows. Every
                filing, every hearing date, every twist in the road — laid out
                in plain English. We&apos;re fighting this on the merits.{" "}
                <span className="text-foreground font-semibold">We got this.</span>
              </p>
            </div>

            {/* Hero gavel/scales emblem */}
            <div className="relative">
              <div className="relative mx-auto aspect-square w-72 rounded-3xl border border-border bg-card p-8 shadow-card">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                <div className="relative grid h-full place-items-center">
                  <div className="text-center">
                    <Scale className="mx-auto h-20 w-20 text-primary" strokeWidth={1.5} />
                    <div className="mt-4 font-display text-2xl font-bold">SOAH Docket</div>
                    <div className="mt-1 text-sm text-muted-foreground">312-26-14427</div>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Calendar className="h-3.5 w-3.5" />
                      Aug 17–20, 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LIVE hearing banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mt-12 overflow-hidden rounded-3xl border border-primary/40 bg-primary/10 p-8 md:p-10 shadow-glow"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                Live now · 17 Aug 2026 · 9:00am CT
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl text-balance">
                Our day in court is <span className="text-primary">today</span> — and you can watch it.
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">
                <p>
                  The SOAH hearing in <strong>TSSB v. TEXITcoin</strong> (Docket 312-26-14427)
                  begins this morning at 9:00am Central and runs through August 20. It is
                  being streamed publicly. No closed doors, no filtered recap — watch the
                  whole thing yourself, live.
                </p>
                <p>
                  This is a big deal. TEXITcoin is the gold standard in transparency: we
                  published every filing, every cost, every setback on this page as it
                  happened, and we&apos;re not about to hide the main event.{" "}
                  <strong>Avi Perry and the Quinn Emanuel team</strong> now get to put on a
                  masterclass in crypto law — on the record, in front of an administrative
                  law judge.
                </p>
                <p>
                  What&apos;s at stake goes past one Texas docket. Regulation by enforcement
                  has been the default posture toward this industry for years: no clear rule,
                  just a lawsuit after the fact. A clean, fully-argued record on whether a
                  mined, proof-of-work currency is a security is exactly how that era ends.
                  We like our case. Come see it.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/watch?v=CRFcQda7RBc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:opacity-90"
                >
                  Watch the hearing live <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-primary/50"
                >
                  Read the case chronology <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>


          {/* TL;DR Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <Swords className="h-4 w-4" />
                TL;DR
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                TSSB case — where things stand right now
              </h2>

              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {tldr.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </section>


        {/* Timeline */}
        <section id="timeline" className="relative mx-auto mt-24 max-w-5xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <ScrollText className="h-4 w-4" /> TSSB case · full chronology
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Every <span className="text-primary">TSSB filing</span>, every{" "}
              <span className="text-primary">hearing</span>, every{" "}
              <span className="text-primary">twist</span>.
            </h2>

            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Newest at the top. Click through to read the actual filings on
              IPFS — pinned, immutable, no edits.
            </p>
          </div>

          <ol className="relative mt-14 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border md:before:left-[27px]">
            {ENTRIES.map((e, i) => {
              const tone = TONE_STYLES[e.tone ?? "filing"];
              const Icon = tone.icon;
              return (
                <motion.li
                  key={`${e.date}-${e.title}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                  className="relative pl-12 md:pl-20"
                >
                  <span
                    className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 ${tone.bg} md:h-14 md:w-14`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </span>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {e.date}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone.bg}`}
                      >
                        {e.tag ?? tone.label}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold leading-snug md:text-2xl">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{e.body}</p>
                    {e.link && !e.link.dead && (
                      <a
                        href={e.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        {e.link.label}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {e.link?.dead && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-muted-foreground line-through">
                          {e.link.label}
                        </span>
                        <a
                          href={e.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 transition hover:bg-amber-500/25 hover:text-amber-200"
                        >
                          {e.link.deadNote}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    {e.secondaryLink && (
                      <a
                        href={e.secondaryLink.href}
                        className="mt-3 block text-sm font-semibold text-primary hover:underline"
                      >
                        {e.secondaryLink.label}
                      </a>
                    )}

                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Featured: SEC & Crypto deep dive */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-16 overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-card via-card to-primary/10 p-8 shadow-card md:p-12"
          >
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  <BookOpen className="h-3.5 w-3.5" />
                  Featured deep dive · Beyond the TSSB
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl text-balance">
                  The SEC didn&apos;t show up for currency.{" "}
                  <span className="text-primary">They showed up for the ICO.</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg text-balance">
                  Want the bigger picture behind the TSSB case? We mapped the
                  full timeline of the SEC&apos;s relationship with crypto —
                  when they actually walked in, what they went after, the
                  Ethereum parallel, and why a Texas-mined, proof-of-work
                  currency like TXC looks nothing like the things securities
                  regulators were built for.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/sec-and-crypto"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Read the deep dive
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <ScrollText className="h-3.5 w-3.5 text-primary" />
                    Primary sources linked throughout
                  </div>
                </div>
              </div>

              <ul className="grid gap-2.5 rounded-2xl border border-border bg-background/50 p-5 text-sm md:p-6">
                {[
                  "Pre-ICO fraud cases (Shavers, Voorhees)",
                  "The 2017 DAO Report & ICO wave",
                  "DeFi, exchanges & staking enforcement",
                  "The Ethereum parallel + DAO rollback",
                  "What &quot;decentralized&quot; & &quot;permissionless&quot; really mean",
                  "Other regulators: FinCEN, OFAC, CFTC, FTC, DOJ",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span
                      className="text-foreground/85"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="mt-16 rounded-3xl border border-border bg-card/60 p-8 text-center shadow-card md:p-10">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> More to come
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Stay tuned. We&apos;ll keep adding.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              No spin, just the facts, our side of the story, and what&apos;s
              coming next. Bookmark this page — or subscribe at the bottom and
              we&apos;ll send updates straight to your inbox.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
