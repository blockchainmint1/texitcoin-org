import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LiveStage } from "@/components/site/LiveStage";
import { ZoomRegister } from "@/components/site/ZoomRegister";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Watch Live — TEXITcoin Honest Money Hour" },
      {
        name: "description",
        content:
          "TEXITcoin goes live with Bobby Gray every Tuesday and Thursday at 7pm Central. Watch the stream here, or catch the simulcast on X, Facebook and YouTube.",
      },
      { property: "og:title", content: "Watch Live — TEXITcoin Honest Money Hour" },
      {
        property: "og:description",
        content: "Live Tuesdays & Thursdays at 7pm Central with Bobby Gray.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/live" }],
  }),
  component: LivePage,
});

function LivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section
          className="border-b border-border px-6 py-16 md:py-24"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-6xl">
            <LiveStage />
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold">
                Two calls a week now
              </h2>
              <p className="mt-4 text-muted-foreground">
                Bobby hosts the Honest Money Hour live on <strong>Tuesdays</strong>{" "}
                and <strong>Thursdays</strong> at 7:00pm Central. Same format both
                nights: what happened this week, what's shipping next, and open Q&amp;A
                with no script and no edits.
              </p>
              <p className="mt-4 text-muted-foreground">
                Miss one? Every call lands in the archive with an AI summary and the
                full transcript.
              </p>
              <Link
                to="/zoom"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-semibold uppercase tracking-wider hover:border-primary/50"
              >
                <PlayCircle className="h-4 w-4" /> Browse the archive
              </Link>
            </div>
            <div id="live-reminder">
              <ZoomRegister />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
