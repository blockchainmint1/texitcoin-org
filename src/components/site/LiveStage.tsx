import { Radio, Calendar } from "lucide-react";
import { useLiveWindow, icsForNextCall } from "@/lib/live-window";
import { useLiveStatus } from "@/lib/use-live-status";
import { useCallback } from "react";

const STREAM_EMBED_URL =
  "https://stream.texitcoin.org/embed/live/by-wallet/TeiqbqMxQG4JrDfrzdvTZcqhhai8KT5JTc?autoplay=1&mute=1";
const STREAM_WATCH_URL = "https://streamtxc.com/live";
const X_LIVE_URL = "https://x.com/texitcoin";

const FACEBOOK_LIVE_URL = "https://www.facebook.com/profile.php?id=61559875176657";
const YOUTUBE_LIVE_URL = "https://www.youtube.com/@IDMC-fans";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2H21.5l-7.5 8.573L23 22h-6.828l-5.35-6.99L4.7 22H1.44l8.02-9.164L1 2h6.914l4.84 6.396L18.244 2Zm-1.2 18h1.86L7.06 4H5.09l11.955 16Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.2c-.3-1.2-1.3-2.2-2.5-2.5-1.9-.5-9-.5-9-.5s-7.1 0-9 .5c-1.2.3-2.2 1.3-2.5 2.5C0 8.8 0 12 0 12s0 3.2.5 5.1c.3 1.2 1.3 2.2 2.5 2.5 1.9.5 9 .5 9 .5s7.1 0 9-.5c1.2-.3 2.2-1.3 2.5-2.5.5-1.9.5-5.1.5-5.1s0-3.2-.5-5.1zM9.5 15.5v-7L15.8 12l-6.3 3.5z" />
    </svg>
  );
}

function StreamTXCIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

type IconLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function IconLink({ href, label, icon }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-foreground/80 transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
    >
      {icon}
    </a>
  );
}

function TimeCell({ value, label }: { value: number; label: string }) {
  const display = String(Math.max(0, value)).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-border bg-card px-3 py-2 font-display text-3xl font-bold tabular-nums md:px-4 md:text-4xl">
        {display}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function LiveStage() {
  const { nextStart, days, hours, minutes, seconds } = useLiveWindow();
  const { isLive } = useLiveStatus();

  const downloadIcs = useCallback(() => {
    const blob = new Blob([icsForNextCall()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "honest-money-hour.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  const dateLabel = nextStart.getTime()
    ? nextStart.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "America/Chicago",
      })
    : "Thursday";
  const timeLabel = nextStart.getTime()
    ? nextStart.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
        timeZone: "America/Chicago",
      })
    : "7:00 PM CT";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
      {/* Left: video / poster surface */}
      <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-card">
        <div className="relative aspect-video w-full">
          {isLive ? (
            <iframe
              src={STREAM_EMBED_URL}
              title="TEXITcoin Live"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/25 via-background to-background"
              aria-hidden={false}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground backdrop-blur">
                Next live in
              </div>
              <div className="flex items-end gap-2 md:gap-3">
                <TimeCell value={days} label="Days" />
                <TimeCell value={hours} label="Hrs" />
                <TimeCell value={minutes} label="Min" />
                <TimeCell value={seconds} label="Sec" />
              </div>
              <div className="px-6 text-center text-sm text-muted-foreground">
                {dateLabel} · {timeLabel}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: status + watch chips */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {isLive ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-bold text-primary">Live now</span>
            </>
          ) : (
            <>
              <Radio className="h-3 w-3 text-primary animate-pulse" />
              Honest Money Hour · Thursdays 7pm CT
            </>
          )}
        </div>

        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
          {isLive ? (
            <>
              We're{"\u00a0"}<span className="text-primary">live</span> right now.
            </>
          ) : (
            <>
              Live{"\u00a0"}Video{"\u00a0"}<span className="text-primary">Updates</span>
            </>
          )}
        </h1>

        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          {isLive
            ? "Bobby's on the air. Jump in above, or catch the simulcast on any of these platforms."
            : "Watch every week wherever you already hang out. We simulcast the Honest Money Hour to all of them."}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          <WatchChip
            href={STREAM_WATCH_URL}
            label="streamTXC"
            icon={<Radio className="h-3.5 w-3.5 text-primary" />}
          />
          <WatchChip
            href={X_LIVE_URL}
            label="X"
            icon={<XIcon className="h-3 w-3" />}
          />
          <WatchChip
            href={FACEBOOK_LIVE_URL}
            label="Facebook"
            icon={<FacebookIcon className="h-3.5 w-3.5 text-[#1877f2]" />}
          />
          <WatchChip
            href={YOUTUBE_LIVE_URL}
            label="YouTube"
            icon={<YouTubeIcon className="h-3.5 w-3.5 text-[#FF0000]" />}
          />
        </div>

        {!isLive && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-semibold uppercase tracking-wider hover:border-primary/50"
            >
              <Calendar className="h-4 w-4" /> Add to calendar
            </button>
            <a
              href="#live-reminder"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-red-gradient px-5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110"
            >
              Get the reminder
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
