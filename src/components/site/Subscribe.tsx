import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

const emailSchema = z
  .string()
  .trim()
  .min(5, "That doesn't look like an email")
  .max(254, "Too long")
  .email("That doesn't look like an email");

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setStatus("loading");
    setMessage("");

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase(), source: "footer" });

    if (error) {
      // Treat duplicate as success — they're already in
      if (error.code === "23505") {
        setStatus("ok");
        setMessage("You're already on the list. Welcome back.");
        return;
      }
      setStatus("error");
      setMessage("Something went sideways. Try again in a moment.");
      return;
    }

    setStatus("ok");
    setMessage("You're in. Watch your inbox.");
    setEmail("");
  }

  return (
    <section className="relative border-t border-border bg-surface/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 shadow-card">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <Mail className="h-4 w-4" /> Stay in the loop
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl text-balance">
                Honest updates. <span className="text-primary">No spam.</span>
              </h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                Drop in your email and we&apos;ll send you new posts, network
                milestones, and the occasional Bobby rant. Unsubscribe any time.
              </p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  placeholder="you@yourdomain.com"
                  aria-label="Email address"
                  className="h-12 flex-1 bg-background"
                  disabled={status === "loading"}
                  maxLength={254}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-red-gradient px-6 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:brightness-110 transition disabled:opacity-60"
                >
                  {status === "ok" ? (
                    <>
                      Subscribed <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
              {message && (
                <p
                  className={`text-xs ${
                    status === "error" ? "text-destructive" : "text-muted-foreground"
                  }`}
                  role={status === "error" ? "alert" : "status"}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
