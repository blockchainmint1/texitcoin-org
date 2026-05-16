import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shirt, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Subscribe } from "@/components/site/Subscribe";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [
      { title: "TEXITcoin Merch — Coming Soon" },
      { name: "description", content: "Lone Star hats, tees, and patches stamped with the TEXITcoin mark. Drop list opens soon — get on the list." },
      { property: "og:title", content: "TEXITcoin Merch — Coming Soon" },
      { property: "og:description", content: "Hats, tees, and patches for Texans and sound-money folks worldwide. Join the drop list." },
      { property: "og:url", content: "https://texitcoin.org/merch" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/merch" }],
  }),
  component: MerchPage,
});

const DROPS = [
  { name: "Lone Star Trucker", desc: "Classic 5-panel with the TXC star embroidered up front. Made in Texas.", tag: "First drop" },
  { name: "Sound Money Tee", desc: "Heavyweight cotton. '21M or bust' on the back, TXC mark on the chest.", tag: "First drop" },
  { name: "Founders Patch", desc: "Iron-on patch numbered to the first 1,000 holders on the list.", tag: "Limited" },
  { name: "Cold Storage Hoodie", desc: "Mid-weight fleece. Quiet brand, loud convictions.", tag: "Winter drop" },
];

function MerchPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Drop list open
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                Wear your <span className="text-primary">convictions</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Lone Star hats, heavyweight tees, and patches stamped with the TXC mark. Get on the list — first drop ships to subscribers first.
              </p>
              <div className="mt-8 max-w-md">
                <Subscribe />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">What's coming</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">A first taste of the lineup. Final SKUs, fabrics, and prices land with the drop announcement.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {DROPS.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex items-start justify-between">
                    <Shirt className="h-7 w-7 text-primary" />
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{d.tag}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{d.name}</h3>
                  <p className="mt-3 text-muted-foreground">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <Star className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Made in Texas. Worn worldwide.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">No drop-ship junk. Real fabric, real prints, real Texans behind every stitch.</p>
            <div className="mx-auto mt-8 max-w-md">
              <Subscribe />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
