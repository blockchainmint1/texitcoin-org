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

// PLACEHOLDER content — replace with real history as it comes in.
const MILESTONES: Milestone[] = [
  {
    square: 1,
    title: "Genesis",
    date: "Day one",
    price: "$0.00",
    kind: "start",
    icon: "Flag",
    story:
      "The first block. Texas power, Texas land, Texas hands — a network built to benefit individuals, not banks.",
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
  // examples — fill in as setbacks/wins land
  // { from: 14, to: 36, type: "ladder", label: "First listing" },
  // { from: 72, to: 24, type: "chute",  label: "SEC FUD knocked us back" },
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
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-foreground/20 bg-[linear-gradient(135deg,oklch(0.96_0.02_90),oklch(0.92_0.03_60))] shadow-card">
      {/* subtle leather grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #000 1px, transparent 1px), radial-gradient(circle at 70% 80%, #000 1px, transparent 1px)",
          backgroundSize: "18px 18px, 22px 22px",
        }}
      />

      {/* Grid of squares */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {rows.flat().map((n) => {
          const m = milestonesBySquare.get(n);
          const isMilestone = !!m;
          const isActive = activeSquare === n;
          // checker tint
          const { col, rowFromBottom } = squareToGrid(n);
          const dark = (col + rowFromBottom) % 2 === 0;
          return (
            <button
              key={n}
              onClick={() => onSquareClick(n)}
              disabled={!isMilestone}
              className={`relative border border-foreground/10 transition ${
                dark ? "bg-foreground/[0.03]" : "bg-transparent"
              } ${
                isMilestone
                  ? "cursor-pointer hover:bg-primary/10"
                  : "cursor-default"
              } ${isActive ? "ring-2 ring-primary ring-inset z-10" : ""}`}
              title={m ? `${m.title}${m.price ? ` — ${m.price}` : ""}` : `Square ${n}`}
            >
              <span className="absolute left-1 top-1 text-[9px] font-mono text-foreground/40">
                {n}
              </span>
              {isMilestone && <SquareContent m={m} />}
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
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <BullToken />
      </motion.div>
    </div>
  );
}

function SquareContent({ m }: { m: Milestone }) {
  const Icon = m.icon ? ICONS[m.icon] : kindIcon(m.kind);
  const tone = kindTone(m.kind);
  return (
    <div className="absolute inset-1 flex flex-col items-center justify-center gap-0.5 rounded-md p-1">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${tone.bg} ${tone.text} shadow-sm`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      {m.price && (
        <div className="text-[8px] font-mono font-bold text-foreground/80 leading-none">
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
    <g stroke="oklch(0.45 0.12 50)" strokeWidth={0.6} strokeLinecap="round">
      <line x1={ax1} y1={ay1} x2={bx1} y2={by1} />
      <line x1={ax2} y1={ay2} x2={bx2} y2={by2} />
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
            strokeWidth={0.4}
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
  const wobble = Math.min(12, len * 0.25);
  const c1x = mx + nx * wobble;
  const c1y = my + ny * wobble;
  const c2x = mx - nx * wobble;
  const c2y = my - ny * wobble;
  const d = `M ${ax} ${ay} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${bx} ${by}`;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="oklch(0.55 0.18 25)"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke="oklch(0.85 0.12 90)"
        strokeWidth={0.6}
        strokeDasharray="0.6 1.2"
        strokeLinecap="round"
      />
      {/* head */}
      <circle cx={bx} cy={by} r={1.4} fill="oklch(0.55 0.18 25)" />
      {/* tail rattle */}
      <circle cx={ax} cy={ay} r={0.6} fill="oklch(0.35 0.05 60)" />
    </g>
  );
}

/* ---------------- Bull token ---------------- */

function BullToken() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-[0_4px_12px_rgba(0,0,0,0.35)] ring-2 ring-primary">
      {/* simple bull glyph */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 6c0-1 1-2 2-2 1.5 0 2.5 1 3 2l1 2h4l1-2c.5-1 1.5-2 3-2 1 0 2 1 2 2 0 2-1 3-2 4 0 4-3 7-6 7s-6-3-6-7c-1-1-2-2-2-4zm6 8a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    </div>
  );
}

/* ---------------- Legend, badges, helpers ---------------- */

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className="inline-block h-2 w-6 rounded-full bg-[oklch(0.45_0.12_50)]" />
        Rope ladder — a leap forward
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block h-2 w-6 rounded-full bg-[oklch(0.55_0.18_25)]" />
        Rattlesnake — knocked us back
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-full bg-foreground ring-2 ring-primary" />
        The bull (that's us)
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
