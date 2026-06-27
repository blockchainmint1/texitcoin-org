import { createFileRoute } from "@tanstack/react-router";
import data from "@/data/zoom-2026-06-25.json";

export const Route = createFileRoute("/api/public/_seed-zoom-20260625")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin
          .from("zoom_calls")
          .update({
            summary: (data as { summary: string }).summary,
            transcript: (data as { transcript: string }).transcript,
            status: "recorded",
            video_cid: "bafybeig56wmykhr6hqwie66d64rv66yyjildkys3hv6chj27mcsn3xgyfq",
          })
          .eq("slug", "2026-06-25-we-did-it");
        if (error) return new Response(error.message, { status: 500 });
        return Response.json({ ok: true });
      },
    },
  },
});
