import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WAITLIST_ENDPOINT = "https://api.getmeridianmarkets.com/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong. Please try again, or email us at hello@getmeridianmarkets.com.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl border border-gain/30 bg-gain-soft px-6 py-5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gain/20">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gain" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-left text-sm font-medium text-ink">
          You&rsquo;re on the list. We&rsquo;ll be in touch.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setError(null);
            }
          }}
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          className="h-12 flex-1 rounded-lg border border-rule-strong bg-paper/70 px-4 text-sm text-ink placeholder:text-ink-3 outline-none backdrop-blur transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-on-accent transition-all hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-accent/40 border-t-on-accent" />
              Joining…
            </>
          ) : (
            "Join waitlist"
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "error" && error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-left text-sm text-loss"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 text-xs text-ink-3">
        No spam. We&rsquo;ll only email you about your beta access.
      </p>
    </form>
  );
}
