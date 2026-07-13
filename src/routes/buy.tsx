import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wallet, Coins, ArrowRight, ShieldCheck, ExternalLink, Sparkles, CircleCheck, Globe, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SwapTerminal } from "@/components/site/SwapTerminal";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "How to Buy TEXITcoin (TXC) — Step-by-Step" },
      { name: "description", content: "Buy TEXITcoin (TXC) in four steps: pick a wallet, fund it, trade on the right exchange for your region, and self-custody your TXC." },
      { property: "og:title", content: "How to Buy TEXITcoin (TXC)" },
      { property: "og:description", content: "The first-time buyer's guide to TXC. Pick a wallet, fund it, buy on the right exchange, withdraw to self-custody." },
      { property: "og:url", content: "https://texitcoin.org/buy" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/buy" }],
  }),
  component: BuyPage,
});

const CMC_MARKETS_URL = "https://coinmarketcap.com/currencies/texitcoin/#Markets";

const EXCHANGES = {
  pionex: {
    name: "Pionex",
    pair: "TXC/USDC",
    note: "Recommended for US-based buyers. USDC pair, US-friendly compliance.",
    url: "https://www.pionex.us/en-US/trade/TXC.USDC",
  },
  bitmart: {
    name: "Bitmart",
    pair: "TXC/USDT",
    note: "Global liquidity hub. Live since 12/31/24. USDT pair.",
    url: "https://www.bitmart.com/trade/en?symbol=TXC_USDT",
  },
} as const;

type ExchangeKey = keyof typeof EXCHANGES;

const TIPS = [
  "Double-check the ticker — it's TXC.",
  "Always send a tiny test transaction before a large withdrawal.",
  "Back up your seed phrase offline. Never type it into a website.",
  "Beware of impersonators in Telegram and X DMs — we never DM first.",
];

function ExchangeStep() {
  const [region, setRegion] = useState<"us" | "intl" | null>(null);
  const [selected, setSelected] = useState<ExchangeKey>("bitmart");
  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("geo lookup failed");
        const data = (await res.json()) as { country_code?: string };
        if (cancelled) return;
        const isUS = data?.country_code === "US";
        setRegion(isUS ? "us" : "intl");
        setSelected(isUS ? "pionex" : "bitmart");
        setAutoDetected(true);
      } catch {
        if (cancelled) return;
        setRegion("intl");
        setSelected("bitmart");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const ex = EXCHANGES[selected];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-2xl border border-border bg-card p-8"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-4xl font-bold text-primary">02</span>
        <Coins className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold">Create an exchange account</h2>

      {/* Region toggle */}
      <div className="mt-5 inline-flex rounded-full border border-border bg-background p-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setSelected("pionex")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
            selected === "pionex" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MapPin className="h-3.5 w-3.5" /> USA — Pionex
        </button>
        <button
          type="button"
          onClick={() => setSelected("bitmart")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
            selected === "bitmart" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe className="h-3.5 w-3.5" /> International — Bitmart
        </button>
      </div>

      {autoDetected && (
        <p className="mt-3 text-xs text-muted-foreground">
          Auto-selected based on your location ({region === "us" ? "United States" : "outside the US"}). Switch anytime.
        </p>
      )}

      <p className="mt-4 text-muted-foreground">
        Sign up at <span className="font-semibold text-foreground">{ex.name}</span>, complete KYC, and fund your account.
        Buy TXC on the <span className="font-semibold text-foreground">{ex.pair}</span> pair. {ex.note}
      </p>

      <div className="mt-6">
        <a
          href={ex.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Open {ex.name} <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

function BuyPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" /> First-time buyer's guide
                </div>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                  How to buy <span className="text-primary">TEXITcoin</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                  Already got USDC? Swap it right here for native TXC — settled to your wallet in minutes. New to crypto? Follow the four-step guide below.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <SwapTerminal />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Step 01 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-bold text-primary">01</span>
                  <Wallet className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Pick a TEXITcoin wallet</h2>
                <p className="mt-3 text-muted-foreground">
                  Self-custody first. Grab the TEXITcoin Web Wallet for the fastest start — no install, you hold the keys.
                  Mobile (iOS/Android) and the Cold Storage Coin are great for long-term holders.
                </p>
                <div className="mt-6">
                  <Link to="/wallets" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    Browse wallets <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Step 02 — geo-aware */}
              <ExchangeStep />

              {/* Step 03 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-bold text-primary">03</span>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Place your order</h2>
                <p className="mt-3 text-muted-foreground">
                  Market order for speed, limit order for a specific entry. Start with what you're comfortable losing —
                  never more than you can afford. This isn't a meme; it's a movement.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href={CMC_MARKETS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    See other trade pairs <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Step 04 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-bold text-primary">04</span>
                  <ShieldCheck className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Withdraw to your own wallet</h2>
                <p className="mt-3 text-muted-foreground">
                  Not your keys, not your coins. Send your TXC off the exchange to your TEXITcoin wallet address.
                  Send a small test transaction first to confirm the address works.
                </p>
                <div className="mt-6">
                  <Link to="/wallets" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    Get a wallet <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Don't get rug'd</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">A few honest rules that will save you from 99% of the heartache in crypto.</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {TIPS.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-background p-5">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3 w-3" /> For advanced users
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Already in DeFi? Try wTXC.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              wTXC is wrapped TEXITcoin — a 1:1 backed ERC-20 that brings TXC to Ethereum. Trade it on Uniswap, plug it into DeFi, unwrap back to native TXC any time. If you know what a non-custodial wallet is and you've used a DEX before, this one's for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/wtxc" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Learn about wTXC <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to ride?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Grab some TXC and join the Texans building a sound-money future.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={CMC_MARKETS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                See all exchanges <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/wallets" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
                Get a wallet <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
