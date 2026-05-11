import { Quote as QuoteIcon } from "lucide-react";

export function Quote() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <QuoteIcon className="mx-auto h-10 w-10 text-primary" />
        <blockquote className="mt-6 font-display text-2xl leading-relaxed md:text-4xl text-balance">
          “Whenever destroyers appear among men, they start by destroying money —
          for money is the base of a moral existence.”
        </blockquote>
        <div className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          — Francisco d&apos;Anconia · Atlas Shrugged
        </div>
      </div>
    </section>
  );
}
