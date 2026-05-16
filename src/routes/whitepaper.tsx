import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileText, ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/whitepaper")({
  head: () => ({
    meta: [
      { title: "The TEXITcoin Whitepaper" },
      {
        name: "description",
        content:
          "Read or download The TEXITcoin Whitepaper — a Satoshi-style technical paper covering the team, tokenomics, ethos, and roadmap of TXC.",
      },
      { property: "og:title", content: "The TEXITcoin Whitepaper" },
      {
        property: "og:description",
        content:
          "A Layer 1 Proof-of-Work currency for an independent Texas. Read the whitepaper.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/whitepaper" }],
  }),
  component: WhitepaperPage,
});

const PDF_URL =
  "https://txc.mypinata.cloud/ipfs/bafkreifm3jo26wlq6fapaq57xqe6oxpfj2xgztum3czqtgze6amtlfqdre";

function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <FileText className="h-3 w-3 text-primary" />
                  Whitepaper · v1.0
                </div>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
                  The TEXITcoin <span className="text-primary">Whitepaper</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  A peer-to-peer Layer 1 currency for an independent Texas. The
                  team, the tokenomics, the ethos, and the roadmap — written
                  the way Satoshi would have wanted: plain, technical, and
                  honest.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={PDF_URL}
                    download="TEXITcoin-Whitepaper.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
                  >
                    Open in new tab <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Pin it to IPFS, mirror it, share it. This document is meant to
                  travel.
                </p>
              </div>

              {/* PDF preview card */}
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-2xl" />
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
                  <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                    texitcoin-whitepaper.pdf
                  </div>
                  <object
                    data={`${PDF_URL}#view=FitH&toolbar=0`}
                    type="application/pdf"
                    className="block h-[640px] w-full bg-white"
                    aria-label="The TEXITcoin Whitepaper preview"
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Inline PDF preview isn't supported in this browser.
                      </p>
                      <a
                        href={PDF_URL}
                        download
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                      >
                        <Download className="h-4 w-4" /> Download instead
                      </a>
                    </div>
                  </object>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's inside */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              What's inside
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Six sections, no marketing fluff. Written for crypto bros, devs,
              and Texans who want the math.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { n: "01", t: "Introduction", b: "Why Bitcoin drifted from peer-to-peer cash, and what TXC fixes." },
                { n: "02", t: "Team", b: "Bobby Gray and the core contributors. Named, public, accountable." },
                { n: "03", t: "Tokenomics", b: "353,396,296 hard cap. 254 starting reward. 695,662-block halving. 0 premine." },
                { n: "04", t: "Ethos", b: "Honest money, against the cantillionaires, built by Texans for everyone." },
                { n: "05", t: "Roadmap", b: "Delivered, in progress, and the long horizon — including the 100M MH/s mine." },
                { n: "06", t: "Conclusion + References", b: "Where it lands, and the shoulders we stand on." },
              ].map((s) => (
                <div
                  key={s.n}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                    Section {s.n}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Read the chain, then read the paper.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The whitepaper documents the system. The blockchain proves it
              works.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/tokenomics"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Tokenomics <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Meet the team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
