import { motion } from "framer-motion";
import { Wallet, Pickaxe, ArrowLeftRight, ArrowRight } from "lucide-react";

const ITEMS = [
  {
    icon: Wallet,
    title: "Get a wallet",
    body: "Cold storage, desktop, or web — pick a wallet that fits how you plan to use TXC.",
    cta: "Browse wallets",
    href: "https://texitcoin.org/wallets.html",
  },
  {
    icon: Pickaxe,
    title: "Mine with us",
    body: "Join the pool, earn TXC, and help secure the network. Your hardware, your coins.",
    cta: "Open the pool",
    href: "https://pool.texitcoin.org/",
  },
  {
    icon: ArrowLeftRight,
    title: "Trade & spend",
    body: "TXC is live on multiple exchanges, and merchants are signing on every week.",
    cta: "Where to trade",
    href: "https://coinmarketcap.com/currencies/texitcoin/#markets",
  },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Get involved
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl text-balance">
            Join the TXC <span className="text-primary">ecosystem</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three ways to plug in today — pick the one that matches where you are.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card hover:border-primary/60 transition"
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-red-gradient shadow-glow">
                <it.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{it.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{it.body}</p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {it.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
