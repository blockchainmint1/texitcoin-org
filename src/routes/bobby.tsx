import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Coins,
  Landmark,
  Plane,
  Hammer,
  Globe2,
  Flag,
  Quote as QuoteIcon,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import coinsHero from "@/assets/bobby-story/story-coins-hero.jpg.asset.json";
import silverTubes from "@/assets/bobby-story/story-silver-tubes.jpg.asset.json";
import copperBlanks from "@/assets/bobby-story/story-copper-blanks.jpg.asset.json";
import worldMoneyFair from "@/assets/bobby-story/story-world-money-fair.jpg.asset.json";
import texasTent from "@/assets/bobby-story/story-texas-mint-tent.jpg.asset.json";
import stockyards from "@/assets/bobby-story/story-stockyards.jpg.asset.json";
import bobbyPortrait from "@/assets/bobby/bobby-bobby_1.jpg.asset.json";

export const Route = createFileRoute("/bobby")({
  head: () => ({
    meta: [
      { title: "Bobby Gray — The Personal Story Behind Honest Money" },
      {
        name: "description",
        content:
          "From documentary rabbit holes in 2007 to Congress in 2012, bankruptcy, seven years abroad, and back to Texas — the personal journey behind TEXITcoin.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Bobby Gray — The Personal Story" },
      {
        property: "og:description",
        content:
          "Build it, lose it, rebuild it. Nearly two decades chasing honest money — told straight, including the parts that hurt.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/bobby" }],
  }),
  component: BobbyPage,
});

type Chapter = {
  era: string;
  icon: typeof Coins;
  title: string;
  kicker: string;
  body: string[];
  image?: { src: string; alt: string; caption: string };
  link?: { to: string; label: string };
};

const CHAPTERS: Chapter[] = [
  {
    era: "2007",
    icon: BookOpen,
    title: "The search for meaning",
    kicker: "Two kids, rising costs, and a nagging feeling that the math didn't add up.",
    body: [
      "It started the way a lot of these stories start: with a family that was doing everything it was told to do and still couldn't get ahead. Work hard, do the right thing, prosper. Bobby and Kira Gray — with Ashton and Samantha in tow — couldn't make that equation balance, so they set out to find out why.",
      "What followed was a year of documentary overload and a stack of books. Plenty of problems, very few root causes. Then one answer kept surfacing underneath every other complaint: money itself. Not greed, not politics — the instrument. G. Edward Griffin's The Creature From Jekyll Island supplied the history lesson, and 1913 supplied the date.",
      "Once you see that the unit everything else is measured in can be created at will, you stop arguing about the symptoms. The Grays went looking for whoever was actually working on the money.",
    ],
  },
  {
    era: "2008",
    icon: Coins,
    title: "The Liberty Dollar, and the standard that replaced it",
    kicker: "Learn from the people who got shut down. Then build the version that doesn't.",
    body: [
      "The Liberty Dollar had a decade head start and a real circulating network. The Grays threw in with its regional currency officers — and watched the federal counterfeiting charges land on the founder almost immediately after.",
      "The lesson was surgical: don't imitate the dollar, don't call it a dollar, and don't pretend it's legal tender. Trade it voluntarily, between willing people, on the merits of the metal. That became the American Open Currency Standard.",
      "It needed one thing to prove the point — a nation willing to use it. That fall, a Lakota delegation traveled from Pine Ridge to Washington to withdraw from the Treaty of Fort Laramie. On November 24, 2008, the Grays helped launch the tribe's official currency with the Lakota Crazy Horse one-ounce silver medallion.",
    ],
    image: {
      src: silverTubes.url,
      alt: "Tubes of privately minted silver rounds stacked on a bench",
      caption: "AOCS silver — money you could hold, weigh, and hand to someone",
    },
  },
  {
    era: "2009–2011",
    icon: Globe2,
    title: "An RV, two homeschooled kids, and a coast-to-coast argument",
    kicker: "Making money turned out to be fun, profitable, and wildly educational.",
    body: [
      "They rented an RV and drove the message around the country — rallies, expos, freedom festivals, anywhere people would listen to an argument about weights and measures. In a few months the standard collected dozens of allies: organizations, merchants, candidates.",
      "Along the way came the people who shaped the movement — Ron Paul, Michael Badnarik, Ernie Hancock, Adam Kokesh, Joby Weeks, and many more. There was even an overnight train ride with G. Edward Griffin himself out to Jekyll Island, to stand in the room where the Federal Reserve Act was drafted a century earlier.",
      "Hundreds of thousands of coins got minted for dozens of causes in those years. Money stopped being the root of all evil and started looking like the root of all good.",
    ],
    image: {
      src: copperBlanks.url,
      alt: "Freshly struck copper coin blanks",
      caption: "Copper, silver, gold — the metal was the weapon, never the mission",
    },
  },
  {
    era: "August 2, 2012",
    icon: Landmark,
    title: "\"Leave our money alone.\"",
    kicker: "Ron Paul's final Domestic Monetary Policy hearing, and one line for the record.",
    body: [
      "The invitation was to testify on Parallel Currencies: The Roadmap to Monetary Freedom, before the House Financial Services subcommittee. Everything said would go into the congressional record permanently — which is exactly why the testimony argued against so-called honest-money legislation. Competing currencies don't need a federal permission slip. They need to be left alone.",
      "The line that still gets quoted: no fair challenge can be made between honest men and thieves — with thieves meaning the private central bank and the officials who keep it alive.",
    ],
    image: {
      src: coinsHero.url,
      alt: "Privately minted coins from the American Open Currency Standard era",
      caption: "Six years of coins, and the testimony that put them on the record",
    },
  },
  {
    era: "2013",
    icon: Hammer,
    title: "The mint that broke",
    kicker: "Designing coins and running a mint are not the same skill.",
    body: [
      "At almost exactly the same moment as Congress, the supply chain collapsed. The vendor that struck the coins went out of business, leaving the biggest order in company history with no way to produce it. The team decided to mint it themselves.",
      "They were far better at designing coins than manufacturing them. Six years of work unwound in a matter of months, and it did not unwind quietly — it became the largest story in the precious metals industry that year. Partners, creditors, friends, and family were left holding nothing.",
      "This site does not skip that chapter. The bankruptcy, the filings, the news coverage, and what happened afterward to the companies that picked up the pieces are all published in full.",
    ],
    link: { to: "/philosophy", label: "Read the whole bankruptcy story" },
  },
  {
    era: "2014–2017",
    icon: Plane,
    title: "One suitcase, Thailand, and worldschooling",
    kicker: "By the end of 2013 the conclusion was simple: we can build it — they can't.",
    body: [
      "One-way tickets to Southeast Asia. Indonesia, Malaysia, Singapore, and finally Thailand as home. A low cost of living bought back the one thing the collapse had taken: time and attention for the family.",
      "By late 2014 the work restarted — licensed Frank Frazetta collectibles, then a run of highly detailed miniature silver statues. Atlantis, The Queen's Beasts, The Lost World, Gods of Ancient Egypt. Precious metals as art rather than currency, but the same obsession with making a physical object worth exactly what it weighed.",
      "Then, in 2017, the Bitcoin Cold Storage Coin — a way to hold a private key the way you'd hold a silver round. Physical custody applied to a digital asset.",
    ],
  },
  {
    era: "2018–2019",
    icon: Globe2,
    title: "Rearden Metals, Singapore, and Berlin",
    kicker: "Trying our hand at coin manufacturing again — this time knowing what we didn't know.",
    body: [
      "Thailand in the rear-view mirror, the family moved to Singapore and stood up a mint again. In early 2019 a last-minute slot opened at the World Money Fair in Berlin: the final red-eye out of Singapore, arriving thirty minutes before the doors opened.",
      "Two products on the table — the Roman Booteen authorized replica collection and Bitcoin Cold Storage Coins. The Booteen series grew into the Trap with the Golden Bait, the Gold Bug, the Witch, and the Seventh Circle of Hell. The Cold Storage Coins started rough and then caught the 2019 crypto turn hard.",
      "Berlin became the annual pilgrimage, usually with a few weeks of trains through Switzerland and Czechia bolted onto the front.",
    ],
    image: {
      src: worldMoneyFair.url,
      alt: "The mint floor with presses and tooling",
      caption: "Back on the floor — presses, dies, and a second attempt at manufacturing",
    },
  },
  {
    era: "2021–2022",
    icon: Flag,
    title: "Crossing the return threshold",
    kicker: "Seven years abroad — four in Thailand, three in Singapore — and then home.",
    body: [
      "The family came back to the United States in 2021 and settled in McKinney, Texas. Ashton and Samantha finished their young-adult years in an actual classroom for the first time, rounding out a decidedly unconventional education.",
      "The new mint started out of a commercial tent — through rain, hail, tornado warnings, and Dallas summer heat — before moving into real buildings. Old colleagues from the first shop came back, and this time the crew knew what they were doing.",
      "The honest part of the return: the Grays don't claim hero status. They built something, lost it, and rebuilt it in public, while making good on old debts where they could. That offer never closed.",
    ],
    image: {
      src: texasTent.url,
      alt: "The temporary tent factory in Texas during early production",
      caption: "Six months of production out of a tent in North Texas",
    },
  },
  {
    era: "2024–now",
    icon: Coins,
    title: "The last coin is digital",
    kicker: "Sixteen years of metal led to one conclusion about velocity.",
    body: [
      "Gold and silver will always store value. What they can't do is move at the speed of a digital economy — and the generation that inherits this system doesn't sort its money into tubes. That's the whole argument for TEXITcoin.",
      "Proof of work as production cost. A fixed supply as monetary discipline. Mining capped per individual so ordinary people can participate. Merchants who actually accept it. Every filing, every court date, every bad week published on the site as it happens.",
      "Same mission as 2008. Better tools.",
    ],
    image: {
      src: stockyards.url,
      alt: "The Fort Worth Stockyards water tower against a Texas sky",
      caption: "Back where it started, building the version that scales",
    },
  },
];

function BobbyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
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
                The Personal Story
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
                Build it. Lose it.{" "}
                <span className="text-primary">Build it again.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Most founder bios are a highlight reel. This one isn't. It runs
                from a family going down a rabbit hole in 2007, through a
                congressional hearing, a bankruptcy that made national industry
                headlines, seven years abroad with one suitcase, and back to
                North Texas to do it right.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Nearly two decades of it. Told the way it actually went.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/philosophy"
                  className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
                >
                  Philosophy &amp; Character <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/leadership"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary/60"
                >
                  The track record
                </Link>
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
                  src={bobbyPortrait.url}
                  alt="Bobby Gray, founder of TEXITcoin"
                  loading="eager"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card px-6 py-4 shadow-card">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Chasing honest money since
                </div>
                <div className="font-display text-3xl font-bold text-primary">
                  2007
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chapters */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Chapter by Chapter
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Nineteen years, <span className="text-primary">no edits</span>
            </h2>

            <ol className="mt-16 space-y-16">
              {CHAPTERS.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.05 }}
                  className="relative border-l border-dashed border-primary/30 pl-8 md:pl-12"
                >
                  <div className="absolute -left-6 top-0 grid h-12 w-12 place-items-center rounded-full bg-red-gradient text-primary-foreground shadow-glow">
                    <c.icon className="h-5 w-5" />
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                    {c.era}
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold leading-snug md:text-4xl text-balance">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-display text-lg text-primary/90">
                    {c.kicker}
                  </p>

                  <div className="mt-5 space-y-4 text-muted-foreground">
                    {c.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>

                  {c.image ? (
                    <figure className="mt-7 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                      <img
                        src={c.image.src}
                        alt={c.image.alt}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                      <figcaption className="border-t border-border px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {c.image.caption}
                      </figcaption>
                    </figure>
                  ) : null}

                  {c.link ? (
                    <Link
                      to={c.link.to}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                      {c.link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pull quote */}
        <section className="border-y border-border bg-card/40 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <QuoteIcon className="h-10 w-10 text-primary/30" aria-hidden />
            <blockquote className="mt-6">
              <p className="font-display text-2xl leading-snug md:text-4xl text-balance">
                "Any man whose errors take ten years to correct is quite a man."
              </p>
              <footer className="mt-5 text-sm uppercase tracking-[0.22em] text-muted-foreground">
                — J. Robert Oppenheimer
              </footer>
            </blockquote>
            <p className="mt-8 max-w-2xl text-muted-foreground">
              It took longer than ten years. The correction is TEXITcoin, and
              this time the ledger is public from day one.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Judge the man, then judge the{" "}
              <span className="text-primary">money</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              The failures are published. The court docket is published. The
              supply schedule is published. Read all of it, then decide.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/philosophy"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                Philosophy &amp; Character <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/legal"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary/60"
              >
                The legal docket
              </Link>
              <Link
                to="/whitepaper"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary/60"
              >
                Read the whitepaper
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
