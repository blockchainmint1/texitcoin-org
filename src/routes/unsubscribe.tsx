import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [
      { title: "Unsubscribe — TEXITcoin" },
      { name: "description", content: "Manage your TEXITcoin email subscription." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnsubscribePage,
});

type Phase = "checking" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

function UnsubscribePage() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [token, setToken] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") ?? "";
    setToken(t);
    if (!t) {
      setPhase("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`);
        const data = await res.json();
        if (!res.ok) {
          setPhase("invalid");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setPhase("already");
          return;
        }
        setPhase("ready");
      } catch {
        setPhase("error");
        setErrorMsg("Couldn't reach the server. Try again.");
      }
    })();
  }, []);

  async function confirm() {
    setPhase("submitting");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPhase("error");
        setErrorMsg(data.error ?? "Something went wrong.");
        return;
      }
      if (data.success || data.reason === "already_unsubscribed") {
        setPhase("done");
        return;
      }
      setPhase("error");
      setErrorMsg("Unexpected response.");
    } catch {
      setPhase("error");
      setErrorMsg("Couldn't reach the server. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-xl px-6 py-32">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Email preferences
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold">Unsubscribe</h1>

          {phase === "checking" && (
            <p className="mt-4 text-muted-foreground">Checking your link…</p>
          )}

          {phase === "invalid" && (
            <p className="mt-4 text-muted-foreground">
              This unsubscribe link is invalid or has expired. If you keep getting
              emails you don't want, reply to any of them and we'll take you off
              by hand.
            </p>
          )}

          {phase === "already" && (
            <p className="mt-4 text-muted-foreground">
              You're already unsubscribed. We won't email you again.
            </p>
          )}

          {phase === "ready" && (
            <>
              <p className="mt-4 text-muted-foreground">
                Click below to stop receiving emails from TEXITcoin. No hard
                feelings.
              </p>
              <button
                type="button"
                onClick={confirm}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-red-gradient px-6 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110"
              >
                Confirm unsubscribe
              </button>
            </>
          )}

          {phase === "submitting" && (
            <p className="mt-4 text-muted-foreground">Processing…</p>
          )}

          {phase === "done" && (
            <p className="mt-4 text-muted-foreground">
              Done. You've been removed from the list. Sorry to see you go — the
              door's always open at{" "}
              <a href="/" className="text-primary underline-offset-2 hover:underline">
                texitcoin.org
              </a>
              .
            </p>
          )}

          {phase === "error" && (
            <p className="mt-4 text-destructive">{errorMsg}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
