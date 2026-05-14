import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LegalPage, type Section } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — TEXITcoin" },
      {
        name: "description",
        content:
          "The deal in plain English: use the site responsibly, do your own research, and don't blame us if you set fire to your own money.",
      },
      { property: "og:title", content: "Terms of Use — TEXITcoin" },
      {
        property: "og:description",
        content: "Plain-English terms of use for TEXITcoin.",
      },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: Section[] = [
  {
    heading: "The deal",
    body: [
      "By using this website, the TEXITcoin network, or any associated tools, you agree to the things on this page. If you don't agree, that's totally fine — please don't use them. We won't take it personally.",
      "TEXITcoin is open, decentralized money. Nobody — including us — can freeze your coins, reverse your transactions, or push an update to your wallet without you. The flip side: nobody can save you from your own mistakes either.",
    ],
  },
  {
    heading: "Use it like an adult",
    body: [
      "Don't use TEXITcoin or this website to do illegal things in your jurisdiction. Don't try to attack the network, scrape it abusively, or impersonate the project. Don't use any part of the brand to scam people. We will not be polite about that.",
      "Beyond that, mine, hold, spend, send, receive, build on top of it, fork it, write about it, argue about it on the internet — that's the whole point.",
    ],
  },
  {
    heading: "Not financial advice",
    body: [
      "Nothing on this site is investment advice, tax advice, legal advice, or a recommendation to buy, sell, or hold anything. We are not your financial advisor. We are people who built a currency and write about it.",
      "Crypto is volatile. Prices can go up. Prices can go down. Prices can go to zero. If you cannot afford to lose what you put in, do not put it in.",
    ],
  },
  {
    heading: "You are your own bank",
    body: [
      "Self-custody means you hold your keys. If you lose your seed phrase, your coins are gone. If somebody phishes you out of your seed phrase, your coins are gone. If you send TXC to the wrong address, your coins are gone. Nobody — not us, not an exchange, not a support agent in a Telegram DM — can reverse that.",
      "Treat your seed phrase like the keys to a vault. Write it down. Keep it offline. Trust no one who asks for it.",
    ],
  },
  {
    heading: "Third parties",
    body: [
      "We link out to exchanges, block explorers, wallets, mining pools, and tools we didn't build. We don't control them. We don't guarantee they'll be online, accurate, or fair to you. Read their terms, do your own diligence, and proceed at your own risk.",
    ],
  },
  {
    heading: "What we don't promise",
    body: [
      "We work hard to keep this site accurate and the network healthy. We do not promise the site is bug-free, the network is bug-free, the price will do anything in particular, or that any external service will keep listing TXC. To the maximum extent allowed by law, the site and the project are provided 'as is.'",
      "If something on this site is materially wrong, tell us and we'll fix it. That's about the strongest commitment any honest project can make.",
    ],
  },
  {
    heading: "Brand & content",
    body: [
      "The TEXITcoin name, logo, and visual identity belong to the project. You can absolutely talk about us, link to us, write articles, post memes, and quote us. Don't pretend to be us. Don't slap our logo on a token that isn't TXC. Don't run a scam under our name.",
      "Original software released by the project carries its own open-source license — read the license, follow the license, and you're good.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We may update these terms when something material changes. The updated date at the top of the page is the source of truth. Continuing to use the site after that means you're rolling with the new version.",
    ],
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <LegalPage
        eyebrow="Terms of Use"
        title="Use it well. Don't be a jerk."
        lede="Standard terms, written like a human wrote them. The headline rule: this is your money, your responsibility, and your adventure."
        updated="January 2026"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
