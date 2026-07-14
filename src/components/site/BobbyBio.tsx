import { useState } from "react";
import { Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import bobbyMain from "@/assets/bobby/bobby-bobby_1.jpg.asset.json";
import bobby000 from "@/assets/bobby/bobby-000-IURbAk98Fxo.jpg.asset.json";
import bobby012 from "@/assets/bobby/bobby-012-JWtPAywTTzY.jpg.asset.json";
import bobby013 from "@/assets/bobby/bobby-013-pAopIqnnnf0.jpg.asset.json";
import bobby042 from "@/assets/bobby/bobby-042-DMBT3s-7Hfo.jpg.asset.json";
import bobby150 from "@/assets/bobby/bobby-150-uTcxjkxjgcg.jpg.asset.json";
import bobby156 from "@/assets/bobby/bobby-156-xN2c1u1P7_Q.jpg.asset.json";

type Photo = { url: string; label: string };

const PHOTOS: Photo[] = [
  { url: bobbyMain.url, label: "Yacht / navy blazer" },
  { url: bobby150.url, label: "Austin skyline night" },
  { url: bobby000.url, label: "Beach / black suit" },
  { url: bobby013.url, label: "Beach / grey suit" },
  { url: bobby042.url, label: "Street / white shirt" },
  { url: bobby012.url, label: "Waterfront / navy blazer" },
  { url: bobby156.url, label: "Coastline / v-neck" },
];

const TOPICS = [
  "The American Open Currency Standard and early monetary reform efforts",
  "Designing the original physical Bitcoin coin and its cultural impact",
  "Proof-of-work as a modern extension of commodity-backed money",
  "Why Texas energy infrastructure matters for blockchain mining",
  "Building a Layer 1 network mined exclusively within one jurisdiction",
  "Community-driven funding and grassroots crypto growth",
  "Fixed supply, cost-backed issuance, and monetary discipline",
  "Regulatory clarity and community currencies",
  "Reintroducing “honest money” principles into modern crypto",
  "Physical-to-digital asset security and cold storage evolution",
  "Onboarding skeptics into cryptocurrency through transparency",
  "Navigating regulatory scrutiny as a blockchain founder",
  "The intersection of energy policy and digital currency",
  "Merchant adoption and spendable crypto infrastructure",
];

export function BobbyBio() {
  const [active, setActive] = useState<Photo>(PHOTOS[0]);
  const [zoomed, setZoomed] = useState<Photo | null>(null);

  return (
    <section className="border-b border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Founder
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Bobby Gray
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Photo column */}
          <div>
            <button
              type="button"
              onClick={() => setZoomed(active)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-background shadow-card"
              aria-label="View high-resolution portrait"
            >
              <img
                src={active.url}
                alt={`Bobby Gray — ${active.label}`}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Download className="h-3.5 w-3.5" /> High-res
              </span>
            </button>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {PHOTOS.map((p) => {
                const isActive = p.url === active.url;
                return (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => setActive(p)}
                    className={`group relative overflow-hidden rounded-md border transition ${
                      isActive
                        ? "border-primary ring-2 ring-primary/40"
                        : "border-border hover:border-primary/60"
                    }`}
                    aria-label={`Select photo: ${p.label}`}
                    aria-pressed={isActive}
                  >
                    <img
                      src={p.url}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Click any thumbnail to preview. Tap the main photo to open the
              high-resolution version for download.
            </p>
          </div>

          {/* Bio column */}
          <div className="space-y-5 text-muted-foreground">
            <p>
              Bobby Gray is the founder of TEXITcoin and a long-standing
              advocate for honest, rules-based digital money. His work in
              monetary reform began well before the rise of mainstream crypto.
              In 2008, he founded the American Open Currency Standard,
              promoting principles of transparency and discipline in currency
              systems. In 2011, he created one of the earliest and most
              recognized physical Bitcoin coin designs — the iconic “B” with a
              circuit-board backdrop — helping give tangible identity to a
              then-emerging digital movement. He later developed the original
              Bitcoin Cold Storage Coin in 2017, further bridging physical and
              digital asset security.
            </p>
            <p>
              In 2012, Bobby served as an expert witness before the U.S.
              Congressional Domestic Monetary Services Subcommittee,
              contributing to early national discussions around alternative
              currencies and monetary systems. His perspective has consistently
              centered on scarcity, production cost, and rule-based issuance as
              the foundation of trust in money.
            </p>
            <p>
              Today, as founder of TEXITcoin, Bobby is building a
              proof-of-work Layer 1 cryptocurrency mined exclusively within
              Texas. Leveraging the state&rsquo;s independent energy grid and
              abundant resources, TEXITcoin is positioned as a transparent,
              community-driven digital currency rooted in decentralization and
              real-world infrastructure. The project has raised almost $150
              million through a grassroots funding model and is supported by a
              growing network of more than 58,000 TXC miners.
            </p>
            <p>
              At TOKEN2049 Singapore 2025, Bobby outlined TEXITcoin&rsquo;s
              vision to reintroduce monetary honesty to crypto — shifting focus
              from speculation to utility, discipline, and peer-to-peer
              commerce. Drawing from his transition from physical gold and
              silver into blockchain, he emphasizes that durable digital money
              must be anchored in measurable cost and fixed supply.
            </p>
            <p>
              Bobby lives in Texas with his family and remains focused on
              building a resilient, transparent monetary network aligned with
              the original mission of cryptocurrency.
            </p>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Speaking topics
              </div>
              <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                {TOPICS.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!zoomed} onOpenChange={(o) => !o && setZoomed(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0 bg-background">
          <DialogTitle className="sr-only">
            Bobby Gray — high resolution photo
          </DialogTitle>
          {zoomed && (
            <div className="relative">
              <img
                src={zoomed.url}
                alt={`Bobby Gray — ${zoomed.label}`}
                className="max-h-[80vh] w-full object-contain bg-black"
              />
              <div className="flex items-center justify-between gap-4 border-t border-border bg-card p-4">
                <div>
                  <div className="text-sm font-semibold">Bobby Gray</div>
                  <div className="text-xs text-muted-foreground">
                    {zoomed.label} · full resolution
                  </div>
                </div>
                <a
                  href={zoomed.url}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
