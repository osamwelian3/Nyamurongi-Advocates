"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const wordmarkRef = useRef(null);
  const taglineRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("js-loading");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const finish = () => {
        document.body.classList.remove("js-loading");
        setDone(true);
        window.dispatchEvent(new Event("preloader:done"));
        // Layout shifted (page is now scrollable) — recalc ScrollTrigger
        // offsets so Step 5's scroll animations measure correctly.
        ScrollTrigger.refresh();
      };

      if (reduceMotion) {
        gsap.set(containerRef.current, { autoAlpha: 0 });
        finish();
        return;
      }

      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.set([wordmarkRef.current, taglineRef.current], {
        opacity: 0,
        y: 14,
      });

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
      })
        .to(
          wordmarkRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        )
        .to(
          taglineRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .to({}, { duration: 0.35 }) // brief hold
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        className="mb-6"
      >
        {/* Simple geometric monogram: diamond seal with an "N" stroke,
            drawn as one continuous path so a single dash-offset tween works. */}
        <path
          ref={pathRef}
          d="M36 4 L68 36 L36 68 L4 36 Z M22 50 L22 22 L50 50 L50 22"
          stroke="#8fa89a"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div
        ref={wordmarkRef}
        className="font-display text-2xl md:text-3xl tracking-wide text-fg"
      >
        Nyamurongi &amp; Co. Advocates
      </div>
      <div
        ref={taglineRef}
        className="mt-2 font-sans text-xs uppercase tracking-[0.28em] text-sage"
      >
        Advocates of the High Court of Kenya
      </div>
    </div>
  );
}
