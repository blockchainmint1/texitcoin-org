import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-texas.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-32 pb-24 md:pt-40 md:pb-32">
      {/* decorative parallel red line */}
      <div className="pointer-events-none absolute inset-y-0 right-[18%] w-[2px] rotate-[15deg] bg-gradient-to-b from-transparent via-primary to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-[42%] w-[2px] rotate-[15deg] bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Digital · Decentralized · Peer-to-peer
          </div>

          <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            TEXIT<span className="text-primary">coin</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl text-balance">
            A Layer 1 digital currency built for the marketplace —
            fast, fair, and forged by a community that believes in honest money.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#ecosystem"
              className="group inline-flex items-center gap-3 rounded-md bg-red-gradient px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              Join the Ecosystem
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#foundation"
              className="group inline-flex items-center gap-3 rounded-md border border-accent/60 bg-transparent px-7 py-4 text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/10 transition"
            >
              Why TXC
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "0.00", l: "Pre-mine" },
              { v: "3 min", l: "Block time" },
              { v: "353M", l: "Max supply" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-bold text-foreground">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative h-[420px] md:h-[560px]"
        >
          {/* parallelogram frames */}
          <div className="absolute inset-0 clip-parallel border-2 border-accent/40 translate-x-6 -translate-y-4" />
          <div className="absolute inset-0 clip-parallel overflow-hidden shadow-card">
            <img
              src={heroImg}
              alt="Lone rider on a Texas mesa at sunset"
              width={1536}
              height={1536}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 clip-parallel border-2 border-accent/30 -translate-x-6 translate-y-4" />
        </motion.div>
      </div>

      <a
        href="#foundation"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
