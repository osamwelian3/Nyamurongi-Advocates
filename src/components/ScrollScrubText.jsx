"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * In-window scroll-scrubbed text reveal.
 *
 * Fixes the About page leadership text overlapping the next section:
 * paragraphs are placed inside a fixed aspect-ratio "window" (dual-mirroring
 * the sibling leadership portrait). The inner text block is taller than the
 * window and quietly overflows — but the parent has `overflow-hidden`, so
 * it is hard-clipped at the box edge at ALL times.
 *
 * As the visitor scrolls through the section, the inner block scrubs
 * vertically (GSAP + ScrollTrigger with `scrub: true`), revealing
 * paragraphs like a film strip through the window.
 *
 * Respects `prefers-reduced-motion` by showing all text statically.
 */
export default function ScrollScrubText({
  paragraphs = [],
  aspect = "4 / 5",
  className = "",
}) {
  const windowRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const windowEl = windowRef.current;
    const innerEl = innerRef.current;
    if (!windowEl || !innerEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(innerEl, { clearProps: "all" });
      return;
    }

    // Measure how far the inner text overflows its window.
    const getOverflow = () => {
      const windowH = windowEl.offsetHeight;
      const textH = innerEl.offsetHeight;
      return Math.max(textH - windowH, 0);
    };

    // Scrub the inner block upward through the window as the visitor scrolls.
    const tween = gsap.fromTo(
      innerEl,
      { y: 0 },
      {
        y: () => -getOverflow(),
        ease: "none",
        scrollTrigger: {
          trigger: windowEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      }
    );

    const onResize = () => tween.scrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [paragraphs]);

  return (
    <div
      ref={windowRef}
      style={{ aspectRatio: aspect }}
      className={`relative overflow-hidden ${className}`}
    >
      <div ref={innerRef} className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-slate">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}