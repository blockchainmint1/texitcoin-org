import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useQueryClient } from "@tanstack/react-query";
import { Radio, Calendar, PlayCircle, ChevronRight, Search, X, ChevronLeft } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ZoomRegister } from "@/components/site/ZoomRegister";
import { LiveStage } from "@/components/site/LiveStage";
import { listZoomCalls, type ZoomCall } from "@/lib/zoom.functions";
import { supabase } from "@/integrations/supabase/client";

const PAGE_SIZE = 6;
type SortKey = "newest" | "oldest" | "longest" | "shortest";

const zoomListQuery = queryOptions({
  queryKey: ["zoom-calls"],
  queryFn: () => listZoomCalls(),
});

export const Route = createFileRoute("/zoom")({
  head: () => ({
    meta: [
      { title: "Live Updates — TEXITcoin Honest Money Hour" },
      {
        name: "description",
        content:
          "Watch the latest Honest Money Hour with Bobby Gray, browse past recordings with AI summaries and transcripts, and register for the next live Zoom call.",
      },
      { property: "og:title", content: "Live Updates — TEXITcoin Honest Money Hour" },
      {
        property: "og:description",
        content:
          "Live every Thursday at 7pm Central. Watch past calls, read AI summaries, and register for the next one.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/zoom" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(zoomListQuery),
  errorComponent: ZoomErrorComponent,
  notFoundComponent: () => <div className="p-12 text-center">Not found.</div>,
  component: ZoomIndex,
});

function ZoomErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Couldn't load the call list.</h1>
        <p className="mt-3 text-muted-foreground">
          Something glitched fetching the schedule. Give it another shot.
        </p>
        <button
          onClick={() => {
            reset();
            router.invalidate();
          }}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-red-gradient px-6 text-sm font-semibold uppercase tracking-wider text-primary-foreground"
        >
          Try again
        </button>
      </main>
      <Footer />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}


function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function formatDuration(s: number | null) {
  if (!s) return null;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function ZoomIndex() {
  const { data } = useSuspenseQuery(zoomListQuery);
  const { upcoming, recorded, latest } = data;
  const queryClient = useQueryClient();

  // Live updates: re-fetch the list whenever zoom_calls changes in the DB.
  useEffect(() => {
    const channel = supabase
      .channel("zoom_calls-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "zoom_calls" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["zoom-calls"] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-6xl px-6">
            <LiveStage />
          </div>
        </section>

        {/* Latest recording */}
        {latest && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
                {/* Left: video */}
                {latest.video_cid ? (
                  <figure className="overflow-hidden rounded-2xl border border-border bg-black shadow-card">
                    <div
                      className="relative aspect-video w-full bg-cover bg-center"
                      style={
                        latest.thumbnail_url
                          ? { backgroundImage: `url(${latest.thumbnail_url})` }
                          : undefined
                      }
                    >
                      <iframe
                        src={`https://streamtxc.com/embed/${latest.video_cid}`}
                        title={latest.title}
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </figure>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                    Recording is processing — check back shortly.
                  </div>
                )}

                {/* Right: meta */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Most Recent Call
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                    {latest.title}
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    {formatDate(latest.call_date)}
                    {latest.duration_seconds && (
                      <>{"\u00a0"}· {formatDuration(latest.duration_seconds)?.toLowerCase()}</>
                    )}
                  </p>
                  {latest.summary && (
                    <p className="mt-5 line-clamp-4 text-base leading-relaxed text-foreground/80">
                      {latest.summary.split(/\n\n|(?<=\.)\s+/).slice(0, 2).join(" ")}
                    </p>
                  )}
                  <Link
                    to="/zoom/$slug"
                    params={{ slug: latest.slug }}
                    className="mt-6 inline-flex items-center gap-1 rounded-md bg-red-gradient px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground"
                  >
                    Open full recording <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

            </div>
          </section>
        )}


        {/* Two-column: upcoming + register */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <Calendar className="h-4 w-4" /> Upcoming schedule
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  What's coming up
                </h2>
                <div className="mt-6 space-y-3">
                  <NextThursdayRow />
                  {upcoming.map((c) => (
                    <UpcomingRow key={c.id} call={c} />
                  ))}
                </div>
              </div>
              <ZoomRegister />
            </div>
          </div>
        </section>

        {/* Archive */}
        <ArchiveSection recorded={recorded} />
      </main>
      <Footer />
    </div>
  );
}

function ArchiveSection({ recorded }: { recorded: ZoomCall[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = recorded;
    if (q) {
      list = list.filter((c) => {
        const hay = [c.title, c.description ?? "", c.summary ?? ""]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }
    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return +new Date(a.call_date) - +new Date(b.call_date);
        case "longest":
          return (b.duration_seconds ?? 0) - (a.duration_seconds ?? 0);
        case "shortest":
          return (a.duration_seconds ?? Infinity) - (b.duration_seconds ?? Infinity);
        case "newest":
        default:
          return +new Date(b.call_date) - +new Date(a.call_date);
      }
    });
    return sorted;
  }, [recorded, query, sort]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const showingFrom = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(currentPage * PAGE_SIZE, filtered.length);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          <PlayCircle className="h-4 w-4" /> The archive
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Past recordings
        </h2>
        <p className="mt-2 text-muted-foreground">
          Every call, with an AI summary and the full transcript.
        </p>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, summaries, transcripts…"
              aria-label="Search archive"
              className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-9 text-sm placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="zoom-sort" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sort
            </label>
            <select
              id="zoom-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 rounded-md border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="longest">Longest first</option>
              <option value="shortest">Shortest first</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
          {filtered.length === 0
            ? query
              ? `No matches for "${query}"`
              : "No recordings yet"
            : `Showing ${showingFrom}–${showingTo} of ${filtered.length}${query ? ` matching "${query}"` : ""}`}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {pageItems.length === 0 && filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground md:col-span-2">
              {query ? (
                <>
                  Nothing matches that search.{" "}
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Clear search
                  </button>
                  .
                </>
              ) : (
                "Recordings will appear here as calls happen."
              )}
            </div>
          )}
          {pageItems.map((c) => (
            <ArchiveCard key={c.id} call={c} />
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onChange={(p) => {
              setPage(p);
              // Scroll archive into view nicely
              if (typeof window !== "undefined") {
                document
                  .getElementById("zoom-archive-top")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          />
        )}
        <div id="zoom-archive-top" className="sr-only" />
      </div>
    </section>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  const pages: (number | "…")[] = [];
  const push = (v: number | "…") => pages.push(v);
  const add = new Set<number>([1, pageCount, page - 1, page, page + 1]);
  const sorted = Array.from(add).filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) push("…");
    push(n);
    prev = n;
  }
  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Archive pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:border-primary/50"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium " +
              (p === page
                ? "bg-red-gradient text-primary-foreground"
                : "border border-border bg-card hover:border-primary/50")
            }
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:border-primary/50"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function UpcomingRow({ call }: { call: ZoomCall }) {
  const isLive = call.status === "live";
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
              Live now
            </span>
          )}
          <div className="font-display text-lg font-semibold">{call.title}</div>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {formatDate(call.call_date)} · {formatTime(call.call_date)}
        </div>
      </div>
      {isLive && call.video_cid ? (
        <Link
          to="/zoom/$slug"
          params={{ slug: call.slug }}
          className="inline-flex items-center gap-1 rounded-md bg-red-gradient px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground"
        >
          Watch
        </Link>
      ) : null}
    </div>
  );
}

function ArchiveCard({ call }: { call: ZoomCall }) {
  return (
    <Link
      to="/zoom/$slug"
      params={{ slug: call.slug }}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50 hover:shadow-card"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {call.thumbnail_url ? (
          <img
            src={call.thumbnail_url}
            alt={call.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-muted-foreground">
            <PlayCircle className="h-12 w-12" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {formatDate(call.call_date)}
          {formatDuration(call.duration_seconds) && (
            <>{"\u00a0"}· {formatDuration(call.duration_seconds)}</>
          )}
        </div>
        <div className="mt-1 font-display text-lg font-semibold group-hover:text-primary">
          {call.title}
        </div>
        {call.summary && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {call.summary}
          </p>
        )}
      </div>
    </Link>
  );
}

function nextThursday7pmCT(): Date {
  // Find the next date whose Chicago local time is Thursday at/after 19:00.
  const now = new Date();
  for (let i = 0; i < 8; i++) {
    const candidate = new Date(now.getTime() + i * 86400000);
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      hour: "numeric",
      hour12: false,
    }).formatToParts(candidate);
    const weekday = parts.find((p) => p.type === "weekday")?.value;
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
    if (weekday === "Thu" && (i > 0 || hour < 19)) {
      // Build an ISO-ish date for that Thursday at 19:00 CT.
      const ymd = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(candidate); // YYYY-MM-DD
      // Determine CT offset (CDT=-05, CST=-06) for that date at 19:00.
      const probe = new Date(`${ymd}T19:00:00Z`);
      const tzName = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        timeZoneName: "short",
      })
        .formatToParts(probe)
        .find((p) => p.type === "timeZoneName")?.value;
      const offset = tzName === "CDT" ? "-05:00" : "-06:00";
      return new Date(`${ymd}T19:00:00${offset}`);
    }
  }
  return now;
}

function NextThursdayRow() {
  const date = nextThursday7pmCT();
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
  const timeLabel = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/Chicago",
  });
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/40 bg-primary/5 p-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            Recurring
          </span>
          <div className="font-display text-lg font-semibold">
            Honest Money Hour
          </div>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {dateLabel} · {timeLabel}
        </div>
      </div>
      <a
        href="#live-reminder"
        className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-background px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10"
      >
        <BellRing className="h-3.5 w-3.5" /> Remind me
      </a>
    </div>
  );
}
