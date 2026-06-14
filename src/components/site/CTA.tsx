import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import honestMoneyMark from "@/assets/honest-money-mark.png";

export function CTA() {
  return (
    <section id="get" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 space-y-10">
        {/* TXC call-to-action */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16 shadow-card">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                <Star className="h-4 w-4 fill-primary" /> Ready when you are
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-balance">
                Honest money is a <span className="text-primary">choice.</span>
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
                Open a wallet, point a miner at the pool, or pick up your first TXC
                on an exchange. Small steps — but they&apos;re yours.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/buy"
                className="group inline-flex items-center justify-between rounded-md bg-red-gradient px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Get TXC now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#ecosystem"
                className="group inline-flex items-center justify-between rounded-md border border-accent/60 px-6 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-accent/10 transition"
              >
                Explore the ecosystem
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Honest Money Ecosystem portal — distinct steel/serif brand */}
        <a
          href="https://honest.money"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-black p-10 md:p-16 transition hover:border-white/30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(180,180,180,0.18), transparent 55%), radial-gradient(circle at 85% 90%, rgba(120,120,120,0.18), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
          }}
        >
          {/* film grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
            {/* Mark */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -m-10 rounded-full blur-3xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(220,220,220,0.25), transparent 60%)",
                  }}
                />
                <img
                  src={honestMoneyMark}
                  alt="Honest Money"
                  width={180}
                  height={180}
                  className="relative h-36 w-auto md:h-44 opacity-90 transition group-hover:opacity-100"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="text-center lg:text-left">
              <p
                className="text-[0.65rem] uppercase tracking-[0.5em] text-white/40"
                style={{ fontFamily: '"Cinzel", ui-serif, Georgia, serif' }}
              >
                Part of the Ecosystem
              </p>
              <h3
                className="mt-4 text-3xl uppercase leading-[0.95] sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: '"Cinzel", ui-serif, Georgia, serif',
                  fontWeight: 700,
                  backgroundImage:
                    "linear-gradient(180deg, #fafafa 0%, #c8c8c8 45%, #6a6a6a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                The Honest Money Ecosystem
              </h3>
              <p className="mx-auto mt-6 max-w-xl text-white/65 md:text-lg lg:mx-0">
                TEXITcoin is one project in a constellation of sound-money work —
                AOCS, Iskander, streamTXC, and more — pursued by Robert J. &ldquo;Bobby&rdquo;
                Gray since 2008. Read the manifesto and meet the family.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span
                  className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-[0.7rem] uppercase tracking-[0.35em] text-white/90 transition group-hover:border-white group-hover:bg-white group-hover:text-black"
                  style={{ fontFamily: '"Cinzel", ui-serif, Georgia, serif', fontWeight: 600 }}
                >
                  Visit honest.money
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
                <a
                  href="https://honest.money/manifesto"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-2 py-3 text-[0.7rem] uppercase tracking-[0.35em] text-white/55 underline-offset-[6px] transition hover:text-white hover:underline"
                  style={{ fontFamily: '"Cinzel", ui-serif, Georgia, serif', fontWeight: 600 }}
                >
                  Read the Manifesto →
                </a>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
