"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap } from "@/lib/gsap";

/**
 * Read-only star rating. Stars pop in one after another when the card
 * scrolls into view, and again every time it re-enters (down, back up, down
 * again) — same repeat-on-every-pass behaviour as the rest of the site.
 */
export default function StarRating({ rating, size = 16 }) {
  const rootRef = useRef(null);
  const value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

  useEffect(() => {
    const root = rootRef.current;
    if (!root || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-star]"),
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(2.2)",
          transformOrigin: "50% 50%",
          scrollTrigger: { trigger: root, start: "top 92%", toggleActions: "play reverse play reverse" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [value]);

  if (value === 0) return null;

  return (
    <div ref={rootRef} role="img" aria-label={`Rated ${value} out of 5`} className="flex gap-0.5 text-maroon">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          data-star
          size={size}
          strokeWidth={1.5}
          className={n <= value ? "fill-current" : "text-ink/25"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
