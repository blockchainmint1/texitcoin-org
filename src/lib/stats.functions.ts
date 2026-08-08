import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type StatsBreakdown = { label: string; value: number };
export type StatsPayload = {
  days: number;
  totals: { visitors: number; pageviews: number; pages: number; countries: number };
  daily: { day: string; visitors: number; pageviews: number }[];
  topPages: StatsBreakdown[];
  sources: StatsBreakdown[];
  countries: StatsBreakdown[];
  devices: StatsBreakdown[];
};

export const getSiteStats = createServerFn({ method: "GET" })
  .inputValidator((input: { days?: number } | undefined) => ({
    days: Math.min(Math.max(Number(input?.days ?? 30), 1), 365),
  }))
  .handler(async ({ data }): Promise<StatsPayload> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const url = process.env["SUPABASE_URL"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const days = data.days;
    const [totalsRes, dailyRes, pagesRes, sourcesRes, countriesRes, devicesRes] =
      await Promise.all([
        supabase.rpc("site_stats_totals", { _days: days }),
        supabase.rpc("site_stats_daily", { _days: days }),
        supabase.rpc("site_stats_breakdown", { _dimension: "path", _days: days, _limit: 10 }),
        supabase.rpc("site_stats_breakdown", { _dimension: "referrer_host", _days: days, _limit: 10 }),
        supabase.rpc("site_stats_breakdown", { _dimension: "country", _days: days, _limit: 10 }),
        supabase.rpc("site_stats_breakdown", { _dimension: "device", _days: days, _limit: 5 }),
      ]);

    const t = (totalsRes.data as any)?.[0] ?? {};
    const list = (r: { data: unknown }): StatsBreakdown[] =>
      ((r.data as any[]) ?? []).map((x) => ({ label: String(x.label), value: Number(x.value) }));

    return {
      days,
      totals: {
        visitors: Number(t.visitors ?? 0),
        pageviews: Number(t.pageviews ?? 0),
        pages: Number(t.pages ?? 0),
        countries: Number(t.countries ?? 0),
      },
      daily: ((dailyRes.data as any[]) ?? []).map((d) => ({
        day: String(d.day),
        visitors: Number(d.visitors),
        pageviews: Number(d.pageviews),
      })),
      topPages: list(pagesRes),
      sources: list(sourcesRes),
      countries: list(countriesRes),
      devices: list(devicesRes),
    };
  });
