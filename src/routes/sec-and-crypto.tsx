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
  Network,
  Undo2,
  Landmark,
  Search,
  HelpCircle,
  Eye,
  DoorOpen,
  ExternalLink,
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
    year: "2013–2015",
    title: "Early, Fraud-Focused Appearances",
    icon: Search,
    body:
      "The SEC's first crypto cases weren't about Bitcoin-the-currency. They were about people using Bitcoin to run old-fashioned scams. Trendon Shavers / 'Bitcoin Savings & Trust' (2013) was a textbook Ponzi — he raised 700,000 BTC promising 7% weekly returns and paid early investors with new deposits. Erik Voorhees settled in 2014 over unregistered securities sales tied to SatoshiDice and FeedZeBirds shares. In 2014 the SEC put out an Investor Alert warning about Bitcoin-denominated Ponzis. The through-line is the same one we'll see for the next decade: the SEC shows up when somebody raises money from the public and lies about what they'll do with it.",
    secActivity:
      "SEC v. Shavers (2013) — first major crypto enforcement, a Ponzi, not an attack on Bitcoin itself. Voorhees settlement (2014) over unregistered share sales.",
  },
  {
    year: "2009–2015",
    title: "The Currency Era (in parallel)",
    icon: Coins,
    body:
      "While those fraud cases played out, the broader crypto world stayed mostly currency-shaped. Bitcoin, Litecoin, Dogecoin, Monero — peer-to-peer cash, open mining, no issuer, no promoter, no roadmap to riches. The SEC engaged with crypto only when it was wrapped around a fundraise or a fraud. The asset class itself was not the target.",
    secActivity: "No general 'crypto is securities' position. Targeted only at fraud and unregistered share sales.",
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
      "The fundraising never stopped — it just rebranded. Yield farms, governance tokens, staking-as-a-service, lending protocols, NFT 'projects' with roadmaps and treasuries. The SEC widens the net: Coinbase, Binance, Kraken's staking program, BlockFi, Celsius, LBRY, Ripple. Almost every action involves either an issuer raising money or an intermediary running an unregistered investment product — and a striking number also involve outright fraud (Celsius, FTX-adjacent actors, Terraform Labs).",
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

const REGULATORS = [
  {
    name: "FinCEN",
    icon: Landmark,
    role: "Money transmission, KYC/AML.",
    note: "Treats crypto businesses as money services businesses. Cares about how value moves, not whether the asset is a security.",
  },
  {
    name: "OFAC",
    icon: ShieldAlert,
    role: "Sanctions enforcement.",
    note: "Has gone after mixers (Tornado Cash) and wallets linked to sanctioned entities. Doesn't care what you call the asset.",
  },
  {
    name: "CFTC",
    icon: Scale,
    role: "Commodities and derivatives.",
    note: "Considers Bitcoin and Ether commodities. Polices fraud and manipulation in crypto derivatives markets. Has its own enforcement docket — separate from the SEC's.",
  },
  {
    name: "FTC",
    icon: AlertTriangle,
    role: "Consumer protection, deceptive marketing, MLM.",
    note: "When 'crypto' shows up as a multi-level marketing pitch — recruit-to-earn, downlines, guaranteed returns — the FTC takes the case as deceptive practice. The asset is incidental.",
  },
];

const DEFINITIONS = [
  {
    term: "Decentralized",
    icon: Network,
    meanings: [
      {
        whose: "To us",
        text:
          "No single party can stop the network, no single party controls issuance, and the rules are enforced by independent nodes anyone can run.",
      },
      {
        whose: "To crypto generally",
        text:
          "Often a marketing word. Routinely applied to networks with a small set of validators, an upgradeable contract, or a foundation that can ship a hard fork.",
      },
      {
        whose: "To the SEC",
        text:
          "A factual question about who is doing the essential managerial work. If a team is still indispensable, the SEC tends to treat the network as centralized regardless of the marketing.",
      },
      {
        whose: "Defined in law?",
        text:
          "No — there is no statutory definition. 'Sufficiently decentralized' was a William Hinman speech in 2018, not a rule, and the SEC has since walked back its precedential weight.",
      },
    ],
  },
  {
    term: "Permissionless",
    icon: DoorOpen,
    meanings: [
      {
        whose: "To us",
        text:
          "Anyone can run a node, anyone can mine through the public mining front door, anyone can hold a wallet, anyone can send and receive, anyone can read the full block history.",
      },
      {
        whose: "To crypto generally",
        text:
          "Usually means 'no KYC to use the protocol.' But the asset, the bridges, the front-ends, and the on-ramps almost always have permissions of their own.",
      },
      {
        whose: "To the SEC",
        text:
          "Largely irrelevant on its own. They care about who is selling, who is promoting, and what investors were promised — not whether the underlying protocol is open.",
      },
      {
        whose: "Defined in law?",
        text:
          "No. Like 'decentralized,' it's an industry term, not a statutory one. Useful as a description; meaningless as a defense.",
      },
    ],
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
              Bitcoin in 2009 was boring to securities regulators. The handful of SEC actions
              before 2016 were narrow and fraud-focused — Ponzis denominated in BTC, unregistered
              share sales by crypto entrepreneurs. The asset class itself wasn't the target. That
              changed the second teams started raising money by selling tokens.
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
                  key={era.year + era.title}
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

        {/* Fraud is the through-line */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-primary" />
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                The through-line
              </div>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl text-balance">
              Strip away the asset class, and most of these cases are about fraud.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">
              Shavers — Ponzi. Telegram — promised tokens that were never delivered as described.
              Celsius — lied to depositors about how their assets were used. Terraform / Do Kwon
              — misrepresented the stability mechanism behind UST. FTX-adjacent actors —
              commingling and theft. BitConnect — Ponzi with a referral pyramid.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              The SEC's job isn't to dislike crypto. Their job is to protect investors from lies.
              When you read the cases instead of the headlines, the cases overwhelmingly involve
              someone lying to the public to get their money. That's the work. We support it.
            </p>
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
            Almost nothing the SEC has ever prosecuted in crypto has been an attack on a no-pre-mine,
            mined-from-zero currency. The closest they've come is enforcement against intermediaries
            — exchanges, lenders, and staking products — that wrapped real currencies in
            investment-contract packaging.
          </p>
        </section>

        {/* The Ethereum parallel */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The Ethereum parallel
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            Even the networks held up as "decentralized" started centralized — and stayed reversible.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Ethereum is the easiest comparison. It launched with a presale, a foundation, a small
            core team writing the code, and a clear central point of leadership in Vitalik
            Buterin. It grew into something broader over time — more clients, more validators, a
            global developer base — and that maturation is, fairly, why it gets called
            decentralized today.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            TEXITcoin has been honest about the same arc. We started extremely concentrated — one
            mining operation, one location, closed source, a small set of nodes we ran ourselves.
            We've been steadily opening every layer: public mining through mineTXC, open-source
            wallet and node software, third-party nodes anyone can spin up, a published
            block-explorer, and a roadmap that keeps pushing in that direction. In our SEC
            deposition this week, the agency itself noted the progress — that today anyone with
            the skill and the hardware can spin up a TXC node and join the network.
          </p>

          {/* The DAO rollback callout */}
          <div className="mt-10 rounded-2xl border-2 border-primary/40 bg-card p-8 shadow-card md:p-10">
            <div className="flex items-center gap-3">
              <Undo2 className="h-6 w-6 text-primary" />
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Feature: decentralized AND permanent — but reversible?
              </div>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl text-balance">
              In 2016, Ethereum was hacked. The community didn't patch around it. They rolled
              back the chain.
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">
              The DAO hack drained about $60M of ETH. Ethereum's leadership and the largest
              stakeholders coordinated a hard fork that rewrote history — undoing the theft and
              returning the funds. The chain that refused to roll back still exists today as
              Ethereum Classic, a much smaller network.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              This is the central tension in crypto's self-description. A network that can be
              hard-forked by a small group of leaders and exchanges, on a tight timeline, to
              reverse a specific outcome, is — by any honest reading — not as immutable as the
              pitch deck suggests. Either decentralization is real and outcomes are permanent, or
              someone has the authority to undo them. You cannot have both.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              We're not throwing rocks at Ethereum. We're pointing at the standard. If the
              flagship "decentralized" network has reversed itself once already, the bar for what
              counts as decentralized is a lot lower than the marketing implies — and the
              questions the SEC asks about who really controls a network are entirely fair.
            </p>
          </div>
        </section>

        {/* Honest about TXC's network */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Our network, honestly described
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            What "anyone can participate" actually means on TXC today.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We won't oversell this. Here's the honest line-by-line on what is open to anyone on the
            TEXITcoin network right now, and what still has a front door.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 text-primary">
                <Eye className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Fully open to anyone
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85 md:text-base">
                <li>• Download a wallet.</li>
                <li>• Send TXC to anyone, anywhere, without asking us.</li>
                <li>• Receive TXC from anyone.</li>
                <li>• Read the full block history in our public explorer.</li>
                <li>• Spin up a TXC node from the open-source code.</li>
                <li>• Build on top of TXC without permission from the project.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 text-primary">
                <DoorOpen className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Open, with a front door
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85 md:text-base">
                <li>
                  • <strong>Mining.</strong> Today, the practical path into mining TXC is through
                  the public mineTXC front door. That door is open to anyone who wants to walk
                  through it, but it is a door — we're being precise. We are not yet at "pull
                  rigs off a shelf and point them at a public pool from anywhere on Earth."
                </li>
                <li>
                  • <strong>Network maturation.</strong> Like every young chain, the number of
                  independent nodes and miners is still growing. We're transparent about the
                  current state and the direction.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Definitions */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            What do these words even mean?
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            "Decentralized" and "permissionless" came up again and again in our deposition. Here's
            how we use them.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Neither word is defined in U.S. securities law. That matters, because the industry uses
            them loosely, the SEC uses them carefully, and the gap between those two usages is
            where a lot of the disagreement lives.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DEFINITIONS.map((def) => {
              const Icon = def.icon;
              return (
                <div
                  key={def.term}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <div className="font-display text-2xl font-bold">{def.term}</div>
                  </div>
                  <div className="mt-5 space-y-4">
                    {def.meanings.map((m) => (
                      <div key={m.whose} className="rounded-lg border border-border/70 bg-background/60 p-4">
                        <div className="flex items-center gap-2 text-primary">
                          <HelpCircle className="h-3.5 w-3.5" />
                          <div className="text-[10px] font-bold uppercase tracking-[0.22em]">
                            {m.whose}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Other regulators */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            One more thing
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            The SEC isn't the only sheriff in town.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Even if a network is clearly a currency and clearly not a security, other federal
            regulators still care about the conduct around it. This page focuses on the SEC because
            that's where most of the public confusion lives, but we want to be straight about the
            broader map.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {REGULATORS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="font-display text-xl font-bold">{r.name}</div>
                  </div>
                  <div className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {r.role}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">
                    {r.note}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            The reason this matters: a lot of what gets called "an SEC issue" in crypto is really
            a FinCEN, OFAC, CFTC, or FTC issue. MLM-style crypto recruiting schemes, in
            particular, are usually FTC and state AG cases, not securities cases. The asset is
            almost never the problem — the conduct around it is.
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

        {/* Sources & references */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Sources &amp; references
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            Don't take our word for it — read the filings.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Every case and document referenced above is public. Here are the primary sources so you
            can verify the history yourself.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RefGroup
              title="Pre-ICO era (2013–2015)"
              items={[
                {
                  label: "SEC v. Trendon Shavers / Bitcoin Savings & Trust (2013)",
                  href: "https://www.sec.gov/litigation/litreleases/2013/lr22792.htm",
                  note: "First major SEC crypto enforcement — a Bitcoin-denominated Ponzi.",
                },
                {
                  label: "SEC v. Erik T. Voorhees (2014)",
                  href: "https://www.sec.gov/news/press-release/2014-111",
                  note: "Unregistered offerings of SatoshiDice and FeedZeBirds shares.",
                },
                {
                  label: "SEC Investor Alert: Bitcoin and Other Virtual Currency-Related Investments (2014)",
                  href: "https://www.sec.gov/investor/alerts/ia_bitcoin.pdf",
                },
              ]}
            />

            <RefGroup
              title="The DAO Report and the ICO wave"
              items={[
                {
                  label: "SEC Report of Investigation: The DAO (July 2017)",
                  href: "https://www.sec.gov/litigation/investreport/34-81207.pdf",
                  note: "The formal statement that tokens can be securities under Howey.",
                },
                {
                  label: "SEC v. Munchee Inc. (2017)",
                  href: "https://www.sec.gov/litigation/admin/2017/33-10445.pdf",
                },
                {
                  label: "SEC v. Telegram (2020) — $1.2B returned, $18.5M penalty",
                  href: "https://www.sec.gov/news/press-release/2020-146",
                },
                {
                  label: "SEC v. Kik Interactive (Kin)",
                  href: "https://www.sec.gov/news/press-release/2019-87",
                },
                {
                  label: "SEC v. Block.one (EOS)",
                  href: "https://www.sec.gov/news/press-release/2019-202",
                },
              ]}
            />

            <RefGroup
              title="DeFi, exchanges, staking (2021–2023)"
              items={[
                {
                  label: "SEC v. Ripple Labs",
                  href: "https://www.sec.gov/news/press-release/2020-338",
                  note: "Lost on institutional sales, won on programmatic sales.",
                },
                {
                  label: "SEC v. Coinbase (2023)",
                  href: "https://www.sec.gov/news/press-release/2023-102",
                },
                {
                  label: "SEC v. Binance (2023)",
                  href: "https://www.sec.gov/news/press-release/2023-101",
                },
                {
                  label: "Kraken staking settlement (2023)",
                  href: "https://www.sec.gov/news/press-release/2023-25",
                },
                {
                  label: "SEC v. Terraform Labs and Do Kwon",
                  href: "https://www.sec.gov/news/press-release/2023-32",
                },
                {
                  label: "SEC v. Celsius Network and Alex Mashinsky",
                  href: "https://www.sec.gov/news/press-release/2023-141",
                },
                {
                  label: "SEC v. BitConnect",
                  href: "https://www.sec.gov/news/press-release/2021-172",
                },
              ]}
            />

            <RefGroup
              title="The 2024–2026 retreat"
              items={[
                {
                  label: "Spot Bitcoin ETF approvals (Jan 2024)",
                  href: "https://www.sec.gov/news/statement/gensler-statement-spot-bitcoin-011023",
                },
                {
                  label: "SEC Division of Corporation Finance — Statement on Meme Coins (2025)",
                  href: "https://www.sec.gov/newsroom/speeches-statements/staff-statement-meme-coins",
                },
                {
                  label: "SEC Crypto Task Force",
                  href: "https://www.sec.gov/about/crypto-task-force",
                },
              ]}
            />

            <RefGroup
              title="Background and other regulators"
              items={[
                {
                  label: "The Howey Test — SEC v. W.J. Howey Co. (1946)",
                  href: "https://supreme.justia.com/cases/federal/us/328/293/",
                },
                {
                  label: "Hinman 'sufficiently decentralized' speech (2018)",
                  href: "https://www.sec.gov/news/speech/speech-hinman-061418",
                  note: "A speech, not a rule — and the SEC has walked back its precedential weight.",
                },
                {
                  label: "OFAC sanctions on Tornado Cash (2022)",
                  href: "https://home.treasury.gov/news/press-releases/jy0916",
                },
                {
                  label: "FinCEN guidance on virtual currency",
                  href: "https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering",
                },
                {
                  label: "CFTC crypto enforcement",
                  href: "https://www.cftc.gov/digitalassets/index.htm",
                },
                {
                  label: "FTC actions on crypto MLM and deceptive marketing",
                  href: "https://www.ftc.gov/news-events/topics/consumer-finance/cryptocurrency",
                },
              ]}
            />

            <RefGroup
              title="The Ethereum / DAO rollback"
              items={[
                {
                  label: "The DAO hack and Ethereum hard fork — historical overview",
                  href: "https://www.coindesk.com/learn/understanding-the-dao-attack",
                },
                {
                  label: "Ethereum Classic — the chain that refused to fork",
                  href: "https://ethereumclassic.org/why-classic",
                },
              ]}
            />
          </div>
        </section>

        {/* CTAs */}
        <section className="mx-auto mt-24 max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-background p-8 shadow-card md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl text-balance">
              The short version.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              The SEC came for the ICO era and the fundraising machine that followed. Before that,
              they showed up for fraud. TEXITcoin isn't either of those things — and we're
              disciplined about not becoming them. We're a currency. We talk like one, we ship like
              one, and we describe our own network honestly, front doors and all.
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

type RefItem = { label: string; href: string; note?: string };

function RefGroup({ title, items }: { title: string; items: RefItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-7">
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{title}</div>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.href} className="text-sm md:text-base">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              <span>{item.label}</span>
              <ExternalLink className="mt-1 h-3.5 w-3.5 flex-shrink-0 opacity-70" />
            </a>
            {item.note && (
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{item.note}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
