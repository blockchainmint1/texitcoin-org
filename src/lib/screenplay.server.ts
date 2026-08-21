import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SeasonDTO = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  logline: string;
  introMarkdown: string;
  honestyNote: string;
};

export type BeatDTO = {
  id: string;
  seasonSlug: string;
  sortOrder: number;
  kind: string;
  title: string;
  body: string;
  credit: string | null;
  mediaUrl: string | null;
};

export type ContributionDTO = {
  id: string;
  seasonSlug: string | null;
  beatId: string | null;
  kind: string;
  contributorName: string;
  contributorEmail: string | null;
  pitch: string;
  aiDraft: string | null;
  finalBody: string | null;
  mediaUrl: string | null;
  status: string;
  reviewerNote: string | null;
  createdAt: string;
};

export const CONTRIBUTION_KINDS = [
  "scene",
  "note",
  "character",
  "detail",
  "media",
] as const;
export type ContributionKind = (typeof CONTRIBUTION_KINDS)[number];

export function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const SEASON_COLS =
  "slug,number,title,subtitle,era,logline,intro_markdown,honesty_note";
export const BEAT_COLS = "id,season_slug,sort_order,kind,title,body,credit,media_url";
export const CONTRIBUTION_COLS =
  "id,season_slug,beat_id,kind,contributor_name,contributor_email,pitch,ai_draft,final_body,media_url,status,reviewer_note,created_at";

type SeasonRow = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  logline: string;
  intro_markdown: string;
  honesty_note: string;
};

type BeatRow = {
  id: string;
  season_slug: string;
  sort_order: number;
  kind: string;
  title: string;
  body: string;
  credit: string | null;
  media_url: string | null;
};

type ContributionRow = {
  id: string;
  season_slug: string | null;
  beat_id: string | null;
  kind: string;
  contributor_name: string;
  contributor_email: string | null;
  pitch: string;
  ai_draft: string | null;
  final_body: string | null;
  media_url: string | null;
  status: string;
  reviewer_note: string | null;
  created_at: string;
};

export function toSeason(r: SeasonRow): SeasonDTO {
  return {
    slug: r.slug,
    number: r.number,
    title: r.title,
    subtitle: r.subtitle,
    era: r.era,
    logline: r.logline,
    introMarkdown: r.intro_markdown,
    honestyNote: r.honesty_note,
  };
}

export function toBeat(r: BeatRow): BeatDTO {
  return {
    id: r.id,
    seasonSlug: r.season_slug,
    sortOrder: r.sort_order,
    kind: r.kind,
    title: r.title,
    body: r.body,
    credit: r.credit,
    mediaUrl: r.media_url,
  };
}

export function toContribution(r: ContributionRow): ContributionDTO {
  return {
    id: r.id,
    seasonSlug: r.season_slug,
    beatId: r.beat_id,
    kind: r.kind,
    contributorName: r.contributor_name,
    contributorEmail: r.contributor_email,
    pitch: r.pitch,
    aiDraft: r.ai_draft,
    finalBody: r.final_body,
    mediaUrl: r.media_url,
    status: r.status,
    reviewerNote: r.reviewer_note,
    createdAt: r.created_at,
  };
}

const KIND_INSTRUCTIONS: Record<ContributionKind, string> = {
  scene:
    "Draft this as a single treatment beat: a bolded scene heading line, then 2-4 tight paragraphs of present-tense prose. Dialogue only where it lands hard, in *italics* inline, not screenplay dialogue blocks.",
  note:
    "Draft this as a short margin note on the existing beat: 1-2 paragraphs, conversational, factual, the voice of somebody who was in the room.",
  character:
    "Draft this as a character card: a bolded name line with a role, then one paragraph of who they are and one short paragraph on their arc across the season.",
  detail:
    "Draft this as a correction note: state plainly what the treatment currently implies, what actually happened, and why the real version is better television. Keep it under 150 words.",
  media:
    "Draft a one-paragraph caption for this photo or clip, placing it in the timeline of the season and saying what it shows.",
};

const SYSTEM_PROMPT = `You are a staff writer on the TEXITcoin limited series writers' room.

House voice: plain, muscular, Texan, unsentimental. Ozark meets King of the Hill. Short sentences. Concrete nouns — molten silver, a 110-degree garage, an empty ballroom. No hype, no crypto marketing language, no exclamation points, no em-dash-heavy purple prose. Humor is dry and comes from character, never from jokes.

Rules:
- Write in present tense.
- Output markdown only. Start with a bolded title line, then the body.
- Never invent legal outcomes, court rulings, dollar figures, or medical facts that are not in the pitch.
- Keep it to 250 words or fewer.
- Do not explain what you did or add notes to the reader. Output the draft only.`;

export async function draftBeat(input: {
  kind: ContributionKind;
  pitch: string;
  seasonTitle?: string;
  seasonLogline?: string;
  beatTitle?: string | null;
}): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI is not configured");

  const context = [
    input.seasonTitle ? `Season: ${input.seasonTitle}` : null,
    input.seasonLogline ? `Season logline: ${input.seasonLogline}` : null,
    input.beatTitle ? `Attached to existing beat: ${input.beatTitle}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `${context}\n\n${KIND_INSTRUCTIONS[input.kind]}\n\nContributor's pitch:\n${input.pitch}`,
        },
      ],
    }),
  });

  if (res.status === 429) throw new Error("The writers' room is busy — try again in a minute.");
  if (res.status === 402) throw new Error("AI credits are exhausted.");
  if (!res.ok) {
    console.error("AI draft failed", res.status, await res.text());
    throw new Error("Couldn't draft that. Try rewording your pitch.");
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = json.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("The draft came back empty. Try again.");
  return text.slice(0, 12000);
}
