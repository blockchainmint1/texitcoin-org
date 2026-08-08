import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSiteStats, type StatsBreakdown } from "@/lib/stats.functions";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Live Site Traffic — TEXITcoin" },
      {
        name: "description",
        content:
          "Open, live traffic stats for texitcoin.org — visitors, pageviews, top pages, sources, and countries. Radical transparency, even in our analytics.",
      },
      { property: "og:title", content: "Live Site Traffic — TEXITcoin" },
      {
        property: "og:description",
        content:
          "Open, live traffic stats for texitcoin.org — visitors, pageviews, top pages, sources, and countries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatsPage,
});

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

function nf(n: number) {
  return n.toLocaleString("en-US");
}

function BarList({ title, items, prefix }: { title: string; items: StatsBreakdown[]; prefix?: string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-4 space-y-2">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No data yet.</p>}
        {items.map((i) => (
          <div key={i.label} className="relative overflow-hidden rounded-md">
            <div
              className="absolute inset-y-0 left-0 bg-primary/15"
              style={{ width: `${(i.value / max) * 100}%` }}
              aria-hidden
            />
            <div className="relative flex items-center justify-between px-3 py-2 text-sm">
              <span className="truncate pr-3">{prefix ? prefix + i.label : i.label}</span>
              <span className="font-semibold tabular-nums">{nf(i.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chart({ data }: { data: { day: string; visitors: number; pageviews: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.pageviews));
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">
        Daily traffic
      </h3>
      {data.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No data yet — stats begin collecting from launch.
        </p>
      ) : (
        <div className="mt-6 flex h-56 items-end gap-1">
          {data.map((d) => (
            <div key={d.day} className="group relative flex-1">
              <div
                className="w-full rounded-t bg-primary/25"
                style={{ height: `${(d.pageviews / max) * 200}px` }}
              />
              <div
                className="absolute bottom-0 w-full rounded-t bg-primary"
                style={{ height: `${(d.visitors / max) * 200}px` }}
              />
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-2 py-1 text-xs shadow-card group-hover:block">
                {d.day}: {nf(d.visitors)} visitors · {nf(d.pageviews)} views
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-primary" /> Visitors
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded bg-primary/25" /> Pageviews
        </span>
      </div>
    </div>
  );
}

function StatsPage() {
  const [days, setDays] = useState(30);
  const { data, isLoading } = useQuery({
    queryKey: ["site-stats", days],
    queryFn: () => getSiteStats({ data: { days } }),
    refetchInterval: 60_000,
  });

  const totals = data?.totals;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-40">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">
          Radical transparency
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Live Site Traffic
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every visit to texitcoin.org, counted in the open. No personal data, no third-party
          trackers — just anonymous counts we store ourselves.
        </p>

        <div className="mt-8 flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                days === r.days
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Visitors", value: totals?.visitors },
            { label: "Pageviews", value: totals?.pageviews },
            { label: "Pages viewed", value: totals?.pages },
            { label: "Countries", value: totals?.countries },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-2 font-display text-3xl font-bold tabular-nums">
                {isLoading ? "—" : nf(s.value ?? 0)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Chart data={data?.daily ?? []} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <BarList title="Top pages" items={data?.topPages ?? []} />
          <BarList title="Traffic sources" items={data?.sources ?? []} />
          <BarList title="Countries" items={data?.countries ?? []} />
          <BarList title="Devices" items={data?.devices ?? []} />
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Counts refresh every minute. Sessions are anonymous and reset when you close your browser
          tab; we store no IP addresses, cookies, or identifiers.
        </p>
      </main>
      <Footer />
    </div>
  );
}
