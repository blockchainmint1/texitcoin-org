import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "@tanstack/react-router";
import type { Database } from "@/integrations/supabase/types";

export type BlogPostDTO = {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorRole: string | null;
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
    authorRole: row.author_role,
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
      .select("slug,title,date,author,author_role,tag,read_minutes,excerpt,body_markdown")
      .eq("published", true)
      .order("date", { ascending: false });
    if (error) {
      console.error("listBlogPosts failed", error);
      throw new Error("Failed to load posts");
    }
    return (data ?? []).map((r) => toDTO(r as Row));
  },
);

export const DRAFT_PREVIEW_HINT = "preview";

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string; preview?: string }) => {
    if (!data?.slug || typeof data.slug !== "string") throw new Error("slug required");
    return data;
  })
  .handler(async ({ data }): Promise<BlogPostDTO> => {
    const token = process.env.BLOG_PREVIEW_TOKEN || "txc-draft-preview";
    const isPreview = !!data.preview && data.preview === token;

    if (isPreview) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row, error } = await supabaseAdmin
        .from("blog_posts")
        .select("slug,title,date,author,author_role,tag,read_minutes,excerpt,body_markdown")
        .eq("slug", data.slug)
        .maybeSingle();
      if (error) {
        console.error("getBlogPost preview failed", error);
        throw new Error("Failed to load post");
      }
      if (!row) throw notFound();
      return toDTO(row as Row);
    }

    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("blog_posts")
      .select("slug,title,date,author,author_role,tag,read_minutes,excerpt,body_markdown")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) {
      console.error("getBlogPost failed", error);
      throw new Error("Failed to load post");
    }
    if (!row) throw notFound();
    return toDTO(row as Row);
  });

