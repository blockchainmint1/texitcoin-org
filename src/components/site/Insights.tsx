import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, ArrowUpRight } from "lucide-react";
import { getPostImage } from "@/data/blog-images";
import { listBlogPosts } from "@/lib/blog.functions";

export function Insights() {
  const { data } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listBlogPosts(),
    staleTime: 60_000,
  });
  const featured = (data ?? []).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="insights" className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Insights
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              Notes from the <span className="text-primary">TEXITcoin team</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow transition-shadow"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={getPostImage(p)}
                    alt=""
                    width={1280}
                    height={832}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    {p.tag}
                  </div>
                  <div className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 text-xs text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                    <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
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
      </div>
    </section>
  );
}
