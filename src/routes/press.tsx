import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles, ArrowRight, FileText, Type } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import coinMark from "@/assets/mineTXC_icon.png";

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
  { name: "TEXIT Red", hex: "#be1f24", cmyk: "15, 100, 100, 10" },
  { name: "TEXIT Blue", hex: "#262262", cmyk: "100, 100, 25, 25" },
  { name: "TEXIT Black", hex: "#130c0e", cmyk: "20, 20, 20, 100" },
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
                TEXITcoin (TXC) is a Layer 1 Scrypt Proof-of-Work cryptocurrency mined in Texas. With a hard-capped supply of 353,396,296 coins, no premine, and no team allocation, TXC is built as sound, sovereign money for the digital age. The project draws its identity from the Texan tradition of independence and self-reliance — pairing rigorous monetary principles with a community-first, no-VC ethos. TXC first listed publicly on Dex-Trade on June 11, 2024, and later added a Bitmart listing on December 31, 2024.
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
            <p className="mt-2 text-muted-foreground">Primary palette from the official TEXIT Coin brand guidelines.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {COLORS.map((c) => (
                <div key={c.hex} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="h-28" style={{ backgroundColor: c.hex }} />
                  <div className="p-4">
                    <div className="font-semibold">{c.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">HEX {c.hex.toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">CMYK {c.cmyk}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Typeface</h2>
            <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-border bg-background p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Type className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Official typeface</div>
                  <div className="font-display text-3xl font-bold">Open Sans</div>
                  <div className="text-sm text-muted-foreground">Regular · Semibold · Bold · ExtraBold (+ italics)</div>
                </div>
              </div>
              <a
                href="https://fonts.google.com/specimen/Open+Sans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                Get Open Sans <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl font-bold">Assets</h2>
            <p className="mt-2 text-muted-foreground">Logos, lockups, and high-res imagery for editorial use.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-6">
                <div className="flex h-32 w-full items-center justify-center rounded-lg bg-card">
                  <img src={coinMark} alt="TEXITcoin coin mark" className="h-20 w-20" />
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Coin mark (PNG)</span>
                  </div>
                  <a href={coinMark} download className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-primary hover:opacity-80">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-6">
                <div className="flex h-32 w-full items-center justify-center rounded-lg bg-card text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Preview pending
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Wordmark (SVG)</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Download className="h-3.5 w-3.5" /> Soon
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-6">
                <div className="flex h-32 w-full flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-card text-center">
                  <FileText className="h-10 w-10 text-primary" />
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Brand Identity Guidelines</div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Brand guidelines (PDF)</span>
                  </div>
                  <a
                    href="/TEXIT_Brand_Identity_Guidelines.pdf"
                    download
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-primary hover:opacity-80"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Media inquiries</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">For interviews, quotes, or asset requests, reach the team directly.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="mailto:press@texitcoin.org" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Mail className="h-4 w-4" /> <span>press@texitcoin.org</span>
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
