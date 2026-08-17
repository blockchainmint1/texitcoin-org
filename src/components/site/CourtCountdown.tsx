import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TEXITcoin v. TSSB hearing: August 17, 2026 @ 9:00am America/Chicago
const HEARING_DATE_CT = "2026-08-17";
const HEARING_TIME_CT = "09:00:00";

function getHearingDate(): Date {
  // Parse the Chicago-local datetime into a UTC Date correctly.
  const probe = new Date(`${HEARING_DATE_CT}T${HEARING_TIME_CT}Z`);
  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "short",
  })
    .formatToParts(probe)
    .find((p) => p.type === "timeZoneName")?.value;
  const offset = tzName === "CDT" ? "-05:00" : "-06:00";
  return new Date(`${HEARING_DATE_CT}T${HEARING_TIME_CT}${offset}`);
}

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function computeCountdown(): Countdown {
  const now = new Date();
  const hearing = getHearingDate();
  const totalMs = Math.max(0, hearing.getTime() - now.getTime());
  const totalSec = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    totalMs,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="font-display text-lg font-bold tabular-nums tracking-tight sm:text-xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function CourtCountdown({ className }: { className?: string }) {
  const [countdown, setCountdown] = useState<Countdown>(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: -1,
  }));

  useEffect(() => {
    setCountdown(computeCountdown());
    const id = setInterval(() => setCountdown(computeCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  const isLive = countdown.totalMs === 0;
  const isReady = countdown.totalMs >= 0;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-primary-foreground/20 bg-primary px-4 py-2 text-primary-foreground shadow-glow",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-block h-2.5 w-2.5 rounded-full",
              isLive ? "bg-green-400 animate-pulse" : "bg-primary-foreground"
            )}
            aria-hidden="true"
          />
          <p className="text-sm font-semibold uppercase tracking-wide sm:text-base">
            {isLive ? "Court is in session" : "Countdown to our day in court"}
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {isReady ? (
            isLive ? (
              <a
                href="https://www.youtube.com/watch?v=CRFcQda7RBc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
              >
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden="true" />
                WATCH IT LIVE
              </a>
            ) : (
              <>
                <Unit value={countdown.days} label="Days" />
                <Unit value={countdown.hours} label="Hrs" />
                <Unit value={countdown.minutes} label="Min" />
                <Unit value={countdown.seconds} label="Sec" />
              </>
            )
          ) : (
            <span className="font-display text-lg font-bold tabular-nums sm:text-xl">
              -- : -- : -- : --
            </span>
          )}
        </div>

        <a
          href="https://www.youtube.com/watch?v=CRFcQda7RBc"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-xs font-semibold uppercase tracking-wider text-primary-foreground/90 underline-offset-2 hover:text-primary-foreground hover:underline sm:inline-block"
        >
          Watch the hearing →
        </a>
      </div>
    </div>
  );
}
