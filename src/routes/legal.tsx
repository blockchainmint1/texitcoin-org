import { createFileRoute, Link } from "@tanstack/react-router";
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

const TLDR = [
  "Texas SOAH hearing is scheduled for August 17–20, 2026",
  "Mining Packages are not available in Texas until the Cease & Desist is lifted",
  "Avi Perry from Quinn Emanuel leads our legal team",
  "$973,000+ out of pocket so far on legal costs (and climbing)",
  "TEXITcoin network remains active — no disruption in service to community",
];

type Entry = {
  date: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
  tone?: "win" | "filing" | "context" | "regulator";
  tag?: string;
};

const ENTRIES: Entry[] = [
  {
    date: "6 Apr 2026",
    title: "Formal Answer Filed — Full Denial of All Allegations",
    tone: "filing",
    tag: "GLOVES OFF",
    body: "We filed our official Answer to the TSSB's Notice of Hearing in SOAH Docket No. 312-26-14427, categorically denying every allegation in the Emergency Cease and Desist Order. Mining Packages aren't investment contracts under Howey. The TSSB does not even claim TEXITcoin itself is a security. Fraud allegations are legally and factually deficient — no specific false statements, no duty to disclose shown, zero allegation of misappropriated funds, no investor losses. This Answer lays the foundation for our Motion for Summary Adjudication and our defense at the August hearing.",
    link: {
      label: "Read the full response",
      href: "https://ipfs.blockchainmint.com/ipfs/QmWxa1ZRbifq17rosoHj7GYjUpUv3Td7bGnAaG2hB1UH48",
    },
  },
  {
    date: "25 Mar 2026",
    title: "Hybrid Hearing Ordered — Partial Win on In-Person Request",
    tone: "win",
    tag: "PARTIAL W",
    body: "Administrative Law Judge Katerina DeAngelo granted our motion in part: the four-day merits hearing (Aug 17–20, 2026) will be conducted live at SOAH in Austin, with full in-person attendance for our legal team, witnesses, and community. Remote Zoom attendance still available. Same order also granted pro hac vice for Avi Perry, Alex Rossmiller, and Kurt Wolfe.",
    link: {
      label: "Read the order",
      href: "https://ipfs.blockchainmint.com/ipfs/QmYhSYoEzPvzowwrcXXFjhWhrLy93D5myaq3GvgMiekgDT",
    },
  },
  {
    date: "18 Mar 2026",
    title: "Notice of Hearing",
    tone: "regulator",
    tag: "MARK YOUR CALENDAR",
    body: "Official Notice of Hearing received from the Texas State Securities Board (SOAH Docket No. 312-26-14427). Formally schedules our contested-case hearing on the merits for August 17–20, 2026 starting 9:00 AM CT — to affirm, modify, or set aside the February 11 Emergency Cease and Desist Order.",
    link: {
      label: "Read the Notice",
      href: "https://ipfs.blockchainmint.com/ipfs/QmY5guEqUqgAMJkjuyCyC4GPHoNAghKsdrtRvFdonZkVn1",
    },
  },
  {
    date: "17 Mar 2026",
    title: "New SEC Crypto Guidance — Big Tailwind for Our Defense",
    tone: "win",
    tag: "TAILWIND",
    body: "SEC Interpretive Release No. 33-11412 is a landmark step toward regulatory clarity. It explicitly states that protocol mining on public proof-of-work networks — including pool operations and reward distribution — does not involve the offer and sale of securities under Howey. The TSSB's core premise (shoehorning Mining Packages into unregistered securities based on alleged passive returns) is now at odds with federal standards. Our team is integrating this directly into our hearing prep.",
    link: {
      label: "Read the SEC release",
      href: "https://ipfs.blockchainmint.com/ipfs/QmdKWzWfsft598GddznvVwRy8fZttiVHrokQuDUANBd4Tj",
    },
  },
  {
    date: "16 Mar 2026",
    title: "Hearing Date Secured — Aug 17–20, 2026",
    tone: "filing",
    tag: "GAME ON",
    body: "SOAH issued an Order Scheduling Hearing on the Merits in Docket No. 312-26-14427, setting the contested case hearing for August 17–20, 2026, starting 9:00 AM CT. Though Zoom was offered, we elected to attend in person. This multi-day proceeding gives us the full forum to present evidence, expert testimony, and legal arguments.",
    link: {
      label: "Read the scheduling order",
      href: "https://ipfs.blockchainmint.com/ipfs/QmTLdYZAutr4nQswynGiwKr8qtenn36KSzfQXmFmVUsCpN",
    },
  },
  {
    date: "11 Mar 2026",
    title: "Our Basic Legal Framework",
    tone: "context",
    tag: "RECEIPTS",
    body: "Now that we've consulted counsel and a blockchain/PoW mining specialist, here's the high-level framework: under Howey, our model fails at least two prongs — (1) no promise or guarantee of profits (returns are market-driven and variable based on network performance), and (2) any value in TEXITcoin comes from community usage and real-world adoption, not passive reliance on promoters' efforts. This isn't fraud or passive investment — it's active participation in a decentralized, mineable ecosystem.",
  },
  {
    date: "11 Mar 2026",
    title: "First Expert Selected",
    tone: "filing",
    tag: "BRAIN HIRED",
    body: "We secured our first expert witness — a highly reputable specialist with deep expertise in blockchain, proof-of-work mining operations, mining pools, and the technical and economic realities of cryptocurrency ecosystems. Their job: make these often-confusing concepts clear and evidence-based for the ALJ.",
  },
  {
    date: "25 Feb 2026",
    title: "Keep Moving Forward — No Pivoting",
    tone: "context",
    tag: "STILL TEXAN",
    body: "Honest Money doesn't pivot. We refuse to abandon the U.S.-rooted mission or transform into just another overseas cloud mining project chasing hype. Price doesn't come from hype, influencers, or passive promises — value emerges from usage. Downtown Digital Dollars, fair & festival cashless payments, Layer 2 applications, and active merchant participation are priority #1.",
  },
  {
    date: "24 Feb 2026",
    title: "TSSB Evidence File Secured — and It's Thin",
    tone: "win",
    tag: "THIN FILE",
    body: "With the evidence file in hand and under review by Quinn Emanuel: no allegations of actual investor losses, no demonstration of imminent or ongoing irreparable injury, no claims of misuse or misappropriation, no Ponzi assertions, no specific proof of fraud, no identified injured parties or complainants. The order relies on structural interpretations — not concrete evidence of wrongdoing.",
  },
  {
    date: "21 Feb 2026",
    title: "10-Day Hearing Option Declined; Timeline Strategic",
    tone: "filing",
    tag: "PLAY THE LONG GAME",
    body: "After consulting Avi Perry, we waived the accelerated 10-day hearing option. Avi's call was clear: rushing it would likely lose. Building a winning case requires time for strategy, research, evidence collection, expert witnesses, and comprehensive prep. We're prioritizing a well-prepared, evidence-driven hearing — not a premature setback.",
  },
  {
    date: "20 Feb 2026",
    title: "TSSB Order Challenged; Hearing Requested",
    tone: "filing",
    tag: "PUNCHED BACK",
    body: "Quinn Emanuel formally submitted a hearing request to Deputy Securities Commissioner Cristi Ramón Ochoa. The filing asserts the Mining Packages don't qualify as securities under the Texas Securities Act, that the order's fraud allegations lack specific false statements, and that the order alleges 'immediate and irreparable public harm' without identifying any actual investor losses or injured parties.",
    link: {
      label: "Read the hearing request",
      href: "https://ipfs.blockchainmint.com/ipfs/QmaXHTFwDKvw1jJmTEmJR9VTo3otD3QifCnpXm9X8fRjff",
    },
  },
  {
    date: "16 Feb 2026",
    title: "Quinn Emanuel Retained as Lead Counsel",
    tone: "win",
    tag: "TIGERS HIRED",
    body: "We brought in Quinn Emanuel Urquhart & Sullivan LLP for their unmatched track record in high-stakes securities litigation and crypto enforcement. Leading the team: Partner Avi Perry, co-Chair of QE's Securities Litigation Group and former federal prosecutor who headed the DOJ's Market Integrity and Major Frauds Unit. Recent wins include dismissals of TSSB orders against digital asset projects (Apertum Foundation) by arguing tokens were not securities, plus landmark wins against the CFTC.",
  },
  {
    date: "13 Feb 2026",
    title: "The Search for Counsel Begins",
    tone: "context",
    tag: "TIGER HUNT",
    body: "We evaluated firms with deep experience in crypto and securities regulatory defense — particularly those who've successfully challenged similar enforcement actions involving Howey Test interpretations and state-level crypto orders (including against the TSSB itself). We wanted tigers, not settlers.",
  },
  {
    date: "12 Feb 2026",
    title: "mineTXC Mining Sales Halted Globally",
    tone: "filing",
    tag: "PAUSE BUTTON",
    body: "Immediately following the TSSB's order, TEXITcoin, MineTXC, and Blockchain Mint halted all new Mining Package sales and recruitment — not only in Texas, but everywhere. The order specifically prohibits offering or selling unregistered securities in or from Texas, but we took a cautious, broad approach until clarity is achieved.",
  },
  {
    date: "11 Feb 2026",
    title: "Texas State Securities Board Issues Cease & Desist",
    tone: "regulator",
    tag: "INCOMING",
    body: "The TSSB issued Emergency Cease and Desist Order No. ENF-26-CDO-1893 against TEXITcoin, MineTXC, Blockchain Mint, and founder Robert J. (Bobby) Gray, alleging the Mining Packages constitute unregistered securities sold through a multi-level marketing structure. For 98 weeks prior, mineTXC operated as a community currency project in Texas without any prior regulatory incidents. We are fully complying while pursuing a robust legal strategy.",
  },
];

const TONE_STYLES: Record<NonNullable<Entry["tone"]>, { label: string; bg: string; icon: typeof Gavel }> = {
  win: { label: "Win", bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: Sparkles },
  filing: { label: "PAINFUL", bg: "bg-primary/15 text-primary border-primary/30", icon: ScrollText },
  context: { label: "Context", bg: "bg-accent/15 text-accent border-accent/30", icon: Shield },
  regulator: { label: "Regulator", bg: "bg-amber-500/15 text-amber-300 border-amber-500/30", icon: Gavel },
};

function LegalPage() {
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
                {TLDR.map((item) => (
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
        <section className="relative mx-auto mt-24 max-w-5xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <ScrollText className="h-4 w-4" /> The full chronology
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Every <span className="text-primary">filing</span>, every{" "}
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
                    {e.link && (
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
                  </div>
                </motion.li>
              );
            })}
          </ol>

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
