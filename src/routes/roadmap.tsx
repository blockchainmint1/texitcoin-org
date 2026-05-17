import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  Trophy,
  Flag,
  Rocket,
  Zap,
  Skull,
  Pickaxe,
  Scale,
  Coins,
  Hammer,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — TEXITcoin Journey to the Top 100" },
      {
        name: "description",
        content:
          "The TEXITcoin journey, mapped out like a game board — every win, every setback, every price point on the way to the Top 100.",
      },
      { property: "og:title", content: "TEXITcoin Roadmap" },
      {
        property: "og:description",
        content: "Wins, setbacks, and prices on the way to the Top 100.",
      },
    ],
  }),
  component: RoadmapPage,
});

/* ---------------- Types & data ----------------
   Edit the MILESTONES + CONNECTORS arrays below as real history comes in.
   Squares 1..100. Square 100 = Top 100. */

type Kind = "win" | "setback" | "milestone" | "start" | "goal";

type Milestone = {
  square: number; // 1..100
  date?: string; // free-form e.g. "Jun 2022"
  title: string;
  price?: string; // e.g. "$0.10"
  kind: Kind;
  icon?: keyof typeof ICONS;
  story: string;
};

type Connector = {
  // ladder: from < to (boost forward). chute: from > to (knocked back).
  from: number;
  to: number;
  type: "ladder" | "chute";
  label?: string;
};

const ICONS = {
  Trophy,
  Flag,
  Rocket,
  Zap,
  Skull,
  Pickaxe,
  Scale,
  Coins,
  Hammer,
  Crown,
};

// Real history — add/edit as more milestones are confirmed.
const MILESTONES: Milestone[] = [
  {
    square: 1,
    title: "Genesis",
    date: "Jan 26, 2024",
    price: "$0.00",
    kind: "start",
    icon: "Flag",
    story:
      "The first block. Texas power, Texas land, Texas hands — a network built to benefit individuals, not banks.",
  },
  {
    square: 3,
    title: "First money in",
    date: "Apr 4, 2024",
    kind: "milestone",
    icon: "Coins",
    story:
      "First participants showed up with cash in hand. Bobby's daughter Samantha was first money in: \"A lot of crazy ideas, Dad — this one is by far the craziest.\" The bet was placed.",
  },
  {
    square: 6,
    title: "Dex-Trade live · network outage",
    date: "May 15, 2024",
    kind: "setback",
    icon: "Zap",
    story:
      "TXC went live on Dex-Trade — and within days a security incident hit: miners figured out how to mine outside our pool. The network went offline for three weeks while the team rebuilt the pool defenses.",
  },
  {
    square: 10,
    title: "Listed on CoinMarketCap",
    date: "Aug 20, 2024",
    kind: "win",
    icon: "Rocket",
    story:
      "TEXITcoin debuts on CoinMarketCap — global visibility, price tracking, and a real spot on the world's crypto map.",
  },
  {
    square: 14,
    title: "Listed on Bitmart",
    date: "Dec 31, 2024",
    price: "$0.10",
    kind: "win",
    icon: "Rocket",
    story:
      "TXC went live on Bitmart exchange on New Year's Eve 2024 at $0.10 — our first major centralized exchange listing and a huge step toward global liquidity for Texit Coin holders.",
  },
  {
    square: 22,
    title: "App breach — $210,000 lost",
    date: "Jan 2025",
    kind: "setback",
    icon: "Skull",
    story:
      "A hacker accessed the app and drained roughly $210,000. The cause: a back-door planted by a developer that listened for private-key scans. The coin worked perfectly — the app and a bad actor failed us. A hard, expensive lesson in trust and operational security.",
  },
  {
    square: 36,
    title: "Bitmain keynote · Las Vegas",
    date: "May 2025",
    kind: "win",
    icon: "Crown",
    story:
      "Bobby Gray took the stage at the Bitmain World Digital Mining Summit in Las Vegas — TEXITcoin shared the room with the world's largest mining operators.",
  },
  {
    square: 52,
    title: "TSSB Emergency Cease & Desist",
    date: "Feb 11, 2026",
    kind: "setback",
    icon: "Scale",
    story:
      "Texas State Securities Board issues Emergency Cease & Desist Order No. ENF-26-CDO-1893 against Robert J. Gray, TEXITcoin, MineTXC, and Blockchain Mint. All sales halted. The fight for federal clarity begins.",
  },
  {
    square: 58,
    title: "Welcome to TEXITcoin: Season 3",
    date: "Mar 26, 2026",
    kind: "milestone",
    icon: "Hammer",
    story:
      "Community reboot. New education platform, renewed focus, and a clear plan to come out of the setback stronger than we went in.",
  },
  {
    square: 100,
    title: "Top 100",
    kind: "goal",
    icon: "Trophy",
    story:
      "The north star. Not a date — an achievement. A top-100 cryptocurrency by market cap, owned by individuals.",
  },
];

const CONNECTORS: Connector[] = [
  { from: 10, to: 23, type: "ladder", label: "CoinMarketCap visibility" },
  { from: 22, to: 8, type: "chute", label: "App breach knocked us back" },
  { from: 52, to: 31, type: "chute", label: "TSSB C&D halted sales" },
  { from: 58, to: 71, type: "ladder", label: "Season 3 reboot" },
];

/* ---------------- Board geometry ---------------- */

const COLS = 10;
const ROWS = 10;

// Convert square number (1..100) to (col, rowFromBottom)
function squareToGrid(n: number) {
  const i = n - 1;
  const rowFromBottom = Math.floor(i / COLS); // 0 bottom .. 9 top
  const inRow = i % COLS;
  // Boustrophedon: even rows L→R, odd rows R→L
  const col = rowFromBottom % 2 === 0 ? inRow : COLS - 1 - inRow;
  return { col, rowFromBottom };
}

// Convert square to percentage center (relative to board)
function squareToPct(n: number) {
  const { col, rowFromBottom } = squareToGrid(n);
  const cell = 100 / COLS;
  const x = col * cell + cell / 2;
  const y = (ROWS - 1 - rowFromBottom) * cell + cell / 2; // top in CSS terms
  return { x, y };
}

/* ---------------- Component ---------------- */

function RoadmapPage() {
  const milestonesBySquare = useMemo(() => {
    const map = new Map<number, Milestone>();
    for (const m of MILESTONES) map.set(m.square, m);
    return map;
  }, []);

  const connectorsBySquare = useMemo(() => {
    const map = new Map<number, Connector>();
    for (const c of CONNECTORS) map.set(c.from, c);
    return map;
  }, []);

  const sortedMilestones = useMemo(
    () => [...MILESTONES].sort((a, b) => a.square - b.square),
    []
  );

  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [expandedSquare, setExpandedSquare] = useState<number | null>(null);

  const bullControls = useAnimationControls();
  const animatingRef = useRef(false);

  async function runBullTo(target: number) {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setExpandedSquare(target);

    // Build path: walk 1 → target one square at a time, taking ladders/chutes.
    const waypoints: number[] = [];
    let cur = 1;
    waypoints.push(cur);
    let safety = 0;
    while (cur !== target && safety < 500) {
      safety++;
      // step toward target (always increment; chutes/ladders may move us)
      cur = cur < target ? cur + 1 : cur - 1;
      waypoints.push(cur);
      const conn = connectorsBySquare.get(cur);
      if (conn) {
        cur = conn.to;
        waypoints.push(cur);
      }
    }

    setActiveSquare(target);

    for (const sq of waypoints) {
      const { x, y } = squareToPct(sq);
      await bullControls.start({
        left: `${x}%`,
        top: `${y}%`,
        transition: { duration: 0.12, ease: "easeInOut" },
      });
    }

    animatingRef.current = false;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Roadmap
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold leading-tight md:text-6xl">
              The road to the <span className="text-primary">Top 100</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Every win. Every setback. Every price point along the way. Click a
              milestone below and turn the bull loose on the board.
            </p>
          </div>

          {/* Board */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <BoardSurface
                milestonesBySquare={milestonesBySquare}
                connectors={CONNECTORS}
                activeSquare={activeSquare}
                bullControls={bullControls}
                onSquareClick={(n) => {
                  if (milestonesBySquare.has(n)) runBullTo(n);
                }}
              />
              <Legend />
            </div>

            {/* Side panel — quick milestone jump list */}
            <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Run the bull
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Pick a milestone
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Click any entry — the bull will gallop to that square.
              </p>
              <ul className="mt-5 max-h-[420px] overflow-y-auto pr-1 space-y-1">
                {sortedMilestones.map((m) => (
                  <li key={m.square}>
                    <button
                      onClick={() => runBullTo(m.square)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-left transition hover:border-border hover:bg-surface ${
                        activeSquare === m.square ? "bg-surface border-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <KindBadge kind={m.kind} small />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">
                            {m.title}
                          </div>
                          {(m.date || m.price) && (
                            <div className="truncate text-[11px] text-muted-foreground">
                              {[m.date, m.price].filter(Boolean).join(" · ")}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Indexed milestone write-ups */}
        <section className="mx-auto max-w-7xl px-6 mt-20">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              The story
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Every square has a story
            </h2>
            <p className="mt-3 text-muted-foreground">
              Wins lifted us. Setbacks knocked us back. Both got us closer to
              honest money.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {sortedMilestones.map((m) => (
              <MilestoneCard
                key={m.square}
                milestone={m}
                expanded={expandedSquare === m.square}
                onToggle={() =>
                  setExpandedSquare(expandedSquare === m.square ? null : m.square)
                }
                onRun={() => runBullTo(m.square)}
              />
            ))}
            {sortedMilestones.length <= 2 && (
              <div className="rounded-xl border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted-foreground">
                More milestones coming as the team logs them. Each one lands on
                its own square — wins climb ropes, setbacks slide down
                rattlesnakes.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Board surface ---------------- */

function BoardSurface({
  milestonesBySquare,
  connectors,
  activeSquare,
  bullControls,
  onSquareClick,
}: {
  milestonesBySquare: Map<number, Milestone>;
  connectors: Connector[];
  activeSquare: number | null;
  bullControls: ReturnType<typeof useAnimationControls>;
  onSquareClick: (n: number) => void;
}) {
  // Render rows top→bottom (square 100 first)
  const rows: number[][] = [];
  for (let r = ROWS - 1; r >= 0; r--) {
    const row: number[] = [];
    for (let c = 0; c < COLS; c++) {
      const inRow = r % 2 === 0 ? c : COLS - 1 - c;
      row.push(r * COLS + inRow + 1);
    }
    rows.push(row);
  }

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[28px] border-[6px] border-[#0a2a66] shadow-[0_30px_60px_-20px_rgba(10,42,102,0.5),inset_0_0_0_4px_#fff,inset_0_0_0_10px_#bf0a30]"
      style={{
        background:
          "repeating-linear-gradient(45deg, #fff7e0 0 18px, #fef0c4 18px 36px)",
      }}
    >
      {/* Lone star watermark */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon
          points="50,8 61,40 95,40 67,60 78,92 50,72 22,92 33,60 5,40 39,40"
          fill="#0a2a66"
        />
      </svg>

      {/* Grid of squares */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {rows.flat().map((n) => {
          const m = milestonesBySquare.get(n);
          const isMilestone = !!m;
          const isActive = activeSquare === n;
          const { col, rowFromBottom } = squareToGrid(n);
          // 4-color Texas checker: red, white/cream, navy, gold
          const cycle = (col + rowFromBottom * 3) % 4;
          const palette = [
            { bg: "#bf0a30", text: "#fff", num: "rgba(255,255,255,0.7)" }, // red
            { bg: "#fff7e0", text: "#0a2a66", num: "rgba(10,42,102,0.55)" }, // cream
            { bg: "#0a2a66", text: "#fff", num: "rgba(255,255,255,0.7)" }, // navy
            { bg: "#f5b700", text: "#0a2a66", num: "rgba(10,42,102,0.65)" }, // gold
          ][cycle];
          return (
            <button
              key={n}
              onClick={() => onSquareClick(n)}
              disabled={!isMilestone}
              className={`group relative border border-[#0a2a66]/30 transition-transform ${
                isMilestone
                  ? "cursor-pointer hover:z-10 hover:scale-110"
                  : "cursor-default"
              } ${isActive ? "z-10 scale-110" : ""}`}
              style={{ backgroundColor: palette.bg, color: palette.text }}
              title={
                m ? `${m.title}${m.price ? ` — ${m.price}` : ""}` : `Square ${n}`
              }
            >
              <span
                className="absolute left-1 top-1 text-[10px] font-mono font-bold"
                style={{ color: palette.num }}
              >
                {n}
              </span>
              {n === 100 && !isMilestone && (
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-1 opacity-90"
                >
                  <polygon
                    points="50,8 61,40 95,40 67,60 78,92 50,72 22,92 33,60 5,40 39,40"
                    fill="#f5b700"
                    stroke="#0a2a66"
                    strokeWidth="4"
                  />
                </svg>
              )}
              {isMilestone && <SquareContent m={m} textColor={palette.text} />}
              {isActive && (
                <span className="pointer-events-none absolute inset-0 rounded-[2px] ring-[3px] ring-[#f5b700] ring-inset" />
              )}
            </button>
          );
        })}
      </div>

      {/* Chutes & Ladders overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connectors.map((c, i) => {
          const a = squareToPct(c.from);
          const b = squareToPct(c.to);
          if (c.type === "ladder") {
            return <Ladder key={i} ax={a.x} ay={a.y} bx={b.x} by={b.y} />;
          }
          return <Snake key={i} ax={a.x} ay={a.y} bx={b.x} by={b.y} />;
        })}
      </svg>

      {/* The bull */}
      <motion.div
        animate={bullControls}
        initial={{ left: `${squareToPct(1).x}%`, top: `${squareToPct(1).y}%` }}
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <BullToken />
      </motion.div>
    </div>
  );
}

function SquareContent({
  m,
  textColor,
}: {
  m: Milestone;
  textColor: string;
}) {
  const Icon = m.icon ? ICONS[m.icon] : kindIcon(m.kind);
  return (
    <div className="absolute inset-1 flex flex-col items-center justify-center gap-0.5 p-1">
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-2"
        style={{ color: "#0a2a66", borderColor: "#f5b700" }}
      >
        <Icon className="h-4 w-4" />
      </div>
      {m.price && (
        <div
          className="rounded-sm bg-white/95 px-1 text-[8px] font-mono font-extrabold leading-tight"
          style={{ color: "#bf0a30" }}
        >
          {m.price}
        </div>
      )}
    </div>
  );
}

/* ---------------- Ladder & Snake SVGs ---------------- */

function Ladder({
  ax,
  ay,
  bx,
  by,
}: {
  ax: number;
  ay: number;
  bx: number;
  by: number;
}) {
  // Two rails offset perpendicular to the line, with rungs.
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len; // perpendicular
  const ny = dx / len;
  const off = 1.6; // rail half-width (in viewBox units)
  const ax1 = ax + nx * off,
    ay1 = ay + ny * off,
    bx1 = bx + nx * off,
    by1 = by + ny * off;
  const ax2 = ax - nx * off,
    ay2 = ay - ny * off,
    bx2 = bx - nx * off,
    by2 = by - ny * off;
  const rungs = Math.max(3, Math.floor(len / 4));
  return (
    <g strokeLinecap="round">
      {/* Wood rails — outer dark + inner highlight */}
      <line
        x1={ax1}
        y1={ay1}
        x2={bx1}
        y2={by1}
        stroke="#4a2912"
        strokeWidth={1.4}
      />
      <line
        x1={ax2}
        y1={ay2}
        x2={bx2}
        y2={by2}
        stroke="#4a2912"
        strokeWidth={1.4}
      />
      <line
        x1={ax1}
        y1={ay1}
        x2={bx1}
        y2={by1}
        stroke="#c8862d"
        strokeWidth={0.5}
      />
      <line
        x1={ax2}
        y1={ay2}
        x2={bx2}
        y2={by2}
        stroke="#c8862d"
        strokeWidth={0.5}
      />
      {Array.from({ length: rungs }).map((_, i) => {
        const t = (i + 0.5) / rungs;
        const rx1 = ax1 + (bx1 - ax1) * t;
        const ry1 = ay1 + (by1 - ay1) * t;
        const rx2 = ax2 + (bx2 - ax2) * t;
        const ry2 = ay2 + (by2 - ay2) * t;
        return (
          <line
            key={i}
            x1={rx1}
            y1={ry1}
            x2={rx2}
            y2={ry2}
            stroke="#8b5a2b"
            strokeWidth={0.9}
          />
        );
      })}
    </g>
  );
}

function Snake({
  ax,
  ay,
  bx,
  by,
}: {
  ax: number;
  ay: number;
  bx: number;
  by: number;
}) {
  // Wavy serpent from a (high) to b (low). Cubic with offset control points.
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const wobble = Math.min(14, len * 0.3);
  const c1x = mx + nx * wobble;
  const c1y = my + ny * wobble;
  const c2x = mx - nx * wobble;
  const c2y = my - ny * wobble;
  const d = `M ${ax} ${ay} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${bx} ${by}`;
  return (
    <g>
      {/* body outline */}
      <path
        d={d}
        fill="none"
        stroke="#3a1a0a"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      {/* body fill */}
      <path
        d={d}
        fill="none"
        stroke="#d97706"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {/* diamond pattern */}
      <path
        d={d}
        fill="none"
        stroke="#7c2d12"
        strokeWidth={2.4}
        strokeDasharray="0.8 1.6"
        strokeLinecap="butt"
      />
      {/* yellow belly highlight */}
      <path
        d={d}
        fill="none"
        stroke="#fde047"
        strokeWidth={0.5}
        strokeDasharray="0.4 2"
        strokeLinecap="round"
      />
      {/* head */}
      <circle cx={bx} cy={by} r={2} fill="#3a1a0a" />
      <circle cx={bx} cy={by} r={1.5} fill="#d97706" />
      {/* eyes */}
      <circle cx={bx - 0.5} cy={by - 0.3} r={0.3} fill="#fde047" />
      <circle cx={bx + 0.5} cy={by - 0.3} r={0.3} fill="#fde047" />
      {/* fangs */}
      <path
        d={`M ${bx - 0.3} ${by + 0.4} L ${bx - 0.1} ${by + 1.2}`}
        stroke="#fff"
        strokeWidth={0.25}
        strokeLinecap="round"
      />
      <path
        d={`M ${bx + 0.3} ${by + 0.4} L ${bx + 0.1} ${by + 1.2}`}
        stroke="#fff"
        strokeWidth={0.25}
        strokeLinecap="round"
      />
      {/* rattle tail */}
      <circle cx={ax} cy={ay} r={0.7} fill="#7c2d12" />
      <circle cx={ax} cy={ay} r={0.4} fill="#fde047" />
    </g>
  );
}

/* ---------------- Bull token ---------------- */

function BullToken() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0a2a66] text-[#f5b700] shadow-[0_6px_16px_rgba(0,0,0,0.45)] ring-[3px] ring-[#f5b700]">
      {/* horned bull glyph */}
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M2 7c.5-1.5 2-2.5 3.5-2 1 .3 1.7 1 2 2L8 9c1.2-.6 2.5-1 4-1s2.8.4 4 1l.5-2c.3-1 1-1.7 2-2 1.5-.5 3 .5 3.5 2 .3 1-.2 2-1 2.5L19 11c.6 1 1 2.2 1 3.5 0 3.6-3.6 6.5-8 6.5s-8-2.9-8-6.5c0-1.3.4-2.5 1-3.5L3 9.5C2.2 9 1.7 8 2 7zm7 7a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
      {/* dust puff */}
      <span className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-[#f5b700]/30 blur-sm" />
    </div>
  );
}

/* ---------------- Legend, badges, helpers ---------------- */

function Legend() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-semibold text-foreground/80">
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-7 rounded-full"
          style={{ background: "#8b5a2b", boxShadow: "inset 0 0 0 1px #4a2912" }}
        />
        Ladder — climb forward
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-7 rounded-full"
          style={{ background: "#d97706", boxShadow: "inset 0 0 0 1px #3a1a0a" }}
        />
        Rattler — slide back
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#0a2a66] ring-2 ring-[#f5b700]" />
        The bull (us)
      </span>
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 100 100" className="h-3.5 w-3.5">
          <polygon
            points="50,8 61,40 95,40 67,60 78,92 50,72 22,92 33,60 5,40 39,40"
            fill="#f5b700"
            stroke="#0a2a66"
            strokeWidth="6"
          />
        </svg>
        Square 100 — Top 100
      </span>
    </div>
  );
}

function KindBadge({ kind, small }: { kind: Kind; small?: boolean }) {
  const tone = kindTone(kind);
  const Icon = kindIcon(kind);
  const size = small ? "h-7 w-7" : "h-9 w-9";
  const iconSize = small ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.text}`}
    >
      <Icon className={iconSize} />
    </div>
  );
}

function kindIcon(kind: Kind) {
  switch (kind) {
    case "win":
      return Rocket;
    case "setback":
      return Skull;
    case "start":
      return Flag;
    case "goal":
      return Trophy;
    default:
      return Coins;
  }
}

function kindTone(kind: Kind) {
  switch (kind) {
    case "win":
      return { bg: "bg-emerald-500/15", text: "text-emerald-700" };
    case "setback":
      return { bg: "bg-primary/15", text: "text-primary" };
    case "start":
      return { bg: "bg-accent/15", text: "text-accent" };
    case "goal":
      return { bg: "bg-amber-400/20", text: "text-amber-700" };
    default:
      return { bg: "bg-foreground/10", text: "text-foreground" };
  }
}

/* ---------------- Milestone card ---------------- */

function MilestoneCard({
  milestone,
  expanded,
  onToggle,
  onRun,
}: {
  milestone: Milestone;
  expanded: boolean;
  onToggle: () => void;
  onRun: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left hover:bg-surface/60 transition"
      >
        <KindBadge kind={milestone.kind} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-muted-foreground">
              #{milestone.square}
            </span>
            <h3 className="font-display text-lg font-bold">
              {milestone.title}
            </h3>
            {milestone.date && (
              <span className="text-xs text-muted-foreground">
                {milestone.date}
              </span>
            )}
          </div>
          {milestone.price && (
            <div className="mt-1 text-sm">
              <span className="text-muted-foreground">Price at the time: </span>
              <span className="font-mono font-bold text-primary">
                {milestone.price}
              </span>
            </div>
          )}
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRun();
          }}
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-background hover:bg-foreground/85"
        >
          Run bull
          <ArrowRight className="h-3 w-3" />
        </span>
      </button>
      {expanded && (
        <div className="border-t border-border bg-surface/40 px-5 py-5 text-sm leading-relaxed text-foreground/85">
          {milestone.story}
        </div>
      )}
    </div>
  );
}
