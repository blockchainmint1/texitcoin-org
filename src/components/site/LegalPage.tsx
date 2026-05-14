import { motion } from "framer-motion";

export type Section = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  sections: Section[];
};

export function LegalPage({ eyebrow, title, lede, updated, sections }: LegalPageProps) {
  return (
    <main className="pt-32 pb-24">
      <section className="mx-auto max-w-3xl px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </div>
        <h1 className="mt-3 font-display text-5xl font-bold leading-tight md:text-6xl text-balance">
          {title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground text-balance">
          {lede}
        </p>
        <div className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Last updated · {updated}
        </div>

        <div className="mt-16 space-y-12">
          {sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
              className="border-t border-border pt-8"
            >
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
            Questions?
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold">
            Talk to a real human.
          </h3>
          <p className="mt-3 text-muted-foreground">
            If anything here is unclear, reach out on{" "}
            <a
              href="https://x.com/texitcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              X / Twitter
            </a>
            . We'd rather answer the question than have you guess.
          </p>
        </div>
      </section>
    </main>
  );
}
