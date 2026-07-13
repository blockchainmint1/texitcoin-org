import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published TEXITcoin blog posts (slug, title, date, author, tag, excerpt). Use get_blog_post with a slug to fetch the full body.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Max posts to return (default 20)."),
    tag: z.string().optional().describe("Filter by tag (case-sensitive)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, tag }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let q = supabase
      .from("blog_posts")
      .select("slug,title,date,author,tag,read_minutes,excerpt")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(limit ?? 20);
    if (tag) q = q.eq("tag", tag);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
