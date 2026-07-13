import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Scale, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/clarity")({
  head: () => ({
    meta: [
      { title: "The CLARITY Act — The Permission Slip We Didn't Need" },
      {
        name: "description",
        content:
          "A plain-English deep dive into the Digital Asset Market Clarity Act (H.R. 3633): what it actually does, what it doesn't, why institutions are waiting on it, and why TEXITcoin — a fair-launched, permissionless, proof-of-work commodity — never needed it in the first place.",
      },
      { property: "og:title", content: "The CLARITY Act — The Permission Slip We Didn't Need" },
      {
        property: "og:description",
        content:
          "What CLARITY actually gives crypto, what it doesn't, and why fair-launched PoW coins like TXC were always digital commodities — with or without a bill.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://texitcoin.org/clarity" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/clarity" }],
  }),
  component: ClarityPage,
});

function ClarityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Scale className="h-3.5 w-3.5" /> H.R. 3633 · Deep Dive
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-tight">
            The CLARITY Act — the permission slip we didn't need.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
            Wall Street is holding its breath for a bill that legalizes what
            fair-launched proof-of-work coins have been doing since 2009. Here's
            what CLARITY actually does, what it doesn't, and why TEXITcoin was
            already on the right side of every line it draws.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">Bill: H.R. 3633 (119th Congress)</span>
            <span className="rounded-full border border-border px-3 py-1">Sponsor: Rep. French Hill (R-AR)</span>
            <span className="rounded-full border border-border px-3 py-1">House-passed: July 2025 · Senate: pending</span>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">TL;DR</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">In one paragraph</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            CLARITY splits crypto oversight between the SEC and the CFTC. It
            invents a category called <em>digital commodity</em> for tokens that
            live on a "mature" (decentralized) blockchain, and hands those to
            the CFTC. It creates a self-certification path so issuers can
            declare their token a commodity, and builds a registration regime
            for the exchanges, brokers, and dealers who trade them. It's a big,
            real bill — and almost none of it changes anything for a fair-launched,
            no-premine, permissionless proof-of-work coin. Those were digital
            commodities the day they were mined. TXC included.
          </p>
        </div>
      </section>

      {/* What CLARITY actually does */}
      <section className="py-20 bg-surface/40 border-b border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">What CLARITY does</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Five things the bill actually delivers</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {WHAT_IT_DOES.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary text-sm font-bold">{i + 1}</span>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it doesn't do */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">What CLARITY doesn't do</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">The quiet part</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Every piece of legislation is defined as much by what it leaves alone
            as what it changes. Here's what CLARITY doesn't touch.
          </p>
          <ul className="mt-8 space-y-4">
            {DOES_NOT_DO.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <XCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why institutions wait */}
      <section className="py-20 bg-surface/40 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The waiting game</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            Why institutions are holding their breath
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Every headline about CLARITY comes with the same subtext:{" "}
              <em>"institutional adoption unlocks when this passes."</em> BlackRock is
              waiting. Fidelity is waiting. The big custodians are waiting.
              Regional banks that want to touch crypto without getting a phone
              call from their examiner are waiting.
            </p>
            <p>
              Here's what they're actually waiting for — and it isn't a
              redefinition of Bitcoin.
            </p>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">The honest translation</div>
              <p className="mt-3 text-foreground">
                They're waiting for permission to touch tokens that <em>don't
                look like commodities</em> — VC-funded ICOs with foundation
                treasuries, staking-yield products, tokenized securities,
                pre-mined chains with insider allocations, and stablecoins that
                sit on their balance sheets. Those are the assets in regulatory
                purgatory. CLARITY builds a road for them.
              </p>
            </div>
            <p>
              Bitcoin was declared a commodity by the CFTC in <strong>2015</strong>.
              Ethereum got the same nod in <strong>2018</strong>. Fair-launched
              proof-of-work coins were never the problem, because they never
              looked like securities to begin with — no promoter selling you a
              future return, no foundation holding half the supply, no
              investment contract wrapping the coin.
            </p>
            <p>
              The chains that need CLARITY are the ones that <em>couldn't
              honestly claim commodity status without a statute rewriting the
              definition.</em> That is a real, useful piece of legislation for
              them. It's just not a milestone for us.
            </p>
          </div>
        </div>
      </section>

      {/* Why TXC didn't need it */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The TXC angle</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            Why TEXITcoin didn't need CLARITY
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Read the "digital commodity" definition in the bill, then read the
            TXC disclosures page. They describe the same asset.
          </p>
          <div className="mt-10 grid gap-4">
            {WHY_TXC.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <ShieldCheck className="h-4 w-4" /> The point
            </div>
            <p className="mt-4 text-lg text-foreground leading-relaxed">
              CLARITY doesn't <em>grant</em> TXC commodity status. It
              <em> ratifies</em> what was already true. When the bill passes,
              nothing about how the network runs, how coins are mined, or how
              we operate has to change. That is the correct outcome — and it's
              only possible because the network was designed honestly from
              block one.
            </p>
          </div>
        </div>
      </section>

      {/* Where CLARITY actually helps us */}
      <section className="py-20 bg-surface/40 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Being fair</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            Where CLARITY does help — even for us
          </h2>
          <p className="mt-4 text-muted-foreground">
            We said the bill doesn't change what TXC <em>is</em>. That's true.
            But it changes the environment TXC lives in, and some of those
            second-order effects are genuinely useful.
          </p>
          <ul className="mt-8 space-y-5">
            {WHERE_HELPFUL.map((item, i) => (
              <li key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="font-semibold">{item.title}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.body}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Risks / cautions */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">The catch</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            What we're watching carefully
          </h2>
          <ul className="mt-8 space-y-4">
            {CAUTIONS.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-20 bg-surface/40 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Verdict</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            A good bill. Not our milestone.
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              CLARITY is a genuinely useful piece of legislation for the parts
              of crypto that needed a statute to legitimize their business
              model. It gives the CFTC the toolkit it's been asking for. It
              lets institutions plug into digital assets without a compliance
              nightmare. It draws real lines that have been fuzzy for a
              decade.
            </p>
            <p className="text-foreground font-semibold">
              But the milestone for TEXITcoin was mined on January 26, 2024,
              in McKinney, Texas — before this bill was written, and it will
              remain the milestone after this bill becomes law.
            </p>
            <p>
              The reason we don't need the permission slip is that we built
              something the law was already comfortable with. Fair launch. No
              premine. Open source. Permissionless mining. Public ledger.
              Peer-to-peer. Every honest-money box, checked before Congress
              wrote a bill about which boxes counted.
            </p>
            <p>
              If you're waiting on CLARITY to get comfortable with crypto,
              that's fair — we understand. Just know what you're actually
              waiting for, and know that <strong>the coin that already
              cleared the bar has been here the whole time.</strong>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/disclosures"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-surface transition-colors"
            >
              Read the TXC disclosures <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/market"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              See the Hit List <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.congress.gov/bill/119th-congress/house-bill/3633/text"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-surface transition-colors"
            >
              Read H.R. 3633 <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const WHAT_IT_DOES: { title: string; body: string }[] = [
  {
    title: "Invents the 'digital commodity' category",
    body: "Creates a new asset class for tokens that live on a sufficiently decentralized blockchain (the bill's term of art is 'mature blockchain system'). Once a token qualifies, it's a commodity — and the CFTC, not the SEC, is the primary regulator.",
  },
  {
    title: "Splits SEC and CFTC jurisdiction",
    body: "SEC keeps investment-contract tokens (early-stage ICOs, foundation-controlled chains still being built out). CFTC gets mature, decentralized networks and their secondary markets. The handoff mechanism is the 'mature blockchain' certification.",
  },
  {
    title: "Adds a self-certification path",
    body: "Issuers can file a certification with the SEC stating their token meets the digital-commodity criteria. Regulators have 60 days to object; silence is approval. It's a fast lane for projects that can honestly claim decentralization.",
  },
  {
    title: "Registers digital commodity intermediaries",
    body: "Creates registration regimes at the CFTC for digital commodity exchanges, brokers, dealers, and custodians — with capital, custody, disclosure, and anti-manipulation requirements. This is what most of the bill's page count is.",
  },
  {
    title: "Carves out non-custodial DeFi",
    body: "Explicitly protects individuals writing or publishing code for non-custodial protocols from being treated as brokers or dealers. This is the developer-freedom carve-out DeFi has been begging for.",
  },
];

const DOES_NOT_DO: { title: string; body: string }[] = [
  {
    title: "It doesn't declare Bitcoin (or any specific coin) a commodity",
    body: "CLARITY builds the framework. Individual token status still has to be certified or determined case by case. Bitcoin was already a commodity by CFTC action in 2015 — this bill doesn't change that, and it doesn't reach out and bless anyone by name.",
  },
  {
    title: "It doesn't create a federal license to operate as a token issuer",
    body: "There's no 'CLARITY license' you go get. Issuers self-certify. The bill polices intermediaries (exchanges, brokers) more than issuers.",
  },
  {
    title: "It doesn't preempt state money-transmitter law",
    body: "State-by-state licensing for exchanges and custodians remains. If you were figuring out MSB, BitLicense, and every state's MTL before CLARITY, you still are after CLARITY.",
  },
  {
    title: "It doesn't legalize anything currently illegal",
    body: "Fraud is still fraud. Market manipulation is still market manipulation. Unregistered securities offerings that don't qualify as digital commodities are still unregistered securities offerings. The bill draws lines; it doesn't move the ones under existing enforcement.",
  },
  {
    title: "It's not law yet",
    body: "House-passed in July 2025. Still needs the Senate (where a companion market-structure bill is being negotiated) and a presidential signature. Any final text may look meaningfully different from H.R. 3633 as passed.",
  },
];

const WHY_TXC: { title: string; body: string }[] = [
  {
    title: "Fair launch, no premine, no ICO",
    body: "Every TXC in existence was produced by proof-of-work mining, on the same schedule, available to anyone with a rig. No investors bought pre-issuance tokens. There is no 'investment contract' to worry about.",
  },
  {
    title: "No foundation holding the treasury",
    body: "The bill's 'mature blockchain' test cares heavily about whether one entity controls the supply or the roadmap. TXC has no such entity. Miners produce the supply; the open-source protocol governs the rules.",
  },
  {
    title: "Open source and permissionless",
    body: "TEXITcoin Core is public on GitHub with the full commit history. Anyone can run a node, mine, fork, or audit. That is exactly the 'no controlling issuer' condition CLARITY uses to draw its line.",
  },
  {
    title: "Peer-to-peer commodity, not a security",
    body: "TXC is offered as a decentralized proof-of-work currency for general use. It's not offered as an investment product. That's not a legal opinion — it's the position we've held publicly since day one, printed on the disclosures page.",
  },
  {
    title: "The framework already exists for chains like ours",
    body: "The CFTC declared Bitcoin a commodity in 2015 and Ether in 2018 under existing law — no CLARITY Act required. Proof-of-work, fair-launched networks have been living under commodity oversight for a decade. CLARITY just codifies the pattern.",
  },
];

const WHERE_HELPFUL: { title: string; body: string }[] = [
  {
    title: "Clearer path for U.S. exchanges to list us",
    body: "A CFTC-registered digital-commodity exchange has a known ruleset for onboarding a coin like TXC. Today, U.S. exchange listings are a legal odyssey. CLARITY makes that decision less scary for compliance departments, which is meaningful for volume and reach.",
  },
  {
    title: "Custody stops being a gray area",
    body: "Registered digital-commodity custodians get an actual statute to operate under. That opens the door for RIAs, family offices, and eventually retirement accounts to hold TXC without their custodian sweating.",
  },
  {
    title: "DeFi carve-out protects the Omni Layer 2 developers",
    body: "The non-custodial DeFi exemption directly protects people writing smart contracts on top of TXC. That matters for the tokens.texitcoin.org ecosystem and anything else that gets built on the L2.",
  },
  {
    title: "Legitimizes fair-launched PoW as a category",
    body: "The strongest positive: the bill is written in a way that treats permissionless proof-of-work networks as the gold standard for decentralization. That reframes the conversation and makes it harder to bucket honest coins with the scam-adjacent ones.",
  },
];

const CAUTIONS: { title: string; body: string }[] = [
  {
    title: "The 'mature blockchain' definition is still discretionary",
    body: "The bill lays out factors but doesn't give a bright-line pass. Aggressive regulators could still argue a chain isn't decentralized enough. The self-certification path helps, but silence-is-approval only works if the regulators actually stay silent.",
  },
  {
    title: "Registration costs favor incumbents",
    body: "Exchange, broker, and dealer registration is expensive and slow. Established players (Coinbase, Kraken, CME) can pay for it and gain a moat. Small, honest venues may find compliance costs pricing them out — which reduces the exact competition that healthy markets need.",
  },
  {
    title: "The Senate version will look different",
    body: "The Senate is negotiating its own market-structure bill. What comes out of conference could be more permissive, more restrictive, or bolt on stablecoin provisions that reshape the whole crypto stack. Don't over-anchor on the House text.",
  },
  {
    title: "Legislative permission is not moral permission",
    body: "We built TEXITcoin because we believe people deserve honest money regardless of what a statute says. A good outcome from CLARITY is helpful. A bad outcome doesn't change what we're doing. The network runs either way.",
  },
];
