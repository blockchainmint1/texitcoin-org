import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "crypto";
import type { Database } from "@/integrations/supabase/types";

/* -------------------------------------------------------------------------- */
/*  Telegram gateway helpers                                                  */
/* -------------------------------------------------------------------------- */

const TG_GATEWAY = "https://connector-gateway.lovable.dev/telegram";

function tgHeaders() {
  const lovable = process.env.LOVABLE_API_KEY;
  const tg = process.env.TELEGRAM_API_KEY;
  if (!lovable) throw new Error("LOVABLE_API_KEY not configured");
  if (!tg) throw new Error("TELEGRAM_API_KEY not configured");
  return {
    Authorization: `Bearer ${lovable}`,
    "X-Connection-Api-Key": tg,
    "Content-Type": "application/json",
  };
}

async function tgCall(method: string, body: Record<string, unknown>): Promise<any> {
  const res = await fetch(`${TG_GATEWAY}/${method}`, {
    method: "POST",
    headers: tgHeaders(),
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Telegram ${method} failed [${res.status}]: ${text}`);
    throw new Error(`Telegram ${method} failed: ${res.status}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, raw: text };
  }
}

async function tgReply(chatId: number, text: string, opts: Record<string, unknown> = {}) {
  try {
    await tgCall("sendMessage", {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      ...opts,
    });
  } catch (err) {
    console.error("tgReply failed", err);
  }
}

async function tgDownloadFile(fileId: string): Promise<Uint8Array> {
  const info = await tgCall("getFile", { file_id: fileId });
  const filePath = info?.result?.file_path;
  if (!filePath) throw new Error("File path missing from Telegram response");
  const res = await fetch(`${TG_GATEWAY}/file/${filePath}`, {
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY!}`,
      "X-Connection-Api-Key": process.env.TELEGRAM_API_KEY!,
    },
  });
  if (!res.ok) throw new Error(`File download failed: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

/* -------------------------------------------------------------------------- */
/*  Auth                                                                      */
/* -------------------------------------------------------------------------- */

function deriveWebhookSecret(): string {
  const key = process.env.TELEGRAM_API_KEY;
  if (!key) throw new Error("TELEGRAM_API_KEY not configured");
  return createHash("sha256").update(`telegram-webhook:${key}`).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

async function isAuthorizedUser(userId: number): Promise<boolean> {
  const groupId = process.env.TELEGRAM_AUTHORIZED_GROUP_ID;
  if (!groupId) {
    console.error("TELEGRAM_AUTHORIZED_GROUP_ID not configured");
    return false;
  }
  try {
    const res = await tgCall("getChatMember", { chat_id: groupId, user_id: userId });
    const status = res?.result?.status;
    return ["creator", "administrator", "member", "restricted"].includes(status);
  } catch (err) {
    console.error("Group membership check failed", err);
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*  Supabase                                                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  VTT parsing                                                               */
/* -------------------------------------------------------------------------- */

type ParsedVtt = { text: string; durationSeconds: number | null };

function parseVtt(raw: string): ParsedVtt {
  const lines = raw.replace(/\r/g, "").split("\n");
  const chunks: string[] = [];
  let lastEndSeconds: number | null = null;
  let inCue = false;
  let cueBuf: string[] = [];

  const flush = () => {
    if (cueBuf.length) {
      chunks.push(cueBuf.join(" ").trim());
      cueBuf = [];
    }
  };

  const tsToSec = (ts: string): number => {
    const parts = ts.split(":");
    let h = 0, m = 0, s = 0;
    if (parts.length === 3) [h, m, s] = [parseInt(parts[0], 10), parseInt(parts[1], 10), parseFloat(parts[2])];
    else if (parts.length === 2) [m, s] = [parseInt(parts[0], 10), parseFloat(parts[1])];
    return h * 3600 + m * 60 + s;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inCue) flush();
      inCue = false;
      continue;
    }
    if (trimmed.startsWith("WEBVTT") || trimmed.startsWith("NOTE") || /^\d+$/.test(trimmed)) continue;
    const arrow = trimmed.match(/(\d{1,2}:\d{2}(?::\d{2})?\.\d{3})\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?\.\d{3})/);
    if (arrow) {
      inCue = true;
      lastEndSeconds = tsToSec(arrow[2]);
      continue;
    }
    if (inCue) {
      // Strip HTML/voice tags: <v Speaker>text</v>, <c.style>...</c>
      const cleaned = trimmed.replace(/<[^>]+>/g, "").trim();
      if (cleaned) cueBuf.push(cleaned);
    } else {
      // Plain text file — treat all lines as content
      chunks.push(trimmed);
    }
  }
  flush();

  const text = chunks.join(" ").replace(/\s+/g, " ").trim();
  return { text, durationSeconds: lastEndSeconds ? Math.round(lastEndSeconds) : null };
}

/* -------------------------------------------------------------------------- */
/*  Lovable AI                                                                */
/* -------------------------------------------------------------------------- */

async function aiJson<T>(system: string, user: string): Promise<T> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY missing");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`AI call failed [${res.status}]: ${text}`);
    throw new Error(`AI failed: ${res.status}`);
  }
  const parsed = JSON.parse(text);
  const content = parsed?.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI returned no content");
  return JSON.parse(content) as T;
}

type ZoomDraft = {
  title: string;
  slug: string;
  description: string;
  summary: string;
};

async function draftZoomFromTranscript(transcript: string, dateISO: string): Promise<ZoomDraft> {
  const sample = transcript.length > 40000 ? transcript.slice(0, 40000) : transcript;
  return aiJson<ZoomDraft>(
    `You are the archivist for TEXITcoin's weekly Honest Money Hour calls, hosted by Bobby Gray.
Produce polished archive metadata from a call transcript. Return JSON with:
- title: engaging headline, 4-9 words, no clickbait, no emojis
- slug: kebab-case, starts with the ISO date, e.g. "${dateISO}-topic-here", 4-8 words after the date, ASCII only
- description: 1-2 sentence blurb for the archive card (max 220 chars), plain sober tone
- summary: 3-6 paragraph AI recap for the detail page (400-700 words). Cover the key announcements, decisions, community context, and any legal/tech/market updates mentioned. Use plain paragraphs, no bullet lists, no headers, no markdown.

Never include emojis. Never mention that this is AI-generated. Keep Bobby Gray's calm, direct voice.`,
    `Call date: ${dateISO}\n\nTranscript:\n${sample}`,
  );
}

type BlogDraft = {
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  bodyMarkdown: string;
  readMinutes: number;
};

async function draftBlogPost(topic: string, context: string, dateISO: string): Promise<BlogDraft> {
  return aiJson<BlogDraft>(
    `You are Bobby Gray writing for the TEXITcoin blog. Voice: calm, direct, plainspoken, honest, no hype, no emojis, no salesy hedges. Return JSON with:
- title: 4-10 word headline
- slug: kebab-case with the date prefix, e.g. "${dateISO}-topic-here"
- tag: short category like "Update", "Market", "Community", "Legal", "Tech"
- excerpt: 1-2 sentence teaser (max 220 chars)
- bodyMarkdown: full post in markdown, 350-800 words. Use short paragraphs. Numbered lists only when giving rules or steps. Headers with ## sparingly. No horizontal rules.
- readMinutes: integer estimate

Never invent facts not in the topic/context. If context mentions the TEXITcoin ecosystem, use these names correctly: TEXITcoin (never Texacoin/Texitcoin), Honest Money Hour, NectarPay, streamTXC.`,
    `Date: ${dateISO}\n\nHeadline / topic: ${topic}\n\nContext / notes:\n${context || "(no extra notes)"}`,
  );
}

/* -------------------------------------------------------------------------- */
/*  Pinata thumbnail upload                                                   */
/* -------------------------------------------------------------------------- */

async function pinToPinata(bytes: Uint8Array, filename: string): Promise<string> {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) throw new Error("PINATA_JWT not configured");
  const form = new FormData();
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  form.append("file", new Blob([ab]), filename);
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: form,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Pinata upload failed [${res.status}]: ${text}`);
    throw new Error(`Pinata upload failed: ${res.status}`);
  }
  const data = JSON.parse(text);
  const cid = data?.IpfsHash;
  if (!cid) throw new Error("Pinata returned no CID");
  const gateway = (process.env.IPFS_GATEWAY || "https://ipfs.io").replace(/\/$/, "");
  const withScheme = /^https?:\/\//.test(gateway) ? gateway : `https://${gateway}`;
  return `${withScheme}/ipfs/${cid}`;
}

/* -------------------------------------------------------------------------- */
/*  Command handlers                                                          */
/* -------------------------------------------------------------------------- */

function siteOrigin(): string {
  return process.env.PUBLIC_SITE_URL || "https://texitcoin.org";
}

function extractCid(url: string): string | null {
  const m = url.match(/([a-zA-Z0-9]{40,})/);
  return m ? m[1] : null;
}

function parseDate(s: string): string | null {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

const HELP = `<b>TEXITcoin site bot</b>
Only members of the authorized group may issue commands.

<b>New recorded call</b>
Attach a .vtt/.txt transcript and set the caption to:
<code>/zoom &lt;streamtxc-url&gt; &lt;YYYY-MM-DD&gt;</code>

<b>Thumbnail for a call</b>
Send a photo with caption:
<code>/thumb &lt;call-slug&gt;</code>

<b>Draft a blog post</b>
<code>/blog &lt;headline&gt;
&lt;optional notes on separate lines&gt;</code>
Draft is created unpublished; I'll reply with a preview link.

<b>Publish a draft</b>
<code>/publish &lt;blog-slug&gt;</code>

<b>Help</b>
<code>/help</code>`;

async function handleZoom(chatId: number, args: string[], docFileId: string | null) {
  if (args.length < 2) {
    await tgReply(chatId, "Usage: <code>/zoom &lt;streamtxc-url&gt; &lt;YYYY-MM-DD&gt;</code> with the .vtt file attached.");
    return;
  }
  const url = args[0];
  const dateISO = parseDate(args[1]);
  if (!dateISO) {
    await tgReply(chatId, "Date must be in <code>YYYY-MM-DD</code> format.");
    return;
  }
  const cid = extractCid(url);
  if (!cid) {
    await tgReply(chatId, "Couldn't find a CID in that URL. Expected something like <code>streamtxc.com/v/&lt;CID&gt;</code>.");
    return;
  }
  if (!docFileId) {
    await tgReply(chatId, "Attach the .vtt or .txt transcript to the same message.");
    return;
  }

  await tgReply(chatId, "Working on it — downloading transcript, calling the AI, and drafting the archive entry…");

  const bytes = await tgDownloadFile(docFileId);
  const raw = new TextDecoder().decode(bytes);
  const { text, durationSeconds } = parseVtt(raw);
  if (text.length < 200) {
    await tgReply(chatId, "That transcript looks empty or too short after parsing. Double-check the file?");
    return;
  }

  const draft = await draftZoomFromTranscript(text, dateISO);

  const callDate = `${dateISO} 23:59:00+00`;
  const { error } = await sb().from("zoom_calls").insert({
    slug: draft.slug,
    title: draft.title,
    description: draft.description,
    call_date: callDate,
    status: "recorded",
    video_cid: cid,
    duration_seconds: durationSeconds,
    summary: draft.summary,
    transcript: text,
  });
  if (error) {
    console.error("insert zoom_calls failed", error);
    await tgReply(chatId, `Insert failed: <code>${error.message}</code>`);
    return;
  }

  const preview = `${siteOrigin()}/zoom/${draft.slug}`;
  await tgReply(
    chatId,
    `✅ Recorded call added.\n\n<b>${draft.title}</b>\n<code>${draft.slug}</code>\n\nPreview: ${preview}\n\nSend a photo with caption <code>/thumb ${draft.slug}</code> to set the thumbnail.`,
  );
}

async function handleThumb(chatId: number, args: string[], photoFileId: string | null) {
  if (args.length < 1 || !photoFileId) {
    await tgReply(chatId, "Send a photo with caption <code>/thumb &lt;call-slug&gt;</code>.");
    return;
  }
  const slug = args[0];
  const { data: existing, error: findErr } = await sb()
    .from("zoom_calls")
    .select("id, slug")
    .eq("slug", slug)
    .maybeSingle();
  if (findErr || !existing) {
    await tgReply(chatId, `No call found with slug <code>${slug}</code>.`);
    return;
  }
  await tgReply(chatId, "Uploading photo to IPFS…");
  const bytes = await tgDownloadFile(photoFileId);
  const url = await pinToPinata(bytes, `${slug}.jpg`);
  const { error: updErr } = await sb()
    .from("zoom_calls")
    .update({ thumbnail_url: url, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  if (updErr) {
    await tgReply(chatId, `Update failed: <code>${updErr.message}</code>`);
    return;
  }
  await tgReply(chatId, `✅ Thumbnail set for <code>${slug}</code>.\n${url}`);
}

async function handleBlog(chatId: number, rest: string) {
  const [firstLine, ...restLines] = rest.split("\n");
  const topic = firstLine.trim();
  const notes = restLines.join("\n").trim();
  if (!topic) {
    await tgReply(chatId, "Usage: <code>/blog &lt;headline&gt;</code>\nAdd context on the following lines.");
    return;
  }
  await tgReply(chatId, "Drafting the post…");
  const dateISO = new Date().toISOString().slice(0, 10);
  const draft = await draftBlogPost(topic, notes, dateISO);
  const { error } = await sb().from("blog_posts").insert({
    slug: draft.slug,
    title: draft.title,
    date: dateISO,
    author: "Bobby Gray",
    tag: draft.tag,
    read_minutes: draft.readMinutes || 3,
    excerpt: draft.excerpt,
    body_markdown: draft.bodyMarkdown,
    published: false,
  });
  if (error) {
    console.error("insert blog_posts failed", error);
    await tgReply(chatId, `Insert failed: <code>${error.message}</code>`);
    return;
  }
  const preview = `${siteOrigin()}/blog/${draft.slug}`;
  await tgReply(
    chatId,
    `📝 Draft saved (unpublished).\n\n<b>${draft.title}</b>\n<code>${draft.slug}</code>\n\nExcerpt: ${draft.excerpt}\n\nReply with <code>/publish ${draft.slug}</code> to publish.\n\nPreview (requires publish first): ${preview}`,
  );
}

async function handlePublish(chatId: number, args: string[]) {
  if (args.length < 1) {
    await tgReply(chatId, "Usage: <code>/publish &lt;blog-slug&gt;</code>");
    return;
  }
  const slug = args[0];
  const { data, error } = await sb()
    .from("blog_posts")
    .update({ published: true, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select("slug")
    .maybeSingle();
  if (error || !data) {
    await tgReply(chatId, `Publish failed for <code>${slug}</code>: ${error?.message ?? "not found"}`);
    return;
  }
  await tgReply(chatId, `✅ Published: ${siteOrigin()}/blog/${slug}`);
}

/* -------------------------------------------------------------------------- */
/*  Route                                                                     */
/* -------------------------------------------------------------------------- */

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Verify webhook secret
        let expected: string;
        try {
          expected = deriveWebhookSecret();
        } catch (err) {
          console.error("Cannot derive webhook secret", err);
          return new Response("Server misconfigured", { status: 500 });
        }
        const provided = request.headers.get("x-telegram-bot-api-secret-token") ?? "";
        if (!safeEqual(provided, expected)) {
          return new Response("Unauthorized", { status: 401 });
        }

        let update: any;
        try {
          update = await request.json();
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }

        const message = update?.message ?? update?.edited_message;
        if (!message) return Response.json({ ok: true, ignored: "no message" });

        const chatId: number = message.chat?.id;
        const userId: number | undefined = message.from?.id;
        if (!chatId || !userId) return Response.json({ ok: true, ignored: "no user" });

        // Auth: user must be in the authorized group
        const ok = await isAuthorizedUser(userId);
        if (!ok) {
          await tgReply(chatId, "Not authorized. Ask an admin to add you to the TEXITcoin bot group.");
          return Response.json({ ok: true, ignored: "unauthorized user" });
        }

        // Extract command text from either message.text or message.caption
        const rawText: string = (message.text ?? message.caption ?? "").trim();
        if (!rawText) return Response.json({ ok: true, ignored: "no text" });

        // Determine attachments
        const document = message.document;
        const docFileId: string | null = document?.file_id ?? null;
        const photo = Array.isArray(message.photo) && message.photo.length
          ? message.photo[message.photo.length - 1]
          : null;
        const photoFileId: string | null = photo?.file_id ?? null;

        // Command parsing
        const firstLine = rawText.split("\n")[0];
        const parts = firstLine.split(/\s+/);
        const commandRaw = parts[0] ?? "";
        const command = commandRaw.split("@")[0].toLowerCase();
        const args = parts.slice(1);
        const restAfterCommand = rawText.slice(commandRaw.length).trim();

        try {
          switch (command) {
            case "/start":
            case "/help":
              await tgReply(chatId, HELP);
              break;
            case "/zoom":
              await handleZoom(chatId, args, docFileId);
              break;
            case "/thumb":
              await handleThumb(chatId, args, photoFileId);
              break;
            case "/blog":
              await handleBlog(chatId, restAfterCommand);
              break;
            case "/publish":
              await handlePublish(chatId, args);
              break;
            default:
              // Ignore non-command messages silently
              break;
          }
        } catch (err) {
          console.error("Handler crashed", err);
          await tgReply(chatId, `Something broke: <code>${(err as Error).message}</code>`);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
