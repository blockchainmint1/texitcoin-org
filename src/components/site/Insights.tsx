import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    tag: "Philosophy",
    title: "What is money, and why does it need to be honest?",
    excerpt: "Honest money is the quiet foundation under every free, prosperous society — here's why.",
    read: "8 min",
  },
  {
    tag: "Background",
    title: "TXC: a mission that actually matters",
    excerpt: "A purposeful experiment in putting monetary power back in the hands of real people.",
    read: "5 min",
  },
  {
    tag: "Founder",
    title: "My fourth contribution to the crypto industry",
    excerpt: "TEXITcoin isn't a first rodeo — but it is the first digital asset I've built from scratch.",
    read: "5 min",
  },
];

export function Insights() {
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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/30 via-surface to-accent/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.62_0.22_25/0.35),transparent_60%)]" />
                <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  {p.tag}
                </div>
                <div className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {p.read}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Read more
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
