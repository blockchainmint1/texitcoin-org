import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, Calendar, FileText, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getZoomCall } from "@/lib/zoom.functions";

const callQuery = (slug: string) =>
  queryOptions({
    queryKey: ["zoom-call", slug],
    queryFn: () => getZoomCall({ data: { slug } }),
  });

export const Route = createFileRoute("/zoom/$slug")({
  loader: async ({ params, context }) => {
    const call = await context.queryClient.ensureQueryData(callQuery(params.slug));
    if (!call) throw notFound();
    return call;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Honest Money Hour` },
          {
            name: "description",
            content:
              loaderData.summary?.slice(0, 160) ??
              `Recording of the Honest Money Hour call on ${new Date(loaderData.call_date).toLocaleDateString()}.`,
          },
          { property: "og:title", content: `${loaderData.title} — Honest Money Hour` },
          {
            property: "og:description",
            content:
              loaderData.summary?.slice(0, 200) ??
              "Watch the recording, read the AI summary and full transcript.",
          },
          ...(loaderData.thumbnail_url
            ? [
                { property: "og:image", content: loaderData.thumbnail_url },
                { name: "twitter:image", content: loaderData.thumbnail_url },
              ]
            : []),
        ]
      : [{ title: "Honest Money Hour" }],
  }),
  errorComponent: ZoomCallError,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Call not found.</h1>
        <p className="mt-3 text-muted-foreground">
          That recording doesn't exist (yet).
        </p>
        <Link
          to="/zoom"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold"
        >
          Back to Live Updates
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: ZoomCallPage,
});

function ZoomCallError({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Couldn't load this call.</h1>
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

function ZoomCallPage() {
  const { slug } = Route.useParams();
  const { data: call } = useSuspenseQuery(callQuery(slug));
  if (!call) return null;

  const date = new Date(call.call_date);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="relative border-b border-border pt-32 pb-10">
          <div
            className="absolute inset-0 -z-10 opacity-50"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-5xl px-6">
            <Link
              to="/zoom"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" /> All calls
            </Link>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl text-balance">
              {call.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> {dateStr}
            </p>
            {call.description && (
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                {call.description}
              </p>
            )}
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-10">
            {call.video_cid ? (
              <figure className="overflow-hidden rounded-2xl border border-border bg-black shadow-card">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={`https://streamtxc.com/embed/${call.video_cid}`}
                    title={call.title}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </figure>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                {call.status === "upcoming"
                  ? "This call hasn't happened yet — register on the main page to get the Zoom link."
                  : "Recording is processing — check back shortly."}
              </div>
            )}
          </div>
        </section>

        {call.summary && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-4 w-4" /> AI Summary
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-card p-6 md:p-8">
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
                  {call.summary}
                </p>
              </div>
            </div>
          </section>
        )}

        {call.transcript && (
          <section>
            <div className="mx-auto max-w-5xl px-6 py-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <FileText className="h-4 w-4" /> Full transcript
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-card p-6 md:p-8">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground/85">
                  {call.transcript}
                </pre>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
