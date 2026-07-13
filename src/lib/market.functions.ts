import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "@tanstack/react-router";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["hit_list_coins"]["Row"];

export type HitListSummary = {
  slug: string;
  name: string;
  symbol: string;
  cmcRank: number | null;
  xHandle: string | null;
  xFollowers: number | null;
  verdict: string;
  verdictNote: string | null;
};

export type HitListDetail = HitListSummary & {
  cmcId: number | null;
  website: string | null;
  xFollowing: number | null;
  xLastPostAt: string | null;
  xPosts30d: number | null;
  xAvgLikes: number | null;
  xAvgReplies: number | null;
  xAvgReposts: number | null;
  xDefaultAvatarPct: number | null;
  snapshotAt: string;
  argumentMarkdown: string | null;
  gaps: { metric: string; kaspa?: string; txc?: string; note?: string; them?: string }[];
};

export type CmcQuote = {
  id: number;
  symbol: string;
  name: string;
  cmcRank: number | null;
  price: number | null;
  volume24h: number | null;
  marketCap: number | null;
  circulatingSupply: number | null;
  totalSupply: number | null;
  maxSupply: number | null;
  percentChange24h: number | null;
  percentChange7d: number | null;
};

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function toSummary(r: Row): HitListSummary {
  return {
    slug: r.slug,
    name: r.name,
    symbol: r.symbol,
    cmcRank: r.cmc_rank,
    xHandle: r.x_handle,
    xFollowers: r.x_followers,
    verdict: r.verdict,
    verdictNote: r.verdict_note,
  };
}

function toDetail(r: Row): HitListDetail {
  const gapsRaw = r.gaps_json as unknown;
  const gaps = Array.isArray(gapsRaw)
    ? (gapsRaw as HitListDetail["gaps"])
    : [];
  return {
    ...toSummary(r),
    cmcId: r.cmc_id,
    website: r.website,
    xFollowing: r.x_following,
    xLastPostAt: r.x_last_post_at,
    xPosts30d: r.x_posts_30d,
    xAvgLikes: r.x_avg_likes == null ? null : Number(r.x_avg_likes),
    xAvgReplies: r.x_avg_replies == null ? null : Number(r.x_avg_replies),
    xAvgReposts: r.x_avg_reposts == null ? null : Number(r.x_avg_reposts),
    xDefaultAvatarPct:
      r.x_default_avatar_pct == null ? null : Number(r.x_default_avatar_pct),
    snapshotAt: r.snapshot_at,
    argumentMarkdown: r.argument_markdown,
    gaps,
  };
}

export const listHitList = createServerFn({ method: "GET" }).handler(
  async (): Promise<HitListSummary[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("hit_list_coins")
      .select("*")
      .eq("published", true)
      .order("cmc_rank", { ascending: true, nullsFirst: false });
    if (error) {
      console.error("listHitList failed", error);
      throw new Error("Failed to load hit list");
    }
    return (data ?? []).map((r) => toSummary(r as Row));
  },
);

export const getHitListCoin = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => {
    if (!data?.slug || typeof data.slug !== "string") throw new Error("slug required");
    return data;
  })
  .handler(async ({ data }): Promise<HitListDetail> => {
    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("hit_list_coins")
      .select("*")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) {
      console.error("getHitListCoin failed", error);
      throw new Error("Failed to load coin");
    }
    if (!row) throw notFound();
    return toDetail(row as Row);
  });

async function fetchCmcQuoteById(id: number): Promise<CmcQuote | null> {
  const key = process.env.CMC_API_KEY;
  if (!key) return null;
  const url = new URL("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest");
  url.searchParams.set("id", String(id));
  url.searchParams.set("convert", "USD");
  const res = await fetch(url.toString(), {
    headers: { "X-CMC_PRO_API_KEY": key, Accept: "application/json" },
  });
  if (!res.ok) {
    console.error("CMC quotes/latest failed", res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as {
    data?: Record<string, {
      id: number; symbol: string; name: string; cmc_rank: number | null;
      circulating_supply: number | null; total_supply: number | null; max_supply: number | null;
      quote: { USD: { price: number | null; volume_24h: number | null; market_cap: number | null; percent_change_24h: number | null; percent_change_7d: number | null } };
    }>;
  };
  const row = json.data?.[String(id)];
  if (!row) return null;
  const q = row.quote.USD;
  return {
    id: row.id,
    symbol: row.symbol,
    name: row.name,
    cmcRank: row.cmc_rank,
    price: q.price,
    volume24h: q.volume_24h,
    marketCap: q.market_cap,
    circulatingSupply: row.circulating_supply,
    totalSupply: row.total_supply,
    maxSupply: row.max_supply,
    percentChange24h: q.percent_change_24h,
    percentChange7d: q.percent_change_7d,
  };
}

export const getCmcQuote = createServerFn({ method: "GET" })
  .inputValidator((data: { id: number }) => {
    if (!data || typeof data.id !== "number") throw new Error("id required");
    return data;
  })
  .handler(async ({ data }): Promise<CmcQuote | null> => {
    try {
      return await fetchCmcQuoteById(data.id);
    } catch (e) {
      console.error("getCmcQuote failed", e);
      return null;
    }
  });

// TXC's CMC ID — TEXITcoin: 32744 (verified via CMC map endpoint, slug=texitcoin).
// If not yet listed / errors, the server fn returns null and the UI shows a fallback.
const TXC_CMC_ID = 32744;

export const getTxcSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmcQuote | null> => {
    try {
      return await fetchCmcQuoteById(TXC_CMC_ID);
    } catch (e) {
      console.error("getTxcSnapshot failed", e);
      return null;
    }
  },
);
