import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Zap } from "lucide-react";

const SWAP_URL = "https://swap.honest.money/swap";
const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=texitcoin&vs_currencies=usd&include_24hr_change=true";

type Asset = "TXC" | "ISK";
type Chain = { id: string; label: string };

const CHAINS: Chain[] = [
  { id: "ethereum", label: "Ethereum" },
  { id: "base", label: "Base" },
  { id: "arbitrum", label: "Arbitrum" },
  { id: "polygon", label: "Polygon" },
  { id: "bsc", label: "BNB Chain" },
];

const PROTOCOL_FEE = 0.05; // 5% — matches swap.honest.money

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUM = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

export function SwapTerminal() {
  const [asset, setAsset] = useState<Asset>("TXC");
  const [chain, setChain] = useState<string>("base");
  const [amount, setAmount] = useState<string>("100");
  const [txcPrice, setTxcPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number | null>(null);

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

  const parsed = Number(amount);
  const usdIn = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  const afterFee = usdIn * (1 - PROTOCOL_FEE);

  const estimatedOut = useMemo(() => {
    if (asset !== "TXC" || !txcPrice || !usdIn) return null;
    return afterFee / txcPrice;
  }, [asset, txcPrice, usdIn, afterFee]);

  const handoffUrl = SWAP_URL; // upstream doesn't accept query prefill yet

  const up = (change24h ?? 0) >= 0;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="rounded-2xl border border-border bg-card/80 p-1 shadow-card backdrop-blur">
        <div className="rounded-xl border border-border bg-background p-6 md:p-7">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
                Exchange Terminal
              </div>
              <div className="mt-1 font-display text-2xl font-bold">
                Swap to <span className="text-primary">TXC</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end leading-none">
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Live · TXC/USD
              </span>
              <span className="mt-1 font-display text-lg font-bold tabular-nums">
                {txcPrice ? USD.format(txcPrice) : "$—.——"}
              </span>
              {change24h != null && (
                <span
                  className={`text-[11px] font-semibold tabular-nums ${up ? "text-emerald-500" : "text-red-500"}`}
                >
                  {up ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          {/* Destination asset */}
          <div className="mt-6 space-y-2">
            <div className="px-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Destination Asset
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["TXC", "ISK"] as Asset[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAsset(a)}
                  className={`rounded-lg border p-4 font-mono text-sm transition-colors ${
                    asset === a
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {a === "ISK" ? "ISK$" : "TXC"}
                </button>
              ))}
            </div>
          </div>

          {/* Chain + amount */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="px-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Source Chain
              </div>
              <select
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className="w-full rounded-lg border border-border bg-card p-4 font-mono text-sm focus:border-primary focus:outline-none"
              >
                {CHAINS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <div className="px-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                You Send (USDC)
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 focus-within:border-primary">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent font-mono text-lg tabular-nums outline-none placeholder:text-muted-foreground"
                  placeholder="0.00"
                />
                <span className="font-mono text-xs text-muted-foreground">USDC</span>
              </div>
            </div>
          </div>

          {/* Estimated out */}
          <div className="mt-4 rounded-lg border border-dashed border-border bg-card/50 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                You Receive (est.)
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Protocol fee 5.00%
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <span className="font-display text-3xl font-bold tabular-nums">
                {asset === "TXC"
                  ? estimatedOut != null
                    ? NUM.format(estimatedOut)
                    : "—"
                  : "—"}
                <span className="ml-2 font-mono text-sm font-normal text-muted-foreground">
                  {asset === "ISK" ? "ISK$" : "TXC"}
                </span>
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                ≈ {USD.format(afterFee)} after fee
              </span>
            </div>
            {asset === "ISK" && (
              <p className="mt-2 text-xs text-muted-foreground">
                ISK$ quote loads on the swap terminal.
              </p>
            )}
          </div>

          {/* CTA */}
          <a
            href={handoffUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex w-full items-center justify-between rounded-lg bg-red-gradient px-6 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            <span className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4" /> Start swap
            </span>
            <span className="inline-flex items-center gap-1">
              swap.honest.money <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>

          {/* Stat row */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
            <Stat label="Protocol Fee" value="5.00%" suffix="FIXED" />
            <Stat label="Chains" value={String(CHAINS.length)} suffix="EVM MAINNETS" />
            <Stat label="Settlement" value="~5m" suffix="TO WALLET" />
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground">
            Powered by{" "}
            <a
              href="https://swap.honest.money"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary"
            >
              swap.honest.money <ExternalLink className="h-3 w-3" />
            </a>
            . Live pricing via CoinGecko. Final quote and settlement happen on the swap terminal.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-mono text-lg tabular-nums">
        {value} <span className="text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
