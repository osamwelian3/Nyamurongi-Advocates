"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function TeamMemberCard({ member }) {
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
    quickX.current(px * 4);
    quickY.current(py * -4);
  };

  const handleMouseLeave = () => {
    setupQuickTo();
    quickX.current(0);
    quickY.current(0);
  };

  return (
    <Link
      href={`/team/${member.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="group block border border-ink/10 bg-parchment p-7 transition-colors duration-150 hover:bg-parchment-2 sm:p-10"
    >
      <div className="flex size-20 items-end justify-start bg-ink text-parchment">
        <span className="p-3 font-display text-3xl leading-none">{member.initials}</span>
      </div>
      <h2 className="mt-8 font-display text-3xl group-hover:text-maroon">{member.name}</h2>
      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink/45">{member.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink/75">{member.bio[0]}</p>
      <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-maroon">
        {member.focus.join(" · ")}
      </p>
    </Link>
  );
}
