import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Crosshair, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CoinCaseStudy } from "@/components/site/CoinCaseStudy";
import { TxcPriceChart } from "@/components/site/TxcPriceChart";
import { listHitList, getHitListCoin, getTxcSnapshot } from "@/lib/market.functions";

const FEATURED_SLUG = "dash";

const hitListQuery = queryOptions({
  queryKey: ["hit-list"],
  queryFn: () => listHitList(),
  staleTime: 60_000,
});

const featuredCoinQuery = queryOptions({
  queryKey: ["hit-list-coin", FEATURED_SLUG],
  queryFn: () => getHitListCoin({ data: { slug: FEATURED_SLUG } }),
  staleTime: 60_000,
});

const txcSnapshotQuery = queryOptions({
  queryKey: ["txc-snapshot"],
  queryFn: () => getTxcSnapshot(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/market")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(hitListQuery),
      context.queryClient.ensureQueryData(featuredCoinQuery),
    ]);
  },
  head: () => ({
    meta: [
      { title: "The Hit List — TEXITcoin Market" },
      {
        name: "description",
        content:
          "TEXITcoin's live market stats, key milestones, and our honest evaluation of the CMC Top 100 — the coins we're measuring ourselves against, and the ones just coasting on 2023 momentum.",
      },
      { property: "og:title", content: "The Hit List — TEXITcoin Market" },
      {
        property: "og:description",
        content:
          "Should TXC be a Top 100 coin? We're going through every coin on CoinMarketCap's Top 100 and asking who earned it, who's coasting, and who's a leftover.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://texitcoin.org/market" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/market" }],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div />,
  component: MarketPage,
});

const MILESTONES: { date: string; label: string; detail: string }[] = [
  { date: "Jan 26, 2024", label: "Genesis block", detail: "First TEXITcoin block mined in McKinney, Texas. Fair-launch, proof-of-work, no premine." },
  { date: "Jul 18, 2024", label: "First public presentation", detail: "Bobby Gray unveils TEXITcoin to the world — the honest-money thesis goes public." },
  { date: "Aug 20, 2024", label: "CoinMarketCap debut", detail: "TXC lists on CoinMarketCap — the first place new investors look. We show up in screeners, tickers, and third-party tools worldwide." },
  { date: "May 27, 2025", label: "WDMS 2025 — global stage", detail: "TXC takes the stage at Bitmain's World Digital Mining Summit in front of the international mining industry." },
  { date: "Feb 11, 2026", label: "Regulatory challenge", detail: "Texas State Securities Board issues an emergency cease and desist. We cooperate, we defend, we keep building." },
  { date: "Mar 26, 2026", label: "Season 3 begins", detail: "Two years in. The team, the network, and the mission enter their most focused chapter yet." },
  { date: "Jun 9, 2026", label: "TEXITcoin Core open-sourced", detail: "Full unredacted source code published to GitHub with complete commit history from day one. The network becomes truly permissionless." },
  { date: "Jun 29, 2026", label: "Mining beyond Texas", detail: "In-Home Miner program launches — approved participants can now mine TXC from outside Texas for the first time." },
  { date: "Now", label: "The Hit List", detail: "We start systematically evaluating every CMC Top 100 project — who earned their seat, and who's just coasting." },
];


function fmtMoney(n: number | null | undefined, digits = 2) {
  if (n == null || !isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(digits)}`;
}
function fmtNum(n: number | null | undefined) {
  if (n == null || !isFinite(n)) return "—";
  return n.toLocaleString();
}
function fmtPct(n: number | null | undefined) {
  if (n == null || !isFinite(n)) return "—";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function verdictBadge(v: string) {
  const map: Record<string, { label: string; cls: string }> = {
    leftover: { label: "Leftover", cls: "bg-red-500/15 text-red-400 border-red-500/30" },
    coasting: { label: "Coasting", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
    earned: { label: "Earned it", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    unrated: { label: "Unrated", cls: "bg-muted text-muted-foreground border-border" },
  };
  const m = map[v] ?? map.unrated;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${m.cls}`}>
      {m.label}
    </span>
  );
}

function MarketPage() {
  const { data: coins } = useSuspenseQuery(hitListQuery);
  const { data: featured } = useSuspenseQuery(featuredCoinQuery);
  const { data: txc } = useQuery(txcSnapshotQuery);

  // On-deck = everything else, ordered "low rank to high rank" (biggest CMC rank number first)
  const onDeck = [...coins]
    .filter((c) => c.slug !== FEATURED_SLUG)
    .sort((a, b) => (b.cmcRank ?? 0) - (a.cmcRank ?? 0));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 relative">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Crosshair className="h-4 w-4" /> The Hit List
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
              Should TXC be a <span className="text-primary">Top 100</span> coin?
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-muted-foreground">
              We're going through every coin in CoinMarketCap's Top 100 and asking one question: <em>why are you here?</em> Some earned it. Some are coasting on 2023 momentum. Some are leftovers. This is who we're measuring ourselves against — and who we're coming for.
            </p>
          </div>
        </section>

        {/* TXC snapshot */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  TXC Market Snapshot
                </div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
                  Where we stand today
                </h2>
              </div>
              <div className="text-xs text-muted-foreground">
                Live from CoinMarketCap · cached 5 min
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <StatCard label="Price" value={fmtMoney(txc?.price ?? null, 4)} sub={fmtPct(txc?.percentChange24h ?? null) + " 24h"} />
              <StatCard label="Market cap" value={fmtMoney(txc?.marketCap ?? null)} sub={txc?.cmcRank ? `CMC rank #${txc.cmcRank}` : "unranked"} />
              <StatCard label="24h volume" value={fmtMoney(txc?.volume24h ?? null)} sub="all venues" />
              <StatCard label="Circulating" value={fmtNum(txc?.circulatingSupply ?? null)} sub={txc?.maxSupply ? `of ${fmtNum(txc.maxSupply)} max` : "TXC"} />
            </div>
            {!txc && (
              <div className="mt-4 text-xs text-muted-foreground">
                Live CMC data not available right now — showing dashes. Retrying automatically.
              </div>
            )}
          </div>
        </section>

        {/* Key milestones */}
        <section className="py-16 bg-surface/40 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Key milestones</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">How we got here</h2>
            <ol className="mt-10 relative border-l border-border pl-8 space-y-8">
              {MILESTONES.map((m) => (
                <li key={m.date}>
                  <span className="absolute -left-2 mt-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary shadow-glow" />
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{m.date}</div>
                  <div className="mt-1 font-display text-xl font-bold">{m.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{m.detail}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLARITY Act blurb */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface/40 to-background p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">In the news</div>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold">
                    The CLARITY Act — the permission slip we didn't need.
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Wall Street is waiting on H.R. 3633 to touch crypto. Here's
                    the plain-English breakdown of what CLARITY actually does,
                    what it doesn't, and why a fair-launched, no-premine,
                    proof-of-work coin like TXC was already a digital
                    commodity — with or without a bill from Congress.
                  </p>
                </div>
                <Link
                  to="/clarity"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Read the deep dive <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured case study — Next Up */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Next up on the hit list
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              First target: {featured.name}.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
              The full case study — live market data, X account signals, heuristic fake-follower score, the argument, and where the gap actually is.
            </p>

            <div className="mt-12">
              <CoinCaseStudy coin={featured} />
            </div>

            {/* On deck */}
            {onDeck.length > 0 && (
              <div className="mt-20">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  On deck
                </div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
                  Case studies queued up next
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Working up the ladder — lower ranks first, moving toward the top.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {onDeck.map((c) => (
                    <Link
                      key={c.slug}
                      to="/market/$slug"
                      params={{ slug: c.slug }}
                      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display text-2xl font-bold">{c.name}</div>
                          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            {c.symbol} {c.cmcRank ? `· CMC #${c.cmcRank}` : ""}
                          </div>
                        </div>
                        {verdictBadge(c.verdict)}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground flex-1">
                        {c.verdictNote ?? "Analysis coming soon."}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {c.xFollowers ? `${(c.xFollowers / 1000).toFixed(0)}k on X` : "—"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-primary font-semibold">
                          Read case study
                          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-14 rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-display text-xl font-bold">Have a coin you want us to evaluate?</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drop it in the ecosystem chat and we'll add it to the queue. The goal is honest signal, not attacks — if a project earned its spot, we'll say so.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
