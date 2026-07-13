// Randomized Texas image pool for blog posts.
// All images live in src/assets/texas/*.asset.json as CDN pointers.
const modules = import.meta.glob<{ url: string }>(
  "@/assets/texas/*.asset.json",
  { eager: true, import: "default" },
);

const POOL: string[] = Object.values(modules)
  .map((m) => m.url)
  .sort();

function hash(str: string) {
  let h = 0;
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

type ImagedPost = { slug: string; tag?: string; title?: string };

export function getPostImage(post: ImagedPost) {
  if (POOL.length === 0) return "";
  return POOL[hash(post.slug) % POOL.length];
}

export function getSecondaryImage(post: ImagedPost) {
  if (POOL.length === 0) return "";
  const primary = getPostImage(post);
  const choices = POOL.filter((p) => p !== primary);
  if (choices.length === 0) return primary;
  return choices[hash(post.title ?? post.slug) % choices.length];
}
