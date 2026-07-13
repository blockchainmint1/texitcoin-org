import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "list_hit_list",
  title: "List Hit List coins",
  description:
    "List TEXITcoin's 'Hit List' evaluations of CoinMarketCap Top 100 coins (slug, name, symbol, CMC rank, X handle/followers, verdict, verdict note). Use get_hit_list_coin with a slug to fetch the full case study.",
  inputSchema: {
    verdict: z
      .enum(["leftover", "coasting", "earned", "unrated"])
      .optional()
      .describe("Filter by verdict."),
    limit: z.number().int().min(1).max(200).optional().describe("Max coins to return (default 100)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ verdict, limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let q = supabase
      .from("hit_list_coins")
      .select("slug,name,symbol,cmc_rank,x_handle,x_followers,verdict,verdict_note,snapshot_at")
      .eq("published", true)
      .order("cmc_rank", { ascending: true, nullsFirst: false })
      .limit(limit ?? 100);
    if (verdict) q = q.eq("verdict", verdict);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { coins: data ?? [] },
    };
  },
});
