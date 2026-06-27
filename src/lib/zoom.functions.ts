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

// File-based transcript/summary fallbacks. Used when the row in the DB
// doesn't carry transcript text (e.g. very long transcripts shipped via the
// repo). Keyed by zoom_calls.slug.
const FILE_FALLBACKS: Record<string, () => Promise<{ summary?: string; transcript?: string }>> = {
  "2026-06-25-we-did-it": () =>
    import("@/data/transcripts/2026-06-25-we-did-it.json").then((m) => m.default ?? m),
};

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
    const call = (row as ZoomCall | null) ?? null;
    if (!call) return null;
    const loader = FILE_FALLBACKS[call.slug];
    if (loader && (!call.transcript || !call.summary)) {
      try {
        const fallback = await loader();
        if (!call.transcript && fallback.transcript) call.transcript = fallback.transcript;
        if (!call.summary && fallback.summary) call.summary = fallback.summary;
      } catch {
        // ignore — fall back to whatever the DB returned
      }
    }
    return call;
  });

