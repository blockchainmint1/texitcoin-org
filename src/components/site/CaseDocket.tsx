import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { CASES, type CaseStatus } from "@/data/legal-cases";

const STATUS_STYLES: Record<CaseStatus, string> = {
  active: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "awaiting-decision": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

export function CaseDocket({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="mt-14">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        <MapPin className="h-4 w-4" /> The docket · by jurisdiction
      </div>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each regulator gets its own case file. Separate timelines, separate
        filings, no mixing of the record.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {CASES.map((c) => {
          const isActive = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              to={c.href}
              className={`group relative overflow-hidden rounded-2xl border p-6 shadow-card transition ${
                isActive
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-2xl font-bold tracking-tight">
                  {c.jurisdictionCode}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${STATUS_STYLES[c.status]}`}
                >
                  {c.status === "active"
                    ? "Active"
                    : c.status === "awaiting-decision"
                      ? "Awaiting decision"
                      : "Closed"}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold">{c.shortTitle}</h3>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {c.agencyShort} · {c.docket}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {isActive ? "You're here" : "Open the case file"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
