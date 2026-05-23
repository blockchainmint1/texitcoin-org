import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/txc-logo.png";
import { LivePrice } from "./LivePrice";

type NavLink = { label: string; href: string; external?: boolean; internal?: boolean };
type NavItem =
  | { label: string; href: string; internal?: boolean }
  | { label: string; children: NavLink[] };

const NAV: NavItem[] = [
  {
    label: "Foundation",
    children: [
      { label: "Whitepaper", href: "/whitepaper", internal: true },
      { label: "Mining (Proof of Work)", href: "/proof-of-work", internal: true },
      { label: "Digital Currency", href: "/currency", internal: true },
      { label: "Community Value", href: "/value", internal: true },
      { label: "Leadership", href: "/leadership", internal: true },
    ],
  },
  {
    label: "Discover",
    children: [
      { label: "Team", href: "/team", internal: true },
      { label: "The Mine", href: "/mine", internal: true },
      { label: "Tokenomics", href: "/tokenomics", internal: true },
      { label: "TXC in the News", href: "/in-the-news", internal: true },
      { label: "TSSB Legal Updates", href: "/legal", internal: true },
      { label: "Troll Index", href: "/trolls", internal: true },
      { label: "Videos & Media", href: "/videos", internal: true },
      { label: "Why Texas", href: "/texas", internal: true },
      { label: "Identity & Press Kit", href: "/press", internal: true },
      { label: "Blog", href: "/blog", internal: true },
      { label: "FAQ", href: "/faq", internal: true },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Block Explorer", href: "https://explorer.texitcoin.org/", external: true },
      { label: "Mempool", href: "https://mempool.texitcoin.org/", external: true },
      { label: "Wallets", href: "/wallets", internal: true },
      { label: "Web Wallet", href: "https://wallet.texitcoin.org/", external: true },
      { label: "Pool", href: "https://pool.texitcoin.org/", external: true },
      { label: "Layer 2 & Tokens", href: "https://tokens.texitcoin.org/", external: true },
      { label: "Build on TXC", href: "/build", internal: true },
      { label: "Gear & Swag", href: "https://shoptxc.com/", external: true },
    ],
  },
  {
    label: "Exchange",
    children: [
      { label: "CoinMarketCap", href: "https://coinmarketcap.com/currencies/texitcoin/", external: true },
      { label: "CoinGecko", href: "https://www.coingecko.com/en/coins/texitcoin", external: true },
      { label: "Bitmart", href: "https://www.bitmart.com/trade/TXC_USDT", external: true },
      { label: "MEXC", href: "https://www.mexc.com/exchange/TXC_USDT", external: true },
      { label: "Dex-Trade", href: "https://dex-trade.com/spot/trading/TXCUSDT", external: true },
      { label: "Pionex.US", href: "https://www.pionex.us/en-US/trade/TXC_USDT", external: true },
      { label: "wTXC on ETH", href: "/wtxc", internal: true },
    ],
  },
  {
    label: "Connect",
    children: [
      { label: "X / Twitter", href: "https://x.com/texitcoin", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@texitcoins", external: true },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61559875176657", external: true },
    ],
  },
];

function NavLinkItem({ item, onClick }: { item: NavLink | { label: string; href: string; internal?: boolean }; onClick?: () => void }) {
  const cls = "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors";
  if ("external" in item && item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  if ("internal" in item && item.internal) {
    return (
      <Link to={item.href} className={cls} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={cls} onClick={onClick}>
      {item.label}
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <a
        href="https://zoom.us/j/95305973167"
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-red-gradient text-primary-foreground"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2 text-center text-xs sm:text-sm font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary-foreground animate-pulse" aria-hidden />
          <span>
            <span className="font-display uppercase tracking-[0.18em] mr-2">Live Thursdays</span>
            Honest Money Hour with Bobby Gray · 7pm Central
          </span>
          <span className="inline-flex items-center gap-1 underline-offset-2 group-hover:underline">
            Join the Zoom <span aria-hidden>→</span>
          </span>
        </div>
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="TEXITcoin logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-wide">
              TEXIT<span className="text-primary">coin</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Honest money · Mined in Texas
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => {
            if ("children" in n) {
              return (
                <div key={n.label} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                    {n.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute right-0 top-full pt-2 w-60">
                    <div className="rounded-lg border border-border bg-background/95 backdrop-blur-xl shadow-card p-2">
                      {n.children.map((c) => (
                        <NavLinkItem key={c.href} item={c} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return "internal" in n && n.internal ? (
              <Link
                key={n.href}
                to={n.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/buy"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
          >
            Get TXC
            <span aria-hidden>→</span>
          </Link>
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => {
              if ("children" in n) {
                const isOpen = openSub === n.label;
                return (
                  <div key={n.label}>
                    <button
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setOpenSub(isOpen ? null : n.label)}
                    >
                      {n.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="ml-3 border-l border-border pl-2 py-1">
                        {n.children.map((c) => (
                          <NavLinkItem key={c.href} item={c} onClick={() => setOpen(false)} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLinkItem key={n.label} item={n} onClick={() => setOpen(false)} />
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
