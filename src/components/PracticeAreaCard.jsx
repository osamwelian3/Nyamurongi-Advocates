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
      className="group flex h-full flex-col border border-rule bg-paper p-6 text-charcoal transition-colors duration-150 hover:border-charcoal/30 hover:bg-paper-2 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <PracticeIcon name={area.icon} size={26} strokeWidth={1.5} className="text-sage-deep" />
        <ArrowUpRight
          size={17}
          strokeWidth={1.5}
          className="text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl sm:text-3xl">{area.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/75">{area.summary}</p>
    </Link>
  );
}
