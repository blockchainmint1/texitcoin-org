import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  ShieldAlert,
  Repeat,
  Wallet,
  Zap,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Live wTXC ERC-20 contract on Ethereum mainnet.
// Etherscan: https://etherscan.io/token/0x9FC65df3997073B8551Ffd617154B5102fACbb88
const WTXC_CONTRACT = "0x9FC65df3997073B8551Ffd617154B5102fACbb88";
const UNISWAP_SWAP_URL = `https://app.uniswap.org/#/swap?outputCurrency=${WTXC_CONTRACT}&theme=dark`;
const ETHERSCAN_URL = `https://etherscan.io/token/${WTXC_CONTRACT}`;

export const Route = createFileRoute("/wtxc")({
  head: () => ({
    meta: [
      { title: "Wrapped TEXITcoin (wTXC) — TXC on Ethereum" },
      { name: "description", content: "Wrapped TEXITcoin (wTXC) brings TXC to Ethereum as an ERC-20 token — unlocking Uniswap, DeFi, and on-chain composability while staying 1:1 redeemable for native TXC." },
      { property: "og:title", content: "Wrapped TEXITcoin (wTXC)" },
      { property: "og:description", content: "TXC, wrapped for Ethereum. Trade on Uniswap, plug into DeFi, redeem 1:1 for native TXC." },
      { property: "og:url", content: "https://texitcoin.org/wtxc" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/wtxc" }],
  }),
  component: WtxcPage,
});

const WHY = [
  {
    icon: Layers,
    title: "Reach Ethereum liquidity",
    body: "Native TXC lives on its own Layer 1. Wrapping it as an ERC-20 puts TXC inside the largest smart-contract ecosystem on Earth — Uniswap, aggregators, wallets, and DeFi rails.",
  },
  {
    icon: Repeat,
    title: "1:1 backed, fully redeemable",
    body: "Every wTXC in circulation is backed by one TXC held in custody. Wrap to mint, unwrap to burn. The peg is mechanical, not a promise.",
  },
  {
    icon: Zap,
    title: "Composability unlocked",
    body: "Once TXC is ERC-20, it speaks the language of every DeFi protocol — LPs, lending, vaults, multisigs, and on-chain treasuries.",
  },
  {
    icon: Wallet,
    title: "Familiar tooling",
    body: "Hold wTXC in MetaMask, Rabby, Coinbase Wallet, or any Ethereum wallet you already use. No new app, no new seed phrase.",
  },
];

const FLOW = [
  { n: "01", title: "Deposit native TXC", body: "Send TXC to the bridge address. Custody holds it 1:1." },
  { n: "02", title: "Receive wTXC on Ethereum", body: "An equal amount of wTXC is minted and sent to your ETH address." },
  { n: "03", title: "Trade, LP, or hold", body: "Use wTXC on Uniswap, Aave, or anywhere ERC-20s are accepted." },
  { n: "04", title: "Unwrap any time", body: "Burn your wTXC to redeem native TXC back to your TEXITcoin wallet, 1:1." },
];

function WtxcPage() {
  const hasContract = WTXC_CONTRACT !== "0x0000000000000000000000000000000000000000";

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="container relative mx-auto px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Wrapped TEXITcoin
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                TXC on <span className="text-primary">Ethereum</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                wTXC is wrapped TEXITcoin — a 1:1 backed ERC-20 representation of native TXC. Same coin, new rails.
                Trade it on Uniswap, plug it into DeFi, redeem it whenever you want.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Just want TXC? Start here <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#advanced" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
                  Advanced users: jump to swap <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why */}
        <section className="border-b border-border">
          <div className="container mx-auto px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Why wrap TXC?</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Native TXC is sound money on its own Layer 1. wTXC is the bridge that lets that same money play in every Ethereum-native protocol.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {WHY.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <w.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-bold">{w.title}</h3>
                  <p className="mt-3 text-muted-foreground">{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-5xl">How wrapping works</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              No magic. No fractional reserves. Every wTXC is minted against a native TXC held in custody, and every redemption burns wTXC to release TXC.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {FLOW.map((f, i) => (
                <motion.div
                  key={f.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <span className="font-display text-3xl font-bold text-primary">{f.n}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced users — Uniswap embed */}
        <section id="advanced" className="border-b border-border scroll-mt-24">
          <div className="container mx-auto px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
              <Lock className="h-3 w-3" /> Advanced users only
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Swap wTXC on Uniswap</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              If you already hold ETH or a stablecoin on Ethereum and you know how to use a non-custodial wallet, you can swap straight into wTXC below. New to crypto? Start with the <Link to="/buy" className="text-primary hover:underline">buy guide</Link> instead.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5 text-sm text-foreground">
              <div className="flex items-start gap-3">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                <div>
                  <p className="font-semibold">Read this before you click</p>
                  <p className="mt-1 text-muted-foreground">
                    DEX trading is final. Verify the wTXC contract address on Etherscan before swapping. Watch your slippage. Beware of fake "wTXC" tokens that copy our ticker. We never DM you links.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Uniswap embed */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {hasContract ? (
                  <iframe
                    src={UNISWAP_SWAP_URL}
                    height="660"
                    width="100%"
                    title="Uniswap — Swap wTXC"
                    className="block w-full"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer"
                    allow="clipboard-read; clipboard-write; web-share"
                  />
                ) : (
                  <div className="flex h-[660px] flex-col items-center justify-center gap-4 p-8 text-center">
                    <ShieldAlert className="h-10 w-10 text-muted-foreground" />
                    <p className="font-display text-xl font-bold">Uniswap widget — contract pending</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      The embedded Uniswap swap will appear here once the wTXC ERC-20 contract address is confirmed and added to this page.
                    </p>
                    <a
                      href="https://app.uniswap.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                      Open Uniswap <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Side panel */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Token</div>
                  <div className="mt-2 font-display text-2xl font-bold">wTXC</div>
                  <div className="mt-1 text-sm text-muted-foreground">Wrapped TEXITcoin — ERC-20 on Ethereum mainnet</div>
                  <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Contract</div>
                  <code className="mt-1 block break-all rounded-md border border-border bg-background p-2 text-xs">
                    {hasContract ? WTXC_CONTRACT : "Coming soon"}
                  </code>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">
                    Prefer to swap in your own wallet? Open Uniswap directly and import the contract above.
                  </p>
                  <a
                    href={hasContract ? UNISWAP_SWAP_URL : "https://app.uniswap.org/"}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Open in Uniswap <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section>
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Most folks don't need wTXC.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              If you're new here, buy native TXC and self-custody it. Come back to wTXC when you've got a clear reason to bridge.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Buy TXC <ArrowRight className="h-4 w-4" />
              </Link>
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
