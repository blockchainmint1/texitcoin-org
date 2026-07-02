import { useState } from "react";
import { ArrowRight, Check, BellRing } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

const emailSchema = z
  .string()
  .trim()
  .min(5, "That doesn't look like an email")
  .max(254, "Too long")
  .email("That doesn't look like an email");

/**
 * "ZoomRegister" is a legacy name — the panel is now a live-reminder signup.
 * The route file still imports it under this name; the export is kept stable.
 */
export function ZoomRegister({ source = "live-reminder" }: { source?: string }) {
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
      .insert({ email: parsed.data.toLowerCase(), source });

    if (error) {
      if (error.code === "23505") {
        setStatus("ok");
        setMessage("You're already on the list — we'll ping you Thursday.");
        return;
      }
      setStatus("error");
      setMessage("Something went sideways. Try again in a moment.");
      return;
    }

    setStatus("ok");
    setMessage("You're in. Reminder heads out about an hour before we go live.");
    setEmail("");
  }

  return (
    <div
      id="live-reminder"
      className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
    >
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        <BellRing className="h-4 w-4" /> Don't miss the live call
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl text-balance">
        Get a heads-up every Thursday.
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We'll email you about an hour before the Honest Money Hour kicks off,
        with a link to watch on streamTXC, X, YouTube, or Facebook. No spam.
        Unsubscribe any time.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row" noValidate>
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
              You're in <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Remind me
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-xs ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  );
}
