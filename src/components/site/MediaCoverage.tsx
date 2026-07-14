import { ExternalLink, Newspaper } from "lucide-react";
import theStreetImg from "@/assets/media/thestreet.jpg.asset.json";
import businessInsiderImg from "@/assets/media/businessinsider.jpg.asset.json";


type Item = {
  url: string;
  title: string;
  source: string;
  date?: string;
  image?: string;
};

const ITEMS: Item[] = [
  {
    url: "https://www.youtube.com/watch?v=1cl6xcDVS9M",
    title: "Bobby Gray — TEXITcoin: The Future of Money in Texas",
    source: "TOKEN2049 Singapore",
    date: "2025",
    image: "https://i.ytimg.com/vi/1cl6xcDVS9M/maxresdefault.jpg",
  },
  {
    url: "https://decrypt.co/230828/texitcoin-launches-txc-usdt-trading-pair-fueling-texas-independenc",
    title: "TEXITcoin Launches $TXC/$USDT Trading Pair, Fueling Texas Independence",
    source: "Decrypt",
    image:
      "https://cdn.decrypt.co/resize/1024/height/512/wp-content/uploads/2024/05/C9A55832-4934-4EEE-8EF8-07E6786138D2_17157670508SdMqe2Pe1-gID_7.jpeg",
  },
  {
    url: "https://apnews.com/press-release/globenewswire-mobile/texitcoin-formally-requests-hearing-to-challenge-texas-cease-and-desist-order-f36985dfaea206f9f8f71a7810831976",
    title:
      "TEXITcoin Formally Requests Hearing to Challenge Texas Cease and Desist Order",
    source: "AP News",
    image:
      "https://dims.apnews.com/dims4/default/295c329/2147483647/strip/true/crop/675x450+12+0/resize/980x653!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F90%2F29%2F4e3c1cc7446089a9101a7bdff4c8%2Fdefaultshareimage-copy.png",
  },
  {
    url: "https://thedefiant.io/news/markets/from-gold-to-code-how-a-background-in-metals-shapes-texitcoin-founders-view-of-crypto-and-money",
    title:
      "From Gold to Code: How a Background in Metals Shapes TEXITcoin Founder's View of Crypto and Money",
    source: "The Defiant",
    image: "https://cdn.thedefiant.io/df792fd3-e141-42d1-8eb7-3ee43eded4dc.jpg",
  },
  {
    url: "https://www.thestreet.com/crypto/newsroom/rebuilding-honest-money-through-community",
    title: "Rebuilding Honest Money Through Community",
    source: "TheStreet",
    image: theStreetImg.url,
  },
  {
    url: "https://markets.businessinsider.com/news/stocks/texitcoin-engages-asia-s-digital-asset-market-through-dat-summit-1035782689",
    title: "TEXITcoin Engages Asia's Digital Asset Market Through DAT Summit",
    source: "Business Insider",
    image: businessInsiderImg.url,
  },

  {
    url: "https://www.fox4news.com/video/1650156",
    title: "Texit Coin, Should We Let Animals Go Extinct? — DZTV",
    source: "FOX 4 News",
    image:
      "https://images.foxtv.com/static-media.fox.com/fmcv3/prod/fts/A-552967/1200/630/dl25h5gwttg3hilm.jpg",
  },
  {
    url: "https://www.wfaa.com/article/news/local/dallas-holiday-parade-balloon-donation-texitcoin-cryptocurrency/287-bb7e1110-980d-433d-b331-ef16a67b20ad",
    title:
      "Dallas Holiday Parade Balloon Donation — TEXITcoin Cryptocurrency",
    source: "WFAA",
    image:
      "https://media.wfaa.com/assets/WFAA/images/7011ba12-6b65-4ca2-b175-ddd38e5003d4/20251204T122446/7011ba12-6b65-4ca2-b175-ddd38e5003d4_1920x1080.jpg",
  },

  {
    url: "https://techbullion.com/scrutiny-is-not-a-scandal-it-is-a-stress-test/",
    title: "Scrutiny Is Not a Scandal. It Is a Stress Test.",
    source: "TechBullion",
    image:
      "https://techbullion.com/wp-content/uploads/2026/02/New-Image-for-TEXIT-Coin.--1000x600.jpg",
  },
  {
    url: "https://cryptonews.net/editorial/technology/its-simply-our-turn-what-happens-when-crypto-projects-grow-up/",
    title: "It's Simply Our Turn: What Happens When Crypto Projects Grow Up",
    source: "CryptoNews",
    image:
      "https://cryptonews.net/upload/article/detail/475/475558221918b1fa7534eba7b6cff384.jpeg",
  },
  {
    url: "https://theblockopedia.com/why-proof-of-work-still-matters/",
    title: "Why Proof of Work Still Matters",
    source: "The Blockopedia",
    image:
      "https://theblockopedia.com/wp-content/uploads/2026/02/Untitled-design-2026-02-26T081848.346.jpg",
  },
  {
    url: "https://techannouncer.com/the-return-of-utility-in-crypto/",
    title: "The Return of Utility in Crypto",
    source: "Tech Announcer",
    image: "https://techannouncer.com/wp-content/uploads/2026/03/image2.jpg",
  },

  {
    url: "https://blockonomi.com/community-currencies-and-the-infrastructure-of-trust/",
    title: "Community Currencies and the Infrastructure of Trust",
    source: "Blockonomi",
    image:
      "https://blockonomi.com/wp-content/uploads/2026/03/press-release-1774436737741-0.jpg",
  },
  {
    url: "https://ambcrypto.com/kelpdao-hack-shows-how-complex-defi-systems-have-become-says-ceo/amp/",
    title:
      "'KelpDAO Hack Shows How Complex DeFi Systems Have Become,' Says CEO",
    source: "AMBCrypto",
    image:
      "https://ambcrypto.com/wp-content/uploads/2026/04/Ritika-17-e1777096755957.jpg",
  },
  {
    url: "https://cryptonews.net/news/defi/32763616/",
    title: "'KelpDAO Hack Shows How Complex DeFi Systems Have Become,' Says CEO",
    source: "CryptoNews",
    image:
      "https://cnews24.ru/uploads/be2/be212499cb87264568ec67bdda7cb4c6c3cfc744.jpg",
  },
  {
    url: "https://www.kucoin.com/news/flash/kelpdao-hack-highlights-growing-complexity-in-defi-systems",
    title: "KelpDAO Hack Highlights Growing Complexity in DeFi Systems",
    source: "KuCoin",
    image:
      "https://assets.staticimg.com/@kudos/runtime/0.6.0/assets/og-ea52b6f9440e857c.jpg",
  },
];

function Fallback({ source }: { source: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.35),transparent_60%)] bg-card">
      <div className="text-center">
        <Newspaper className="mx-auto h-8 w-8 text-primary" />
        <div className="mt-3 font-display text-xl font-bold">{source}</div>
      </div>
    </div>
  );
}

export function MediaCoverage() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              As Seen In
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
              TEXITcoin in the media
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            A running index of press, interviews, and broadcast coverage.
            Click any tile to read the original story.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ITEMS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:border-primary/60 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-card">
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Fallback source={item.source} />
                )}
                <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur">
                  {item.source}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="text-sm font-semibold leading-snug text-foreground line-clamp-3 group-hover:text-primary">
                  {item.title}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.date ?? item.source}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
