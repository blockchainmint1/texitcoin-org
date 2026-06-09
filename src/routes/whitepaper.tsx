import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileText, ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/whitepaper")({
  head: () => ({
    meta: [
      { title: "The TEXITcoin Whitepaper" },
      {
        name: "description",
        content:
          "Read or download The TEXITcoin Whitepaper — a Satoshi-style technical paper covering the team, tokenomics, ethos, and roadmap of TXC.",
      },
      { property: "og:title", content: "The TEXITcoin Whitepaper" },
      {
        property: "og:description",
        content:
          "A Layer 1 Proof-of-Work currency for an independent Texas. Read the whitepaper.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/whitepaper" }],
  }),
  component: WhitepaperPage,
});

const PDF_URL =
  "https://txc.mypinata.cloud/ipfs/bafkreifm3jo26wlq6fapaq57xqe6oxpfj2xgztum3czqtgze6amtlfqdre";

function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <FileText className="h-3 w-3 text-primary" />
                  Whitepaper · v1.0
                </div>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
                  The TEXITcoin <span className="text-primary">Whitepaper</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  A peer-to-peer Layer 1 currency for an independent Texas. The
                  team, the tokenomics, the ethos, and the roadmap — written
                  the way Satoshi would have wanted: plain, technical, and
                  honest.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={PDF_URL}
                    download="TEXITcoin-Whitepaper.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-red-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60 transition"
                  >
                    Open in new tab <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Pin it to IPFS, mirror it, share it. This document is meant to
                  travel.
                </p>
              </div>

              {/* PDF cover thumb */}
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label="Open The TEXITcoin Whitepaper PDF"
              >
                <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-2xl" />
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card transition group-hover:border-primary/60">
                  <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                    texitcoin-whitepaper.pdf
                  </div>
                  <div className="relative bg-white">
                    <img
                      src="/texitcoin-whitepaper-cover.jpg"
                      alt="The TEXITcoin Whitepaper — first page preview"
                      className="block h-[380px] w-full object-cover object-top md:h-[440px]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground opacity-0 transition group-hover:opacity-100">
                      <ExternalLink className="h-3 w-3" /> Open PDF
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Full whitepaper, readable */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[220px_1fr]">
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                Contents
              </div>
              <nav className="mt-4 flex flex-col gap-2 text-sm">
                {[
                  ["abstract", "Abstract"],
                  ["introduction", "1. Introduction"],
                  ["team", "2. Team"],
                  ["tokenomics", "3. Tokenomics"],
                  ["ethos", "4. Ethos"],
                  ["roadmap", "5. Roadmap"],
                  ["conclusion", "6. Conclusion"],
                  ["references", "References"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <a
                href={PDF_URL}
                download="TEXITcoin-Whitepaper.pdf"
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold hover:border-primary/60 transition"
              >
                <Download className="h-3 w-3" /> Download PDF
              </a>
            </aside>

            {/* Article */}
            <article className="max-w-none space-y-12">
              <header>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                  Whitepaper · v1.0
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                  TEXITcoin: A Peer-to-Peer Layer 1 Currency for an Independent Texas
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Bobby Gray · Founder, TEXITcoin · bobby@texitcoin.org
                </p>
              </header>

              <section id="abstract" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-xl font-bold">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A purely peer-to-peer version of electronic cash should let value move between
                  ordinary people without permission from banks, megacorporations, or foreign
                  mining cartels. Bitcoin proved the model and then drifted from it: slow blocks,
                  high fees, industrial mining, and an exchange-mediated economy in which less
                  than one percent of coins ever pay for goods or services. TEXITcoin (TXC) is a
                  Layer&nbsp;1 Scrypt Proof-of-Work blockchain forked from Litecoin and tuned for
                  everyday trade: 3-minute blocks, a 254 TXC starting reward, a hard cap of
                  353,396,296 coins, zero pre-mine, and a halving roughly every 695,662 blocks
                  that stretches issuance across about 138 years. The network is permissionless —
                  anyone, anywhere can run a node and join the chain — while block rewards are
                  routed exclusively to a curated set of community-issued addresses so that
                  emission flows to individual participants rather than being captured by overseas
                  conglomerates. TXC merge-mines with Litecoin and Dogecoin so participants earn
                  without subsidising an electric bill.
                </p>
              </section>

              <section id="introduction" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">1. Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bitcoin was launched in 2008 as peer-to-peer electronic cash. Sixteen years
                  later it is a globally recognised store of value, but it is no longer cash.
                  Confirmations are slow, fees are unpredictable, profitable mining requires
                  industrial-scale ASIC farms in a handful of jurisdictions, and the bulk of
                  trading volume now flows through centralised exchanges and custodians. The
                  blockchain remains decentralised; the economy around it has not. Less than
                  one percent of cryptocurrency volume is ever spent on goods or services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin is an attempt to recover the original peer-to-peer promise with the
                  benefit of more than a decade of hindsight. TXC is not a meme, a governance
                  token, or a wrapper around someone else's chain. It is a Layer&nbsp;1
                  blockchain with its own miners, its own block reward, its own cap, and a
                  specific community it is built to serve: Texans, and anyone who wants to
                  trade with Texans on honest terms.
                </p>
              </section>

              <section id="team" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">2. Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin is built by a team with nearly two decades of experience in
                  alternative currencies, manufacturing, blockchain engineering, and community
                  building. The project rejects pseudonymity: the people behind TXC are public,
                  named, and accountable.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">2.1 Bobby Gray — Founder</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Bobby Gray founded the American Open Currency Standard in 2008 and has spent
                  the years since manufacturing gold, silver, and copper coins for hundreds of
                  causes, from the Lakota Crazy Horse rounds to Ron Paul coins distributed
                  through Provident Metals, JM Bullion, and APMEX. In 2012 he testified before
                  the U.S. House Financial Services Subcommittee on Domestic Monetary Policy on
                  "Parallel Currencies: The Roadmap to Monetary Freedom," and in the same year
                  produced the original physical Bitcoin coin. In 2017 he launched the Bitcoin
                  Cold Storage Coin line. TEXITcoin is the natural continuation of that work:
                  honest money, now at digital speed.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">2.2 Core Contributors</h4>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {[
                    ["Bohdan Shlikhutka", "Application Architect — lead on wallet, explorer, and pool infrastructure."],
                    ["Vitalii Ovodenko", "Network Security — node operations, hardening, and incident response."],
                    ["Eddie Allen", "Currency Director — merchant adoption and complementary-currency operations."],
                    ["Kira Gray", "Events — conferences, the weekly Honest Money Hour, and community programming."],
                    ["Wit Olszewski", "Creative — brand, content, and storytelling."],
                  ].map(([name, role]) => (
                    <li key={name}>
                      <span className="font-semibold text-foreground">{name}.</span> {role}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  Full roster at <Link to="/team" className="text-primary hover:underline">/team</Link>.
                </p>
              </section>

              <section id="tokenomics" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">3. Tokenomics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin is structurally similar to Litecoin: a Scrypt Proof-of-Work chain
                  with predictable, mechanical issuance and no governance lever for inflation.
                  Every TXC in existence enters circulation through mining. There is no
                  pre-mine, no team allocation, no foundation treasury, no VC round, and no
                  vesting cliff that unlocks supply onto holders.
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        ["Consensus", "Proof of Work (Scrypt)"],
                        ["Layer", "1 (own chain, forked from Litecoin)"],
                        ["Block time", "~3 minutes"],
                        ["Initial block reward", "254 TXC"],
                        ["Halving interval", "695,662 blocks"],
                        ["Maximum supply", "353,396,296 TXC"],
                        ["Emission window", "~138 years to final block"],
                        ["Pre-mine / team / VC allocation", "0 TXC"],
                        ["Merge mining", "Litecoin (LTC), Dogecoin (DOGE)"],
                        ["Mining jurisdiction", "Permissioned to Texas"],
                        ["First block mined", "January 26, 2024"],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-border last:border-0">
                          <td className="bg-card/50 px-4 py-2 font-semibold w-1/2">{k}</td>
                          <td className="px-4 py-2 text-muted-foreground">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h4 className="font-display text-lg font-semibold pt-2">3.4 Why Merge Mining</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Proof-of-Work secures a chain in proportion to the value miners can extract
                  from it. By merge-mining with Litecoin and Dogecoin, TXC participants apply
                  the same Scrypt work to several chains at once, capture rewards on each, and
                  offset electricity costs without compromising the security of any
                  participating chain. The effect: Texans can profitably run miners at home
                  rather than ceding the network to industrial farms abroad.
                </p>
              </section>

              <section id="ethos" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">4. Ethos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Money is the language of civilisation. When it is honest, free people trade
                  as equals; when it is debased, the people closest to the printer eat first
                  and everyone else eats less. The team behind TXC has fought this fight since
                  2008, first with metal and now with cryptography. The conviction has not
                  changed; only the tools have.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">4.1 Against the Cantillionaires</h4>
                <p className="text-muted-foreground leading-relaxed">
                  For a century, the people who print the money and the friends who receive it
                  first have rigged the game. Honest money breaks that game. TXC has no issuer
                  who can inflate the supply, no admin key that can pause transfers, and no
                  foundation account that vests new coins onto the market.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">4.2 Crypto Lost Its Way</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Bitcoin proved that decentralised, people-driven money is possible. Then
                  crypto became an online casino: leverage, memecoins, governance theatre, and
                  a small number of exchanges custodying the bulk of supply. The industry needs
                  leadership willing to choose usability over speculation, community over
                  corporations, and honest promises over endless printing. TXC is built around
                  that choice.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">4.3 Built by Texans, for Everyone</h4>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin is a Texas-focused currency: mined in Texas, secured by Texans, and
                  traded first among Texans for goods and services. Six flags have flown over
                  Texas. It is the only U.S. state that was once its own great nation, joining
                  the union by treaty in 1845, and it retains control of its own power grid.
                  As the United States changes, Texas is preparing for whatever comes next.
                  The mission is local; the trade is global.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">4.4 Community, Fun, and Profit</h4>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin exists for three reasons. <strong className="text-foreground">Community</strong>: it starts with the individual,
                  then radiates out to family and neighbours. <strong className="text-foreground">Fun</strong>: if we cannot enjoy the fight
                  for freedom, we are doing it wrong. <strong className="text-foreground">Profit</strong>: the more honest money each member
                  holds, the more freedom they have to shape their own future.
                </p>
                <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                  "Real money should be for the people, by the people. An honest currency is
                  the cornerstone of a civil society."
                </blockquote>
              </section>

              <section id="roadmap" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">5. Roadmap</h3>
                <p className="text-muted-foreground leading-relaxed">
                  TEXITcoin shipped first and announced second. The roadmap below documents
                  what has already been delivered and what is under active development.
                </p>
                <h4 className="font-display text-lg font-semibold pt-2">5.1 Delivered</h4>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed marker:text-primary">
                  <li><strong className="text-foreground">Genesis (Jan 26, 2024).</strong> First TXC block mined after 12+ years of research.</li>
                  <li><strong className="text-foreground">Network permissioning (Block 31,343).</strong> TXC successfully deployed Texas-permissioned mining.</li>
                  <li><strong className="text-foreground">Cold Storage Coin.</strong> Sleek copper TXC cold-storage wallet by Blockchain Mint, debuted at Consensus 2024 in Austin.</li>
                  <li><strong className="text-foreground">100 active miners (Jun 8, 2024).</strong> TXC welcomes its 100th mining member.</li>
                  <li><strong className="text-foreground">Public exchange listing (Jun 11, 2024).</strong> TXC/USDT live on dex-trade.com.</li>
                  <li><strong className="text-foreground">100,000+ MH/s.</strong> Network hash rate crosses one tenth of one percent of the long-term target.</li>
                  <li><strong className="text-foreground">CoinMarketCap listing.</strong> Live price, supply, and market-cap data.</li>
                  <li><strong className="text-foreground">wTXC on Ethereum.</strong> 1:1 backed ERC-20 wrapper for DeFi participants.</li>
                </ul>
                <h4 className="font-display text-lg font-semibold pt-2">5.2 In Progress</h4>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed marker:text-primary">
                  <li><strong className="text-foreground">Mobile wallet (iOS &amp; Android).</strong> Blue Wallet fork with send, receive, and cold-storage recovery.</li>
                  <li><strong className="text-foreground">TEXITcoin Pizza Day.</strong> First commercial TXC transaction at Heirloom Pizza, Plano, TX.</li>
                  <li><strong className="text-foreground">Merge mining live.</strong> Simultaneous Scrypt mining of TXC alongside LTC and DOGE.</li>
                  <li><strong className="text-foreground">Custom in-home ASICs (~300 MH/s).</strong> Household hardware to surpass BTC in independent miners.</li>
                  <li><strong className="text-foreground">Merchant network.</strong> Door-to-door adoption of TXC for goods and services across Texas.</li>
                  <li><strong className="text-foreground">State-level integration.</strong> TXC for Texas-first campaigns and lawful in-kind contributions.</li>
                </ul>
                <h4 className="font-display text-lg font-semibold pt-2">5.3 Long Horizon</h4>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed marker:text-primary">
                  <li><strong className="text-foreground">100 million MH/s decentralised mine.</strong> 35 sites, 35 megawatts, a million members.</li>
                  <li><strong className="text-foreground">Global export.</strong> TXC minted in Texas, traded into Japan, Korea, and Chinese markets.</li>
                  <li><strong className="text-foreground">Independence infrastructure.</strong> A complementary currency ready for whatever sovereign arrangement Texans choose.</li>
                </ul>
              </section>

              <section id="conclusion" className="space-y-4 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">6. Conclusion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We have proposed a Layer&nbsp;1 Proof-of-Work currency that returns to the
                  original peer-to-peer promise of Bitcoin without inheriting its present
                  failure modes. Fixed supply, mechanical issuance, no insider allocation,
                  merge-mined security, individual-scale hardware, and a community organised
                  around honest trade rather than speculation. The chain is live, the mine is
                  growing, and the work continues block by block.
                </p>
              </section>

              <section id="references" className="space-y-3 scroll-mt-24">
                <h3 className="font-display text-2xl font-bold">References</h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground leading-relaxed">
                  <li>Nakamoto, S. "Bitcoin: A Peer-to-Peer Electronic Cash System." 2008.</li>
                  <li>Lee, C. "Litecoin: A Peer-to-Peer Crypto-Currency Based on Scrypt." 2011.</li>
                  <li>Percival, C. "Stronger key derivation via sequential memory-hard functions." 2009.</li>
                  <li>Gray, B. Testimony before the U.S. House Financial Services Subcommittee on Domestic Monetary Policy: "Parallel Currencies: The Roadmap to Monetary Freedom." 2012.</li>
                  <li>American Open Currency Standard. <em>www.opencurrency.com</em></li>
                  <li>TEXITcoin Project. <em>www.texitcoin.org</em> — whitepaper, explorer, wallets, and merchant directory.</li>
                </ol>
              </section>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Read the chain, then read the paper.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The whitepaper documents the system. The blockchain proves it
              works.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/tokenomics"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Tokenomics <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Meet the team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
