INSERT INTO public.zoom_calls (slug, title, description, call_date, status, video_cid, duration_seconds, summary, thumbnail_url)
VALUES (
  '2026-07-16-podcasting-legal-wins-nectar-pay-terminals',
  'Strategy Launch: Podcasting, Legal Wins, and 10,000 Terminals',
  'Bobby Gray discussed the new Honest Money Live podcast strategy, big legal updates in Texas, and a massive sales push for Nectar Pay terminals.',
  '2026-07-16 23:59:00+00',
  'recorded',
  'bafybeiaowphvxzeibyklib4epzxyobycmltjsl3nvkoszks3kdlpgeu2hm',
  3871,
  E'### THE GIST\nThe team is shifting gears from "sowing" to "reaping" as recent legal filings and improved social media reach via StreamYard have sparked a 3x jump in the TXC price. Bobby announced a new collaborative podcast strategy to broaden the project\'s audience, while Tim detailed an aggressive plan to deploy over 10,000 Nectar Pay terminals across Texas using a new professional sales force.\n\n* **Broadcasting & The "Proof of No Edit":** Bobby highlighted the success of switching to StreamYard, noting that live, unfiltered content is the new "coin of the realm." A new "Honest Money Live" podcast is in the works to interview experts across politics and finance.\n* **Legal Strategy & Market Response:** TXC has hired a top-tier firm (Quinn Emanuel) to challenge regulatory overreach in Texas. Bobby called this a win for the entire crypto industry and noted it served as the catalyst for the recent price run-up.\n* **Market Guidance:** With the price climbing, Bobby urged the community to avoid FOMO, be strategic with limit orders to provide liquidity, and not obsess over the charts, reminding everyone this is a "generational wealth" project.\n* **Nectar Pay Deployment:** Tim is currently hiring sales managers and reps to hit a target of 10,000 active merchant terminals by October. The focus is on DFW, Austin, Houston, and other major hubs to increase the "velocity of money."\n* **CoinMarketCap Verification:** The project is spending $75,000 to have CoinMarketCap verify the entire TXC chain and L2 tokens, correcting the holder count data which currently only shows wrapped token holders.\n* **Road to Page One:** The team set a goal to reach the front page of CoinMarketCap and hit the "Top 100" by the Token2049 event in Singapore, positioning TXC as a stable, peer-to-peer alternative to legacy finance.',
  'https://streamtxc.com/api/stream/bafkreid65cacj4afdyjtg5rfeibhen5fsbjk7opmh7umh7gnssomniczfu'
);

UPDATE public.zoom_calls
SET thumbnail_url = 'https://streamtxc.com/api/stream/bafkreibu4y37ec4ufkiimpcaz54fp7f4df2y5refrxhrpjkijhbwgttzd4'
WHERE slug = '2026-07-11-emergency-txc-market-update';