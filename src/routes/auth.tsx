import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/auth")({
  head: () => {
    const title = "Sign in — TEXITcoin";
    const description =
      "Sign in to the TEXITcoin writers' room review queue. Staff access only.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/screenplay-admin`,
      },
    });
    setBusy(false);
    if (otpError) {
      setError(otpError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-md px-6">
          <h1 className="font-display text-4xl font-bold">Sign in</h1>
          <p className="mt-3 text-muted-foreground">
            Staff access for the writers' room review queue. We'll email you a
            one-time login link — no password required.
          </p>

          {sent ? (
            <div className="mt-8 rounded-lg border border-border bg-card p-6">
              <MailCheck className="h-8 w-8 text-primary" />
              <h2 className="mt-4 font-display text-xl font-semibold">
                Check your inbox
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A magic link is on its way to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Open it on this device to finish signing in. The link expires
                shortly.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => setSent(false)}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@honest.money"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full gap-2" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Email me a login link
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
