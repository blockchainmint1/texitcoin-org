# Project rules

- Legal timeline entries may include a dedicated article link alongside their primary and secondary source links so publishing a writeup does not displace the filings.
- Validate live legal-cost totals through `src/lib/legal-costs.ts` before displaying them; stale or invalid feeds must not replace the owner's confirmed minimum.
- Keep the legal-cost upstream behind the public read-only proxy and return only aggregate totals and public provenance, never private ledger entries.
- Telegram commands require a verified individual sender who is explicitly authorized or an administrator of an approved group; chat membership alone must never permit publishing or uploads.
- Use publicDataClient for blog and Zoom public reads so database row-level policies constrain access; privileged clients are reserved for authorized writes and private draft previews.
- Keep machine-readable TEXITcoin specifications in site-facts.ts and cover supply and network identity with tests so AI tools cannot drift from the published specifications.
- Response hardening must preserve preview framing and media playback; introduce CSP in report-only mode before enforcing any restrictions.