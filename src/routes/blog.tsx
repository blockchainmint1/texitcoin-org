import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { posts, getPostImage } from "@/data/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — TEXITcoin News & Updates" },
      {
        name: "description",
        content:
          "News, philosophy, and updates from the TEXITcoin team — honest money, mined in Texas.",
      },
      { property: "og:title", content: "TEXITcoin Blog" },
      {
        property: "og:description",
        content: "News and notes from the TEXITcoin team.",
      },
    ],
  }),
  component: BlogIndex,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogIndex() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Blog
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold leading-tight md:text-6xl">
              Latest <span className="text-primary">TEXITcoin</span> news & updates
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Honest writing on honest money — philosophy, strategy, and behind-the-scenes notes from the team.
            </p>
          </div>

          {/* Featured */}
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-14 grid overflow-hidden rounded-2xl border border-border bg-card shadow-card md:grid-cols-2"
          >
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={getPostImage(featured)}
                alt=""
                width={1280}
                height={832}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Featured · {featured.tag}
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {formatDate(featured.date)} · {featured.readMinutes} min read
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
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
                    <div className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 text-xs text-background/0 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] text-white">
                      <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {formatDate(p.date)}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read more
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
