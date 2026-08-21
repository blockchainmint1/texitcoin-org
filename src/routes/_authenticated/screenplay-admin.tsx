import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { Check, Loader2, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  listContributions,
  reviewContribution,
  type ContributionDTO,
} from "@/lib/screenplay.functions";

export const Route = createFileRoute("/_authenticated/screenplay-admin")({
  head: () => ({
    meta: [
      { title: "Writers' room queue — TEXITcoin" },
      {
        name: "description",
        content: "Review and approve community contributions to the TEXITcoin series treatment.",
      },
      { property: "og:title", content: "Writers' room queue — TEXITcoin" },
      {
        property: "og:description",
        content: "Review and approve community contributions to the TEXITcoin series treatment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background p-8 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Not authorized</h1>
        <p className="mt-2 text-muted-foreground">
          This queue is admin-only.
        </p>
        <Link to="/screenplay" className="mt-4 inline-block text-primary underline">
          Back to the series bible
        </Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background p-8">
      <p className="text-muted-foreground">Nothing here.</p>
    </div>
  ),
  component: AdminPage,
});

function AdminPage() {
  const listFn = useServerFn(listContributions);
  const { data, isLoading, error } = useQuery({
    queryKey: ["screenplay-contributions"],
    queryFn: () => listFn({}),
  });

  const pending = (data ?? []).filter((c) => c.status === "pending");
  const settled = (data ?? []).filter((c) => c.status !== "pending");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-4xl font-bold">Writers' room queue</h1>
          <p className="mt-3 text-muted-foreground">
            Approve a pitch and it publishes as a credited beat on that season page.
          </p>

          {isLoading && (
            <div className="mt-10 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading the queue…
            </div>
          )}
          {error && (
            <p className="mt-10 text-destructive">
              {error instanceof Error ? error.message : "Couldn't load the queue."}
            </p>
          )}

          {!isLoading && !error && pending.length === 0 && (
            <p className="mt-10 text-muted-foreground">Nothing pending. Empty box.</p>
          )}

          <div className="mt-10 space-y-8">
            {pending.map((c) => (
              <ReviewCard key={c.id} contribution={c} />
            ))}
          </div>

          {settled.length > 0 && (
            <div className="mt-16 border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold">Already reviewed</h2>
              <ul className="mt-6 space-y-3 text-sm">
                {settled.map((c) => (
                  <li key={c.id} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 rounded-full border px-2 py-0.5 text-xs font-mono uppercase ${
                        c.status === "approved"
                          ? "border-primary/40 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {c.status}
                    </span>
                    <span className="text-muted-foreground">
                      {c.contributorName} — {c.pitch.slice(0, 120)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ReviewCard({ contribution }: { contribution: ContributionDTO }) {
  const reviewFn = useServerFn(reviewContribution);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(
    contribution.finalBody ?? contribution.aiDraft ?? "",
  );
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: (action: "approve" | "reject") =>
      reviewFn({
        data: { id: contribution.id, action, title, body, reviewerNote: note },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["screenplay-contributions"] }),
  });

  return (
    <article className="rounded-2xl border border-border bg-card/40 p-6">
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="rounded-full border border-border px-2 py-0.5">
          {contribution.kind}
        </span>
        {contribution.seasonSlug && <span>{contribution.seasonSlug}</span>}
        <span>{new Date(contribution.createdAt).toLocaleDateString()}</span>
        <span className="text-primary">{contribution.contributorName}</span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground italic">{contribution.pitch}</p>

      {contribution.mediaUrl && (
        <a
          href={contribution.mediaUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block break-all text-xs text-primary underline"
        >
          {contribution.mediaUrl}
        </a>
      )}

      {body && (
        <div className="mt-5 rounded-xl border border-border bg-background/50 p-4 prose prose-invert prose-sm max-w-none prose-p:text-muted-foreground">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      )}

      <div className="mt-5 space-y-4">
        <div>
          <Label htmlFor={`title-${contribution.id}`}>Beat title</Label>
          <Input
            id={`title-${contribution.id}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give the beat a title"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor={`body-${contribution.id}`}>Body (markdown)</Label>
          <Textarea
            id={`body-${contribution.id}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="mt-2 font-mono text-xs"
          />
        </div>
        <div>
          <Label htmlFor={`note-${contribution.id}`}>Reviewer note (private)</Label>
          <Input
            id={`note-${contribution.id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      {mutation.isError && (
        <p className="mt-4 text-sm text-destructive">
          {mutation.error instanceof Error ? mutation.error.message : "Failed."}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <Button
          className="gap-2"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate("approve")}
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Approve into canon
        </Button>
        <Button
          variant="secondary"
          className="gap-2"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate("reject")}
        >
          <X className="h-4 w-4" />
          Reject
        </Button>
      </div>
    </article>
  );
}
