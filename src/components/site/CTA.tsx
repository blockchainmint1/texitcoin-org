import { ArrowRight, Star } from "lucide-react";

export function CTA() {
  return (
    <section id="get" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16 shadow-card">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                <Star className="h-4 w-4 fill-primary" /> Ready when you are
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-balance">
                Honest money is a <span className="text-primary">choice.</span>
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
                Open a wallet, point a miner at the pool, or pick up your first TXC
                on an exchange. Small steps — but they&apos;re yours.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="group inline-flex items-center justify-between rounded-md bg-red-gradient px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110 transition"
              >
                Get TXC now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#ecosystem"
                className="group inline-flex items-center justify-between rounded-md border border-accent/60 px-6 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-accent/10 transition"
              >
                Explore the ecosystem
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
