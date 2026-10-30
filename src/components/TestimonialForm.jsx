"use client";

import { useEffect, useRef, useState } from "react";
import { Star, CheckCircle2, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/lib/site-config";
import { HONEYPOT_FIELD } from "@/lib/forms";
import { TextField, TextAreaField, Honeypot } from "@/components/FormField";

const EMPTY = { fullName: "", email: "", companyName: "", companyWebsite: "", quote: "" };
const QUOTE_MAX = 1000;

/** Accessible 1-5 picker: a radio group with arrow-key support and a hover preview. */
function StarPicker({ value, onChange, invalid }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(5, (value || 0) + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(1, (value || 2) - 1));
    }
  };

  return (
    <div role="radiogroup" aria-label="Star rating" aria-required="true" onMouseLeave={() => setHover(0)}
      className={`-ml-1 flex gap-0.5 ${invalid ? "outline outline-1 outline-offset-4 outline-maroon" : ""}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          tabIndex={value === n || (!value && n === 1) ? 0 : -1}
          onClick={() => onChange(n)}
          onKeyDown={onKey}
          onMouseEnter={() => setHover(n)}
          className="p-1 transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-maroon"
        >
          <Star size={30} strokeWidth={1.5} className={n <= shown ? "fill-maroon text-maroon" : "text-ink/30"} />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialForm() {
  const [values, setValues] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const doneRef = useRef(null);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  useEffect(() => {
    if (status !== "sent" || !doneRef.current) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(doneRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
    doneRef.current.focus();
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!rating) {
      setError("Please choose a star rating.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, rating, [HONEYPOT_FIELD]: trap }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setValues(EMPTY);
      setRating(0);
      setStatus("sent");
    } catch (err) {
      // The old form showed "submitted" even when this failed. Now it only
      // says so when the server confirmed it.
      setError(
        err instanceof TypeError
          ? "We couldn't reach the server. Please check your connection and try again."
          : err.message
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="py-6 outline-none">
        <CheckCircle2 size={34} strokeWidth={1.5} className="text-maroon" />
        <h3 className="mt-5 font-display text-3xl sm:text-4xl">Thank you for your testimonial.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">
          We&rsquo;ve received it. It will be read by the chambers and published once approved. Your email address is never shown.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-ink/60 underline underline-offset-4 hover:text-maroon">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-3" aria-busy={status === "sending"}>
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <TextField id="fullName" label="Full name" required autoComplete="name" maxLength={100} value={values.fullName} onChange={set("fullName")} />
        <TextField id="email" label="Email (never shown)" type="email" required autoComplete="email" maxLength={254} value={values.email} onChange={set("email")} />
        <TextField id="companyName" label="Company (optional)" autoComplete="organization" maxLength={100} value={values.companyName} onChange={set("companyName")} />
        <TextField id="companyWebsite" label="Website (optional)" inputMode="url" maxLength={200} value={values.companyWebsite} onChange={set("companyWebsite")} />
      </div>

      <div>
        <TextAreaField id="quote" label="Your testimonial" required rows={5} maxLength={QUOTE_MAX} value={values.quote} onChange={set("quote")} />
        <p className="mt-1 text-right text-xs text-ink/45" aria-live="off">
          {values.quote.length}/{QUOTE_MAX}
        </p>
      </div>

      <div className="pt-2">
        <p className="mb-1 text-sm text-ink/70">
          Your rating <span aria-hidden="true">*</span>
        </p>
        <StarPicker value={rating} onChange={setRating} invalid={status === "error" && !rating} />
      </div>

      <Honeypot name={HONEYPOT_FIELD} value={trap} onChange={(e) => setTrap(e.target.value)} />

      {status === "error" && (
        <p role="alert" className="border border-maroon/30 bg-maroon/5 px-4 py-3 text-sm text-ink">
          {error}
          {rating > 0 && (
            <>
              {" "}You can also contact us on{" "}
              <a href={siteConfig.phone.href} className="underline underline-offset-4">
                {siteConfig.phone.value}
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="space-y-4 pt-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center gap-2 bg-ink px-7 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-maroon disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit testimonial"}
          <Send size={15} />
        </button>
        <p className="max-w-lg text-xs leading-relaxed text-ink/50">
          Please don&rsquo;t include details of your case. By submitting, you agree that your name, company and
          testimonial may be published on this website after review.
        </p>
      </div>
    </form>
  );
}
