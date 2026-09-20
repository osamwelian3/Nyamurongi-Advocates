"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ValueCard({ title, body, delay = 0 }) {
  const rootRef = useRef(null);
  const ruleRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(rootRef.current, { opacity: 1, y: 0 });
        gsap.set(ruleRef.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ruleRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          delay: delay + 0.15,
          ease: "power2.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={rootRef} className="relative pl-6">
      <span ref={ruleRef} className="absolute left-0 top-1 h-8 w-px bg-maroon" />
      <h2 className="font-display text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/75">{body}</p>
    </div>
  );
}
