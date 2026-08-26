import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEARCH_ENTRIES } from "@/data/search-index";
import { listBlogPosts } from "@/lib/blog.functions";
import { searchZoomCalls } from "@/lib/zoom.functions";

const blogListQuery = queryOptions({
  queryKey: ["blog-posts"],
  queryFn: () => listBlogPosts(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): { q: string } => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(blogListQuery),
  head: () => ({
    meta: [
      { title: "Search — TEXITcoin" },
      {
        name: "description",
        content:
          "Search every page, guide, and blog post on texitcoin.org — mining, wallets, legal updates, and honest money.",
      },
      { property: "og:title", content: "Search TEXITcoin" },
      {
        property: "og:description",
        content: "Find pages, guides, and articles across texitcoin.org.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

type Result = {
  key: string;
  title: string;
  kind: string;
  snippet: string;
  to: string;
  params?: Record<string, string>;
  score: number;
};

function snippetFor(text: string, terms: string[]) {
  const plain = text.replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  const lower = plain.toLowerCase();
  const hit = terms.map((t: string) => lower.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (hit === undefined) return plain.slice(0, 220);
  const start = Math.max(0, hit - 80);
  return (start > 0 ? "…" : "") + plain.slice(start, start + 240).trim() + "…";
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((part, i) =>
        terms.includes(part.toLowerCase()) ? (
          <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: posts } = useSuspenseQuery(blogListQuery);

  const query = q.trim().slice(0, 120);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const { data: zoomHits = [], isLoading: zoomLoading } = useQuery({
    queryKey: ["zoom-search", query],
    queryFn: () => searchZoomCalls({ data: { q: query } }),
    enabled: query.length >= 2,
    staleTime: 60_000,
  });

  const results: Result[] = [];
  if (terms.length) {
    for (const e of SEARCH_ENTRIES) {
      const hay = `${e.label} ${e.keywords ?? ""} ${e.description ?? ""}`.toLowerCase();
      const matched = terms.filter((t) => hay.includes(t));
      if (matched.length === terms.length) {
        results.push({
          key: e.to,
          title: e.label,
          kind: e.group,
          snippet: e.description ?? "",
          to: e.to,
          score: 100 + (e.label.toLowerCase().includes(terms[0]) ? 50 : 0),
        });
      }
    }
    for (const p of posts) {
      const hay = `${p.title} ${p.tag} ${p.excerpt} ${p.bodyMarkdown}`.toLowerCase();
      const matched = terms.filter((t) => hay.includes(t));
      if (matched.length === terms.length) {
        results.push({
          key: `blog-${p.slug}`,
          title: p.title,
          kind: "Blog",
          snippet: snippetFor(`${p.excerpt} ${p.bodyMarkdown}`, terms),
          to: "/blog/$slug",
          params: { slug: p.slug },
          score: 80 + (p.title.toLowerCase().includes(terms[0]) ? 50 : 0),
        });
      }
    }
    for (const z of zoomHits) {
      results.push({
        key: `zoom-${z.slug}`,
        title: z.title,
        kind: z.matchedTranscript ? "Zoom transcript" : "Zoom call",
        snippet: z.snippet,
        to: "/zoom/$slug",
        params: { slug: z.slug },
        score: 70 + (z.title.toLowerCase().includes(terms[0]) ? 50 : 0),
      });
    }
    results.sort((a, b) => b.score - a.score);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Search</div>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Search <span className="text-primary">texitcoin.org</span>
          </h1>

          <form
            className="relative mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              const value = new FormData(e.currentTarget).get("q");
              navigate({ search: { q: String(value ?? "") } });
            }}
          >
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              key={query}
              name="q"
              defaultValue={query}
              autoFocus
              placeholder="Search pages and articles…"
              aria-label="Search the site"
              className="w-full rounded-xl border border-border bg-card py-4 pl-11 pr-28 text-base outline-none transition focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Search
            </button>
          </form>

          {query ? (
            <p className="mt-6 text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
              {zoomLoading ? " · searching call transcripts…" : ""}
            </p>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Type a term above, or press ⌘K anywhere on the site for the quick jump palette.
            </p>
          )}

          <div className="mt-6 space-y-4">
            {results.map((r) => (
              <Link
                key={r.key}
                to={r.to}
                params={r.params as never}
                className="group block rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-glow"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {r.kind}
                </div>
                <h2 className="mt-2 flex items-center gap-2 font-display text-xl font-bold leading-snug">
                  <Highlight text={r.title} terms={terms} />
                  <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h2>
                {r.snippet && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    <Highlight text={r.snippet} terms={terms} />
                  </p>
                )}
              </Link>
            ))}
          </div>

          {query && results.length === 0 && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-display text-xl font-bold">No matches for “{query}”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a broader term, or browse the{" "}
                <Link to="/blog" className="text-primary underline">
                  blog
                </Link>{" "}
                and{" "}
                <Link to="/faq" className="text-primary underline">
                  FAQ
                </Link>
                .
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
