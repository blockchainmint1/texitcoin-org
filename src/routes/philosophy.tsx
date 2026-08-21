import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Eye,
  FileText,
  Gavel,
  HeartHandshake,
  Hourglass,
  Newspaper,
  PlayCircle,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Philosophy & Character — TEXITcoin" },
      {
        name: "description",
        content:
          "Uncommon results require uncommon integrity. TEXITcoin's core values — character, transparency, honesty — and the public record behind them, including the Mulligan Mint bankruptcy.",
      },
      { property: "og:title", content: "Philosophy & Character — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Character, transparency, honesty — plus the receipts. The full public record of the Mulligan Mint bankruptcy, linked and unedited.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhilosophyPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    tag: "Character",
    title: "You can't make a good deal with a bad person",
    body: "We're all human — imperfect and prone to mistakes. What matters is the relentless commitment to be better today than yesterday. Character isn't good intentions; it's consistent action, especially when nobody's watching.",
  },
  {
    icon: Eye,
    tag: "Transparency",
    title: "Receipts, not reassurances",
    body: "Crypto has earned its reputation for being shady. That's exactly why we put transparency above everything. Real results, real numbers, verifiable proof — so you can check our work instead of taking our word for it.",
  },
  {
    icon: Scale,
    tag: "Honesty",
    title: "We won't sugarcoat it",
    body: "You may not always like what you hear, but you'll always hear the truth. Good news and bad news both ship. Nothing is worse than letting bad information drive our community's decisions.",
  },
  {
    icon: HeartHandshake,
    tag: "Accountability",
    title: "Hold us to it",
    body: "These values are meant to be enforced, not admired. Watch our backs, call out the gaps, and keep us honest. A standard nobody is willing to enforce isn't a standard.",
  },
];

type Receipt = {
  label: string;
  source: string;
  date?: string;
  href: string;
  note: string;
  flag?: string;
};

const NEWS: Receipt[] = [
  {
    label: "Dallas' Most Libertarian Coin-Maker Filed For Bankruptcy Last Week",
    source: "Dallas Observer",
    date: "Sept 2013",
    href: "https://www.dallasobserver.com/uncategorized/mulligan-mint-dallas-most-libertarian-coin-maker-filed-for-bankruptcy-last-week-7112110/",
    note: "Local coverage of the Chapter 11 filing and the alternative-currency medallion business behind it.",
  },
  {
    label: "Lawyer: Texas Separatists Considered Buying Mulligan Mint",
    source: "Wall Street Journal (Bankruptcy Beat)",
    href: "https://www.wsj.com/articles/BL-BANKB-19440",
    note: "Reports a verbal offer for the Dallas plant during the sale process.",
    flag: "Paywalled",
  },
  {
    label: "Lawyer: Texas Separatists Considered Buying Mulligan Mint",
    source: "American Bankruptcy Institute",
    href: "https://www.abi.org/feed-item/lawyer-texas-separatists-considered-buying-mulligan-mint",
    note: "Free mirror of the WSJ item above.",
  },
  {
    label: "Mulligan Mint gone bust",
    source: "CoinsWeekly",
    date: "Oct 8, 2013",
    href: "https://coinsweekly.com/mulligan-mint-gone-bust/",
    note: "European numismatic trade press summary of the collapse.",
  },
  {
    label: "Mulligan Mint Files For Bankruptcy",
    source: "The E-Sylum, Vol. 16 No. 39",
    date: "Sept 22, 2013",
    href: "https://www.coinbooks.org/club_nbs_esylum_v16n39.html",
    note: "Numismatic Bibliomania Society newsletter relaying the filing to the collector community.",
  },
  {
    label: "NTR Metals purchases substantially all assets of Mulligan Mint",
    source: "Jones Day",
    date: "March 2014",
    href: "https://www.jonesday.com/en/practices/experience/2014/03/ntr-metals-purchases-substantially-all-assets-of-mulligan-mint",
    note: "Buyer's counsel confirming the 363 asset sale out of the Chapter 11 case.",
  },
];

const COURT: Receipt[] = [
  {
    label: "In re Mulligan Mint, Inc. — Case No. 3:13-bk-34728",
    source: "U.S. Bankruptcy Court, N.D. Tex. (Dallas) · Judge Stacey G. Jernigan",
    date: "Filed Sept 13, 2013",
    href: "https://www.pacermonitor.com/public/case/1809209/Mulligan_Mint,_Inc",
    note: "The main case docket. Filed as Chapter 11, converted to Chapter 7 on June 16, 2015, claims bar date April 12, 2016, case terminated March 1, 2021.",
    flag: "Docket summary free · filings paywalled",
  },
  {
    label: "Mulligan Mint, Inc. v. Republic Metals Corp. (In re Mulligan Mint), 516 B.R. 407",
    source: "U.S. District Court, N.D. Tex. · Judge Jorge A. Solis",
    date: "Aug 27, 2014",
    href: "https://www.casemine.com/judgement/us/5914e263add7b049348f1152",
    note: "The published opinion. Appeal from the bankruptcy court's denial of a motion to enforce the automatic stay — affirmed.",
  },
  {
    label: "Republic Metals Corporation v. Mulligan Mint, Inc. et al. — 3:13-cv-03001",
    source: "U.S. District Court, N.D. Tex. (via Justia)",
    date: "2013",
    href: "https://law.justia.com/cases/federal/district-courts/texas/txndce/3:2013cv03001/235736/13/",
    note: "The bullion supplier's civil suit. Free full-text docket entry.",
  },
  {
    label: "Mulligan Mint, Inc. et al. v. Republic Metals Corporation — 3:13-cv-05045",
    source: "U.S. District Court, N.D. Tex. (via Justia)",
    date: "2013–2014",
    href: "https://law.justia.com/cases/federal/district-courts/texas/txndce/3:2013cv05045/241508/16/",
    note: "The bankruptcy appeal that produced the 516 B.R. 407 opinion.",
  },
  {
    label: "USCOURTS-txnd-3_13-cv-03001",
    source: "GovInfo (free federal repository)",
    href: "https://www.govinfo.gov/app/details/USCOURTS-txnd-3_13-cv-03001",
    note: "Government-hosted record for the Republic Metals district court case.",
  },
  {
    label: "USCOURTS-txnd-3_13-cv-05045",
    source: "GovInfo (free federal repository)",
    href: "https://www.govinfo.gov/app/details/USCOURTS-txnd-3_13-cv-05045",
    note: "Government-hosted record for the appeal.",
  },
];

const COMMUNITY: Receipt[] = [
  {
    label: "Mulligan mint seized by court order",
    source: "Silver Stackers forum",
    date: "July 31, 2013",
    href: "https://www.silverstackers.com/forums/threads/mulligan-mint-seized-by-court-order.43116/",
    note: "Contemporaneous community thread, six weeks before the bankruptcy petition.",
  },
  {
    label: "Mulligan Mint exposed! what's this mean to orders?",
    source: "Collectors Universe forums",
    date: "Sept 17, 2013",
    href: "https://forums.collectors.com/discussion/898628/mulligan-mint-exposed-whats-this-mean-to-orders",
    note: "Collectors reacting in real time, including the impact on open orders.",
  },
  {
    label: "Mulligan Mint mint catalogue",
    source: "Numista",
    href: "https://en.numista.com/catalogue/mint.php?id=5343",
    note: "Community-maintained catalogue of the medallions the mint actually produced.",
  },
];

const TIMELINE = [
  { year: "2012", text: "Mulligan Mint founded in Dallas, producing one-ounce fine silver medallions for the American Open Currency Standard and the broader sound-money movement." },
  { year: "Jul 2013", text: "Community reports of a court-ordered seizure action surface — roughly six weeks before any bankruptcy filing." },
  { year: "Sep 13, 2013", text: "Chapter 11 petition filed in the Northern District of Texas, Case No. 3:13-bk-34728." },
  { year: "2013–14", text: "Litigation with bullion supplier Republic Metals Corporation across two federal cases, including a fight over the automatic stay." },
  { year: "Aug 27, 2014", text: "District Court affirms the bankruptcy court in a published opinion, 516 B.R. 407." },
  { year: "Mar 2014", text: "NTR Metals, LLC acquires substantially all assets out of the case." },
  { year: "Jun 16, 2015", text: "Case converted from Chapter 11 reorganization to Chapter 7 liquidation." },
  { year: "Mar 1, 2021", text: "Case formally terminated after the claims process ran its course." },
];

function ReceiptList({
  icon: Icon,
  title,
  blurb,
  items,
}: {
  icon: typeof Gavel;
  title: string;
  blurb: string;
  items: Receipt[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{blurb}</p>
      <ul className="mt-6 space-y-3">
        {items.map((r) => (
          <li key={r.href + r.label}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-card p-5 transition hover:border-primary/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold leading-snug group-hover:text-primary transition-colors">
                    {r.label}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.source}
                    {r.date ? ` · ${r.date}` : ""}
                  </div>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.note}</p>
              {r.flag ? (
                <span className="mt-3 inline-block rounded-full border border-dashed border-border px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {r.flag}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhilosophyPage() {
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
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Philosophy &amp; Character
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Uncommon results require{" "}
              <span className="text-primary">uncommon integrity</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              At TEXITcoin, our core values are the bedrock of everything we do. In an
              industry filled with scams, pitfalls, and broken promises, our commitment
              to character, transparency, and honesty isn't a mantra — it's a promise.
              These values guide our actions, our decisions, and the way we lead our
              community of miners.
            </p>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Anyone can print values on a page. The only thing that makes them mean
              anything is what you do when the story gets hard to tell. So this page
              does both: here's what we believe, and here's the full public record —
              including the parts most companies would bury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            The Bedrock
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Four things we don't <span className="text-primary">negotiate on</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-colors hover:border-primary/60"
              >
                <v.icon className="h-6 w-6 text-primary" />
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {v.tag}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold leading-snug">
                  {v.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The hard part */}
      <section className="relative border-t border-border py-24">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            The Test
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Character is what you do <span className="text-primary">after the failure</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every founder worth trusting has a chapter they'd rather not discuss. Ours
            is Mulligan Mint — a Dallas private mint that pressed silver for the
            sound-money movement in 2012 and 2013, and ended up in bankruptcy court in
            the Northern District of Texas.
          </p>
          <p className="mt-4 text-muted-foreground">
            We're not going to spin it, hide it, or wait for someone else to find it.
            It's a matter of public record, so we've collected the record ourselves and
            put it on our own website — the news coverage, the court dockets, the
            published opinion, even the forum threads where customers were angry in real
            time. Read all of it. Then decide.
          </p>
          <p className="mt-4 text-muted-foreground">
            What that experience taught us is baked into how TEXITcoin operates today:
            never take custody of what you can't account for, never let a supply chain
            sit between a promise and the people you made it to, and publish the bad
            news yourself, first, in full. Brutal transparency isn't a marketing angle
            here. It's a scar.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Mulligan Mint
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            What the record <span className="text-primary">actually says</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            The timeline below is drawn strictly from court dockets and published
            reporting — every claim on it is linked in the receipts section that
            follows.
          </p>

          <ol className="mt-12 space-y-6 border-l border-dashed border-primary/30 pl-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span
                  className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-red-gradient"
                  aria-hidden
                />
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {t.year}
                </div>
                <p className="mt-1 text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Receipts */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Receipts
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Every link we could <span className="text-primary">find</span>
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            Some of these are paywalled, some are unflattering, and none of them were
            written by us. That's the point. If you find something about Mulligan Mint
            that isn't on this list, send it to us and we'll add it.
          </p>

          <div className="mt-14 space-y-16">
            <ReceiptList
              icon={Gavel}
              title="Court records"
              blurb="The bankruptcy docket, the related federal litigation, and the one published opinion that came out of it."
              items={COURT}
            />
            <ReceiptList
              icon={Newspaper}
              title="News coverage"
              blurb="Contemporaneous reporting from local press, numismatic trade publications, and the buyer's own counsel."
              items={NEWS}
            />
            <ReceiptList
              icon={Users}
              title="Community record"
              blurb="What customers and collectors were saying at the time, unmoderated by us."
              items={COMMUNITY}
            />
          </div>

          <div className="mt-16 rounded-2xl border border-dashed border-border bg-muted/30 p-8">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-bold">Known gaps</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              We could not locate any SEC enforcement action related to Mulligan Mint.
              Coin World and Numismatic News likely covered the story, but their
              archives are not openly indexed. Full PACER filings require a paid
              account. If you have access to any of it, we'd rather publish it than
              leave the gap.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The Standard
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Let's set a <span className="text-primary">new standard</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            These core values define who we are, and we expect them to be reflected
            throughout our community of miners. We're in this together. Watch our backs,
            hold us accountable, and together we build something grounded in trust,
            integrity, and real results.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Meet the Leadership <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/legal"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
            >
              Open Legal Record
            </Link>
            <Link
              to="/blog/$slug"
              params={{ slug: "our-core-values" }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
            >
              Read: Our Core Values
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
