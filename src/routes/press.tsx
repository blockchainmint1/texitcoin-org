import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles, ArrowRight, FileText } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "TEXITcoin Press Kit — Logos, Boilerplate & Media Contact" },
      { name: "description", content: "Official TEXITcoin press kit: logos, brand colors, founder bios, project boilerplate, and media contact." },
      { property: "og:title", content: "TEXITcoin Press Kit" },
      { property: "og:description", content: "Logos, boilerplate, bios, and media contact for press, podcasters, and partners." },
      { property: "og:url", content: "https://texitcoin.org/press" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/press" }],
  }),
  component: PressPage,
});

const FACTS = [
  { label: "Ticker", value: "TXC" },
  { label: "Network", value: "Layer 1, Scrypt PoW" },
  { label: "Max supply", value: "353,396,296" },
  { label: "Exchange debut", value: "Dex-Trade, 6/11/24" },
  { label: "Launch price", value: "$0.028" },
  { label: "Headquarters", value: "Texas, USA" },
];

const COLORS = [
  { name: "Texas Red", hex: "#bf0a30" },
  { name: "Lone Star Navy", hex: "#0a2a66" },
  { name: "Capitol Gold", hex: "#f5b700" },
  { name: "Bone White", hex: "#f5f3ee" },
];

function PressPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Press &amp; Media
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                Press <span className="text-primary">kit</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Everything journalists, podcasters, and partners need to cover TEXITcoin accurately.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Boilerplate</h2>
            <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-card p-8 text-muted-foreground">
              <p>
                TEXITcoin (TXC) is a Layer 1 Scrypt Proof-of-Work cryptocurrency mined in Texas. With a hard-capped supply of 353,396,296 coins, no premine, and no team allocation, TXC is built as sound, sovereign money for the digital age. The project draws its identity from the Texan tradition of independence and self-reliance — pairing rigorous monetary principles with a community-first, no-VC ethos. TXC has traded on Bitmart since December 31, 2024.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Quick facts</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.label} className="rounded-xl border border-border bg-background p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.label}</div>
                  <div className="mt-2 font-display text-xl font-bold">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Brand colors</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {COLORS.map((c) => (
                <div key={c.hex} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="h-24" style={{ backgroundColor: c.hex }} />
                  <div className="p-4">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Assets</h2>
            <p className="mt-2 text-muted-foreground">Logos, lockups, and high-res imagery for editorial use.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["Wordmark (SVG)", "Coin mark (PNG)", "Full brand pack (ZIP)"].map((label) => (
                <div key={label} className="flex items-center justify-between rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Download className="h-3.5 w-3.5" /> Coming soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Media inquiries</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">For interviews, quotes, or asset requests, reach the team directly.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="mailto:press@texitcoin.org" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Mail className="h-4 w-4" /> press@texitcoin.org
              </a>
              <Link to="/leadership" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
                Meet leadership <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
