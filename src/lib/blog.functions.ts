import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import type { Database } from "@/integrations/supabase/types";
import { publicDataClient as publicClient } from "./public-data-client";
import { matchesPreviewSecret } from "./secret-comparison";

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

type Row = Pick<Database["public"]["Tables"]["blog_posts"]["Row"],
  "slug" | "title" | "date" | "author" | "author_role" | "tag" | "read_minutes" | "excerpt" | "body_markdown">;

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

export const listBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Omit<BlogPostDTO, "bodyMarkdown">[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug,title,date,author,author_role,tag,read_minutes,excerpt")
      .eq("published", true)
      .order("date", { ascending: false })
      .order("slug", { ascending: true });
    if (error) {
      console.error("listBlogPosts failed", error);
      throw new Error("Failed to load posts");
    }
    return (data ?? []).map((r) => ({
      slug: r.slug, title: r.title, date: r.date, author: r.author,
      authorRole: r.author_role, tag: r.tag, readMinutes: r.read_minutes,
      excerpt: r.excerpt,
    }));
  },
);

export const DRAFT_PREVIEW_HINT = "preview";

/** Full text remains available to search, but is not shipped with the blog index. */
export const listBlogSearchPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPostDTO[]> => {
    const { data, error } = await publicClient().from("blog_posts")
      .select("slug,title,date,author,author_role,tag,read_minutes,excerpt,body_markdown")
      .eq("published", true).order("date", { ascending: false }).order("slug", { ascending: true });
    if (error) throw new Error("Failed to load search posts");
    return (data ?? []).map(toDTO);
  },
);

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string; preview?: string }) => {
    if (!data?.slug || typeof data.slug !== "string") throw new Error("slug required");
    return data;
  })
  .handler(async ({ data }): Promise<BlogPostDTO> => {
    const token = process.env.BLOG_PREVIEW_TOKEN;
    const isPreview = matchesPreviewSecret(token, data.preview);

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

