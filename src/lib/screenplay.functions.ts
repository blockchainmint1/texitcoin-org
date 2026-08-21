import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  BEAT_COLS,
  CONTRIBUTION_COLS,
  CONTRIBUTION_KINDS,
  SEASON_COLS,
  draftBeat,
  publicClient,
  toBeat,
  toContribution,
  toSeason,
} from "./screenplay.server";
import type {
  BeatDTO,
  ContributionDTO,
  ContributionKind,
  SeasonDTO,
} from "./screenplay.server";

export type { SeasonDTO, BeatDTO, ContributionDTO, ContributionKind };

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
    return ((data ?? []) as unknown as Parameters<typeof toSeason>[0][]).map(toSeason);
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
      season: toSeason(season as unknown as Parameters<typeof toSeason>[0]),
      beats: ((beats ?? []) as unknown as Parameters<typeof toBeat>[0][]).map(toBeat),
    };
  });

type PitchInput = {
  kind: string;
  pitch: string;
  seasonSlug?: string | null;
  beatId?: string | null;
};

function validatePitch(data: PitchInput) {
  const kind = String(data?.kind ?? "scene");
  if (!(CONTRIBUTION_KINDS as readonly string[]).includes(kind)) {
    throw new Error("Unknown submission type");
  }
  const pitch = String(data?.pitch ?? "").trim();
  if (pitch.length < 10) throw new Error("Give us at least a sentence or two.");
  if (pitch.length > 4000) throw new Error("That's too long — trim it down.");
  return {
    kind: kind as ContributionKind,
    pitch,
    seasonSlug: data.seasonSlug ? String(data.seasonSlug).slice(0, 80) : null,
    beatId: data.beatId ? String(data.beatId).slice(0, 40) : null,
  };
}

export const draftContribution = createServerFn({ method: "POST" })
  .inputValidator(validatePitch)
  .handler(async ({ data }): Promise<{ draft: string }> => {
    const supabase = publicClient();
    let seasonTitle: string | undefined;
    let seasonLogline: string | undefined;
    let beatTitle: string | null = null;

    if (data.seasonSlug) {
      const { data: season } = await supabase
        .from("screenplay_seasons")
        .select("title,logline")
        .eq("slug", data.seasonSlug)
        .eq("published", true)
        .maybeSingle();
      seasonTitle = season?.title;
      seasonLogline = season?.logline;
    }
    if (data.beatId) {
      const { data: beat } = await supabase
        .from("screenplay_beats")
        .select("title")
        .eq("id", data.beatId)
        .eq("published", true)
        .maybeSingle();
      beatTitle = beat?.title ?? null;
    }

    const draft = await draftBeat({
      kind: data.kind,
      pitch: data.pitch,
      seasonTitle,
      seasonLogline,
      beatTitle,
    });
    return { draft };
  });

export const submitContribution = createServerFn({ method: "POST" })
  .inputValidator(
    (
      data: PitchInput & {
        contributorName: string;
        contributorEmail?: string | null;
        draft?: string | null;
        mediaUrl?: string | null;
      },
    ) => {
      const base = validatePitch(data);
      const contributorName = String(data?.contributorName ?? "").trim();
      if (contributorName.length < 2 || contributorName.length > 80) {
        throw new Error("Tell us who to credit (2-80 characters).");
      }
      const email = String(data?.contributorEmail ?? "").trim();
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
        throw new Error("That email doesn't look right.");
      }
      const mediaUrl = String(data?.mediaUrl ?? "").trim();
      if (mediaUrl && !/^https:\/\/\S+$/.test(mediaUrl)) {
        throw new Error("Media links must start with https://");
      }
      const draft = String(data?.draft ?? "").trim();
      return {
        ...base,
        contributorName,
        contributorEmail: email || null,
        mediaUrl: mediaUrl ? mediaUrl.slice(0, 500) : null,
        draft: draft ? draft.slice(0, 12000) : null,
      };
    },
  )
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const supabase = publicClient();
    const { error } = await supabase.from("screenplay_contributions").insert({
      season_slug: data.seasonSlug,
      beat_id: data.beatId,
      kind: data.kind,
      contributor_name: data.contributorName,
      contributor_email: data.contributorEmail,
      pitch: data.pitch,
      ai_draft: data.draft,
      final_body: data.draft,
      media_url: data.mediaUrl,
      status: "pending",
    });
    if (error) {
      console.error("submitContribution failed", error);
      throw new Error("Couldn't save that submission. Try again.");
    }
    return { ok: true };
  });

async function assertAdmin(context: {
  supabase: ReturnType<typeof publicClient>;
  userId: string;
}) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const listContributions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ContributionDTO[]> => {
    await assertAdmin(context as never);
    const { data, error } = await context.supabase
      .from("screenplay_contributions")
      .select(CONTRIBUTION_COLS)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      console.error("listContributions failed", error);
      throw new Error("Failed to load the queue");
    }
    return ((data ?? []) as unknown as Parameters<typeof toContribution>[0][]).map(
      toContribution,
    );
  });

export const reviewContribution = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      action: "approve" | "reject";
      title?: string;
      body?: string;
      reviewerNote?: string;
    }) => {
      if (!data?.id) throw new Error("id required");
      if (data.action !== "approve" && data.action !== "reject") {
        throw new Error("Unknown action");
      }
      return {
        id: String(data.id),
        action: data.action,
        title: String(data.title ?? "").trim().slice(0, 200),
        body: String(data.body ?? "").trim().slice(0, 12000),
        reviewerNote: String(data.reviewerNote ?? "").trim().slice(0, 1000) || null,
      };
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context as never);
    const supabase = context.supabase;

    const { data: row, error: readError } = await supabase
      .from("screenplay_contributions")
      .select(CONTRIBUTION_COLS)
      .eq("id", data.id)
      .maybeSingle();
    if (readError || !row) throw new Error("Submission not found");
    const contribution = toContribution(
      row as unknown as Parameters<typeof toContribution>[0],
    );

    if (data.action === "approve") {
      if (!contribution.seasonSlug) throw new Error("This pitch has no season");
      const body = data.body || contribution.finalBody || contribution.aiDraft || "";
      if (!body) throw new Error("Nothing to publish");

      const { data: last } = await supabase
        .from("screenplay_beats")
        .select("sort_order")
        .eq("season_slug", contribution.seasonSlug)
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { error: insertError } = await supabase.from("screenplay_beats").insert({
        season_slug: contribution.seasonSlug,
        sort_order: (last?.sort_order ?? 0) + 10,
        kind: contribution.kind,
        title: data.title || `${contribution.kind} from ${contribution.contributorName}`,
        body,
        credit: contribution.contributorName,
        media_url: contribution.mediaUrl,
        published: true,
      });
      if (insertError) {
        console.error("approve insert failed", insertError);
        throw new Error("Couldn't publish that beat");
      }
    }

    const { error: updateError } = await supabase
      .from("screenplay_contributions")
      .update({
        status: data.action === "approve" ? "approved" : "rejected",
        final_body: data.body || contribution.finalBody,
        reviewer_note: data.reviewerNote,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (updateError) {
      console.error("review update failed", updateError);
      throw new Error("Couldn't update that submission");
    }
    return { ok: true };
  });
