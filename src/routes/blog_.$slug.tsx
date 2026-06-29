import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowUpRight, Clock, User } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getPostImage, getSecondaryImage } from "@/data/blog-images";
import { getBlogPost, listBlogPosts } from "@/lib/blog.functions";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPost({ data: { slug } }),
    staleTime: 60_000,
  });

const relatedQuery = queryOptions({
  queryKey: ["blog-posts"],
  queryFn: () => listBlogPosts(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params, context }) => {
    const [post] = await Promise.all([
      context.queryClient.ensureQueryData(postQuery(params.slug)),
      context.queryClient.ensureQueryData(relatedQuery),
    ]);
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Post — TEXITcoin" }] };
    const url = `https://texitcoin.org/blog/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} — TEXITcoin` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            url,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-40 pb-24 mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-display text-5xl font-bold">Post not found</h1>
        <p className="mt-4 text-muted-foreground">
          That article doesn't exist (yet).
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 text-primary font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the blog
        </Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">This article couldn't be loaded. Please try again.</p>
      </div>
    </div>
  ),
  component: BlogPostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  const { data: posts } = useSuspenseQuery(relatedQuery);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <article className="pt-32 pb-16">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-primary font-semibold">{post.tag}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground text-balance">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">{post.author}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Founder, TEXITcoin
                </div>
              </div>
            </div>
          </div>

          <div className="relative my-12 h-64 md:h-[28rem] overflow-hidden">
            <img
              src={getPostImage(post)}
              alt=""
              width={1280}
              height={832}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="mx-auto max-w-3xl px-6">
            <div className="prose-content space-y-6 text-lg leading-relaxed text-foreground/90 [&_p]:my-0 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
              {(() => {
                const blocks = post.bodyMarkdown
                  .split(/\n{2,}/)
                  .map((b) => b.trim())
                  .filter(Boolean);
                const insertImageAt = Math.floor(blocks.length / 2);
                const insertPullquoteAt = Math.min(2, blocks.length - 1);
                return blocks.map((block, i) => (
                  <div key={i} className="space-y-6">
                    <ReactMarkdown>{block}</ReactMarkdown>
                    {i === insertPullquoteAt && blocks.length > 4 && (
                      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 font-display text-2xl leading-snug text-foreground/90 italic">
                        {post.excerpt}
                      </blockquote>
                    )}
                    {i === insertImageAt && blocks.length > 5 && (
                      <figure className="my-10 -mx-6 md:mx-0">
                        <div className="relative h-56 md:h-80 overflow-hidden rounded-2xl">
                          <img
                            src={getSecondaryImage(post)}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      </figure>
                    )}
                  </div>
                ));
              })()}
            </div>

            <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                Get involved
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold">
                Mine, hold, and use TXC.
              </h3>
              <p className="mt-3 text-muted-foreground">
                TEXITcoin is built by people who actually use it. Join the network — every miner and merchant strengthens the foundation.
              </p>
              <Link
                to="/"
                hash="ecosystem"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Join the ecosystem
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>

        <section className="bg-surface/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Keep reading
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                All articles <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow transition-shadow"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={getPostImage(p)}
                      alt=""
                      width={1280}
                      height={832}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                      {p.tag}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
