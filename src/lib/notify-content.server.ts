import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { ENTRIES, entryKey } from "@/data/legal-timeline";

const TG_GATEWAY = "https://connector-gateway.lovable.dev/telegram";
const FALLBACK_CHAT_ID = "-1002172752143";
const SITE = "https://texitcoin.org";

let _sb: ReturnType<typeof createClient<Database>> | null = null;
function sb() {
  if (!_sb) {
    _sb = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _sb;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function trim(s: string, max = 320) {
  const clean = s.trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

async function tgSend(text: string) {
  const lovable = process.env.LOVABLE_API_KEY;
  const tg = process.env.TELEGRAM_API_KEY;
  if (!lovable || !tg) throw new Error("Telegram credentials not configured");
  const res = await fetch(`${TG_GATEWAY}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovable}`,
      "X-Connection-Api-Key": tg,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_AUTHORIZED_GROUP_ID || FALLBACK_CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`Telegram sendMessage failed [${res.status}]: ${body}`);
    throw new Error(`Telegram sendMessage failed: ${res.status}`);
  }
  const parsed = JSON.parse(body);
  if (parsed?.ok === false) {
    console.error("Telegram sendMessage error", parsed);
    throw new Error(parsed?.description ?? "Telegram error");
  }
}

async function notifyLegal(sent: string[]) {
  const { data: known, error } = await sb()
    .from("legal_update_notifications")
    .select("entry_key");
  if (error) {
    console.error("legal scan failed", error);
    return;
  }
  const seen = new Set((known ?? []).map((r) => r.entry_key));
  // Newest entries first in ENTRIES; notify oldest-unseen first.
  const pending = ENTRIES.filter((e) => !seen.has(entryKey(e))).reverse();

  for (const e of pending.slice(0, 5)) {
    await tgSend(
      `⚖️ <b>Legal update — TEXITcoin</b>\n\n<b>${esc(e.title)}</b>\n<i>${esc(e.date)}</i>\n${esc(trim(e.body))}\n\n${SITE}/legal`,
    );
    await sb()
      .from("legal_update_notifications")
      .insert({ entry_key: entryKey(e) });
    sent.push(`legal:${entryKey(e)}`);
  }
}

export async function runNotifications() {
  const sent: string[] = [];

  const { data: posts, error: postErr } = await sb()
    .from("blog_posts")
    .select("slug,title,excerpt,tag,author")
    .eq("published", true)
    .is("telegram_notified_at", null)
    .order("date", { ascending: true })
    .limit(5);
  if (postErr) console.error("blog scan failed", postErr);

  for (const p of posts ?? []) {
    await tgSend(
      `📝 <b>New on the TEXITcoin blog</b>\n\n<b>${esc(p.title)}</b>\n${esc(p.excerpt)}\n\n${SITE}/blog/${p.slug}`,
    );
    await sb()
      .from("blog_posts")
      .update({ telegram_notified_at: new Date().toISOString() })
      .eq("slug", p.slug);
    sent.push(`blog:${p.slug}`);
  }

  const { data: calls, error: callErr } = await sb()
    .from("zoom_calls")
    .select("slug,title,description,status")
    .eq("status", "recorded")
    .is("telegram_notified_at", null)
    .order("call_date", { ascending: true })
    .limit(5);
  if (callErr) console.error("zoom scan failed", callErr);

  for (const c of calls ?? []) {
    await tgSend(
      `🎥 <b>New call in the TEXITcoin archive</b>\n\n<b>${esc(c.title)}</b>\n${esc(c.description ?? "")}\n\n${SITE}/zoom/${c.slug}`,
    );
    await sb()
      .from("zoom_calls")
      .update({ telegram_notified_at: new Date().toISOString() })
      .eq("slug", c.slug);
    sent.push(`zoom:${c.slug}`);
  }

  await notifyLegal(sent);

  return sent;
}
