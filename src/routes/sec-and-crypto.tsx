import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Scale,
  Gavel,
  Rocket,
  ShieldAlert,
  Coins,
  Pickaxe,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/sec-and-crypto")({
  head: () => ({
    meta: [
      { title: "The SEC and Crypto — Why TXC Isn't What They're Looking For" },
      {
        name: "description",
        content:
          "A deep dive into the SEC's relationship with crypto: when they showed up, what they went after, and why a Texas-mined currency like TEXITcoin is the furthest thing from a security.",
      },
      { property: "og:title", content: "The SEC and Crypto — TEXITcoin" },
      {
        property: "og:description",
        content:
          "The SEC came for the ICO era, not for currencies. Here's the timeline — and why TXC sits firmly on the currency side of the line.",
      },
    ],
  }),
  component: SecAndCryptoPage,
});

const TIMELINE = [
  {
    year: "2009–2015",
    title: "Currency Era",
    icon: Coins,
    body:
      "Bitcoin launches. Litecoin, Dogecoin, Monero, and a handful of forks follow. The whole pitch is the same: peer-to-peer electronic cash, open mining, no issuer, no promoter, no roadmap to riches. The SEC barely acknowledges crypto exists. There's nothing for them to do — nobody is selling shares of anything.",
    secActivity: "Essentially none.",
  },
  {
    year: "2016–2017",
    title: "The ICO Craze",
    icon: Rocket,
    body:
      "Ethereum's smart contracts make it trivial to mint a token and sell it to the public with a whitepaper and a Telegram group. Hundreds of projects raise billions of dollars by promising future returns from a centralized team's work. This is, almost word-for-word, the textbook definition of a security under Howey.",
    secActivity:
      "July 2017 — DAO Report: the SEC formally puts the industry on notice that tokens sold to fund a common enterprise with expectation of profit from others' efforts ARE securities.",
  },
  {
    year: "2018–2020",
    title: "Enforcement Wave",
    icon: Gavel,
    body:
      "The SEC starts collecting scalps: Munchee, Paragon, AirFox, Telegram's TON, Kik's Kin, Block.one (EOS), and dozens of smaller ICOs. Every case rhymes — a team raised money from the public by selling a token and promising to go build something that would make the token worth more. That's not a currency. That's a security with extra steps.",
    secActivity:
      "Hundreds of millions in fines. Telegram returns $1.2B to investors and pays $18.5M.",
  },
  {
    year: "2021–2023",
    title: "DeFi, Staking, and Exchanges",
    icon: ShieldAlert,
    body:
      "The fundraising never stopped — it just rebranded. Yield farms, governance tokens, staking-as-a-service, lending protocols, NFT 'projects' with roadmaps and treasuries. The SEC widens the net: Coinbase, Binance, Kraken's staking program, BlockFi, Celsius, LBRY, Ripple. Almost every action involves either an issuer raising money or an intermediary running an unregistered investment product.",
    secActivity:
      "Gensler-era SEC files record numbers of crypto enforcement actions. Ripple loses on institutional sales, wins on programmatic sales — the line is drawn around fundraising, not around the asset itself.",
  },
  {
    year: "2024–2026",
    title: "The Quiet Retreat",
    icon: Sparkles,
    body:
      "Bitcoin and Ethereum spot ETFs get approved. The SEC drops or pauses investigations against Coinbase, Uniswap, Robinhood, Consensys, and others. Memecoin guidance comes out saying most memecoins aren't securities. The agency is visibly stepping back from the asset-class fight and refocusing on actual fraud — rug pulls, Ponzi schemes, lies to investors.",
    secActivity:
      "Crypto Task Force formed. Public hearings. Most blanket 'crypto is securities' cases are quietly closed.",
  },
];

const CONTRASTS = [
  {
    label: "How it started",
    security: "A founding team raises money from the public, often pre-launch, with a whitepaper and a roadmap.",
    currency:
      "TXC's genesis block was mined on January 26, 2024 in McKinney, Texas. No pre-mine. No raise. No team allocation. Same emission schedule available to anyone with a rig.",
  },
  {
    label: "Where new coins come from",
    security: "Issuer mints and distributes. Treasury controls supply. Vesting cliffs. Team unlocks.",
    currency:
      "Proof-of-work. Every TXC has to be mined. The only way new supply enters circulation is by burning electricity on the network — the same way Bitcoin worked in 2009.",
  },
  {
    label: "Who profits from whose work",
    security: "Buyers expect profit from the efforts of the founding team and promoters.",
    currency:
      "Holders profit from using TXC, accepting it, and the broad network of independent miners and merchants doing their own thing. There is no 'team' that can ship features that make the token go up.",
  },
  {
    label: "What we promise",
    security: "Returns. Yield. APY. 'To the moon.' Price targets. Token unlocks.",
    currency:
      "Cheap, fast, peer-to-peer payments. A scarce supply. A community rooted in Texas. That's the pitch. Period.",
  },
];

function SecAndCryptoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Deep Dive · Regulation
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight md:text-7xl text-balance">
            The SEC didn't show up for currency.
            <span className="block text-primary">They showed up for the ICO.</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground text-balance">
            A short history of when the Securities and Exchange Commission entered the crypto
            conversation, what they actually went after, and why TEXITcoin — a Texas-mined,
            proof-of-work currency with no pre-mine and no promoter — looks nothing like the things
            they were built to regulate.
          </p>
        </section>

        {/* Thesis */}
        <section className="mx-auto mt-20 max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                The thesis
              </div>
            </div>
            <p className="mt-5 font-display text-2xl leading-snug md:text-3xl text-balance">
              Crypto stopped being a currency in 2016, the moment the ICO craze took off. From that
              point forward it has been a securities-and-fundraising story dressed in
              currency-shaped clothes — and the SEC has been here the whole time because of that
              choice, not in spite of it.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Bitcoin in 2009 was boring to securities regulators. Nobody raised money. Nobody
              promised returns. There was no team to sue. The asset was, simply, a currency. If
              crypto had stayed on that path, the SEC would have had almost nothing to do.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Timeline
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            When the SEC actually walked in — and when they started walking out.
          </h2>

          <div className="mt-12 space-y-6">
            {TIMELINE.map((era, i) => {
              const Icon = era.icon;
              return (
                <motion.div
                  key={era.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-[160px_1fr] md:p-8"
                >
                  <div>
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        {era.year}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-bold leading-tight md:text-2xl">
                      {era.title}
                    </div>
                  </div>
                  <div>
                    <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                      {era.body}
                    </p>
                    <div className="mt-4 rounded-lg border border-border/70 bg-background/60 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        SEC activity
                      </div>
                      <div className="mt-1 text-sm text-foreground/85">{era.secActivity}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Pattern */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The pattern
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            Every major SEC crypto case is about fundraising — not about currency.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Read the complaints. The fact pattern repeats: a team, a token sale, a promise of future
            value built by that team's ongoing work, and a public investor base buying in for
            profit. That's the Howey test, applied honestly.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Almost nothing the SEC has ever prosecuted in crypto has been an attack on a
            permissionless, no-pre-mine, mined-from-zero currency. The closest they've come is
            enforcement against intermediaries — exchanges, lenders, and staking products — that
            wrapped real currencies in investment-contract packaging.
          </p>
        </section>

        {/* Side-by-side contrast */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Currency vs. Security
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            TXC looks like 2009 Bitcoin. Not 2017 ICO season.
          </h2>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-background/40 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <div className="p-4">Question</div>
              <div className="p-4 border-l border-border">Security-like crypto</div>
              <div className="p-4 border-l border-border">TEXITcoin</div>
            </div>
            {CONTRASTS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-b-0"
              >
                <div className="p-4 md:p-5 text-sm font-semibold md:text-base">{row.label}</div>
                <div className="border-l border-border p-4 md:p-5 text-sm text-foreground/80 md:text-base">
                  {row.security}
                </div>
                <div className="border-l border-border p-4 md:p-5 text-sm text-foreground/90 md:text-base">
                  {row.currency}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The retreat */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Today
              </div>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl text-balance">
              The SEC is rapidly backing away — even from things far more security-like than TXC.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">
              In 2024–2026 we've watched the agency drop investigations against major exchanges,
              clear the path for spot ETFs, and publish guidance that most memecoins — assets with
              no utility, no scarcity model, no infrastructure behind them — are not securities. If
              a token launched on a Friday night by an anonymous team isn't a security, neither is a
              currency that's been mined by proof-of-work in Texas for years.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              The honest read is this: regulators don't always distinguish the actors. They see
              "crypto" and lump it together. The work of a project like TEXITcoin is to draw the
              line clearly and live on the right side of it.
            </p>
          </div>
        </section>

        {/* Our discipline */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Our discipline
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            Excited about the upside. Disciplined about how we talk about it.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We believe TXC will become more valuable as more people use it, accept it, and mine it.
            That's how currencies appreciate — through utility and demand, not through a team
            shipping features. But there is a real, important difference between believing in a
            currency's future and pitching it like a stock. We refuse to do the second.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 text-primary">
                <Coins className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  How we talk about TXC
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85 md:text-base">
                <li>• A peer-to-peer currency for everyday use.</li>
                <li>• A scarce, mined-from-zero supply with a hard cap of 353M.</li>
                <li>• A community of users, merchants, and miners.</li>
                <li>• A Texas-rooted alternative to fiat.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 text-primary">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  How we don't
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85 md:text-base">
                <li>• No price targets, no "to the moon," no APY promises.</li>
                <li>• No guaranteed mining returns or yield language.</li>
                <li>• No "invest in TXC" — only "use, hold, mine, accept."</li>
                <li>• No promises about features a team will deliver to push price.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="flex items-center gap-2 text-primary">
              <Pickaxe className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                And the same rule applies to mining
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
              Mining TXC is work — it's hash power, electricity, and hardware. It is not a passive
              investment product, it is not an "opportunity" with a return schedule, and it is not
              something we'll ever pitch using securities-adjacent language. If you mine, you're
              participating in consensus and earning the block reward the protocol pays. That's it.
              That's the entire offer.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-background p-8 shadow-card md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl text-balance">
              The short version.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              The SEC came for the ICO era and the fundraising machine that followed. TEXITcoin
              isn't on that road and never has been. We're a currency — designed, mined, and used
              like one. We'll keep talking about it that way.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/currency"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                What makes TXC a currency
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/disclosures"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-accent"
              >
                Read our disclosures
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Nothing on this page is legal advice. It's the project's view of public history and
              its own posture. For risk and legal context, see our{" "}
              <Link to="/disclosures" className="text-primary hover:underline">
                disclosures
              </Link>{" "}
              and{" "}
              <Link to="/legal" className="text-primary hover:underline">
                legal
              </Link>{" "}
              pages.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
