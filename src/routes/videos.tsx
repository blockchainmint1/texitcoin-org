import { createFileRoute } from "@tanstack/react-router";
import { Film } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos & Resources — TEXITcoin" },
      {
        name: "description",
        content:
          "A growing library of TEXITcoin videos — testimony, talks, explainers, and more. Streamed peer-to-peer via streamTXC.",
      },
      { property: "og:title", content: "Videos & Resources — TEXITcoin" },
      {
        property: "og:description",
        content: "Watch the TXC video library, streamed via streamTXC.",
      },
    ],
    links: [{ rel: "canonical", href: "https://texitcoin.org/videos" }],
  }),
  component: VideosPage,
});

type Video = { cid: string; title: string };

const VIDEOS: Video[] = [
  { cid: "bafybeiah3xi6ulcsi7bvn4w64cmhq7qqrdn67kcvxwu3mnkljlwq6pelnq", title: "Bobby Gray — Congressional Testimony on Parallel Currencies (2012)" },
  { cid: "bafybeie2pykofxtopbc4pzz7nqohxrvld5spcgt3ltsar63zd6ves5b3dy", title: "Discover TEXITcoin in 6 Minutes" },
  { cid: "bafybeihm7mskcn5nqueme7hygp5evo6srag2myaqybtdyw3k6nmn2uu3ri", title: "TEXITcoin Quick Summary" },
  { cid: "bafybeibb64evx4gtecpneitfslgkx4rxd6bb7kkenr75727hs5gnu5xsku", title: "Discover TEXITcoin in 2 Minutes" },
  { cid: "QmZj4NwHbmFrbvW9UfC3FmhtEWzaxA2TjGPbqKZVxi6c3N", title: "Bobby's Disclaimer — Post-TSSB Action" },
  { cid: "bafybeiclv5ul635rkwiuicrz6s4maaoyogfyzcf4jlmgh76q6gypkz3sim", title: "Bobby Gray Keynote — Ron Paul's 90th Birthday BBQ" },
];

function VideosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-border pt-32 pb-16">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="mx-auto max-w-5xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Film className="h-3 w-3 text-primary" />
              Streamed via streamTXC
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Videos &amp; <span className="text-primary">Resources</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Testimony, talks, explainers, and field reports — a growing
              library, served peer-to-peer over IPFS. We'll organize this as it
              grows. For now, hit play.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-10 md:grid-cols-2">
              {VIDEOS.map((v) => (
                <figure key={v.cid} className="overflow-hidden rounded-2xl border border-border bg-black shadow-card">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={`https://streamtxc.com/embed/${v.cid}?`}
                      title={v.title}
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <figcaption className="border-t border-border bg-card px-5 py-3 text-sm font-medium">
                    {v.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
