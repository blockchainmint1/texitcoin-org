import hills from "@/assets/blog/tx-hills.jpg";
import flag from "@/assets/blog/tx-flag.jpg";
import ranch from "@/assets/blog/tx-ranch.jpg";
import skyline from "@/assets/blog/tx-skyline.jpg";
import boots from "@/assets/blog/tx-boots.jpg";
import mesa from "@/assets/blog/tx-mesa.jpg";
import star from "@/assets/blog/tx-star.jpg";
import energy from "@/assets/blog/tx-energy.jpg";

const TAG_IMAGE: Record<string, string> = {
  Community: ranch,
  Founder: boots,
  Philosophy: mesa,
  Mission: flag,
  Education: skyline,
  Background: ranch,
  Strategy: energy,
  Comparison: star,
  Roadmap: hills,
  Diligence: star,
  Milestone: skyline,
};

const POOL = [hills, flag, ranch, skyline, boots, mesa, star, energy];

type ImagedPost = { slug: string; tag: string; title: string };

export function getPostImage(post: ImagedPost) {
  if (TAG_IMAGE[post.tag]) return TAG_IMAGE[post.tag];
  let h = 0;
  for (const ch of post.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return POOL[h % POOL.length];
}

export function getSecondaryImage(post: ImagedPost) {
  let h = 0;
  for (const ch of post.title) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  const primary = getPostImage(post);
  const choices = POOL.filter((p) => p !== primary);
  return choices[h % choices.length];
}
