import { motion } from "framer-motion";
import { Gavel, Sparkles, ScrollText, Shield, ExternalLink } from "lucide-react";
import type { Entry } from "@/data/legal-timeline";

export const TONE_STYLES: Record<
  NonNullable<Entry["tone"]>,
  { label: string; bg: string; icon: typeof Gavel }
> = {
  win: {
    label: "Win",
    bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    icon: Sparkles,
  },
  filing: {
    label: "PAINFUL",
    bg: "bg-primary/15 text-primary border-primary/30",
    icon: ScrollText,
  },
  context: {
    label: "Context",
    bg: "bg-accent/15 text-accent border-accent/30",
    icon: Shield,
  },
  regulator: {
    label: "Regulator",
    bg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: Gavel,
  },
};

export function LegalTimeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative mt-14 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border md:before:left-[27px]">
      {entries.map((e, i) => {
        const tone = TONE_STYLES[e.tone ?? "filing"];
        const Icon = tone.icon;
        return (
          <motion.li
            key={`${e.date}-${e.title}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            className="relative pl-12 md:pl-20"
          >
            <span
              className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 ${tone.bg} md:h-14 md:w-14`}
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {e.date}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone.bg}`}
                >
                  {e.tag ?? tone.label}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug md:text-2xl">
                {e.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{e.body}</p>
              {e.link && !e.link.dead && (
                <a
                  href={e.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  {e.link.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {e.link?.dead && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-muted-foreground line-through">
                    {e.link.label}
                  </span>
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 transition hover:bg-amber-500/25 hover:text-amber-200"
                  >
                    {e.link.deadNote}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {e.secondaryLink && (
                <a
                  href={e.secondaryLink.href}
                  className="mt-3 block text-sm font-semibold text-primary hover:underline"
                >
                  {e.secondaryLink.label}
                </a>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
