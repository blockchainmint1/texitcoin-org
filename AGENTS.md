# Project rules

- Legal timeline entries may include a dedicated article link alongside their primary and secondary source links so publishing a writeup does not displace the filings.
- Validate live legal-cost totals through `src/lib/legal-costs.ts` before displaying them; stale or invalid feeds must not replace the owner's confirmed minimum.
- Keep the legal-cost upstream behind the public read-only proxy and return only aggregate totals and public provenance, never private ledger entries.