## Problem

On `/zoom`, the date row renders as `MONDAY, JUNE 15, 2026\u00A0· 1H 48M` — the `\u00a0` escape is showing as literal text instead of a non-breaking space.

## Cause

In `src/routes/zoom.tsx`, two JSX fragments contain the escape as raw text:

- Line 163: `<>\u00a0· {formatDuration(...)}</>` (latest call card)
- Line 296: `<>\u00a0· {formatDuration(...)}</>` (older calls list)

JSX text doesn't interpret `\u…` escapes — only JS string literals do. So the characters render verbatim.

## Fix

Wrap the escape in a JS expression so it's a real character:

```tsx
<>{"\u00a0"}· {formatDuration(...)}</>
```

Apply to both lines. (Line 110's `Live{"\u00a0"}Zoom` is already correct and stays as-is.)

No other files touched.
