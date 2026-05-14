import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Foundation } from "@/components/site/Foundation";
import { Quote } from "@/components/site/Quote";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Specs } from "@/components/site/Specs";
import { Insights } from "@/components/site/Insights";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { LegalStarburst } from "@/components/site/LegalStarburst";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TEXITcoin — Layer 1 digital currency, mined in Texas" },
      {
        name: "description",
        content:
          "TEXITcoin (TXC) is a Layer 1, proof-of-work digital currency built for everyday peer-to-peer use. Fast 3-minute blocks, no pre-mine, community-driven value.",
      },
      { property: "og:title", content: "TEXITcoin — The future of honest money" },
      {
        property: "og:description",
        content:
          "A digital, decentralized, peer-to-peer Layer 1 currency mined in Texas.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Foundation />
        <Quote />
        <Ecosystem />
        <Specs />
        <Insights />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
