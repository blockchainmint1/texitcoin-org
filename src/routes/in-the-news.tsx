import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/in-the-news")({
  head: () => ({
    meta: [
      { title: "TEXITcoin in the News — Press, Coverage & Commentary" },
      {
        name: "description",
        content:
          "Where TEXITcoin is being talked about — from TheStreet and The Defiant to KuCoin, Blockonomi, and beyond. The full press file, in one place.",
      },
      { property: "og:title", content: "TEXITcoin in the News" },
      {
        property: "og:description",
        content:
          "Press, coverage, and commentary on TEXITcoin from across the crypto and mainstream media.",
      },
    ],
  }),
  component: NewsPage,
});

type Article = {
  title: string;
  excerpt: string;
  outlet: string;
  url: string;
  image: string;
  tag?: string;
};

const ARTICLES: Article[] = [
  {
    title: "From Speculation to Substance: Rebuilding Honest Money Through Community",
    excerpt:
      "Crypto must return to honest money: utility, transparency, and community-driven trust over speculation and hype.",
    outlet: "TheStreet",
    url: "https://www.thestreet.com/crypto/newsroom/rebuilding-honest-money-through-community",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-9.webp",
    tag: "Editorial",
  },
  {
    title: "Community Currencies and the Infrastructure of Trust",
    excerpt:
      "Monetary systems rarely begin at a global scale. Money historically emerged locally — through trusted exchange in markets, fairs, and regional trade.",
    outlet: "Blockonomi",
    url: "https://blockonomi.com/community-currencies-and-the-infrastructure-of-trust/",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-7.jpg",
    tag: "Analysis",
  },
  {
    title: "TEXIT Coin Price Prediction 2026: Lone Star Revolution or Liquidity Trap?",
    excerpt:
      "The digital asset landscape is no stranger to niche projects that marry regional identity with blockchain technology.",
    outlet: "KuCoin",
    url: "https://www.kucoin.com/blog/texit-coin-price",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-6.png",
    tag: "Markets",
  },
  {
    title: "The Return of Utility in Crypto",
    excerpt:
      "For much of the past decade, crypto has been measured by charts. Price appreciation, volume, unlock schedules, yield mechanics — and very little real use.",
    outlet: "Tech Announcer",
    url: "https://techannouncer.com/the-return-of-utility-in-crypto/",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-5.jpg",
    tag: "Op-Ed",
  },
  {
    title: "Why Proof of Work Still Matters",
    excerpt:
      "New consensus mechanisms promise efficiency. Token models offer yield. But proof-of-work is still doing the work that nothing else does as well.",
    outlet: "The Blockopedia",
    url: "https://theblockopedia.com/why-proof-of-work-still-matters/",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-4.jpg",
    tag: "Tech",
  },
  {
    title: "It's Simply Our Turn: What Happens When Crypto Projects Grow Up",
    excerpt:
      "Every major crypto network that's reached meaningful scale has faced regulatory scrutiny. It's not a coincidence — it's a pattern.",
    outlet: "Crypto News",
    url: "https://cryptonews.net/editorial/technology/its-simply-our-turn-what-happens-when-crypto-projects-grow-up/",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-3.jpeg",
    tag: "Editorial",
  },
  {
    title: "Scrutiny Is Not a Scandal. It Is a Stress Test.",
    excerpt:
      "The cryptocurrency landscape has matured well beyond its experimental beginnings. What once operated on the fringes of finance now sits firmly in regulatory accountability.",
    outlet: "TechBullion",
    url: "https://techbullion.com/scrutiny-is-not-a-scandal-it-is-a-stress-test/",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-2.jpg",
    tag: "Op-Ed",
  },
  {
    title: "From Gold to Code: How a Background in Metals Shapes TEXITcoin Founder's View of Crypto",
    excerpt:
      "When Bobby Gray talks about cryptocurrency, he rarely begins with technology. He starts with money itself — and more specifically, with gold and silver.",
    outlet: "The Defiant",
    url: "https://thedefiant.io/news/markets/from-gold-to-code-how-a-background-in-metals-shapes-texitcoin-founders-view-of-crypto-and-money",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-1.avif",
    tag: "Profile",
  },
  {
    title: "Texas Grounds Crypto Mining Investment 'Rocket Ship'",
    excerpt:
      "The Texas State Securities Board issued an Emergency Cease and Desist Order against TEXITcoin and founder Robert J. Gray. Read it straight from the source.",
    outlet: "Texas State Securities Board",
    url: "https://www.ssb.texas.gov/news-publications",
    image:
      "https://texitcoin.org/assets/img/thumb/The-Bitcoin-Maximalists-Guide-to-TEXITcoin-thumb.jpg",
    tag: "Regulatory",
  },
  {
    title: "Texit Coin, Should We Let Animals Go Extinct?",
    excerpt:
      "The Dumb Zone crew talks about Texit coin, doing taxes at the beach, Frisco coyotes, and more. Yes, really.",
    outlet: "Fox 4 News",
    url: "https://www.fox4news.com/video/1650156",
    image: "https://texitcoin.org/assets/img/thumb/txc-news-thumb-8.avif",
    tag: "Broadcast",
  },
];

function NewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <Newspaper className="h-3.5 w-3.5 text-primary" />
              Press · Coverage · Commentary
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              TEXITcoin <span className="text-primary">in the news</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
              The full press file. Profiles, op-eds, market analysis, regulatory
              coverage — the good, the skeptical, and the regulators themselves.
              We link to all of it.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <motion.a
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary/60 hover:shadow-glow transition"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 70% 18%), hsl(${(i * 47 + 60) % 360} 80% 32%))`,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="font-display text-2xl font-bold leading-tight text-white drop-shadow-md">
                      {a.outlet}
                    </div>
                  </div>
                  {a.tag && (
                    <div className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">
                      {a.tag}
                    </div>
                  )}
                  <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    {a.outlet}
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug group-hover:text-primary transition">
                    {a.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {a.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read at {a.outlet}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
