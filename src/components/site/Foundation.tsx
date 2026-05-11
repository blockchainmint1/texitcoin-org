import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import mining from "@/assets/pillar-mining.jpg";
import currency from "@/assets/pillar-currency.jpg";
import community from "@/assets/pillar-community.jpg";
import leadership from "@/assets/pillar-leadership.jpg";

const PILLARS = [
  {
    tag: "Proof of Work",
    title: "Mining, returned to the people",
    body: "Before institutions captured crypto, individuals mined coins on their own rigs. TXC restores that original spirit with permissioned, Texas-rooted mining.",
    img: mining,
    href: "/proof-of-work",
  },
  {
    tag: "Digital currency",
    title: "Optimized to actually be spent",
    body: "Most chains are too slow or too expensive to use at the counter. TXC is built to stay fast and inexpensive — usable peer-to-peer, every day.",
    img: currency,
    href: "/currency",
  },
  {
    tag: "Participation",
    title: "Value driven by the community",
    body: "Tired of riding the institutional rollercoaster? In TXC, the people who use, mine, and hold the coin shape its value — not Wall Street desks.",
    img: community,
    href: "/value",
  },
  {
    tag: "Leadership",
    title: "A champion for honest money",
    body: "Built with the perspective of two decades of work on alternative and complementary currencies — and a clear, principled mission.",
    img: leadership,
    href: "#foundation",
  },
];

export function Foundation() {
  return (
    <section id="foundation" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Foundation
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
              What makes <span className="text-primary">TEXITcoin</span> different
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            TXC picks up where the early Bitcoin community left off — and rebuilds
            the parts that got captured along the way.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.a
              key={p.tag}
              href={p.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card hover:border-primary/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {p.tag}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{p.body}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-border">
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
