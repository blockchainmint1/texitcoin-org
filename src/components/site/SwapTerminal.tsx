import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";

const SWAP_BASE = "https://swap.honest.money/swap";
const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=texitcoin&vs_currencies=usd&include_24hr_change=true";

type Chain = { id: string; label: string; short: string; color: string };
type Stable = { id: string; label: string; note?: string };

const CHAINS: Chain[] = [
  { id: "base", label: "Base", short: "BASE", color: "#0052ff" },
  { id: "ethereum", label: "Ethereum", short: "ETH", color: "#627eea" },
  { id: "arbitrum", label: "Arbitrum", short: "ARB", color: "#2d374b" },
  { id: "polygon", label: "Polygon", short: "POLY", color: "#8247e5" },
  { id: "bsc", label: "BNB Chain", short: "BNB", color: "#f0b90b" },
];

const STABLES: Stable[] = [
  { id: "USDC", label: "USDC", note: "Circle" },
  { id: "USDT", label: "USDT", note: "Tether" },
  { id: "PYUSD", label: "PYUSD", note: "PayPal" },
  { id: "DAI", label: "DAI", note: "MakerDAO" },
];

const PROTOCOL_FEE = 0.05;

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const NUM = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });

export function SwapTerminal() {
  const [chain, setChain] = useState<string>("base");
  const [stable, setStable] = useState<string>("USDC");
  const [amount, setAmount] = useState<string>("100");
  const [address, setAddress] = useState<string>("");
  const [txcPrice, setTxcPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number | null>(null);
  const [chainOpen, setChainOpen] = useState(false);
  const chainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(PRICE_URL);
        if (!r.ok) return;
        const j = (await r.json()) as {
          texitcoin: { usd: number; usd_24h_change: number };
        };
        if (cancelled) return;
        setTxcPrice(j.texitcoin.usd);
        setChange24h(j.texitcoin.usd_24h_change);
      } catch {
        /* swallow */
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Close chain fan-out on outside click
  useEffect(() => {
    if (!chainOpen) return;
    const onDown = (e: MouseEvent) => {
      if (chainRef.current && !chainRef.current.contains(e.target as Node)) {
        setChainOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [chainOpen]);

  const parsed = Number(amount);
  const usdIn = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  const afterFee = usdIn * (1 - PROTOCOL_FEE);

  const estimatedTxc = useMemo(() => {
    if (!txcPrice || !usdIn) return null;
    return afterFee / txcPrice;
  }, [txcPrice, usdIn, afterFee]);

  const addressValid = /^[a-zA-Z0-9]{26,64}$/.test(address.trim());
  const canStart = addressValid && usdIn > 0;

  // Deep-link params handed off to swap.honest.money
  const handoffUrl = useMemo(() => {
    const p = new URLSearchParams({
      asset: "TXC",
      chain,
      token: stable,
      amount: String(usdIn || ""),
      source: "texitcoin.org",
    });
    if (addressValid) {
      p.set("address", address.trim());
      p.set("autostart", "1");
    }
    return `${SWAP_BASE}?${p.toString()}`;
  }, [chain, stable, usdIn, address, addressValid]);

  const up = (change24h ?? 0) >= 0;
  const activeChain = CHAINS.find((c) => c.id === chain) ?? CHAINS[0];
  const otherChains = CHAINS.filter((c) => c.id !== chain);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="rounded-2xl border border-border bg-card/80 p-1 shadow-card backdrop-blur">
        <div className="rounded-xl border border-border bg-background p-4 md:p-5">
          {/* Top meta row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
                Exchange Terminal
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Stablecoin → <span className="text-primary">TXC</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Live · TXC/USD
              </span>
              <span className="font-display text-sm font-bold tabular-nums">
                {txcPrice ? USD.format(txcPrice) : "$—.——"}
              </span>
              {change24h != null && (
                <span
                  className={`hidden sm:inline text-[11px] font-semibold tabular-nums ${
                    up ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {up ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          {/* Booking-style horizontal row */}
          <div className="mt-3 grid grid-cols-1 items-stretch gap-2 rounded-2xl border border-border bg-card p-2 md:grid-cols-[1.2fr_auto_1.1fr_auto_1.3fr_auto]">
            {/* From: chain circle (click to switch) + stable selector */}
            <div className="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-background">
              {/* Chain fan-out */}
              <div ref={chainRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setChainOpen((v) => !v)}
                  aria-label={`Network: ${activeChain.label}. Click to change.`}
                  className="relative grid h-11 w-11 place-items-center rounded-full font-mono text-[10px] font-bold text-white shadow-md ring-2 ring-background transition hover:scale-105"
                  style={{ backgroundColor: activeChain.color }}
                >
                  {activeChain.short}
                  <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border border-border bg-background text-[8px] text-muted-foreground">
                    <ChevronDown className="h-2.5 w-2.5" />
                  </span>
                </button>

                {chainOpen && (
                  <div className="absolute left-1/2 top-full z-30 mt-3 -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-2 shadow-lg">
                      {otherChains.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setChain(c.id);
                            setChainOpen(false);
                          }}
                          title={c.label}
                          className="grid h-10 w-10 place-items-center rounded-full font-mono text-[10px] font-bold text-white shadow transition hover:scale-110"
                          style={{ backgroundColor: c.color }}
                        >
                          {c.short}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stablecoin selector (the larger From field) */}
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  From · {activeChain.label}
                </div>
                <div className="relative">
                  <select
                    value={stable}
                    onChange={(e) => setStable(e.target.value)}
                    className="w-full appearance-none bg-transparent pr-6 font-display text-base font-bold outline-none"
                  >
                    {STABLES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                        {s.note ? ` · ${s.note}` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Divider / arrow */}
            <div className="hidden items-center justify-center md:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* To: TXC (fixed) */}
            <div className="flex min-w-0 items-center gap-3 rounded-xl px-4 py-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-gradient font-mono text-[10px] font-bold text-primary-foreground shadow-glow">
                TXC
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  To
                </div>
                <div className="font-display text-base font-bold">
                  TEXITcoin <span className="text-muted-foreground">· native</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden items-center md:flex" aria-hidden>
              <div className="h-10 w-px bg-border" />
            </div>

            {/* Amount */}
            <label className="flex min-w-0 items-center gap-3 rounded-xl px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  You send
                </div>
                <div className="flex items-baseline gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full min-w-0 bg-transparent font-display text-2xl font-bold tabular-nums outline-none placeholder:text-muted-foreground"
                    placeholder="0"
                  />
                  <span className="font-mono text-xs text-muted-foreground">{stable}</span>
                </div>
              </div>
            </label>

            {/* CTA */}
            <a
              href={handoffUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-gradient px-6 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-glow transition hover:brightness-110 md:px-8"
            >
              <Zap className="h-4 w-4" />
              Start swap
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          {/* Sub-row: stats LEFT, receive RIGHT (reversed) */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 text-xs">
            <div className="flex items-center gap-x-5 gap-y-1 font-mono uppercase tracking-widest text-muted-foreground">
              <span>5% Fee · Fixed</span>
              <span className="hidden sm:inline">·</span>
              <span>~5m Settlement</span>
              <span className="hidden sm:inline">·</span>
              <span>5 EVM Chains</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-muted-foreground">
              <span className="uppercase tracking-widest">You receive (est.)</span>
              <span className="font-display text-base font-bold tabular-nums text-foreground">
                {estimatedTxc != null ? NUM.format(estimatedTxc) : "—"}
                <span className="ml-1 text-xs font-normal text-muted-foreground">TXC</span>
              </span>
              <span className="text-muted-foreground">
                ≈ {USD.format(afterFee)} after 5% fee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
