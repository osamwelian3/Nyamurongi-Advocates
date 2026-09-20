"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

/**
 * Reusable hero for every inner page (Practice Areas, Team, About, Blog,
 * Contact...). Same word-mask reveal technique as the homepage Hero, so
 * the site feels like one system rather than a homepage plus afterthoughts.
 *
 * tone="ink" (dark, default) or "paper" (light) — matches the alternating
 * section rhythm established on the homepage.
 */
export default function PageHero({
  kicker,
  title,
  lede,
  image,
  tone = "ink",
  children,
}) {
  const rootRef = useRef(null);
  const wordsWrapRef = useRef(null);
  const restRefs = useRef([]);
  restRefs.current = [];

  const addRestRef = (el) => {
    if (el && !restRefs.current.includes(el)) restRefs.current.push(el);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = wordsWrapRef.current?.querySelectorAll(".hero-word") ?? [];

      if (reduceMotion) {
        gsap.set(words, { y: "0%" });
        gsap.set(restRefs.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(words, { y: "110%" });
      gsap.set(restRefs.current, { opacity: 0, y: 16 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(words, { y: "0%", duration: 0.9, stagger: 0.05 }).to(
          restRefs.current,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.55"
        );
      };

      // Only wait on the preloader when it's actually still running (a hard
      // refresh on this route). Client-side navigation from another page
      // never sets js-loading, so this plays immediately as expected.
      if (document.body.classList.contains("js-loading")) {
        window.addEventListener("preloader:done", play, { once: true });
      } else {
        play();
      }
    }, rootRef);

    return () => ctx.revert();
  }, [title]);

  const ink = tone === "ink";

  return (
    <section
      ref={rootRef}
      className={`relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 ${
        ink ? "bg-ink text-parchment" : "bg-parchment text-ink"
      }`}
    >
      {image && (
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <PhotoPlaceholder aspect="h-full" className="h-full w-full" />
        </div>
      )}
      {image && (
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${
            ink ? "from-ink/40 via-ink/70 to-ink" : "from-parchment/30 via-parchment/75 to-parchment"
          }`}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {kicker && (
          <p
            ref={addRestRef}
            className={`text-[0.68rem] uppercase tracking-[0.28em] ${ink ? "text-brass" : "text-maroon"}`}
          >
            {kicker}
          </p>
        )}

        <h1
          ref={wordsWrapRef}
          className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl"
        >
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="hero-word inline-block pr-[0.28em]">{word}</span>
            </span>
          ))}
        </h1>

        {lede && (
          <p
            ref={addRestRef}
            className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
              ink ? "text-parchment/75" : "text-ink/75"
            }`}
          >
            {lede}
          </p>
        )}

        {children && (
          <div ref={addRestRef} className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
