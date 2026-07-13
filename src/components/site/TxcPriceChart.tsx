import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTxcPriceHistory, type PricePoint } from "@/lib/market.functions";

type Range = 7 | 30 | 90 | 365;

const RANGES: { days: Range; label: string }[] = [
  { days: 7, label: "7D" },
  { days: 30, label: "30D" },
  { days: 90, label: "90D" },
  { days: 365, label: "1Y" },
];

function fmtPrice(n: number) {
  if (!isFinite(n)) return "—";
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

function fmtDate(t: number, days: Range) {
  const d = new Date(t);
  if (days <= 7) return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric" });
  if (days <= 90) return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export function TxcPriceChart() {
  const [days, setDays] = useState<Range>(30);
  const { data, isLoading } = useQuery({
    queryKey: ["txc-history", days],
    queryFn: () => getTxcPriceHistory({ data: { days } }),
    staleTime: 5 * 60_000,
  });

  const points: PricePoint[] = data ?? [];
  const stats = useMemo(() => {
    if (points.length < 2) return null;
    const first = points[0].p;
    const last = points[points.length - 1].p;
    const change = last - first;
    const pct = (change / first) * 100;
    const min = Math.min(...points.map((p) => p.p));
    const max = Math.max(...points.map((p) => p.p));
    return { first, last, change, pct, min, max };
  }, [points]);

  const up = (stats?.pct ?? 0) >= 0;
  const stroke = up ? "hsl(160 84% 45%)" : "hsl(0 84% 60%)";
  const fillId = `txc-fill-${days}`;

  return (
    <div className="rounded-3xl border border-border bg-card shadow-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            TXC / USD
          </div>
          <div className="mt-2 flex items-baseline gap-4 flex-wrap">
            <div className="font-display text-5xl md:text-6xl font-bold leading-none">
              {stats ? fmtPrice(stats.last) : "—"}
            </div>
            {stats && (
              <div
                className={`text-lg font-semibold ${up ? "text-emerald-500" : "text-red-500"}`}
              >
                {up ? "▲" : "▼"} {fmtPrice(Math.abs(stats.change))} ({up ? "+" : ""}
                {stats.pct.toFixed(2)}%)
              </div>
            )}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {stats
              ? `${RANGES.find((r) => r.days === days)?.label} · low ${fmtPrice(stats.min)} · high ${fmtPrice(stats.max)}`
              : "Loading market history…"}
          </div>
        </div>

        <div className="inline-flex rounded-full border border-border bg-surface/60 p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition ${
                days === r.days
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[320px] w-full">
        {isLoading && points.length === 0 ? (
          <div className="h-full grid place-items-center text-sm text-muted-foreground">
            Loading chart…
          </div>
        ) : points.length === 0 ? (
          <div className="h-full grid place-items-center text-sm text-muted-foreground">
            No market history available right now.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="t"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(t) => fmtDate(t, days)}
                minTickGap={40}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
              />
              <YAxis
                dataKey="p"
                domain={["auto", "auto"]}
                tickFormatter={(v) => fmtPrice(v)}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelFormatter={(t) =>
                  new Date(t as number).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                }
                formatter={(v: number) => [fmtPrice(v), "TXC"]}
              />
              <Area
                type="monotone"
                dataKey="p"
                stroke={stroke}
                strokeWidth={2.5}
                fill={`url(#${fillId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Price data · CoinGecko · cached 5 min
      </div>
    </div>
  );
}
