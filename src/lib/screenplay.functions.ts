import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "@tanstack/react-router";
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

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

const SEASON_COLS =
  "slug,number,title,subtitle,era,logline,intro_markdown,honesty_note";
const BEAT_COLS = "id,season_slug,sort_order,kind,title,body,credit,media_url";

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

function toSeason(r: SeasonRow): SeasonDTO {
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

function toBeat(r: BeatRow): BeatDTO {
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

export const listSeasons = createServerFn({ method: "GET" }).handler(
  async (): Promise<SeasonDTO[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("screenplay_seasons")
      .select(SEASON_COLS)
      .eq("published", true)
      .order("number", { ascending: true });
    if (error) {
      console.error("listSeasons failed", error);
      throw new Error("Failed to load seasons");
    }
    return ((data ?? []) as unknown as SeasonRow[]).map(toSeason);
  },
);

export const getSeason = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => {
    if (!data?.slug || typeof data.slug !== "string") throw new Error("slug required");
    return data;
  })
  .handler(async ({ data }): Promise<{ season: SeasonDTO; beats: BeatDTO[] }> => {
    const supabase = publicClient();
    const { data: season, error } = await supabase
      .from("screenplay_seasons")
      .select(SEASON_COLS)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("getSeason failed", error);
      throw new Error("Failed to load season");
    }
    if (!season) throw notFound();

    const { data: beats, error: beatsError } = await supabase
      .from("screenplay_beats")
      .select(BEAT_COLS)
      .eq("season_slug", data.slug)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (beatsError) {
      console.error("getSeason beats failed", beatsError);
      throw new Error("Failed to load season");
    }

    return {
      season: toSeason(season as unknown as SeasonRow),
      beats: ((beats ?? []) as unknown as BeatRow[]).map(toBeat),
    };
  });
