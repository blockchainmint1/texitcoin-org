import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "TEXIT? Is this for real?",
    a: "Yes. TEXITcoin is a fully functional Layer 1 blockchain inspired by the Texas independence ethos — but it's a currency project first. You don't have to share any political view to mine, hold, or spend TXC; you just have to value an open, honest monetary network.",
  },
  {
    q: "What makes TXC different from Bitcoin or Litecoin?",
    a: "TXC borrows Litecoin's proven scrypt-based architecture but tunes the parameters around being usable as money: predictable 3-minute blocks, low fees, no pre-mine, and a community that's optimized for participation rather than speculation.",
  },
  {
    q: "How do I get TXC?",
    a: "You can buy TXC on supported exchanges, swap into it from common assets, or earn it directly by joining the mining pool with consumer hardware. Wallets are available for desktop, web, and cold storage.",
  },
  {
    q: "Is mining really open to everyone?",
    a: "Mining is permissioned to keep TXC rooted in Texas, but the participation bar is intentionally low. You don't need an industrial farm — a regular rig and an internet connection are enough to be part of securing the chain.",
  },
  {
    q: "Where does the value of TXC come from?",
    a: "From the people who use it. TXC's value is shaped by miners, holders, merchants, and developers — not by institutional traders. Your participation is, quite literally, what gives the coin its weight.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.10),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          {/* Left: sticky intro */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
              <HelpCircle className="h-3 w-3" /> FAQ
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl text-balance">
              Straight <span className="text-primary">answers.</span>
              <br />No hype.
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              The questions we hear most — answered plainly. For the deep cut,
              hit the full knowledge base.
            </p>
            <Link
              to="/faq"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              Browse the knowledge base
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right: questions */}
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card px-6 transition-colors hover:border-primary/40 data-[state=open]:border-primary/60"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-primary/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
