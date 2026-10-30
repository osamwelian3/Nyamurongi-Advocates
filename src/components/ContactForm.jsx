"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/lib/site-config";
import { HONEYPOT_FIELD } from "@/lib/forms";
import { TextField, TextAreaField, Honeypot } from "@/components/FormField";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const doneRef = useRef(null);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  // Confirmation: animate in and move focus to it so screen-reader users hear it.
  useEffect(() => {
    if (status !== "sent" || !doneRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      gsap.fromTo(doneRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
    doneRef.current.focus();
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: trap }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setValues(EMPTY);
      setStatus("sent");
    } catch (err) {
      // Never report success unless the server said so.
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
        <h3 className="mt-5 font-display text-3xl sm:text-4xl">Thank you. Your message has been sent.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">
          A member of the chambers will reply to the email address you gave. If it is urgent, please call{" "}
          <a href={siteConfig.phone.href} className="underline underline-offset-4 hover:text-maroon">
            {siteConfig.phone.value}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-ink/60 underline underline-offset-4 hover:text-maroon"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-3" aria-busy={status === "sending"}>
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <TextField id="name" label="Your name" required autoComplete="name" maxLength={100} value={values.name} onChange={set("name")} />
        <TextField id="email" label="Your email" type="email" required autoComplete="email" maxLength={254} value={values.email} onChange={set("email")} />
      </div>
      <TextField id="subject" label="Subject" required maxLength={200} value={values.subject} onChange={set("subject")} />
      <TextAreaField id="message" label="Your message" rows={6} maxLength={5000} value={values.message} onChange={set("message")} />

      <Honeypot name={HONEYPOT_FIELD} value={trap} onChange={(e) => setTrap(e.target.value)} />

      {status === "error" && (
        <p role="alert" className="border border-maroon/30 bg-maroon/5 px-4 py-3 text-sm text-ink">
          {error}{" "}
          You can also call{" "}
          <a href={siteConfig.phone.href} className="underline underline-offset-4">
            {siteConfig.phone.value}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center gap-2 bg-ink px-7 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-maroon disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <Send size={15} />
        </button>
        <p className="text-xs text-ink/50">
          Please don&rsquo;t send confidential case details by this form; we&rsquo;ll ask for papers once we&rsquo;ve spoken.
        </p>
      </div>
    </form>
  );
}
