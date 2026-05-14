import { Link } from "@tanstack/react-router";
import logo from "@/assets/txc-logo.png";

type FooterLink = { label: string; href: string; internal?: boolean };

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Discover",
    links: [
      { label: "News & Updates", href: "/blog", internal: true },
      { label: "Currency", href: "/currency", internal: true },
      { label: "Proof of Work", href: "/proof-of-work", internal: true },
      { label: "Leadership", href: "/leadership", internal: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Block Explorer", href: "https://explorer.texitcoin.org/" },
      { label: "Mempool", href: "https://mempool.texitcoin.org/" },
      { label: "Wallets", href: "https://texitcoin.org/wallets.html" },
      { label: "Web Wallet", href: "https://wallet.texitcoin.org/" },
      { label: "Pool", href: "https://pool.texitcoin.org/" },
    ],
  },
  {
    title: "Exchanges",
    links: [
      { label: "CoinMarketCap", href: "https://coinmarketcap.com/currencies/texitcoin/" },
      { label: "CoinGecko", href: "https://www.coingecko.com/en/coins/texitcoin" },
      { label: "Bitmart", href: "https://www.bitmart.com/trade/TXC_USDT" },
      { label: "MEXC", href: "https://www.mexc.com/exchange/TXC_USDT" },
      { label: "Dex-Trade", href: "https://dex-trade.com/spot/trading/TXCUSDT" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X / Twitter", href: "https://x.com/texitcoin" },
      { label: "TikTok", href: "https://www.tiktok.com/@texitcoins" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61559875176657" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/30 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="TEXITcoin logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div className="font-display text-2xl font-bold">
                TEXIT<span className="text-primary">coin</span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              A Layer 1 digital currency built on proof-of-work — fast, fair,
              and forged in Texas for an open marketplace.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.internal ? (
                        <Link
                          to={l.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} TEXITcoin. Digital · Decentralized · Peer-to-peer. · Part of the{" "}
            <a
              href="https://honest.money"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition"
            >
              honest.money
            </a>{" "}
            ecosystem.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/disclosures" className="hover:text-foreground">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

