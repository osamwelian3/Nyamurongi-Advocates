"use client";

import { useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function TestimonialCarousel({ testimonials }) {
  const trackRef = useRef(null);
  const draggableRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const bounds = () => {
      const overflow = track.scrollWidth - track.parentElement.offsetWidth;
      return { minX: -Math.max(overflow, 0), maxX: 0 };
    };

    const [instance] = Draggable.create(track, {
      type: "x",
      inertia: false, // free tier: plain bounded drag, no InertiaPlugin dependency
      bounds: bounds(),
      edgeResistance: 0.65,
      cursor: "grab",
      activeCursor: "grabbing",
    });
    draggableRef.current = instance;

    const onResize = () => instance.applyBounds(bounds());
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      instance.kill();
    };
  }, [testimonials]);

  const nudge = (dir) => {
    const instance = draggableRef.current;
    if (!instance) return;
    const target = gsap.utils.clamp(
      instance.minX,
      instance.maxX,
      instance.x + dir * 360
    );
    gsap.to(trackRef.current, {
      x: target,
      duration: 0.5,
      ease: "power3.out",
      onUpdate: () => instance.update(),
    });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[300px] shrink-0 select-none border border-fg/10 bg-panel p-6"
            >
              <div className="flex gap-0.5 text-sage">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < t.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-4 font-display text-[17px] leading-relaxed text-fg">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm text-muted">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => nudge(1)}
          aria-label="Previous testimonial"
          className="border border-fg/15 p-2 text-fg transition-colors hover:border-sage hover:text-sage"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => nudge(-1)}
          aria-label="Next testimonial"
          className="border border-fg/15 p-2 text-fg transition-colors hover:border-sage hover:text-sage"
        >
          <ChevronRight size={18} />
        </button>
        <span className="ml-2 text-xs text-muted">Drag to browse &rarr;</span>
      </div>
    </div>
  );
}
