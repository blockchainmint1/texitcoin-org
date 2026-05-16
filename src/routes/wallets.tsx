import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Coins,
  Shield,
  Zap,
  Download,
  ArrowUpRight,
  Sparkles,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import coldStorageCoin from "@/assets/cold-storage-coin.jpg";

export const Route = createFileRoute("/wallets")({
  head: () => ({
    meta: [
      { title: "TEXITcoin Wallets — Web, Mobile & Cold Storage" },
      {
        name: "description",
        content:
          "Pick your TXC wallet. The TEXITcoin Web Wallet is the fastest way in — no install, full control. Plus iOS, Android, and the copper Cold Storage Coin.",
      },
      { property: "og:title", content: "TEXITcoin Wallets" },
      {
        property: "og:description",
        content:
          "Web, mobile, and cold storage wallets for TXC. Self-custody, fast, and forged for honest money.",
      },
    ],
  }),
  component: WalletsPage,
});

function WalletsPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Self-custody, your keys
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                TEXITcoin <span className="text-primary">wallets</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Three ways to hold TXC: a lightning-fast web wallet, mobile apps for iOS &
                Android, and a copper cold storage coin. All non-custodial. Always your keys.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Web Wallet — featured */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-8 md:p-12"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground">
                    <Zap className="h-3 w-3" /> Recommended · Best wallet
                  </div>
                  <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
                    The TEXITcoin <span className="text-primary">Web Wallet</span>
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    No app store. No install. No middleman. Open it in your browser and you're
                    seconds away from sending, receiving, and managing TXC — with your keys
                    encrypted in your own browser, never on a server.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Feature icon={Zap} text="Instant access — open & go" />
                    <Feature icon={KeyRound} text="Self-custody, your keys" />
                    <Feature icon={Shield} text="Encrypted client-side" />
                    <Feature icon={RefreshCw} text="Always the latest version" />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="https://wallet.texitcoin.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                    >
                      Open Web Wallet <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link
                      to="/buy"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary transition"
                    >
                      Get TXC first <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                      <div className="ml-3 truncate text-xs text-muted-foreground">
                        wallet.texitcoin.org
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Balance
                      </div>
                      <div className="mt-2 font-display text-4xl font-bold">
                        21,000<span className="text-primary"> TXC</span>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Honest money, in your browser.
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border bg-card p-3 text-center text-xs font-semibold">
                          Send
                        </div>
                        <div className="rounded-lg border border-primary bg-primary/10 p-3 text-center text-xs font-semibold text-primary">
                          Receive
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Wallet */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <Smartphone className="h-3 w-3 text-primary" /> Mobile
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold md:text-5xl">
                  TXC Wallet for <span className="text-primary">iOS & Android</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  TXC in your pocket. Send, receive, back up, restore, and import — all from a
                  clean native app built for everyday use.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Feature icon={ArrowUpRight} text="Send & receive" />
                  <Feature icon={Shield} text="Backup & restore" />
                  <Feature icon={Download} text="Import from coin" />
                  <Feature icon={KeyRound} text="Non-custodial" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://apps.apple.com/us/app/txc-wallet/id6593671361"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition"
                  >
                    Download for iOS <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.txc.wallet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary transition"
                  >
                    Download for Android <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto w-full max-w-sm"
              >
                <div className="relative rounded-[2.5rem] border-8 border-foreground/80 bg-card p-3 shadow-2xl">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-primary/30 via-background to-background p-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      TXC Wallet
                    </div>
                    <div className="mt-3 font-display text-3xl font-bold">5,280 TXC</div>
                    <div className="mt-8 space-y-2">
                      {["Received · 250 TXC", "Sent · 12 TXC", "Received · 1,000 TXC"].map(
                        (r) => (
                          <div
                            key={r}
                            className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2 text-xs"
                          >
                            <span>{r}</span>
                            <ArrowUpRight className="h-3 w-3 text-primary" />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cold Storage */}
        <section className="border-t border-border bg-card/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-2 md:order-1"
              >
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber-900/30 via-background to-background">
                  <img
                    src={coldStorageCoin}
                    alt="TXC Cold Storage Coin — front face"
                    width={1024}
                    height={1024}
                    className="absolute inset-0 h-full w-full object-contain p-8"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <Coins className="h-3 w-3 text-primary" /> Cold Storage
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold md:text-5xl">
                  TXC <span className="text-primary">Cold Storage Coin</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Struck in a heavy ounce of pure copper and laser-etched with your private key,
                  the TEXITcoin Cold Storage Coin holds any amount of TXC — completely offline,
                  completely yours.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-primary">$19.95</span>
                  <span className="text-sm text-muted-foreground">+ shipping</span>
                </div>
                <div className="mt-8">
                  <a
                    href="https://shoptxc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    Order at shoptxc.com <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compare strip */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Which wallet is right for you?
              </h2>
              <p className="mt-3 text-muted-foreground">Quick guide. Pick one — or use all three.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Globe,
                  name: "Web Wallet",
                  best: "Best for everyday use",
                  body: "Fastest setup. Open wallet.texitcoin.org and go.",
                  href: "https://wallet.texitcoin.org/",
                  cta: "Open",
                  highlight: true,
                },
                {
                  icon: Smartphone,
                  name: "Mobile Wallet",
                  best: "Best for on-the-go",
                  body: "Native iOS & Android. Tap to send, scan to receive.",
                  href: "https://apps.apple.com/us/app/txc-wallet/id6593671361",
                  cta: "Download",
                  highlight: false,
                },
                {
                  icon: Coins,
                  name: "Cold Storage Coin",
                  best: "Best for long-term holding",
                  body: "Air-gapped, offline, in pure copper. Built to outlast you.",
                  href: "https://shoptxc.com/",
                  cta: "Order",
                  highlight: false,
                },
              ].map((w) => (
                <a
                  key={w.name}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col rounded-2xl border p-6 transition hover:-translate-y-1 ${
                    w.highlight
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary"
                  }`}
                >
                  <w.icon className="h-8 w-8 text-primary" />
                  <div className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {w.best}
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold">{w.name}</div>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{w.body}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {w.cta} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Feature({ icon: Icon, text }: { icon: typeof Zap; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
