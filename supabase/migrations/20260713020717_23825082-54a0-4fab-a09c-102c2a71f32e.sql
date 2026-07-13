
INSERT INTO public.hit_list_coins (
  slug, cmc_id, cmc_rank, symbol, name, website, x_handle,
  verdict, verdict_note, argument_markdown, gaps_json, published, snapshot_at
) VALUES
(
  'dash', 131, 84, 'DASH', 'Dash', 'https://www.dash.org', 'Dashpay',
  'leftover',
  'A "payments coin" that processes about 20 transactions per block. Payment money that can''t handle payments.',
  $md$## Why Dash is a leftover

Dash sold itself for a decade as **"digital cash for payments."** The pitch was InstantSend, PrivateSend, merchant adoption, and a masternode-governed treasury that would fund real-world usage.

A decade later, **the average Dash block carries roughly 20 transactions.** Twenty. On a chain that markets itself as a payments network. Bitcoin — the chain Dash was supposed to be *faster and better than for payments* — processes 2,000–4,000 transactions per block. Dash is doing 1% of that on a network built specifically for the job.

That's not a scaling problem. That's a **demand problem.** Nobody is paying with Dash. The merchants moved on. The masternode treasury still pays for marketing, but there's no one on the other end of the transaction.

### What Dash has that TXC doesn't
- **Age.** Launched 2014. A decade of brand and exchange listings.
- **A treasury.** Masternode governance funds ongoing dev and BD, even without organic demand.
- **Muscle memory.** Old-school crypto holders still recognize the ticker.

### What TXC has that Dash doesn't
- **A reason to exist in 2026.** "Faster Bitcoin for merchants" was solved by Lightning, stablecoins, and card rails. "Honest PoW money issued in Texas as a hedge against federal monetary policy" is a thesis you can defend today.
- **A story people can repeat.** "Texit money" fits in a sentence. "Masternode-governed InstantSend privacy payments coin" does not.
- **An actual on-chain reason for the transactions** — the Omni L2, real issuance, real settlement.

### The honest verdict
Dash isn't dead — it has a treasury and a floor of loyalists. But it's a **leftover from the 2014–2017 payments-coin era**, holding a top-100 seat on legacy listings and masternode-locked supply, not on usage. If we're picking targets by "who is holding a seat they can no longer defend on merit," Dash is on the short list.
$md$::text,
  '{"transactions_per_block_approx": 20, "era": "2014 payments-coin", "moat": "masternode treasury + legacy listings"}'::jsonb,
  true,
  now()
),
(
  'litecoin', 2, 24, 'LTC', 'Litecoin', 'https://litecoin.org', 'litecoin',
  'coasting',
  'Top-50 seat held on brand and 2013 nostalgia. A few hundred transactions per block on a chain designed to be "silver to Bitcoin''s gold."',
  $md$## Why Litecoin is coasting

Litecoin is the **oldest active altcoin** — launched October 2011 by Charlie Lee as a faster, lighter Bitcoin. "Silver to Bitcoin's gold." For years that pitch worked: it got listed on every exchange, added to every payment processor, and became the default second coin every custodian offered after BTC.

Fifteen years later, Litecoin blocks carry **a few hundred transactions each** — a rounding error compared to Bitcoin's 2,000–4,000 and orders of magnitude below any L1 or L2 that actually competes for payments today. On a chain purpose-built to be *the* medium of exchange, that's a failure of the original thesis.

Litecoin isn't broken. It's just **not being used.**

### What's actually holding the seat
- **Universal listings.** Every CEX, every custodian, every payment processor has an LTC ticker. That's structural liquidity.
- **Brand recognition.** "Silver to Bitcoin's gold" is one of the stickiest one-liners in crypto.
- **Charlie Lee.** Still around, still shipping (MimbleWimble, occasional upgrades), still credible.
- **Zombie holders.** People who bought LTC in 2013–2017 and never sold. They're not trading it, they're not spending it — they're just there.

### What Litecoin doesn't have anymore
- **A differentiated thesis.** "Faster, cheaper Bitcoin" is now solved by Lightning on BTC itself, by stablecoins, and by dozens of L1s and L2s. Litecoin's original job description has been fulfilled by other technology.
- **Meaningful transaction volume.** A few hundred TXs per block on a payments coin is a tell.
- **A story anyone tells anymore.** Nobody argues *for* Litecoin in 2026. They just hold it because they always have.

### Why this matters for TXC
LTC sits at #24 with an ~$3.4B market cap on **legacy plumbing and brand equity, not usage.** That's a valuable lesson: **you can hold a top-50 seat for a decade without ever justifying it on fundamentals** — as long as the listings and the brand outlive the thesis.

TXC's job isn't to beat Litecoin at "faster Bitcoin." That fight was lost by everyone a decade ago. TXC's job is to **have a live thesis** — Texas-issued, PoW, sovereign-money — while Litecoin has none. Over a long enough timeline, seats with a story replace seats without one.

### The honest verdict
Litecoin is coasting. It earned its place, and inertia keeps it there. But it's a **shrinking argument, not a growing one** — and every year the "why LTC" pitch gets harder to make with a straight face.
$md$::text,
  '{"transactions_per_block_approx": 300, "moat": "universal listings + Charlie Lee + 2013 nostalgia", "thesis_status": "obsolete since Lightning + stablecoins"}'::jsonb,
  true,
  now()
);
