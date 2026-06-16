import { useEffect, useState } from "react";
import { ArrowRight, Check, Calendar, Video, Copy } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

const emailSchema = z
  .string()
  .trim()
  .min(5, "That doesn't look like an email")
  .max(254, "Too long")
  .email("That doesn't look like an email");

const ZOOM_LINK = "https://zoom.us/j/95305973167";
const UNLOCK_KEY = "txc_zoom_unlocked";

export function ZoomRegister({ source = "zoom" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  function unlock() {
    setUnlocked(true);
    try {
      window.localStorage.setItem(UNLOCK_KEY, "1");
    } catch {}
  }

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
        setMessage("You're already on the list — link unlocked below.");
        unlock();
        return;
      }
      setStatus("error");
      setMessage("Something went sideways. Try again in a moment.");
      return;
    }

    setStatus("ok");
    setMessage("You're in. Link unlocked below — see you Thursday.");
    setEmail("");
    unlock();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(ZOOM_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div id="zoom-register" className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        <Calendar className="h-4 w-4" /> Register for the live call
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl text-balance">
        Get the Zoom link, every Thursday.
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Drop your email and we'll unlock the recurring Honest Money Hour link —
        same link every week, 7pm Central. No spam. Unsubscribe any time.
      </p>

      {!unlocked && (
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
                Registered <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Unlock link
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      )}

      {message && !unlocked && (
        <p
          className={`mt-3 text-xs ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}

      {unlocked && (
        <div className="mt-5 rounded-xl border border-primary/40 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Video className="h-3.5 w-3.5" /> Your Zoom link
          </div>
          <a
            href={ZOOM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block break-all font-mono text-sm font-semibold text-foreground hover:text-primary"
          >
            {ZOOM_LINK}
          </a>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={ZOOM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-1 rounded-md bg-red-gradient px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground"
            >
              Join Thursday <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-border bg-background px-4 text-xs font-semibold uppercase tracking-wider hover:border-primary/50"
            >
              {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Recurring every Thursday at 7:00pm Central. Same link, every week.
          </p>
        </div>
      )}
    </div>
  );
}
