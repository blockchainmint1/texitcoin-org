import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "get_hit_list_coin",
  title: "Get Hit List coin case study",
  description:
    "Fetch a full TEXITcoin Hit List case study for one coin by slug — includes market data snapshot, X social signals, verdict, argument markdown, and TXC-vs-them gap analysis.",
  inputSchema: {
    slug: z.string().min(1).describe("Coin slug, e.g. 'kaspa'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase
      .from("hit_list_coins")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data)
      return {
        content: [{ type: "text", text: `No published Hit List case study for '${slug}'.` }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { coin: data },
    };
  },
});
