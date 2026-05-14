import logo from "@/assets/txc-logo.png";

const COLS = [
  {
    title: "Discover",
    links: ["News & Updates", "Legal News", "TXC in the News"],
  },
  {
    title: "Resources",
    links: ["Block Explorer", "Mempool", "Wallets", "Web Wallet", "Pool"],
  },
  {
    title: "Exchanges",
    links: ["CoinMarketCap", "CoinGecko", "Bitmart", "MEXC", "Dex-Trade"],
  },
  {
    title: "Connect",
    links: ["X / Twitter", "TikTok", "Facebook"],
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
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition"
                      >
                        {l}
                      </a>
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
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
