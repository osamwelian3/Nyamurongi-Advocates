"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Counter({ value, suffix = "", duration = 1.6, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { n: 0 };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          // Re-counts from 0 every time it re-enters the viewport,
          // whether scrolling down into it or back up into it again.
          toggleActions: "restart reset restart reset",
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
