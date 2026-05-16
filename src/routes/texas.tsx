import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Star,
  Compass,
  Flame,
  Droplet,
  Wheat,
  Cpu,
  Music,
  Beef,
  Trophy,
  Building2,
  Users,
  Instagram,
  Globe,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/texas")({
  head: () => ({
    meta: [
      { title: "Discover Texas — History, Grit & the Lone Star Spirit | TEXITcoin" },
      {
        name: "description",
        content:
          "From the Old Three Hundred and the Alamo to oil booms, cattle drives, and the world's 8th-largest economy — the Texas story, plus the folks carrying the Lone Star flame forward.",
      },
      { property: "og:title", content: "Discover Texas — The Lone Star Story" },
      {
        property: "og:description",
        content:
          "Empresarios, the Alamo, San Jacinto, black gold, BBQ, and the modern republic that runs on grit. Meet the people keeping Texas, Texas.",
      },
    ],
  }),
  component: TexasPage,
});

// ----------------------------------------------------------------------------

type Era = {
  year: string;
  title: string;
  body: string;
  icon: typeof Star;
  accent: string; // tailwind class for icon tint
};

const ERAS: Era[] = [
  {
    year: "1821",
    title: "The Old Three Hundred",
    body:
      "Stephen F. Austin — the “Father of Texas” — leads the first colony of American settlers into what was then northern Mexico under the Empresario land-grant program. Generous tracts of fertile prairie draw pioneers hungry for a fresh start, and the bones of a new culture begin to form along the Brazos and Colorado rivers.",
    icon: Compass,
    accent: "text-[#0a2a66]",
  },
  {
    year: "1836",
    title: "Remember the Alamo",
    body:
      "On March 6, fewer than 200 Texan defenders — Davy Crockett, William Travis, Jim Bowie among them — make a 13-day stand against Santa Anna's army at a small San Antonio mission. They lose the battle but light a fire across the territory. Six weeks later at San Jacinto, Sam Houston's army wins independence in just 18 minutes of fighting.",
    icon: Flame,
    accent: "text-[#bf0a30]",
  },
  {
    year: "1836–1845",
    title: "Republic of Texas",
    body:
      "For nearly a decade, Texas stands as its own nation — own flag, own currency, own navy, own foreign ambassadors. Sam Houston serves as its first president. The Republic is broke, harassed, and gloriously stubborn. On Dec. 29, 1845, it joins the United States as the 28th state, the only state ever admitted by treaty from a sovereign nation.",
    icon: Star,
    accent: "text-[#f5b700]",
  },
  {
    year: "1860s–1890s",
    title: "Cattle Kingdom",
    body:
      "After the war, Texas longhorns by the millions are pushed up the Chisholm and Goodnight–Loving trails to the Kansas railheads. The cowboy is born here — a working man on a working horse, half folklore, half occupation. The XIT, the King Ranch, and the Four Sixes write their brands into American memory.",
    icon: Beef,
    accent: "text-[#7c2d12]",
  },
  {
    year: "1901",
    title: "Spindletop & Black Gold",
    body:
      "On January 10, the Lucas Gusher near Beaumont blows nine stories into the sky and gushes 100,000 barrels a day for nine days. The petroleum century begins on Texas soil. Beaumont, Houston, Midland, Odessa boom; the world's energy map is redrawn with a star over East Texas.",
    icon: Droplet,
    accent: "text-[#0a2a66]",
  },
  {
    year: "1960s",
    title: "Houston, We Have Liftoff",
    body:
      "NASA's Manned Spacecraft Center opens in Houston in 1961. Eight years later, “Houston” is the first word spoken from the surface of the Moon. Texas pivots from cattle and crude into aerospace, medicine (the Texas Medical Center is the largest in the world), and computing.",
    icon: Trophy,
    accent: "text-[#f5b700]",
  },
  {
    year: "2000s–Today",
    title: "The Modern Texas Miracle",
    body:
      "No state income tax. Pro-business courts. The country's busiest port complex on the Gulf, the world's largest medical campus in Houston, the densest semiconductor corridor outside Silicon Valley, and a power grid (ERCOT) operated by Texas, for Texas. Companies and families show up by the U-Haul-load.",
    icon: Building2,
    accent: "text-[#bf0a30]",
  },
];

type Stat = { value: string; label: string; sub?: string };
const STATS: Stat[] = [
  { value: "8th", label: "Largest economy on Earth", sub: "Ahead of Canada, Russia, South Korea" },
  { value: "30M+", label: "Texans", sub: "2nd most populous state, fastest absolute growth" },
  { value: "#1", label: "Energy producer in the U.S.", sub: "Oil, natural gas — and wind" },
  { value: "22 yr", label: "Top exporting state", sub: "Streak unbroken" },
  { value: "268k mi²", label: "Square miles of country", sub: "Bigger than France" },
  { value: "1,000+", label: "Miles of coastline & border", sub: "Gulf to Rio Grande" },
];

type Culture = { title: string; body: string; icon: typeof Music };
const CULTURE: Culture[] = [
  {
    title: "BBQ as religion",
    body:
      "Central Texas brisket, East Texas chopped beef, South Texas barbacoa, West Texas cowboy steak. Pit smoke is the official perfume of the state.",
    icon: Flame,
  },
  {
    title: "Friday night lights",
    body:
      "High-school football fields the size of small colleges. Whole towns close down for kickoff. Permian, Aledo, Southlake — legends are minted at 17.",
    icon: Trophy,
  },
  {
    title: "Music in the bones",
    body:
      "Willie, Waylon, Selena, Stevie Ray, Beyoncé, Leon Bridges, Post Malone. From Austin's clubs to Luckenbach's picnic tables, the soundtrack never quits.",
    icon: Music,
  },
  {
    title: "Working land",
    body:
      "Cotton, cattle, sorghum, citrus, pecans, peaches. 247,000 farms and ranches — more than any state — feeding the country and half the planet.",
    icon: Wheat,
  },
  {
    title: "Innovation belt",
    body:
      "Samsung in Taylor, TSMC suppliers in Sherman, SpaceX in Boca Chica, Tesla in Austin, the Texas Stock Exchange in Dallas. The frontier never closed — it just digitized.",
    icon: Cpu,
  },
  {
    title: "Howdy means hello",
    body:
      "Hold doors. Wave from the truck. Help the stranger with the flat tire. The friendliness is not a brochure — it's the operating system.",
    icon: Users,
  },
];

type Voice = {
  name: string;
  role: string;
  blurb: string;
  links: { label: string; href: string }[];
};
const VOICES: Voice[] = [
  {
    name: "Texas Nationalist Movement (TNM)",
    role: "The largest organization advocating for Texas self-governance",
    blurb:
      "Daniel Miller and the TNM team have spent decades organizing, lobbying, and educating Texans about a peaceful, ballot-box path to independence. Home of the #TEXIT movement.",
    links: [
      { label: "tnm.me", href: "https://tnm.me/" },
      { label: "@texasnationalistmovement", href: "https://www.instagram.com/texasnationalistmovement/" },
      { label: "@TexitNow on X", href: "https://x.com/TexitNow" },
    ],
  },
  {
    name: "Daniel Miller",
    role: "President, Texas Nationalist Movement",
    blurb:
      "Author of TEXIT: Why and How Texas Will Leave the Union. The most consistent and well-spoken voice for Texas sovereignty for more than 25 years.",
    links: [
      { label: "@dmillertnm on IG", href: "https://www.instagram.com/dmillertnm/" },
      { label: "@DMillerTNM on X", href: "https://x.com/DMillerTNM" },
    ],
  },
  {
    name: "Republic of Texas",
    role: "The historical and cultural standard-bearer",
    blurb:
      "Keeping the memory and legal framework of the 1836 Republic alive. Heritage, education, and a steady reminder of where Texas comes from.",
    links: [{ label: "republicoftexas.com", href: "https://www.republicoftexas.com/" }],
  },
  {
    name: "Texas General Land Office — Save the Alamo",
    role: "Stewards of the Shrine of Texas Liberty",
    blurb:
      "Not an independence org — but the team restoring the Alamo and telling the founding story to a new generation. Worth a follow, worth a visit.",
    links: [
      { label: "thealamo.org", href: "https://www.thealamo.org/" },
      { label: "@officialalamo", href: "https://www.instagram.com/officialalamo/" },
    ],
  },
];

// ----------------------------------------------------------------------------

function TexasPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-24">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(191,10,48,0.18), transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(10,42,102,0.22), transparent 55%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          }}
        />
        {/* lone star watermark */}
        <svg
          className="pointer-events-none absolute -right-20 top-10 -z-10 h-[520px] w-[520px] opacity-[0.06]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon points="50,2 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38" />
        </svg>

        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <Star className="h-3.5 w-3.5 text-[#f5b700]" />
            Discover Texas
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            One republic, one star,
            <span className="block text-[#bf0a30]">and a whole lot of story.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Texas isn't just a state — it's a habit of mind. Built by settlers, ranchers,
            wildcatters, astronauts, and the kind of folks who fix the fence before they
            sit down for supper. Here's the short version of how we got here, and the
            people keeping the spirit alive.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 rounded-md bg-[#bf0a30] px-6 py-3 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
            >
              Walk the timeline <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#voices"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition"
            >
              Meet the folks carrying the flame
            </a>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <blockquote className="font-display text-2xl md:text-3xl leading-snug">
            “You can all go to hell — and I will go to Texas.”
          </blockquote>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            — Davy Crockett, 1835
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The story so far
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              Two centuries in seven beats.
            </h2>
          </div>

          <div className="relative">
            {/* vertical rope */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#bf0a30] via-[#f5b700] to-[#0a2a66] rounded-full" />
            <ol className="space-y-10">
              {ERAS.map((e, i) => {
                const Icon = e.icon;
                const right = i % 2 === 1;
                return (
                  <li
                    key={e.title}
                    className={`relative grid md:grid-cols-2 gap-6 items-start ${
                      right ? "md:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className={`pl-12 md:pl-0 ${right ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                      <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
                        <Icon className={`h-4 w-4 ${e.accent}`} />
                        {e.year}
                      </div>
                      <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">{e.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{e.body}</p>
                    </div>
                    {/* node */}
                    <div className="absolute left-[15px] md:left-1/2 top-1.5 -translate-x-1/2">
                      <div className="h-7 w-7 rounded-full border-[3px] border-background bg-[#f5b700] shadow-[0_0_0_3px_rgba(191,10,48,0.6)] grid place-items-center">
                        <Star className="h-3 w-3 text-[#0a2a66] fill-[#0a2a66]" />
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-y border-border bg-[#0a2a66] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">By the numbers</div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
                A republic-sized economy in a star-sized state.
              </h2>
            </div>
            <div className="text-sm text-white/70 max-w-sm">
              If Texas were a country, it would sit in the world's top ten — bigger than Canada,
              Russia, and South Korea. We mostly don't brag. Mostly.
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0a2a66] p-8">
                <div className="font-display text-5xl md:text-6xl font-bold text-[#f5b700] leading-none">
                  {s.value}
                </div>
                <div className="mt-3 font-semibold">{s.label}</div>
                {s.sub && <div className="mt-1 text-sm text-white/60">{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The Texas way
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              What people mean when they say “Texan.”
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULTURE.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="group relative rounded-2xl border border-border bg-card p-6 hover:border-[#bf0a30] transition-colors"
                >
                  <div className="h-11 w-11 rounded-lg bg-[#bf0a30]/10 grid place-items-center mb-4">
                    <Icon className="h-5 w-5 text-[#bf0a30]" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" className="relative py-24 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Friends of the republic
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              The folks carrying the Lone Star flame.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're builders, not pundits — but we tip our hat to the people who've spent
              years showing up for Texas sovereignty, Texas history, and Texas culture.
              Give them a follow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {VOICES.map((v) => (
              <div
                key={v.name}
                className="rounded-2xl border border-border bg-background p-6 flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#f5b700] grid place-items-center shrink-0">
                    <Star className="h-6 w-6 text-[#0a2a66] fill-[#0a2a66]" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold">{v.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
                      {v.role}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{v.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {v.links.map((l) => {
                    const isIG = l.label.includes("@") && l.label.toLowerCase().includes("ig");
                    const isInsta = l.href.includes("instagram.com");
                    const Icon = isInsta || isIG ? Instagram : Globe;
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-[#bf0a30] hover:text-[#bf0a30] transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-border bg-background/60 p-6 text-sm text-muted-foreground">
            Know an account that deserves a shout — a creator, historian, rancher, or
            community we should be following?{" "}
            <a href="mailto:howdy@texitcoin.org" className="text-[#bf0a30] font-medium hover:underline">
              Send them our way
            </a>{" "}
            and we'll keep this list growing.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Built in Texas. Mined in Texas. Owned by Texans.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            TEXITcoin is what happens when 200 years of Texas grit shows up to do money.
            Take a look around — the story keeps going.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/proof-of-work"
              className="inline-flex items-center gap-2 rounded-md bg-[#bf0a30] px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              See the proof of work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition"
            >
              Walk our roadmap
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
