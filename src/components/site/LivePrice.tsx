import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getTxcSnapshot } from "@/lib/market.functions";

type PriceState = {
  price: number;
  change24h: number;
  updatedAt: number;
};

const FMT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
  maximumFractionDigits: 6,
});

export function LivePrice({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [state, setState] = useState<PriceState | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPrice = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPrice = async () => {
      try {
        const q = await getTxcSnapshot();
        if (cancelled || !q || q.price == null) return;
        const next: PriceState = {
          price: q.price,
          change24h: q.percentChange24h ?? 0,
          updatedAt: Date.now(),
        };
        setState(() => {
          if (prevPrice.current != null && prevPrice.current !== next.price) {
            setFlash(next.price > prevPrice.current ? "up" : "down");
            setTimeout(() => setFlash(null), 700);
          }
          prevPrice.current = next.price;
          return next;
        });
      } catch {
        /* swallow */
      }
    };

    loadPrice();
    const id = setInterval(loadPrice, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
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
    </Link>
  );
}
