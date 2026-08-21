import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Users, PenLine } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { listSeasons } from "@/lib/screenplay.functions";

const seasonsQuery = queryOptions({
  queryKey: ["screenplay-seasons"],
  queryFn: () => listSeasons(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/screenplay")({
  loader: ({ context }) => context.queryClient.ensureQueryData(seasonsQuery),
  head: () => ({
    meta: [
      { title: "The Screenplay — TEXITcoin: The Series" },
      {
        name: "description",
        content:
          "The series bible for TEXITcoin: three seasons of treatment, from a molten coin factory to the first livestreamed crypto trial. Read it, then help write it.",
      },
      { property: "og:title", content: "TEXITcoin: The Series — Screenplay" },
      {
        property: "og:description",
        content:
          "Three season treatments and an open writers' room. Molten. Wheels Up. The John Galt Line.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">Couldn't load the screenplay</h1>
        <p className="mt-3 text-muted-foreground">Please try again in a moment.</p>
      </div>
    </div>
  ),
  component: ScreenplayIndex,
});

const CHARACTERS = [
  {
    name: "Bobby",
    role: "The founder",
    note: "Pays everybody, keeps nothing, argues with rooms that have already made up their minds.",
  },
  {
    name: "Kira",
    role: "The wife",
    note: "Terrified of losing everything, unwilling to give up her coins — and the first to put them on the table.",
  },
  {
    name: "Samantha",
    role: "The daughter",
    note: "Failing kidney, ear defenders at the kitchen table, the reason the clock is always running.",
  },
  {
    name: "Matt",
    role: "The neighbor",
    note: "Never shuts up. Not once. Until the one scene where he doesn't say a word.",
  },
  {
    name: "Josh",
    role: "The other neighbor",
    note: "Quieter, worse ideas, shows up at 3 a.m. and does the chemistry correctly anyway.",
  },
  {
    name: "Johnny",
    role: "The Texas neighbor",
    note: "Four welders, no shirts, one generator, and the welds on the very first tank.",
  },
  {
    name: "Rob",
    role: "Support lead (S2–S3)",
    note: "A big teddy bear with the company's conscience — and an unsent memo.",
  },
  {
    name: "Tim",
    role: "Sales (S2–S3)",
    note: "Built like a vending machine, twice as motivated, unsettlingly good at the job.",
  },
  {
    name: "Gaige",
    role: "Operations (S2–S3)",
    note: "Has a baby that is somehow in every meeting, every frame, every Zoom.",
  },
];

function SeasonCard({
  slug,
  number,
  title,
  subtitle,
  era,
  logline,
  index,
}: {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  logline: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to="/screenplay/$season"
        params={{ season: slug }}
        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/60"
      >
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <span className="rounded-full border border-border px-2 py-0.5">
            Season {number}
          </span>
          <span>{era}</span>
        </div>
        <h2 className="mt-5 font-display text-4xl font-bold leading-none">{title}</h2>
        <p className="mt-2 text-sm text-primary">{subtitle}</p>
        <p className="mt-5 flex-1 text-muted-foreground leading-relaxed">{logline}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Read the treatment
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}

function ScreenplayIndex() {
  const { data: seasons } = useSuspenseQuery(seasonsQuery);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <Clapperboard className="h-3.5 w-3.5" />
              Series bible · working draft
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              TEXITcoin:
              <br />
              The Series
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Three seasons. A coin factory that tried to kill everyone in it, a bet
              nobody sane would make, and the first securities trial the internet was
              allowed to watch live. This is the treatment stage — the shape of the
              story before it becomes episodes.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              And it's open. Every scene below can be argued with, corrected, expanded,
              or replaced by the people who were actually there.
            </p>
          </div>
        </section>

        {/* Seasons */}
        <section className="mx-auto max-w-7xl px-6 mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {seasons.map((s, i) => (
              <SeasonCard key={s.slug} {...s} index={i} />
            ))}
          </div>
        </section>

        {/* Characters */}
        <section className="mx-auto max-w-7xl px-6 mt-24">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            The roster
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold">Who's in it</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Real people, dramatized. Names and broad strokes are true; the dialogue is
            invention until somebody who was in the room says otherwise.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHARACTERS.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="font-display text-2xl font-bold">{c.name}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-widest text-primary">
                  {c.role}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Writers' room teaser */}
        <section className="mx-auto max-w-7xl px-6 mt-24">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
              <PenLine className="h-3.5 w-3.5" />
              The writers' room
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold max-w-2xl">
              You were there. Help write it.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              The plan: pitch a scene, a correction, a character, a photo, or a clip in
              plain language. AI drafts it up in screenplay style, it lands in a
              suggestion queue, and approved contributions get folded into the season
              treatment with your name on the beat — Wikipedia rules, Texas manners.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Submissions open next. In the meantime, read the seasons and start
              collecting your notes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
