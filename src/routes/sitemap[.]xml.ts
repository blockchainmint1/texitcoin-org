import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts } from "@/data/blog-posts";

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
  "/texas", "/build", "/faq", "/blog", "/videos", "/press", "/in-the-news",
  "/merch", "/disclosures", "/legal", "/privacy", "/terms", "/trolls", "/wtxc",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...STATIC_PATHS.map((path) => ({
            path,
            changefreq: "weekly" as const,
            priority: path === "/" ? "1.0" : "0.7",
          })),
          ...posts.map((p) => ({
            path: `/blog/${p.slug}`,
            lastmod: p.date,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
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
