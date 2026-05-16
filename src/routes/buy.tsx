import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wallet, Coins, ArrowRight, ShieldCheck, ExternalLink, Sparkles, CircleCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "How to Buy TEXITcoin (TXC) — Step-by-Step" },
      { name: "description", content: "Buy TEXITcoin (TXC) in four steps: pick a wallet, fund it, trade on Bitmart, and self-custody your TXC. A plain-English guide for first-time buyers." },
      { property: "og:title", content: "How to Buy TEXITcoin (TXC)" },
      { property: "og:description", content: "The first-time buyer's guide to TXC. Pick a wallet, fund it, buy on Bitmart, withdraw to self-custody." },
      { property: "og:url", content: "https://texitcoin.org/buy" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/buy" }],
  }),
  component: BuyPage,
});

const STEPS = [
  {
    n: "01",
    title: "Pick a TEXITcoin wallet",
    body: "Self-custody first. Grab the TEXITcoin Web Wallet for the fastest start — no install, you hold the keys. Mobile (iOS/Android) and the Cold Storage Coin are great for long-term holders.",
    cta: { to: "/wallets", label: "Browse wallets" },
    icon: Wallet,
  },
  {
    n: "02",
    title: "Create a Bitmart account",
    body: "TXC trades on Bitmart (live since 12/31/24). Sign up, complete KYC, and fund your account with USDT or BTC. Bitmart is where TXC liquidity lives today.",
    cta: { href: "https://www.bitmart.com/trade/en?symbol=TXC_USDT", label: "Open Bitmart" },
    icon: Coins,
  },
  {
    n: "03",
    title: "Buy TXC on the TXC/USDT pair",
    body: "Place a market order for speed or a limit order if you want a specific entry. Start with what you're comfortable losing — never more than you can afford. This isn't a meme; it's a movement.",
    icon: ArrowRight,
  },
  {
    n: "04",
    title: "Withdraw to your own wallet",
    body: "Not your keys, not your coins. Send your TXC off the exchange to your TEXITcoin wallet address. Send a small test transaction first to confirm the address works.",
    cta: { to: "/wallets", label: "Get a wallet" },
    icon: ShieldCheck,
  },
];

const TIPS = [
  "Double-check the ticker — it's TXC on Bitmart.",
  "Always send a tiny test transaction before a large withdrawal.",
  "Back up your seed phrase offline. Never type it into a website.",
  "Beware of impersonators in Telegram and X DMs — we never DM first.",
];

function BuyPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="container relative mx-auto px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> First-time buyer's guide
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                How to buy <span className="text-primary">TEXITcoin</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Four steps from zero to self-custody. No jargon, no upsell — just the plain path to owning TXC.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto px-6 py-20">
            <div className="grid gap-6 md:grid-cols-2">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-4xl font-bold text-primary">{s.n}</span>
                    <s.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.body}</p>
                  {s.cta && (
                    <div className="mt-6">
                      {"href" in s.cta ? (
                        <a href={s.cta.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                          {s.cta.label} <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link to={s.cta.to} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                          {s.cta.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Don't get rugged</h2>
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

        <section>
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to ride?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Open Bitmart, grab some TXC, and join the Texans building a sound-money future.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://www.bitmart.com/trade/en?symbol=TXC_USDT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Buy TXC on Bitmart <ExternalLink className="h-4 w-4" />
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
