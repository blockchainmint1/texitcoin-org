import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LegalPage, type Section } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TEXITcoin" },
      {
        name: "description",
        content:
          "How TEXITcoin handles your data — in plain English. Short version: we don't want it, we don't sell it, and the blockchain is public.",
      },
      { property: "og:title", content: "Privacy Policy — TEXITcoin" },
      {
        property: "og:description",
        content: "Plain-English privacy policy for TEXITcoin.",
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: Section[] = [
  {
    heading: "The short version",
    body: [
      "We don't want your data, we don't sell your data, and we don't run analytics that follow you around the internet. The TEXITcoin blockchain itself is public — every transaction is on a permanent, transparent ledger anyone can read. That's a feature, not a bug.",
      "If a section below contradicts the short version, the short version wins. We'd rather be honest than thorough.",
    ],
  },
  {
    heading: "What this site collects",
    body: [
      "This marketing site (texitcoin.org and its previews) is mostly static. When you visit, your browser sends us standard things — IP address, user-agent, the page you requested — so the server can actually send you a page back. Standard web stuff.",
      "We may use minimal, privacy-respecting analytics to count visits and see which pages people read. We do not run ad-tracking, fingerprinting, or third-party retargeting pixels.",
    ],
  },
  {
    heading: "What the blockchain collects",
    body: [
      "TEXITcoin is a public proof-of-work blockchain. Every TXC transaction — sender address, receiver address, amount, timestamp — is permanent and public. We can't delete it, hide it, or edit it for you. Nobody can. That's the whole point of decentralized money.",
      "Wallet addresses themselves are pseudonymous, not anonymous. If someone links your address to your real name (because you posted it publicly, used a KYC exchange, etc.), the entire history of that address is visible to them too. Plan accordingly.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use a small number of functional cookies — things like remembering you closed a banner. We do not set advertising cookies. If a third-party tool we embed (a video player, a chart, an exchange widget) sets its own cookies, that's governed by their privacy policy, not ours.",
    ],
  },
  {
    heading: "Email & forms",
    body: [
      "If you sign up for a newsletter, type into a contact form, or join the community in some other way, we'll use what you give us to do exactly the thing you asked for. We won't sell it, rent it, or pass it along to a partner you've never heard of. If you ask us to delete it, we will.",
    ],
  },
  {
    heading: "Third parties we hand off to",
    body: [
      "Some links on this site go to exchanges, block explorers, wallets, and social platforms operated by other people. Once you click out, you're playing by their rules. They have their own privacy policies. We have no control over what they do with you.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Wherever you live, the basics apply: you can ask what we have on you, you can ask us to correct it, and you can ask us to delete it. Email us and we'll handle it. The on-chain transaction history is the one thing we genuinely cannot delete — that's math, not policy.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If we update this policy in a meaningful way, we'll bump the date at the bottom and call it out where it matters. Trivial wording fixes don't get a parade.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <LegalPage
        eyebrow="Privacy Policy"
        title="We don't want your data."
        lede="Most privacy policies are written by lawyers to protect lawyers. This one is written for humans who actually want to know what's going on."
        updated="January 2026"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
