import { useEffect, useState } from "react";

// Honest Money Hour: Thursdays, 7:00pm–9:00pm America/Chicago
const LIVE_WEEKDAY_SHORT = "Thu";
const LIVE_START_HOUR_CT = 19; // 7pm
const LIVE_END_HOUR_CT = 21; // 9pm (2-hour window)

function chicagoParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  return { weekday, hour, minute };
}

export function isLiveWindow(now: Date = new Date()): boolean {
  const { weekday, hour } = chicagoParts(now);
  return weekday === LIVE_WEEKDAY_SHORT && hour >= LIVE_START_HOUR_CT && hour < LIVE_END_HOUR_CT;
}

export function nextThursday7pmCT(from: Date = new Date()): Date {
  for (let i = 0; i < 8; i++) {
    const candidate = new Date(from.getTime() + i * 86400000);
    const { weekday, hour } = chicagoParts(candidate);
    if (weekday === LIVE_WEEKDAY_SHORT && (i > 0 || hour < LIVE_START_HOUR_CT)) {
      const ymd = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(candidate);
      const probe = new Date(`${ymd}T19:00:00Z`);
      const tzName = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        timeZoneName: "short",
      })
        .formatToParts(probe)
        .find((p) => p.type === "timeZoneName")?.value;
      const offset = tzName === "CDT" ? "-05:00" : "-06:00";
      return new Date(`${ymd}T19:00:00${offset}`);
    }
  }
  return from;
}

export type LiveState = {
  isLive: boolean;
  nextStart: Date;
  remainingMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function compute(): LiveState {
  const now = new Date();
  const live = isLiveWindow(now);
  const nextStart = nextThursday7pmCT(now);
  const remainingMs = Math.max(0, nextStart.getTime() - now.getTime());
  const totalSec = Math.floor(remainingMs / 1000);
  return {
    isLive: live,
    nextStart,
    remainingMs,
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

/**
 * Client-only hook that ticks every second. Returns a stable placeholder on
 * the server so SSR + first client render match; the real countdown starts
 * after mount.
 */
export function useLiveWindow(): LiveState {
  const [state, setState] = useState<LiveState>(() => ({
    isLive: false,
    nextStart: new Date(0),
    remainingMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  useEffect(() => {
    setState(compute());
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}

// Calendar (.ics) helper — generates a subscribe-in-place recurring event.
export function icsForNextCall(): string {
  const start = nextThursday7pmCT();
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1hr default duration
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TEXITcoin//Honest Money Hour//EN",
    "BEGIN:VEVENT",
    `UID:honest-money-hour-${start.toISOString().slice(0, 10)}@texitcoin.org`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:Honest Money Hour — TEXITcoin Live",
    "DESCRIPTION:Weekly live call with Bobby Gray. Watch at https://streamtxc.com/live",
    "URL:https://texitcoin.org/zoom",
    "RRULE:FREQ=WEEKLY;BYDAY=TH",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
