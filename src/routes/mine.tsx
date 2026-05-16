import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Droplets, Volume2, Leaf, Zap, Coins, ArrowRight, ExternalLink, Mic } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/mine")({
  head: () => ({
    meta: [
      { title: "The Mine — TEXITcoin" },
      {
        name: "description",
        content:
          "Inside the TEXITcoin mine: four Texas sites running Foghashing immersion-cooled BC40s and B48s, merge-mining LTC and DOGE to pay the bills and earn TXC for free.",
      },
      { property: "og:title", content: "The Mine — TEXITcoin" },
      {
        property: "og:description",
        content:
          "McKinney, Mansfield, Victoria, Conroe — immersion-cooled, merge-mined, mined-in-Texas.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/mine" }],
  }),
  component: MinePage,
});

type Site = {
  name: string;
  tag: string;
  headline: string;
  body: string;
};

const SITES: Site[] = [
  {
    name: "McKinney",
    tag: "Site 01 · Origin",
    headline: "Where it all began…on a dirt road in McKinney.",
    body: "The first rack, the first hash, the first lesson. Everything TXC is today started in a dusty corner of McKinney — proof that you don't need a Wall Street balance sheet to mine honest money.",
  },
  {
    name: "Mansfield",
    tag: "Site 02 · The Upgrade",
    headline: "Install the Foghashing B48 upgrade.",
    body: "Mansfield brought the B48 immersion tanks online — denser, quieter, and dramatically more efficient than the first generation. The blueprint for everything that came next.",
  },
  {
    name: "Victoria",
    tag: "Site 03 · The Lesson",
    headline: "Our first BC40 — and our hardest lesson.",
    body: "Victoria was our first deployment of the Foghashing BC40 container. The transformer didn't make it. We did. New transformer is on order, and the lesson — size your power before you size your hash — is baked into every site we build now.",
  },
  {
    name: "Conroe",
    tag: "Site 04 · It Clicks",
    headline: "Two BC40s, and it all started to click.",
    body: "Conroe is where the playbook came together: paired BC40 containers, dialed-in immersion, merge-mining humming, and TXC accruing while LTC and DOGE quietly cover the electric bill.",
  },
];

const VIDEOS = [
  {
    label: "Bobby Gray — Keynote, Bitmain World Digital Mining Summit, Las Vegas 2025",
    href: "https://www.facebook.com/61559875176657/videos/1087067656950212/",
  },
  {
    label: 'Bobby Gray — "Free Trade With All, Alliances With None"',
    href: "https://www.facebook.com/61559875176657/videos/2115945298816777/",
  },
  {
    label: "Bobby Gray — TEXITcoin: The Future of Money in Texas (TOKEN2049 Singapore 2025)",
    href: "https://www.youtube.com/watch?v=1cl6xcDVS9M",
  },
  {
    label: "Foghashing Case Study — Immersion Cooling in 110°F Texas Heat",
    href: "https://foghashing.io/blogs/news/case11",
  },
];

function MinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-20">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-5xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              Four Sites · Mined in Texas
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl text-balance">
              The <span className="text-primary">Mine</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Four operational sites. Foghashing immersion cooling end-to-end.
              Merge-mined Scrypt with Litecoin and Dogecoin paying the electric
              bills — so every TXC we mint is effectively earned for free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/proof-of-work"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Why Proof of Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/buy"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition"
              >
                Get TXC
              </Link>
            </div>
          </div>
        </section>

        {/* SITES */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Four Sites · One Network
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                Built site by site. Lesson by lesson.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {SITES.map((s) => (
                <article
                  key={s.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card hover:border-primary/40 transition"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-primary">
                    {s.tag}
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold">{s.name}, TX</h3>
                  <p className="mt-3 text-lg italic text-foreground/90">
                    "{s.headline}"
                  </p>
                  <p className="mt-4 text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* THE VISION — 35/35 */}
        <section className="relative overflow-hidden border-y border-border">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" />
                The Vision
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl text-balance">
                35 sites. <span className="text-primary">35 megawatts.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                We're building a mine so big the world can't ignore it — and so
                distributed it can't be captured. Thirty-five Texas sites,
                roughly a megawatt each, spread across the state. That's the
                target.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-5xl font-bold text-primary">35</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Sites across Texas
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Geographic decentralization. No single grid event, no single
                  bad actor, no single jurisdiction can take the network down.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-5xl font-bold text-primary">35 MW</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Of honest hashpower
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Enough scale to be taken seriously on the global Scrypt
                  leaderboard — and enough margin to keep merge-mining LTC and
                  DOGE profitable through any market.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-5xl font-bold text-primary">51%</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  The number we make impossible
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  A bigger, more distributed mine is a more trustworthy mine.
                  51% attacks die at the cost-of-attack equation. We're pricing
                  them out.
                </p>
              </div>
            </div>

            <p className="mt-10 max-w-3xl text-muted-foreground">
              Bigger mine = more robust network. More robust network = harder
              money. Harder money = a currency Texans — and the world — can
              actually rely on. That's the whole game.
            </p>
          </div>
        </section>

        {/* MERGE MINING */}
        <section className="border-y border-border bg-card/40">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Coins className="h-3 w-3 text-primary" />
                Merge Mining
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                Litecoin and Doge pay the bills. <span className="text-primary">TXC is free.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Scrypt merge-mining is the unlock. Every hash our Foghashing rigs
                produce simultaneously secures Litecoin, Dogecoin, and TEXITcoin.
                The LTC and DOGE we earn cover power, hardware amortization, and
                operations — and every TXC block reward on top of that lands in
                the network at effectively zero marginal cost.
              </p>
              <p className="mt-4 text-muted-foreground">
                That's how a Texas network competes with industrial-scale farms
                without burning capital: we don't pay for TXC in electricity, we
                earn it as a bonus on work we were already getting paid for.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8">
              <div className="space-y-6">
                {[
                  { label: "Litecoin (LTC)", body: "Primary merge-mined reward. Liquid market, covers operating expenses." },
                  { label: "Dogecoin (DOGE)", body: "Auxiliary merge-mined reward via AuxPoW. Stacks on top of every LTC block." },
                  { label: "TEXITcoin (TXC)", body: "The whole point. Earned on the same hashes — pure margin for the network." },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-red-gradient text-primary-foreground">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold">{row.label}</div>
                      <div className="text-sm text-muted-foreground">{row.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IMMERSION COOLING */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Droplets className="h-3 w-3 text-primary" />
                Immersion Cooling
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                Submerged. Silent. Sustainable.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Every rig in every TXC site is fully submerged in dielectric
                fluid. No screaming fans. No hot-aisle / cold-aisle gymnastics.
                No 95-decibel neighborhood complaints. Just heat-soaked liquid
                moving quietly through a closed loop.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Droplets className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-display text-xl font-bold">How it works</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  ASICs sit fully submerged in a non-conductive dielectric fluid.
                  Heat transfers directly from chip to fluid — orders of magnitude
                  more efficient than pushing air across a heatsink. The warm
                  fluid circulates through a heat exchanger and returns cool.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Volume2 className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-display text-xl font-bold">No noise. No vibration.</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Air-cooled mines are notorious for sustained 85–95 dB noise and
                  low-frequency vibration that travels through soil and structure
                  — neighbors as far as a mile away have filed complaints elsewhere
                  in the country. Immersion is whisper-quiet. You can hold a
                  conversation standing next to a running tank.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Leaf className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-display text-xl font-bold">Better for the grid</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Higher density per square foot, lower PUE, dramatically less
                  water use than evaporative cooling, and waste heat that can be
                  captured and reused. The same hash, with a fraction of the
                  environmental footprint.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-card to-background p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Partner</p>
              <h3 className="mt-2 font-display text-3xl font-bold">
                Foghashing — the world leader in immersion cooling.
              </h3>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                We run Foghashing top to bottom: B-series modular tanks at our
                fixed sites and BC40 turnkey containers for rapid deployment.
                Their gear is the reason we can stand up a new site in days, not
                quarters, and keep it quiet enough to put almost anywhere.
              </p>
              <a
                href="https://foghashing.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition"
              >
                Visit Foghashing
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* WHY POW */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Zap className="h-3 w-3 text-primary" />
              Why Proof of Work
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Mining is how honest money gets made.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Mining is the act of doing measurable, costly work to bring a new
              coin into existence. That cost — real electricity, real hardware,
              real operational discipline — is what backs the money. You can
              print a token in an afternoon. You cannot fake a hash.
            </p>
            <p className="mt-4 text-muted-foreground">
              Proof of Work matters because constraint matters. Issuance tied to
              physics keeps the supply honest in a way governance votes and
              staking yields never can.
            </p>
            <a
              href="https://theblockopedia.com/why-proof-of-work-still-matters/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Read: "Why Proof of Work Still Matters" by Bobby Gray
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* TALKS / VIDEOS */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Mic className="h-3 w-3 text-primary" />
                On The Record
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                Bobby on stage. Bobby on the mic.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                A handful of talks and footage from the road — including Bobby's
                keynote at the 2025 Bitmain World Digital Mining Summit in Las
                Vegas. We're collecting container-mining footage as we find it;
                got something we should know about? Send it our way.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {VIDEOS.map((v) => (
                <li key={v.href}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-muted/50 transition"
                  >
                    <Mic className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="flex-1 text-sm font-medium">{v.label}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              See more in our{" "}
              <Link to="/videos" className="text-primary underline-offset-4 hover:underline">
                Videos &amp; Media library
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Honest money. Mined in Texas.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Four sites and counting. If you want to put hashpower behind TXC
              or just hold the coin the mine produces — start here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/buy"
                className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Get TXC
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/proof-of-work"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition"
              >
                Proof of Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
