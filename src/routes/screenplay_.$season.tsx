import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clapperboard, Info } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PitchDialog } from "@/components/site/PitchDialog";
import { getSeason } from "@/lib/screenplay.functions";

const seasonQuery = (slug: string) =>
  queryOptions({
    queryKey: ["screenplay-season", slug],
    queryFn: () => getSeason({ data: { slug } }),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/screenplay_/$season")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(seasonQuery(params.season)),
  head: ({ loaderData }) => {
    const season = loaderData?.season;
    const title = season
      ? `Season ${season.number}: ${season.title} — TEXITcoin: The Series`
      : "Season treatment — TEXITcoin: The Series";
    const description =
      season?.logline ??
      "A season treatment from the TEXITcoin series bible.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">Couldn't load this season</h1>
        <Link to="/screenplay" className="mt-4 inline-block text-primary underline">
          Back to the series bible
        </Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">No such season</h1>
        <Link to="/screenplay" className="mt-4 inline-block text-primary underline">
          Back to the series bible
        </Link>
      </div>
    </div>
  ),
  component: SeasonPage,
});

function SeasonPage() {
  const { season: slug } = Route.useParams();
  const { data } = useSuspenseQuery(seasonQuery(slug));
  const { season, beats } = data;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <Link
            to="/screenplay"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Series bible
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5">
              <Clapperboard className="h-3 w-3" />
              Season {season.number}
            </span>
            <span>{season.era}</span>
          </div>

          <h1 className="mt-5 font-display text-5xl md:text-6xl font-bold leading-none">
            {season.title}
          </h1>
          <p className="mt-3 text-lg text-primary">{season.subtitle}</p>

          <p className="mt-8 text-xl leading-relaxed text-foreground/90">
            {season.logline}
          </p>

          <div className="mt-10 prose prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
            <ReactMarkdown>{season.introMarkdown}</ReactMarkdown>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-3xl font-bold">The beats</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Treatment order, not episode order. Episodes get broken out once the
              shape holds.
            </p>

            <ol className="mt-10 space-y-12">
              {beats.map((beat, i) => (
                <li key={beat.id} className="relative pl-12">
                  <span className="absolute left-0 top-1 font-mono text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-bold">{beat.title}</h3>
                  <div className="mt-3 prose prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-em:text-foreground/90 prose-strong:text-foreground">
                    <ReactMarkdown>{beat.body}</ReactMarkdown>
                  </div>
                  {beat.credit && (
                    <p className="mt-3 text-xs font-mono uppercase tracking-widest text-primary">
                      Contributed by {beat.credit}
                    </p>
                  )}
                  <div className="mt-3">
                    <PitchDialog
                      seasonSlug={season.slug}
                      beatId={beat.id}
                      beatTitle={beat.title}
                      defaultKind="note"
                      trigger={
                        <button className="text-xs font-mono uppercase tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground">
                          Add a note to this beat
                        </button>
                      }
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {season.honestyNote && (
            <aside className="mt-16 rounded-2xl border border-border bg-card/50 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                What's real, what's television
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {season.honestyNote}
              </p>
            </aside>
          )}

          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8">
            <h2 className="font-display text-2xl font-bold">Got a note?</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Wrong detail, missing scene, better character, a photo or a clip from the
              actual day. Pitch it rough — AI drafts it in the house voice, you edit it,
              and every approved contribution gets credited right here on the beat.
            </p>
            <div className="mt-6">
              <PitchDialog seasonSlug={season.slug} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
