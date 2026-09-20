"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { PracticeIcon } from "@/components/IconMap";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

export default function PracticeAreaRow({ area, index }) {
  const rowRef = useRef(null);
  const ruleRef = useRef(null);
  const imageWrapRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(row, { opacity: 1, y: 0 });
        gsap.set(ruleRef.current, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        row,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // The hairline rule under the number draws itself in, independently
      // timed from the row fade, and — like the fade — replays every pass.
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const setupQuickTo = () => {
    if (!imageWrapRef.current) return;
    quickX.current =
      quickX.current || gsap.quickTo(imageWrapRef.current, "xPercent", { duration: 0.6, ease: "power3.out" });
    quickY.current =
      quickY.current || gsap.quickTo(imageWrapRef.current, "yPercent", { duration: 0.6, ease: "power3.out" });
  };

  const handleMouseMove = (e) => {
    const el = imageWrapRef.current;
    if (!el) return;
    setupQuickTo();
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickX.current(px * 4);
    quickY.current(py * 4);
  };

  const handleMouseLeave = () => {
    setupQuickTo();
    quickX.current(0);
    quickY.current(0);
  };

  return (
    <div ref={rowRef} className="border-b border-ink/10 pb-10 last:border-b-0">
      <Link
        href={`/practice-areas/${area.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group grid items-stretch gap-6 lg:grid-cols-12"
      >
        <div className="overflow-hidden lg:col-span-5">
          <div ref={imageWrapRef} className="aspect-[4/3] w-full scale-110">
            <PhotoPlaceholder
              label={area.title}
              aspect="aspect-[4/3]"
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-3">
            <PracticeIcon name={area.icon} size={18} strokeWidth={1.5} className="text-maroon" />
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">
              {String(index + 1).padStart(2, "0")} &middot; {area.kicker}
            </p>
          </div>
          <span ref={ruleRef} className="mt-3 block h-px w-16 bg-maroon/40" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl group-hover:text-maroon">
            {area.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">{area.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink/60 group-hover:text-maroon">
            Read the division
            <ArrowUpRight
              size={15}
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </div>
  );
}
