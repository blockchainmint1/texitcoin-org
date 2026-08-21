import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { Loader2, PenLine, RefreshCw, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { draftContribution, submitContribution } from "@/lib/screenplay.functions";

const KINDS = [
  { value: "scene", label: "A scene" },
  { value: "note", label: "A note" },
  { value: "character", label: "A character" },
  { value: "detail", label: "A correction" },
  { value: "media", label: "A photo or clip" },
] as const;

export function PitchDialog({
  seasonSlug,
  beatId,
  beatTitle,
  trigger,
  defaultKind = "scene",
}: {
  seasonSlug?: string;
  beatId?: string;
  beatTitle?: string;
  trigger?: React.ReactNode;
  defaultKind?: (typeof KINDS)[number]["value"];
}) {
  const draftFn = useServerFn(draftContribution);
  const submitFn = useServerFn(submitContribution);

  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<string>(defaultKind);
  const [pitch, setPitch] = useState("");
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [busy, setBusy] = useState<null | "draft" | "submit">(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function reset() {
    setKind(defaultKind);
    setPitch("");
    setDraft("");
    setMediaUrl("");
    setBusy(null);
    setError("");
    setDone(false);
  }

  async function onDraft() {
    setError("");
    setBusy("draft");
    try {
      const res = await draftFn({
        data: { kind, pitch, seasonSlug: seasonSlug ?? null, beatId: beatId ?? null },
      });
      setDraft(res.draft);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  async function onSubmit() {
    setError("");
    setBusy("submit");
    try {
      await submitFn({
        data: {
          kind,
          pitch,
          seasonSlug: seasonSlug ?? null,
          beatId: beatId ?? null,
          contributorName: name,
          contributorEmail: email || null,
          draft: draft || null,
          mediaUrl: mediaUrl || null,
        },
      });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="gap-2">
            <PenLine className="h-4 w-4" />
            Pitch a scene
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {done ? "In the queue" : "The writers' room"}
          </DialogTitle>
          <DialogDescription>
            {done
              ? "Thanks — it's in the suggestion box. Approved contributions get credited right on the beat."
              : beatTitle
                ? `Pitching against "${beatTitle}". Rough is fine — AI drafts it in the house voice, you approve it before it goes in.`
                : "Rough is fine. Two sentences. AI drafts it in the house voice, you approve it before it goes in."}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <Check className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Submitted as <span className="text-foreground">{name}</span>. Bobby
              reviews the queue by hand.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                What is it
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {KINDS.map((k) => (
                  <button
                    key={k.value}
                    type="button"
                    onClick={() => setKind(k.value)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      kind === k.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="pitch">Your pitch</Label>
              <Textarea
                id="pitch"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={4}
                placeholder="The night the casting machine blew and Matt kept talking through the whole thing…"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="media">Photo or video link (optional)</Label>
              <Input
                id="media"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://…"
                className="mt-2"
              />
            </div>

            <div>
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                disabled={busy !== null || pitch.trim().length < 10}
                onClick={onDraft}
              >
                {busy === "draft" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : draft ? (
                  <RefreshCw className="h-4 w-4" />
                ) : (
                  <PenLine className="h-4 w-4" />
                )}
                {draft ? "Draft it again" : "Draft it for me"}
              </Button>
            </div>

            {draft && (
              <div>
                <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  The draft — edit freely
                </Label>
                <div className="mt-2 rounded-xl border border-border bg-card/50 p-4 prose prose-invert prose-sm max-w-none prose-p:text-muted-foreground">
                  <ReactMarkdown>{draft}</ReactMarkdown>
                </div>
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={8}
                  className="mt-3 font-mono text-xs"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Credit this to</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name or handle"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (never shown)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2"
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="button"
              className="w-full gap-2"
              disabled={
                busy !== null || pitch.trim().length < 10 || name.trim().length < 2
              }
              onClick={onSubmit}
            >
              {busy === "submit" && <Loader2 className="h-4 w-4 animate-spin" />}
              Send it to the suggestion box
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
