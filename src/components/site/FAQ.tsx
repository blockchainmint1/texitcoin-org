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
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            FAQ
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Still have <span className="text-primary">questions?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Crypto can be complicated. Here&apos;s what most people want to know
            before they participate — straight answers, no hype.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-xl border border-border bg-card px-6"
            >
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
