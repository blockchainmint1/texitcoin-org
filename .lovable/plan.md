# Port useful content from help.minetxc.com

Most of help.minetxc.com is operator-facing (Rapid Rewards comp plan, payout dashboard, ASIC setup, Coinbase off-ramps for miners, promos). That all stays on the mining side. Below is the curated set worth bringing over to texitcoin.org, where it goes, and what to leave alone.

## What to port, and where

### 1. Expand /faq with two new categories
The FAQ today has three thin categories. Add evergreen, holder-friendly content sourced from help.minetxc.com's "Crypto Basics" and "TXC Basics" sections.

**New category: "Crypto Basics"** (4 Q&As, rewritten in our voice)
- What's the difference between a Layer 1 and a Layer 2 blockchain?
- What is a blockchain node?
- What's a crypto wallet, really?
- What is an exchange and how does it work?

**New category: "Wallets & Tools"** (3 Q&As)
- What is the TXC Wallet app?
- What is the TXC Blockchain Explorer and how do I use it?
- What is the Cold Storage Coin?

These are the kind of questions a curious newcomer to TXC asks before they care about mining. They belong on the public site, not behind a miner login.

### 2. Strengthen /value with the network-value framing
Pull the conceptual backbone from "The Path to $16/$80" essays — Gresham's Law, the Liberty Dollar move-up schedule, Metcalfe's Law, the upward-spiral argument, sound-money DNA — without the price targets, market-cap projections, or dated tables. Reframed as "Why TXC accrues value over time" rather than "$80 by February."

This avoids the securities-flavored language the FAQ already disclaims, but keeps the strongest intellectual case for the currency.

### 3. Add a short "Buying wTXC on Uniswap" walkthrough to /wtxc
The existing /wtxc page introduces wrapped TXC. The mineTXC help center has a step-by-step Uniswap guide and a TXC↔wTXC conversion guide. Distill into a 4-step section on the existing /wtxc page (no new route).

### 4. Add a Brand Kit link to /press
help.minetxc.com has a Brand Kit article (logos, color usage). Add a "Brand assets" block on /press linking to it (or mirror the assets locally if you'd rather host them on this domain — flag for follow-up).

## What to skip
- Rapid Rewards comp plan (MLM/commission structure — mining-side only)
- Payout Dashboard, hash power, daily reward calculations
- ASIC setup guides (ElphaPex, Mini DOGE, pool config)
- Coinbase/Kraken off-ramp tutorials aimed at miners cashing out
- Promos (BOGO, Builder Plan, Launchpad Challenge)
- Video tutorials (all miner-flow)
- Explicit price targets and dated market-cap projections

## Technical notes
- All work is in `src/routes/faq.tsx`, `src/routes/value.tsx`, `src/routes/wtxc.tsx`, and `src/routes/press.tsx`. No new routes.
- FAQ additions extend the existing `CATEGORIES` array and automatically flow into the FAQPage JSON-LD schema and the side-rail nav.
- All copy rewritten in the existing site voice (plain, declarative, no emojis, no MLM language). No verbatim paste from the help center.
- No backend, no schema, no new dependencies.

## Out of scope (ask separately if wanted)
- Mirroring the help center's images/PDFs locally
- A dedicated /learn or /education hub (the FAQ expansion covers this for now)
- Pulling the price-target essays as a standalone /thesis page
