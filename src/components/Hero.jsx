"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const HEADLINE_WORDS = ["Defending", "your", "rights", "with", "confidence."];

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const wordsWrapRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Parallax: background drifts as the hero scrolls out — tied directly
      // to scroll position (scrub), so it's naturally correct scrolling
      // either direction, not just a one-shot entrance.
      gsap.to(bgRef.current, {
        yPercent: 18,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const rest = [eyebrowRef.current, subRef.current, ctaRef.current];

      if (reduceMotion) {
        gsap.set(rest, { opacity: 1, y: 0 });
        gsap.set(wordsWrapRef.current.querySelectorAll(".hero-word"), { y: "0%" });
        return;
      }

      gsap.set(rest, { opacity: 0, y: 18 });
      gsap.set(wordsWrapRef.current.querySelectorAll(".hero-word"), { y: "110%" });
      gsap.set(bgRef.current, { scale: 1.08 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(wordsWrapRef.current.querySelectorAll(".hero-word"), {
          y: "0%",
          duration: 1,
          stagger: 0.08,
        })
          .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.7")
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to(bgRef.current, { scale: 1, duration: 1.4, ease: "power2.out" }, 0);
      };

      // Sync with the preloader (dispatches this once its curtain-reveal finishes).
      if (document.body.classList.contains("js-loading")) {
        window.addEventListener("preloader:done", play, { once: true });
      } else {
        play();
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden bg-ink text-fg">
      <div ref={bgRef} className="absolute inset-0 -top-[10%] h-[120%]">
        <PhotoPlaceholder
          label="Firm portrait — advocates in chambers"
          aspect="h-full"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-ink/70" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p ref={eyebrowRef} className="text-[0.68rem] uppercase tracking-[0.28em] text-sage">
          Kisii &middot; Advocates of the High Court of Kenya
        </p>

        <h1
          ref={wordsWrapRef}
          className="mt-5 max-w-4xl font-display text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="hero-word inline-block pr-[0.28em]">{word}</span>
            </span>
          ))}
        </h1>

        <p ref={subRef} className="mt-6 max-w-lg text-base leading-relaxed text-fg/75 sm:text-lg">
          25+ years of trusted legal representation. Herbert Nyamurongi, Sr.
          Advocate &amp; CEO, and the Nyamurongi &amp; Co. team.
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 bg-fg px-6 font-sans text-sm font-medium tracking-wide text-ink transition-colors hover:bg-paper"
          >
            Consult Us Today
            <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+254711205997"
            className="flex items-center gap-3 text-sm text-fg/80 hover:text-fg"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-fg/25">
              <Phone size={15} />
            </span>
            <span>
              Call Now
              <br />
              <strong className="font-sans font-medium text-fg">+254 711 205 997</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
