import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type PriceState = {
  price: number;
  change24h: number;
  spark: number[];
  updatedAt: number;
};

const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=texitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true";
const CHART_URL =
  "https://api.coingecko.com/api/v3/coins/texitcoin/market_chart?vs_currency=usd&days=1";

const FMT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
  maximumFractionDigits: 6,
});

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const { d, area, last } = useMemo(() => {
    if (data.length < 2) return { d: "", area: "", last: 0 };
    const w = 120;
    const h = 32;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = w / (data.length - 1);
    const pts = data.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return [x, y] as const;
    });
    const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
    const area = `${d} L${w},${h} L0,${h} Z`;
    return { d, area, last: pts[pts.length - 1][1] };
  }, [data]);

  const stroke = up ? "hsl(142 71% 45%)" : "hsl(0 84% 60%)";
  const fill = up ? "url(#sparkUp)" : "url(#sparkDown)";

  return (
    <svg viewBox="0 0 120 32" className="h-8 w-[120px] overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkUp" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkDown" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {d && (
        <>
          <path d={area} fill={fill} />
          <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy={last} r="2.5" fill={stroke}>
            <animate attributeName="r" values="2.5;4;2.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

export function LivePrice({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [state, setState] = useState<PriceState | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPrice = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadChart = async () => {
      try {
        const r = await fetch(CHART_URL);
        if (!r.ok) return null;
        const j = (await r.json()) as { prices: [number, number][] };
        // Downsample to ~40 points for a clean sparkline
        const pts = j.prices.map((p) => p[1]);
        const stride = Math.max(1, Math.floor(pts.length / 40));
        return pts.filter((_, i) => i % stride === 0).slice(-40);
      } catch {
        return null;
      }
    };

    const loadPrice = async (sparkFallback: number[]) => {
      try {
        const r = await fetch(PRICE_URL);
        if (!r.ok) return;
        const j = (await r.json()) as {
          texitcoin: { usd: number; usd_24h_change: number; last_updated_at: number };
        };
        if (cancelled) return;
        const next: PriceState = {
          price: j.texitcoin.usd,
          change24h: j.texitcoin.usd_24h_change,
          spark: sparkFallback,
          updatedAt: j.texitcoin.last_updated_at * 1000,
        };
        setState((cur) => {
          const spark = cur?.spark.length ? [...cur.spark.slice(-39), next.price] : next.spark;
          if (prevPrice.current != null && prevPrice.current !== next.price) {
            setFlash(next.price > prevPrice.current ? "up" : "down");
            setTimeout(() => setFlash(null), 700);
          }
          prevPrice.current = next.price;
          return { ...next, spark };
        });
      } catch {
        /* swallow */
      }
    };

    (async () => {
      const spark = (await loadChart()) ?? [];
      await loadPrice(spark);
    })();

    const id = setInterval(() => loadPrice(state?.spark ?? []), 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const up = (state?.change24h ?? 0) >= 0;
  const flashCls =
    flash === "up"
      ? "ring-emerald-500/60 shadow-[0_0_24px_-4px_hsl(142_71%_45%/0.55)]"
      : flash === "down"
        ? "ring-red-500/60 shadow-[0_0_24px_-4px_hsl(0_84%_60%/0.55)]"
        : "ring-border";

  if (variant === "mobile") {
    return (
      <Link
        to="/buy"
        className={`group flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium ring-1 transition-all ${flashCls}`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="font-display tracking-wider">TXC</span>
        <span className="tabular-nums font-semibold">
          {state ? FMT.format(state.price) : "—"}
        </span>
        {state && (
          <span className={`tabular-nums ${up ? "text-emerald-500" : "text-red-500"}`}>
            {up ? "+" : ""}
            {state.change24h.toFixed(2)}%
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      to="/buy"
      aria-label="TEXITcoin live price — buy TXC"
      className={`group relative hidden md:flex items-center gap-3 rounded-xl border border-border bg-background/60 backdrop-blur-xl pl-3 pr-4 py-2 ring-1 transition-all hover:bg-background/80 ${flashCls}`}
    >
      {/* Live dot */}
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            Live · TXC/USD
          </span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span
            className={`font-display text-lg font-bold tabular-nums transition-colors ${
              flash === "up" ? "text-emerald-400" : flash === "down" ? "text-red-400" : "text-foreground"
            }`}
          >
            {state ? FMT.format(state.price) : "$—.——"}
          </span>
          {state && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums ${
                up ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {up ? "+" : ""}
              {state.change24h.toFixed(2)}%
            </span>
          )}
        </div>
      </div>

      {/* Sparkline */}
      <div className="relative">
        <Sparkline data={state?.spark ?? []} up={up} />
        <div className="mt-0.5 text-right text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          24h
        </div>
      </div>

      {/* Hover CTA hint */}
      <span className="ml-1 hidden xl:inline-flex items-center gap-1 rounded-md bg-red-gradient px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground opacity-90 group-hover:opacity-100">
        Buy →
      </span>
    </Link>
  );
}
