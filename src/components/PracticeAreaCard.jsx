"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { PracticeIcon } from "@/components/IconMap";

export default function PracticeAreaCard({ area }) {
  const cardRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  const setupQuickTo = () => {
    if (!cardRef.current) return;
    quickX.current =
      quickX.current || gsap.quickTo(cardRef.current, "rotateY", { duration: 0.4, ease: "power3.out" });
    quickY.current =
      quickY.current || gsap.quickTo(cardRef.current, "rotateX", { duration: 0.4, ease: "power3.out" });
  };

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    setupQuickTo();
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickX.current(px * 6);
    quickY.current(py * -6);
  };

  const handleMouseLeave = () => {
    setupQuickTo();
    quickX.current(0);
    quickY.current(0);
  };

  return (
    <Link
      href={`/practice-areas/${area.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="group flex h-full flex-col border border-ink/10 bg-parchment p-6 text-ink transition-colors duration-150 hover:border-ink/25 hover:bg-parchment-2 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <PracticeIcon name={area.icon} size={24} strokeWidth={1.5} className="text-maroon" />
        <ArrowUpRight
          size={17}
          strokeWidth={1.5}
          className="text-ink/40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <p className="mt-6 text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">
        {area.kicker}
      </p>
      <h3 className="mt-2 font-display text-2xl sm:text-3xl">{area.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{area.summary}</p>
    </Link>
  );
}
