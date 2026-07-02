import { Eye, Megaphone, ShieldCheck, Zap, Scale, Gem } from "lucide-react";

const pillars = [
  {
    icon: <Megaphone className="h-5 w-5 text-primary" />,
    text: "We open the books, share the calls, and say the quiet parts out loud. If we know it, you know it.",
  },
  {
    icon: <Eye className="h-5 w-5 text-primary" />,
    text: "Hard news included. You may not always like what you hear, but you'll never wonder if we're holding back.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    text: "Risk and trust built this community. Transparency is how we prove that trust wasn't misplaced.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    text: "No waiting for the press release. When we know something worth sharing, it goes live — usually before the dust settles.",
  },
  {
    icon: <Scale className="h-5 w-5 text-primary" />,
    text: "People ask how much transparency is too much. Our answer: we'd rather overshare than leave you guessing.",
  },
  {
    icon: <Gem className="h-5 w-5 text-primary" />,
    text: "In an era of AI slop and scripted sincerity, authenticity is scarce. Consider this your weekly dose of something real.",
  },
];

export function BrutalTransparency() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl text-balance">
            Brural{" "}
            <span className="text-primary">Transparency</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            No spin. No filters. Just the facts — raw, real, and on the record.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-card"
            >
              <div className="mt-0.5 flex-shrink-0">{p.icon}</div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Big quote callout */}
        <div className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-12 text-center md:px-16 md:py-16">
            <div
              className="absolute inset-0 -z-10 opacity-40"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
            <blockquote className="mx-auto max-w-3xl font-display text-2xl font-bold leading-snug md:text-3xl lg:text-4xl text-balance">
              “In a time of deceit, telling the truth is a{" "}
              <span className="text-primary">revolutionary act</span>."
            </blockquote>
            <div className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              — Orwell
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
