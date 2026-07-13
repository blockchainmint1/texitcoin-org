## Goal

Build a new `/market` page on texitcoin.org that answers one question: **"Should TXC be a CMC Top 100 coin?"** — by showing TXC's own market stats up top, and a growing **Hit List** of Top 100 coins we're evaluating (and eventually replacing). We start with **Kaspa** as the first full case study, and use it as the template for the other 99.

## Phase 1 — Kaspa case study (this pass)

### `/market` page structure

```text
┌─ Hero ────────────────────────────────────────────────┐
│  "The Hit List"                                       │
│  Why we belong in the Top 100 — and who we're         │
│  measuring ourselves against.                         │
└───────────────────────────────────────────────────────┘

┌─ TXC Market Snapshot ─────────────────────────────────┐
│  Live price · 24h volume · Market cap · Supply        │
│  Holders · Exchanges listed · Key milestones          │
│  (pulled live from CMC API via server fn)             │
└───────────────────────────────────────────────────────┘

┌─ Key Milestones ──────────────────────────────────────┐
│  Timeline: launch, first exchange, honest.money, etc. │
└───────────────────────────────────────────────────────┘

┌─ The Hit List ────────────────────────────────────────┐
│  Coin cards, sortable by CMC rank                     │
│  [Kaspa #62] ← full case study, links to detail       │
│  [Coming soon: 99 more]                               │
└───────────────────────────────────────────────────────┘
```

### `/market/kaspa` deep-dive page

Sections:
1. **Verdict banner** — our take up top ("Leftover" / "Earned it" / "Coasting"), one paragraph argument.
2. **The numbers** (live from CMC): rank, price, 24h volume, market cap, circulating supply, ATH, % from ATH.
3. **The socials** — X account `@KaspaCurrency`:
   - Followers, following, account age
   - Newest post date + days since
   - Post cadence (posts / 30d)
   - Avg likes, replies, reposts on last N posts
   - **Engagement rate** = avg engagements / followers
   - **Heuristic "% likely fake"** score with a plain-English explanation of what went into it (follower/following ratio, engagement-per-follower vs peer baseline, post cadence gap, default-avatar rate on a sample). Labeled clearly as an estimate, not an audit.
4. **The argument** — prose: *Why is Kaspa on the Top 100? Does it belong?* Sourced bullet points, links.
5. **What TXC has to beat** — 3–4 concrete gaps (followers, volume, exchange count) with our current number next to Kaspa's.

### Data & backend

- **CMC API** (`CMC_API_KEY` already in secrets) — server function `getCoinSnapshot(symbol)` hitting `/v2/cryptocurrency/quotes/latest` and `/v2/cryptocurrency/info`. Cached ~5 min via TanStack Query `staleTime`.
- **X / socials** — no X API key configured yet. Two options for the first pass:
  - (a) **Manual input** into a `hit_list_coins` table (I hand-collect Kaspa's numbers by scraping/observing, store them with a `snapshot_at` timestamp so the page shows "as of {date}"). Zero new secrets, ships today.
  - (b) **Firecrawl** the public X profile page for follower count + last post; still no fake-score without API access to per-post engagement. Fragile.

  Plan proposes **(a) for Kaspa** so we can ship the page and the argument now. I'll flag in the plan section below what an X API upgrade would unlock later.
- **Heuristic fake-follower score** — computed in a small pure function from stored inputs (`followers`, `following`, `avg_engagement`, `posts_last_30d`, `default_avatar_rate`). Formula shown on the page for transparency.

### Database

New table `hit_list_coins` (public read via anon SELECT policy; writes admin-only via service role):
- `slug` (pk, e.g. `kaspa`)
- `cmc_id`, `cmc_rank`, `symbol`, `name`
- `x_handle`, `x_followers`, `x_following`, `x_last_post_at`, `x_posts_30d`, `x_avg_likes`, `x_avg_replies`, `x_avg_reposts`, `x_default_avatar_pct`
- `snapshot_at`
- `verdict` (`leftover` | `earned` | `coasting` | `unrated`), `verdict_note` (markdown)
- `argument_markdown` (long-form "should they be here?" writeup)
- `published` (bool)

Grants + RLS policies included in migration.

### Files created / edited

- `src/routes/market.tsx` — new page (hero, TXC snapshot, milestones, hit list grid)
- `src/routes/market_.$slug.tsx` — coin deep-dive (Kaspa first)
- `src/lib/market.functions.ts` — `getCoinSnapshot`, `listHitList`, `getHitListCoin` server fns
- `src/lib/fake-score.ts` — heuristic scoring util (pure, tested inline)
- `supabase/migrations/*_hit_list_coins.sql` — table + grants + RLS + seed row for Kaspa
- `src/components/site/Header.tsx` — add `/market` to nav
- `src/components/site/Footer.tsx` — link to `/market`
- `src/lib/mcp/tools/list-hit-list.ts` + register in `src/lib/mcp/index.ts` — expose the hit list to agents too

Head metadata on both routes: unique title/description/og for shareability.

## Phase 2 — scaling to the full 100 (next pass, not this one)

Once Kaspa reads well, we template it:
1. Seed `hit_list_coins` with the current CMC Top 100 (one-time script using CMC API).
2. Decide on socials pipeline: either add an X API key (unlocks automated followers/engagement/post cadence + a real fake-score) or continue manual + Firecrawl. I'll surface the tradeoff again once you've seen Kaspa live.
3. Build a small internal editor route (auth-gated) so you can update verdicts/arguments without SQL.
4. Add sort/filter on `/market` (rank, followers, engagement, "leftover" verdict).

## Open questions I'm NOT blocking on — will use these defaults unless you say otherwise

- **Nav placement:** add "Market" between "Buy" and "Build".
- **TXC's own numbers:** pull live from CMC using our CMC ID. If TXC isn't on CMC yet, fall back to on-chain / manual values with a "not yet listed on CMC" note.
- **Verdict tone:** honest but not snarky — this is a serious argument, not a hit piece. (Even though it's called the Hit List.)

Say the word and I'll build Phase 1.