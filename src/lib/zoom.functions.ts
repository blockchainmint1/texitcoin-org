import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ZoomCall = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  call_date: string;
  status: "upcoming" | "live" | "recorded";
  video_cid: string | null;
  duration_seconds: number | null;
  summary: string | null;
  transcript: string | null;
  thumbnail_url: string | null;
};

export const listZoomCalls = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ upcoming: ZoomCall[]; recorded: ZoomCall[]; latest: ZoomCall | null }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("zoom_calls")
      .select(
        "id, slug, title, description, call_date, status, video_cid, duration_seconds, summary, thumbnail_url"
      )
      .order("call_date", { ascending: false });
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as ZoomCall[];
    const upcoming = rows
      .filter((r) => r.status === "upcoming" || r.status === "live")
      .sort((a, b) => +new Date(a.call_date) - +new Date(b.call_date));
    const recorded = rows.filter((r) => r.status === "recorded");
    const latest = recorded[0] ?? null;
    return { upcoming, recorded, latest };
  }
);

const slugSchema = z
  .object({ slug: z.string().min(1).max(120).regex(/^[a-zA-Z0-9._-]+$/) })
  .strict();

export const getZoomCall = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => slugSchema.parse(input))
  .handler(async ({ data }): Promise<ZoomCall | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("zoom_calls")
      .select(
        "id, slug, title, description, call_date, status, video_cid, duration_seconds, summary, transcript, thumbnail_url"
      )
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as ZoomCall | null) ?? null;
  });

export type ZoomSearchHit = {
  slug: string;
  title: string;
  call_date: string;
  snippet: string;
  matchedTranscript: boolean;
};

const querySchema = z.object({ q: z.string().min(2).max(120) }).strict();

function buildSnippet(text: string, term: string) {
  const plain = text.replace(/\s+/g, " ").trim();
  const idx = plain.toLowerCase().indexOf(term.toLowerCase());
  if (idx < 0) return plain.slice(0, 220);
  const start = Math.max(0, idx - 90);
  return (start > 0 ? "…" : "") + plain.slice(start, start + 260).trim() + "…";
}

export const searchZoomCalls = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => querySchema.parse(input))
  .handler(async ({ data }): Promise<ZoomSearchHit[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const term = data.q.replace(/[%_,]/g, " ").trim();
    if (!term) return [];
    const pattern = `%${term}%`;
    const { data: rows, error } = await supabaseAdmin
      .from("zoom_calls")
      .select("slug, title, call_date, summary, transcript")
      .or(`title.ilike.${pattern},summary.ilike.${pattern},transcript.ilike.${pattern}`)
      .order("call_date", { ascending: false })
      .limit(15);
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => {
      const transcript = (r.transcript as string | null) ?? "";
      const summary = (r.summary as string | null) ?? "";
      const inTranscript = transcript.toLowerCase().includes(term.toLowerCase());
      const source = inTranscript ? transcript : summary || transcript;
      return {
        slug: r.slug as string,
        title: r.title as string,
        call_date: r.call_date as string,
        snippet: source ? buildSnippet(source, term) : "",
        matchedTranscript: inTranscript,
      };
    });
  });

