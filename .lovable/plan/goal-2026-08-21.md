## Goal

A `/screenplay` hub on texitcoin.org that holds the living treatment for the TEXITcoin Netflix series — three seasons, written as prose treatment (not episode breakdowns yet) — plus a community writers' room where anyone can pitch scenes, characters, notes, photos and clips, have AI draft them into screenplay-style prose, and land them in a suggestion queue you approve into the canon.

## Part 1 — The treatment (ships first, static content)

`/screenplay` — series bible landing page:
- Logline, tone/comparables ("Ozark meets King of the Hill"), format pitch
- Three season cards → each links to its own page
- Character roster with photos/placeholders: Bobby, Kira, Samantha, Matt, Josh, Johnny, Rob, Tim, Gaige, the office
- "Join the writers' room" CTA into Part 2

`/screenplay/season-1` — **Molten**
Coin factory to crypto mine. Casting machine blowouts, silver on the floor, JM Bullion killing the Trump coin order, the moment the money runs out. Selling the factory, paying every creditor, and putting what's left into TEXITcoin. The 110° garage full of screaming L3s. Betting the rest on the Consensus launch party — then getting banned from promoting TXC on the expo floor and watching the party flop to an empty ballroom. The mine dying. The Bitmain WDMS trip where immersion cooling shows up like a religion. First tank, first stable hashrate. Thailand, and Samantha's kidney. November 2024: profitable, because the old coin-industry friends who had every reason to walk away didn't.

`/screenplay/season-2` — **Wheels Up**
Supercars, sold-out events, Bobby on the same WDMS stage he once sat in the back of. Thailand with the leaders. Property, a third of a billion in network value, and a dread you can taste under every win. Ends on the Texas cease & desist: doors kicked in on one continent while a jet lifts off from another.

`/screenplay/season-3` — **The John Galt Line**
Bobby overseas. Global sales shut off, good people out of work. Building tools and utility with nothing. Dismantling infrastructure piece by piece to keep the core alive. The livestreamed trial of the century for crypto. The SOAH verdict, Christmas 2026.

Each season page: one-paragraph season logline, the beat-by-beat treatment in scene-sized chunks, an "arcs" block per major character, and a "what's real / what we invented" honesty note (fits the site's transparency posture). Creative liberty taken freely — invented dialogue beats, composite scenes, a couple of antagonists.

## Part 2 — The writers' room (interactive)

Anyone can submit to any season, and to any scene within it.

```text
Reader hits "Pitch a scene"
   ↓ types a rough idea (2 sentences is fine) + optional image/video URL
   ↓ AI (Lovable AI Gateway) drafts it into screenplay-format prose,
     matching the season's voice and existing beats as context
   ↓ contributor sees the draft, can regenerate or edit, then submits
   ↓ lands in the suggestion queue as `pending`
   ↓ you review at /screenplay/admin — approve, reject, or approve-with-edits
   ↓ approved items render inline on the season page, credited to the contributor
```

Also supported, same queue:
- **Notes** on an existing beat (inline "add a note" on each scene; approved notes show as a collapsible margin thread — the wiki feel)
- **Characters** — pitch a new one; AI fleshes out a one-paragraph bio + arc
- **Details/corrections** — "the L3s were actually in the second bay"
- **Media** — images and video links attached to a beat, approved into a small gallery strip

Everything approved is versioned, so a season page is the canon plus its accumulated approved contributions, and the page shows a "last updated / N contributions" line.

### Access model
- Submitting: no account needed, but requires a name/handle + email (email hidden publicly), rate-limited per IP.
- Approving: auth-gated admin route, admin role checked server-side via a `user_roles` table + `has_role()` — the project has no auth yet, so this adds a minimal email/password sign-in used only for the admin route.

## Technical section

- `src/routes/screenplay.tsx`, `screenplay_.$season.tsx`, `screenplay_.admin.tsx` (under an auth gate)
- Tables (with GRANTs + RLS):
  - `screenplay_seasons` — number, slug, title, logline, status
  - `screenplay_beats` — season, order, title, body, kind (`scene` | `character` | `note`)
  - `screenplay_contributions` — season/beat ref, kind, contributor name/email, raw pitch, ai_draft, final_body, media_url, status (`pending`/`approved`/`rejected`), reviewed_at
  - `user_roles` + `app_role` enum + `has_role()` security-definer fn
- Season canon (Part 1) seeded as literal INSERTs in the migration so the pages are full on first load.
- `src/lib/screenplay.functions.ts` — public reads, `draftContribution` (Lovable AI Gateway, `google/gemini-3-flash`-class chat model, screenplay-format system prompt + season context), `submitContribution`; admin fns behind `requireSupabaseAuth` + role check.
- Auth: `/auth` route, `src/routes/_authenticated/` gate for the admin screen, `attachSupabaseAuth` in `src/start.ts`.
- Nav: "Screenplay" added to the Resources dropdown; footer link.
- Head metadata unique per route; footer keeps the standard honest.money / terms / privacy / manifesto set.

## Suggested build order

1. Migration + seeded three-season treatment + `/screenplay` and season pages (read-only). You can read it and react.
2. AI-drafted pitch flow + suggestion queue + admin approval + auth.

Say go and I'll start with step 1 so you have something to read today.
