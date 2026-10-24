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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: Section[] = [
  {
    heading: "The short version",
    body: [
      "We don't want your data, we don't sell your data, and we don't run analytics that follow you around the internet. The TEXITcoin blockchain itself is public — every transaction is on a permanent, transparent ledger anyone can read. That's a feature, not a bug.",
      "The details below explain what we collect and where it goes. We'd rather tell you plainly than hide it in fine print.",
    ],
  },
  {
    heading: "What this site collects",
    body: [
      "This marketing site (texitcoin.org and its previews) is mostly static. When you visit, your browser sends us standard things — IP address, user-agent, the page you requested — so the server can actually send you a page back. Standard web stuff.",
      "We count visits and which pages people read. Visit records include the page, referring site's hostname, country when available, device category, and a session identifier stored in your browser for that tab. The browser information helps us identify the device category and filter bots; we do not store your full IP address in these visit records. We do not run advertising retargeting pixels. Session-level records are not the same thing as anonymous totals.",
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
      "When you subscribe, we save your email address, where you signed up, and when you signed up so we can send updates. We also share subscriber and account-holder email addresses with honest.money, the Honest Money Ecosystem's central mailing service, along with this site's name and your TEXITcoin and honest-money interests. That lets the ecosystem send related updates. We do not sell or rent your email address.",
      "Unsubscribe using the link in an email. You can also ask us to correct or delete the information we hold, including the copy shared with honest.money. Information you submit in other forms is used to handle that submission.",
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
        updated="October 24, 2026"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
