# Site-wide consistency sweep

Scanned every route, component, blog post, and the llms.txt against the canonical facts (whitepaper, tokenomics, press kit). Three real contradictions to fix, plus one quick reword.

## Findings & fixes

### 1. `src/routes/merch.tsx` — "21M or bust" slogan is Bitcoin's cap, not TXC's
Line 24 describes the Sound Money Tee as "'21M or bust' on the back." TXC's hard cap is 353,396,296 — 21M is Bitcoin's. Either the slogan is genuinely wrong, or it's a deliberate nod to Bitcoin maximalists. Since this is on a TXC merch page, it reads as a factual contradiction.

**Fix:** Change to "'353M or bust'" (matches our cap) — or, if you'd rather keep the BTC nod, change the framing to make the homage explicit ("'21M or bust' on the back — a nod to the OG"). I'll do the first by default; tell me if you want the second.

### 2. `src/routes/faq.tsx` line 26 — implies TXC mines like Bitcoin (SHA-256)
The "Is TXC a security?" answer ends with: *"It's earned through Proof-of-Work mining, the same way Bitcoin is."* TXC is Scrypt, merge-mined with Litecoin and Dogecoin — not SHA-256 like Bitcoin. The sentence reads as if TXC uses Bitcoin's algorithm.

**Fix:** Rewrite to: *"It's earned through Scrypt Proof-of-Work mining, the same family of mining used by Litecoin."*

### 3. `src/data/blog-posts.ts` — three posts say "137 years," everywhere else says 138
The whitepaper, tokenomics page, Specs component, llms-adjacent metadata, and six other blog posts all use **~138 years** for the full emission curve. Three blog excerpts disagree:
- Line 542: "distributed over 137 years"
- Line 573: "designed to run for 137 years"
- Line 590: "released over 137 years"

**Fix:** Change all three to **138 years** to match the canonical number.

## Things I checked and that are NOT contradictions

- Bitmart "New Year's Eve 2024" (roadmap) vs "December 31, 2024" (FAQ/press) — same day, different phrasing.
- Bitmart launch price $0.10 (roadmap) vs Dex-Trade launch price $0.028 (press) — different events on different exchanges, both correct.
- "Layer 1" vs "Layer-1" hyphenation — cosmetic, not a contradiction.
- Home-page FAQ component vs `/faq` page — both now consistent (Scrypt, permissioned, 3-min blocks).
- All Scrypt / Litecoin-fork / merge-mining references across mine, proof-of-work, currency, whitepaper, press, tokenomics — all aligned.

## Out of scope
- Tone or copy improvements unrelated to factual accuracy.
- Restructuring `blog-posts.ts` (some posts use older numbers in dated commentary; only the three "137 years" lines are flagged).
