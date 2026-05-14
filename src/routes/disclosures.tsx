import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LegalPage, type Section } from "@/components/site/LegalPage";

export const Route = createFileRoute("/disclosures")({
  head: () => ({
    meta: [
      { title: "Disclosures — TEXITcoin" },
      {
        name: "description",
        content:
          "Honest disclosures about TEXITcoin: who we are, what we hold, what we earn, and the risks you should know before participating.",
      },
      { property: "og:title", content: "Disclosures — TEXITcoin" },
      {
        property: "og:description",
        content: "Honest disclosures about the TEXITcoin project.",
      },
    ],
  }),
  component: DisclosuresPage,
});

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: [
      "TEXITcoin (TXC) is an open, proof-of-work Layer 1 cryptocurrency. The project was founded by Bobby Gray and is supported by a community of miners, builders, and merchants. The genesis block was mined on January 26, 2024, in McKinney, Texas.",
      "Nobody owns the network. The code is open. The blockchain is public. We're a team that builds tools and writes about it — not a custodian, not a bank, and not a securities issuer.",
    ],
  },
  {
    heading: "What we hold",
    body: [
      "There was no pre-mine. Every TXC in existence was produced by proof-of-work mining, on the same schedule, available to anyone with a rig. The founder, the team, and the broader community mine alongside everyone else.",
      "Members of the team hold TXC. We mine it, we use it, we believe in it — that's why we're here. Assume that anyone publishing about TEXITcoin has skin in the game.",
    ],
  },
  {
    heading: "How the project funds itself",
    body: [
      "Operations are funded through mining, the sale of mining hardware and accessories, merchandise, and partnerships with merchants and tools that integrate TXC. We may earn referral fees from some of the third-party services we link to (exchanges, wallets, hardware vendors). When we do, the recommendation still has to clear our own honest-money standard, or we don't run it.",
    ],
  },
  {
    heading: "Risk — the part you actually need to read",
    body: [
      "Cryptocurrency is high-risk. Prices are volatile and can fall sharply, including to zero. New networks face technical, regulatory, and market risks that established assets don't. Liquidity on smaller exchanges can vanish without notice. Smart-contract bugs, exchange failures, and human error have separated countless people from their money.",
      "Mining returns depend on hash power, network difficulty, electricity cost, hardware longevity, and the price of TXC — all of which change. Past performance of TXC, Bitcoin, or any other asset is not a forecast of future returns. Do your own research. Risk only what you can afford to lose. Consult a qualified professional for tax, legal, or investment decisions.",
    ],
  },
  {
    heading: "Forward-looking statements",
    body: [
      "We talk about plans, roadmaps, and where we think things are headed. Those are intentions and best estimates — not promises. The future is uncertain. Anything that sounds like a target (a price, a date, a milestone) is a goal we're aiming at, not a guarantee.",
    ],
  },
  {
    heading: "Securities & jurisdictions",
    body: [
      "TEXITcoin is offered as a decentralized, proof-of-work currency for general use. It is not offered as a security. Crypto regulation is evolving and varies dramatically by country, state, and city. It's your responsibility to understand and comply with the laws where you live. If TXC isn't appropriate or legal in your jurisdiction, don't use it there.",
    ],
  },
  {
    heading: "Honest mistakes",
    body: [
      "If we ever publish something that turns out to be wrong — a stat, a date, a number, a quote — we'll correct it openly. Honest money requires honest writing. Tell us when we miss, and we'll fix it.",
    ],
  },
];

function DisclosuresPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <LegalPage
        eyebrow="Disclosures"
        title="Honest money requires an honest disclosure page."
        lede="Who we are, what we hold, how we make money, and the risks you should weigh before you join the network."
        updated="January 2026"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
