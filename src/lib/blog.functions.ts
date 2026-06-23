import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "@tanstack/react-router";
import type { Database } from "@/integrations/supabase/types";

export type BlogPostDTO = {
  slug: string;
  title: string;
  date: string;
  author: string;
  tag: string;
  readMinutes: number;
  excerpt: string;
  bodyMarkdown: string;
};

type Row = Database["public"]["Tables"]["blog_posts"]["Row"];

function toDTO(row: Row): BlogPostDTO {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    author: row.author,
    tag: row.tag,
    readMinutes: row.read_minutes,
    excerpt: row.excerpt,
    bodyMarkdown: row.body_markdown,
  };
}

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const listBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPostDTO[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug,title,date,author,tag,read_minutes,excerpt,body_markdown")
      .eq("published", true)
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => toDTO(r as Row));
  },
);

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => {
    if (!data?.slug || typeof data.slug !== "string") throw new Error("slug required");
    return data;
  })
  .handler(async ({ data }): Promise<BlogPostDTO> => {
    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("blog_posts")
      .select("slug,title,date,author,tag,read_minutes,excerpt,body_markdown")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw notFound();
    return toDTO(row as Row);
  });
