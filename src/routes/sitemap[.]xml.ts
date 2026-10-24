import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { publicDataClient } from "@/lib/public-data-client";

const BASE_URL = "https://texitcoin.org";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_PATHS = [
  "/", "/buy", "/mine", "/wallets", "/tokenomics", "/currency", "/value",
  "/proof-of-work", "/whitepaper", "/roadmap", "/leadership", "/team",
  "/texas", "/texit", "/philosophy", "/bobby", "/build", "/faq", "/blog", "/videos", "/press", "/in-the-news",
  "/merch", "/disclosures", "/legal", "/legal/arizona", "/privacy", "/terms", "/trolls", "/wtxc",
  "/live", "/zoom", "/market", "/screenplay", "/stats", "/clarity", "/sec-and-crypto",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const supabase = publicDataClient();
        const { data: posts } = await supabase
          .from("blog_posts")
          .select("slug,date")
          .eq("published", true)
          .order("date", { ascending: false });
        const [calls, coins, seasons] = await Promise.all([
          supabase.from("zoom_calls").select("slug,call_date").eq("status", "recorded"),
          supabase.from("hit_list_coins").select("slug").eq("published", true),
          supabase.from("screenplay_seasons").select("slug").eq("published", true),
        ]);

        const entries: SitemapEntry[] = [
          ...STATIC_PATHS.map((path) => ({
            path,
            changefreq: "weekly" as const,
            priority: path === "/" ? "1.0" : "0.7",
          })),
          ...(posts ?? []).map((p) => ({
            path: `/blog/${p.slug}`,
            lastmod: p.date,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          ...(calls.data ?? []).map((call) => ({ path: `/zoom/${encodeURIComponent(call.slug)}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...(coins.data ?? []).map((coin) => ({ path: `/market/${encodeURIComponent(coin.slug)}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...(seasons.data ?? []).map((season) => ({ path: `/screenplay/${encodeURIComponent(season.slug)}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
