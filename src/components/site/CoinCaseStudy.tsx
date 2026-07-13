import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import {
  Users,
  MessageSquare,
  Repeat2,
  Heart,
  Calendar,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { getCmcQuote, type HitListDetail } from "@/lib/market.functions";
import { computeFakeScore } from "@/lib/fake-score";

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
function daysSince(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso).getTime();
  if (isNaN(d)) return null;
  return Math.floor((Date.now() - d) / 86400000);
}

function verdictConfig(v: string) {
  const map: Record<string, { label: string; blurb: string; cls: string; ring: string }> = {
    leftover: {
      label: "Leftover",
      blurb: "Doesn't earn its slot on today's fundamentals or activity.",
      cls: "bg-red-500/10 text-red-400 border-red-500/30",
      ring: "shadow-[0_0_60px_-15px_hsl(0_84%_60%/0.4)]",
    },
    coasting: {
      label: "Coasting",
      blurb: "Was earned once — now living on momentum.",
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      ring: "shadow-[0_0_60px_-15px_hsl(43_96%_56%/0.4)]",
    },
    earned: {
      label: "Earned it",
      blurb: "Real product, real community, real reason to be here.",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      ring: "shadow-[0_0_60px_-15px_hsl(160_84%_39%/0.4)]",
    },
    unrated: {
      label: "Unrated",
      blurb: "Analysis in progress.",
      cls: "bg-muted text-muted-foreground border-border",
      ring: "",
    },
  };
  return map[v] ?? map.unrated;
}

export function CoinCaseStudy({ coin }: { coin: HitListDetail }) {
  const { data: cmc } = useQuery({
    queryKey: ["cmc-quote", coin.cmcId],
    queryFn: () => (coin.cmcId ? getCmcQuote({ data: { id: coin.cmcId } }) : Promise.resolve(null)),
    enabled: coin.cmcId != null,
    staleTime: 5 * 60_000,
  });

  const engagements =
    (coin.xAvgLikes ?? 0) + (coin.xAvgReplies ?? 0) + (coin.xAvgReposts ?? 0);
  const fake = computeFakeScore({
    followers: coin.xFollowers,
    following: coin.xFollowing,
    avgEngagementPerPost: engagements || null,
    postsLast30d: coin.xPosts30d,
    daysSinceLastPost: daysSince(coin.xLastPostAt),
    defaultAvatarPct: coin.xDefaultAvatarPct,
  });
  const v = verdictConfig(coin.verdict);
  const daysDark = daysSince(coin.xLastPostAt);

  return (
    <div>
      {/* Verdict banner */}
      <div className={`rounded-3xl border p-8 md:p-10 ${v.cls} ${v.ring}`}>
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
          Verdict · {v.label}
        </div>
        <h2 className="mt-4 font-display text-5xl md:text-6xl font-bold leading-[1.05]">
          {coin.name} <span className="opacity-60">({coin.symbol})</span>
        </h2>
        <div className="mt-3 text-sm opacity-80">
          CMC #{coin.cmcRank ?? "?"} · {v.blurb}
        </div>
        {coin.verdictNote && (
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-foreground/90 max-w-3xl">
            {coin.verdictNote}
          </p>
        )}
        {coin.website && (
          <a
            href={coin.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
          >
            {new URL(coin.website).host} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* The numbers */}
      <section className="mt-14">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          The numbers
        </div>
        <h3 className="mt-3 font-display text-3xl font-bold">Live from CoinMarketCap</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat label="Price" value={fmtMoney(cmc?.price ?? null, 4)} sub={fmtPct(cmc?.percentChange24h ?? null) + " 24h"} />
          <Stat label="Market cap" value={fmtMoney(cmc?.marketCap ?? null)} sub={cmc?.cmcRank ? `Rank #${cmc.cmcRank}` : ""} />
          <Stat label="24h volume" value={fmtMoney(cmc?.volume24h ?? null)} />
          <Stat label="Circulating" value={fmtNum(cmc?.circulatingSupply ?? null)} sub={coin.symbol} />
          <Stat label="Max supply" value={fmtNum(cmc?.maxSupply ?? null)} sub={coin.symbol} />
          <Stat label="7d change" value={fmtPct(cmc?.percentChange7d ?? null)} />
        </div>
        {!cmc && (
          <div className="mt-3 text-xs text-muted-foreground">
            Live CMC data pending — retrying.
          </div>
        )}
      </section>

      {/* The socials */}
      <section className="mt-16">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          The socials
        </div>
        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          <h3 className="font-display text-3xl font-bold">
            {coin.xHandle ? `@${coin.xHandle}` : "X account"}
          </h3>
          {coin.xHandle && (
            <a
              href={`https://x.com/${coin.xHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary font-semibold inline-flex items-center gap-1"
            >
              view on X <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Snapshot: {new Date(coin.snapshotAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat icon={<Users className="h-4 w-4" />} label="Followers" value={fmtNum(coin.xFollowers)} />
          <Stat icon={<Users className="h-4 w-4" />} label="Following" value={fmtNum(coin.xFollowing)} />
          <Stat icon={<Calendar className="h-4 w-4" />} label="Last post" value={daysDark != null ? `${daysDark} days ago` : "—"} sub={coin.xLastPostAt ? new Date(coin.xLastPostAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""} />
          <Stat icon={<MessageSquare className="h-4 w-4" />} label="Posts (30d)" value={fmtNum(coin.xPosts30d)} />
          <Stat icon={<Heart className="h-4 w-4" />} label="Avg likes" value={fmtNum(coin.xAvgLikes)} />
          <Stat icon={<Repeat2 className="h-4 w-4" />} label="Avg reposts" value={fmtNum(coin.xAvgReposts)} />
        </div>

        {/* Fake-score */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Heuristic fake / inactive score
            </div>
          </div>
          <div className="mt-4 flex items-end gap-6 flex-wrap">
            <div>
              <div className="font-display text-6xl font-bold leading-none">{fake.score}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                out of 100 · {fake.label}
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all"
                  style={{ width: `${fake.score}%` }}
                />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Higher = more likely the audience is inflated or inactive. This is an estimate from public signals, not a paid audit — the formula is right here, and every input is disclosed above.
              </div>
            </div>
          </div>
          <ul className="mt-6 space-y-2.5">
            {fake.factors.length === 0 ? (
              <li className="text-sm text-muted-foreground">No red flags detected in the signals we tracked.</li>
            ) : (
              fake.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className={`mt-0.5 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                      f.delta > 0
                        ? "bg-red-500/15 text-red-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {f.delta > 0 ? "+" : ""}
                    {f.delta}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{f.label}</div>
                    <div className="text-muted-foreground">{f.note}</div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      {/* Argument */}
      {coin.argumentMarkdown && (
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The argument
          </div>
          <div className="mt-3 prose-content space-y-5 text-lg leading-relaxed text-foreground/90 [&_p]:my-0 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground">
            <ReactMarkdown>{coin.argumentMarkdown}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* Gaps */}
      {coin.gaps.length > 0 && (
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            What TXC has to beat
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold">Where the gap actually is</h3>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Metric</th>
                  <th className="text-left px-5 py-3 font-semibold">{coin.name}</th>
                  <th className="text-left px-5 py-3 font-semibold">TXC</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {coin.gaps.map((g, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-5 py-4 font-semibold">{g.metric}</td>
                    <td className="px-5 py-4">{g.them ?? g.kaspa ?? "—"}</td>
                    <td className="px-5 py-4 text-primary font-semibold">{g.txc ?? "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{g.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon?: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
