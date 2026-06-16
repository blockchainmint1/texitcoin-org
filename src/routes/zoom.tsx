import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Radio, Calendar, PlayCircle, ChevronRight, Lock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ZoomRegister } from "@/components/site/ZoomRegister";
import { listZoomCalls, type ZoomCall } from "@/lib/zoom.functions";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-12">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-5xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Radio className="h-3 w-3 text-primary animate-pulse" />
              Honest Money Hour · Live Thursdays 7pm CT
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Live{"\u00a0"}Zoom <span className="text-primary">Updates</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Watch the latest call right here, browse the archive with AI
              summaries and full transcripts, and grab your seat for the next
              one.
            </p>
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

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {recorded.length === 0 && (
                <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  Recordings will appear here as calls happen.
                </div>
              )}
              {recorded.map((c) => (
                <ArchiveCard key={c.id} call={c} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
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
            <>\u00a0· {formatDuration(call.duration_seconds)}</>
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
        href="#zoom-register"
        className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-background px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10"
      >
        <Lock className="h-3.5 w-3.5" /> Get link
      </a>
    </div>
  );
}
