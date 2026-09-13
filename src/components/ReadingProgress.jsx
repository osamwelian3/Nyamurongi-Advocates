"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ReadingProgress({ targetId }) {
  const barRef = useRef(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [targetId]);

  return (
    <div className="sticky top-[64px] z-40 h-[3px] w-full bg-ink/5">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-brass"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
