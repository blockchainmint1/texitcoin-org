import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What is TEXITcoin?",
    a: "TEXITcoin (ticker: TXC) is a Layer 1 cryptocurrency mined in Texas. It's a fixed-supply, Proof-of-Work coin built on the same SHA-256 algorithm as Bitcoin — designed to be sound, sovereign money for a sovereign Texas (and anyone else who wants honest money).",
  },
  {
    q: "Where can I buy TXC?",
    a: "TXC has been live on Bitmart since December 31, 2024, trading on the TXC/USDT pair. See our How to Buy page for a four-step walkthrough.",
  },
  {
    q: "What's the max supply?",
    a: "21,000,000 TXC. Hard-capped, no premine, no team allocation. Every coin enters circulation through mining.",
  },
  {
    q: "Is TXC a security?",
    a: "No. TXC is a decentralized commodity cryptocurrency with no issuer, no pre-sale, no equity claim, and no profit promises. It's earned through Proof-of-Work mining, the same way Bitcoin is.",
  },
  {
    q: "Do I have to live in Texas to use it?",
    a: "Not at all. Anyone, anywhere can hold, send, and mine TXC. Texas is the spiritual home and the mining base, but the network is global.",
  },
  {
    q: "How do I store TXC safely?",
    a: "Use the TEXITcoin Web Wallet to get started, or download our iOS/Android apps. For long-term holdings, the Cold Storage Coin keeps your keys completely offline. See the Wallets page.",
  },
  {
    q: "Can I mine TXC?",
    a: "Yes. TXC is merge-mined with Bitcoin, meaning Bitcoin miners can earn TXC at zero additional energy cost. See the Proof of Work page for details.",
  },
  {
    q: "Is TEXITcoin a political project?",
    a: "TEXITcoin is a monetary project inspired by the Texan spirit of independence and self-reliance. We celebrate Texas culture and sound-money principles; we don't take party positions or campaign for politicians.",
  },
  {
    q: "How do I avoid scams?",
    a: "We never DM you first. We never ask for your seed phrase. We never run 'giveaways' that require you to send coins. If someone claims to be from TEXITcoin and asks for crypto or keys, it's a scam — report and block.",
  },
  {
    q: "Where do I get help?",
    a: "Hit the Build page for community channels, or reach out through the contact links in the footer. Wallet and exchange support is handled by the respective providers (Bitmart support for trading, wallet docs for self-custody).",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "TEXITcoin FAQ — Common Questions Answered" },
      { name: "description", content: "Answers to the most common TEXITcoin (TXC) questions: where to buy, max supply, mining, wallets, safety, and more." },
      { property: "og:title", content: "TEXITcoin FAQ" },
      { property: "og:description", content: "Where to buy, max supply, mining, wallets, safety — all the answers in one place." },
      { property: "og:url", content: "https://texitcoin.org/faq" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Frequently asked
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                Straight <span className="text-primary">answers</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                No marketing fluff. Just the questions we get every week, answered honestly.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto max-w-3xl px-6 py-16">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6">
                  <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Didn't see your question?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Drop into the community or read the deeper docs.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/build" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Join the community <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tokenomics" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
                See tokenomics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
