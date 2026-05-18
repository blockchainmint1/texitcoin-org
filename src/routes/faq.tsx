import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type Faq = { q: string; a: string };
type Category = { id: string; label: string; items: Faq[] };

const CATEGORIES: Category[] = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    items: [
      {
        q: "What is TEXITcoin?",
        a: "TEXITcoin (ticker: TXC) is a Layer 1 cryptocurrency mined in Texas. It's a fixed-supply, Scrypt Proof-of-Work coin forked from Litecoin and tuned for everyday use with 3-minute blocks — designed to be sound, sovereign money for a sovereign Texas (and anyone else who wants honest money).",
      },
      {
        q: "What's the max supply?",
        a: "353,396,296 TXC. Hard-capped, no premine, no team allocation, no VC round. Every coin enters circulation through Scrypt Proof-of-Work mining.",
      },
      {
        q: "Is TXC a security?",
        a: "No. TXC is a decentralized commodity cryptocurrency with no issuer, no pre-sale, no equity claim, and no profit promises. It's earned through Scrypt Proof-of-Work mining, the same family of mining used by Litecoin.",
      },
      {
        q: "Is TEXITcoin a political project?",
        a: "TEXITcoin is a monetary project inspired by the Texan spirit of independence and self-reliance. We celebrate Texas culture and sound-money principles; we don't take party positions or campaign for politicians.",
      },
    ],
  },
  {
    id: "getting-started",
    label: "Mining & Getting Started",
    items: [
      {
        q: "Where can I buy TXC?",
        a: "TXC has been live on Bitmart since December 31, 2024, trading on the TXC/USDT pair. See our How to Buy page for a four-step walkthrough.",
      },
      {
        q: "Can I mine TXC?",
        a: "Mining is permissioned and rooted in Texas, but the bar to participate is intentionally low — a consumer-grade Scrypt rig is enough. Our Texas operations merge-mine TXC alongside Litecoin (LTC) and Dogecoin (DOGE), so the same Scrypt work earns rewards on all three chains. See the Proof of Work page for details.",
      },
      {
        q: "Do I have to live in Texas to use it?",
        a: "Not at all. Anyone, anywhere can hold, send, and mine TXC. Texas is the spiritual home and the mining base, but the network is global.",
      },
      {
        q: "How do I store TXC safely?",
        a: "Use the TEXITcoin Web Wallet to get started, or download our iOS/Android apps. For long-term holdings, the Cold Storage Coin keeps your keys completely offline. See the Wallets page.",
      },
    ],
  },
  {
    id: "wallets-tools",
    label: "Wallets & Tools",
    items: [
      {
        q: "What is the TXC Wallet app?",
        a: "The TXC Wallet is the official mobile wallet for TEXITcoin (iOS and Android). It holds your keys on your device, lets you send and receive TXC, scan QR codes for in-person payments, and connect to the TEXITcoin network without trusting a third party. Pair it with the Cold Storage Coin for long-term holdings.",
      },
      {
        q: "What is the Cold Storage Coin?",
        a: "The Cold Storage Coin is a physical TXC wallet. Your private key is generated and sealed inside the coin, so it never touches an internet-connected device. You hold the coin like a bearer instrument — anyone with the coin and the seal intact controls the TXC on it. Ideal for long-term savings; not meant for daily spending.",
      },
      {
        q: "What is the TXC Blockchain Explorer?",
        a: "The explorer is a public website that lets anyone look up TXC blocks, transactions, and addresses in real time. Paste a transaction ID to confirm a payment cleared, paste an address to see its balance and history, or browse recent blocks to watch the network in action. It's read-only and free to use — no account required.",
      },
    ],
  },
  {
    id: "crypto-basics",
    label: "Crypto Basics",
    items: [
      {
        q: "What's the difference between a Layer 1 and a Layer 2 blockchain?",
        a: "A Layer 1 is a standalone blockchain that settles its own transactions and has its own miners or validators — Bitcoin, Litecoin, Ethereum, and TEXITcoin are all Layer 1s. A Layer 2 is a network built on top of a Layer 1 (like Lightning on Bitcoin or Arbitrum on Ethereum) that batches activity off-chain for speed and lower fees, then periodically settles back to the Layer 1 for security. TXC is a Layer 1 — every TXC transaction is final on the TEXITcoin chain itself.",
      },
      {
        q: "What is a blockchain node?",
        a: "A node is a computer running the blockchain's software. Full nodes keep a complete copy of the chain, validate every block and transaction against the network rules, and relay them to other nodes. Nodes are how a blockchain stays decentralized — no single party controls the ledger because thousands of independent nodes are constantly cross-checking it. Anyone can run a TXC node; you don't have to mine to do it.",
      },
      {
        q: "What's a crypto wallet, really?",
        a: "A wallet doesn't actually hold your coins — the coins live on the blockchain. The wallet holds your private keys, which prove you control the coins at a given address. 'Self-custody' wallets (like the TXC Wallet app or the Cold Storage Coin) put those keys in your hands. 'Custodial' wallets (like an exchange account) hold the keys for you — convenient, but you're trusting the custodian not to lose, freeze, or misuse your funds.",
      },
      {
        q: "What is a crypto exchange and how does it work?",
        a: "An exchange is a marketplace that matches buyers and sellers of crypto. You deposit one asset (dollars, USDT, BTC), place an order at the price you want, and the exchange pairs it with a counterparty. Centralized exchanges like Bitmart hold your funds while they're on the platform; decentralized exchanges like Uniswap let you trade directly from your own wallet. Either way, the goal is the same: convert between assets at a market-driven price.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Support",
    items: [
      {
        q: "How do I avoid scams?",
        a: "We never DM you first. We never ask for your seed phrase. We never run 'giveaways' that require you to send coins. If someone claims to be from TEXITcoin and asks for crypto or keys, it's a scam — report and block.",
      },
      {
        q: "Where do I get help?",
        a: "Hit the Build page for community channels, or reach out through the contact links in the footer. Wallet and exchange support is handled by the respective providers (Bitmart support for trading, wallet docs for self-custody).",
      },
    ],
  },
];

const ALL_FAQS: Faq[] = CATEGORIES.flatMap((c) => c.items);

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
          mainEntity: ALL_FAQS.map((f) => ({
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
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);

  const filtered = useMemo<Category[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  useEffect(() => {
    if (query) return;
    const sections = CATEGORIES
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [query]);

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Support · Knowledge Base
              </div>
              <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight md:text-8xl">
                Knowledge <span className="text-primary">Base</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Everything you need to know about the first digital currency forged in the Lone Star State.
              </p>

              {/* Search */}
              <div className="relative mx-auto mt-10 max-w-2xl">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions…"
                  className="w-full rounded-full border border-border bg-card py-4 pl-7 pr-16 text-base shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary"
                  aria-label="Search FAQs"
                />
                <div className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-red-gradient text-primary-foreground shadow-glow">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Side rail */}
              <aside className="lg:w-1/4">
                <nav className="sticky top-28 space-y-1">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    Categories
                  </p>
                  {CATEGORIES.map((c) => {
                    const isActive = activeId === c.id;
                    return (
                      <a
                        key={c.id}
                        href={`#${c.id}`}
                        className={`block rounded-md px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "border-l-4 border-primary bg-card font-semibold text-foreground shadow-sm"
                            : "border-l-4 border-transparent text-muted-foreground hover:bg-card hover:text-foreground"
                        }`}
                      >
                        {c.label}
                      </a>
                    );
                  })}
                </nav>
              </aside>

              {/* Content */}
              <div className="space-y-16 lg:w-3/4">
                {filtered.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
                    No questions matched <span className="font-semibold text-foreground">"{query}"</span>. Try a different keyword, or scroll the categories below.
                  </div>
                ) : (
                  filtered.map((cat) => (
                    <section key={cat.id} id={cat.id} className="scroll-mt-28">
                      <h2 className="mb-8 border-b border-border pb-2 font-display text-3xl font-bold uppercase tracking-wide">
                        {cat.label}
                      </h2>
                      <div className="grid gap-8 md:grid-cols-2">
                        {cat.items.map((f, i) => (
                          <motion.div
                            key={f.q}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className="space-y-3"
                          >
                            <h3 className="text-lg font-semibold leading-snug">{f.q}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Didn't see your question?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Drop into the community or read the deeper docs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/build"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Join the community <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tokenomics"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold hover:bg-accent"
              >
                See tokenomics
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
