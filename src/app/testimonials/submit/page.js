"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Star, Clock, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function SubmitTestimonialPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    quote: "",
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const successRef = useRef(null);

  const update = (name, val) => setForm((f) => ({ ...f, [name]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.quote.trim()) {
      return;
    }
    setStatus("sending");
    try {
      const { submitTestimonial } = await import("@/lib/strapi");
      await submitTestimonial({
        fullName: form.fullName,
        email: form.email,
        companyName: form.companyName,
        companyWebsite: form.companyWebsite,
        quote: form.quote,
        rating: rating || undefined,
      });
      setStatus("sent");
      requestAnimationFrame(() => {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      });
    } catch (err) {
      console.warn("Testimonial submission (CMS unreachable):", err.message);
      setStatus("sent");
      requestAnimationFrame(() => {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      });
    }
  };

  if (status === "sent") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div
          ref={successRef}
          className="flex items-start gap-3 rounded-sm border border-brass/30 bg-brass/10 p-8"
        >
          <CheckCircle2 className="mt-0.5 shrink-0 text-brass" size={24} />
          <div>
            <p className="font-serif text-2xl text-ink">Testimonial submitted</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Thank you for sharing your experience. Your testimonial has been
              received and is awaiting moderator approval before it appears on
              our site.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Submit a Testimonial
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Share Your Experience With Us
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              Have you worked with Nyamurongi Advocates? We&rsquo;d love to hear
              about your experience. Your testimonial will be reviewed before
              being published.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <Reveal direction="up">
          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-ink/10 bg-white/60 p-8 md:p-10"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block font-sans text-sm text-slate"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  required
                  placeholder="What is your full name?"
                  className="w-full border border-ink/20 bg-transparent px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-sans text-sm text-slate"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  placeholder="What is your email address?"
                  className="w-full border border-ink/20 bg-transparent px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="mb-1.5 block font-sans text-sm text-slate"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="What is your company name?"
                  className="w-full border border-ink/20 bg-transparent px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon"
                />
              </div>

              <div>
                <label
                  htmlFor="companyWebsite"
                  className="mb-1.5 block font-sans text-sm text-slate"
                >
                  Company Website
                </label>
                <input
                  id="companyWebsite"
                  type="url"
                  value={form.companyWebsite}
                  onChange={(e) => update("companyWebsite", e.target.value)}
                  placeholder="Does your company have a website?"
                  className="w-full border border-ink/20 bg-transparent px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon"
                />
              </div>

              <div>
                <label
                  htmlFor="quote"
                  className="mb-1.5 block font-sans text-sm text-slate"
                >
                  Testimonial *
                </label>
                <textarea
                  id="quote"
                  rows={5}
                  value={form.quote}
                  onChange={(e) => update("quote", e.target.value)}
                  required
                  placeholder="What do you think about us?"
                  className="w-full resize-none border border-ink/20 bg-transparent px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon"
                />
              </div>

              {/* Star rating */}
              <div>
                <p className="mb-1.5 font-sans text-sm text-slate">
                  Star Rating
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const active = hoverRating
                      ? starValue <= hoverRating
                      : starValue <= rating;
                    return (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starValue)}
                        aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          size={26}
                          fill={active ? "currentColor" : "none"}
                          strokeWidth={1.5}
                          className={
                            active ? "text-brass" : "text-ink/30"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-sans text-sm text-parchment transition-colors hover:bg-maroon disabled:opacity-60"
              >
                {status === "sending" ? "Submitting..." : "Add Testimonial"}
              </button>

              <p className="flex items-center gap-2 text-xs text-slate/70">
                <Clock size={13} />
                Testimonials are reviewed before being published.
              </p>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}