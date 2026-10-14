"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Logo from "@/components/Logo";

/**
 * Splash screen. Same skeleton as before — scroll lock while it plays,
 * a `preloader:done` event the page heroes wait on, a reduced-motion
 * bypass, and a curtain that rises to reveal the page — but the
 * choreography now builds the designer's actual logo, piece by piece:
 *
 *   1. maroon block rises from its base
 *   2. the white N strokes draw downward, one after another
 *   3. the teal shadow slides in behind them, then a glint crosses the mark
 *   4. NYAMURONGI / ADVOCATES rise letter by letter
 *   5. tagline settles in (tracking tightens), whole lockup pushes in slowly
 *   6. hold, then the ink curtain lifts with a maroon edge trailing it
 */
export default function Preloader() {
  const inkRef = useRef(null);
  const edgeRef = useRef(null);
  const lockupRef = useRef(null);
  const glintRef = useRef(null);
  const taglineRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("js-loading");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const finish = () => {
        document.body.classList.remove("js-loading");
        setDone(true);
        // Page just became scrollable — re-measure every ScrollTrigger.
        ScrollTrigger.refresh();
        // Page heroes wait for this so their entrance plays after the curtain, not under it.
        window.dispatchEvent(new Event("preloader:done"));
      };

      if (reduceMotion) {
        gsap.set([inkRef.current, edgeRef.current], { autoAlpha: 0 });
        finish();
        return;
      }

      const q = (sel) => lockupRef.current.querySelectorAll(sel);
      const block = q('[data-part="block"]');
      const whites = q('[data-part="white"]');
      const teals = q('[data-part="teal"]');
      const topLetters = q('[data-part="letter"][data-row="top"]');
      const bottomLetters = q('[data-part="letter"][data-row="bottom"]');

      // Initial states, set before the lockup is revealed (no flash of the finished logo).
      gsap.set(block, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(whites, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(teals, { x: -7, opacity: 0 });
      gsap.set([topLetters, bottomLetters], { y: 16, opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 8, letterSpacing: "0.5em" });
      gsap.set(glintRef.current, { xPercent: 0, skewX: -18 });
      gsap.set(lockupRef.current, { autoAlpha: 1, scale: 1.07 });

      const tl = gsap.timeline({ onComplete: finish });

      // slow cinematic push-in across the whole sequence
      tl.to(lockupRef.current, { scale: 1, duration: 3.6, ease: "power2.out" }, 0);

      tl.to(block, { scaleY: 1, duration: 0.8, ease: "expo.out" }, 0.15)
        .to(whites, { scaleY: 1, duration: 0.85, stagger: 0.16, ease: "power3.inOut" }, 0.55)
        .to(teals, { x: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power2.out" }, 1.15)
        .to(glintRef.current, { xPercent: 440, duration: 0.9, ease: "power2.inOut" }, 1.4)
        .to(topLetters, { y: 0, opacity: 1, duration: 0.7, stagger: 0.045, ease: "power3.out" }, 1.15)
        .to(bottomLetters, { y: 0, opacity: 1, duration: 0.7, stagger: 0.045, ease: "power3.out" }, 1.5)
        .to(
          taglineRef.current,
          { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.9, ease: "power3.out" },
          2.1
        );

      // hold, then lift: ink curtain first, maroon edge a beat behind it
      tl.addLabel("exit", "+=0.45")
        .to(lockupRef.current, { y: -40, opacity: 0, duration: 0.6, ease: "power2.in" }, "exit")
        .to(inkRef.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "exit+=0.1")
        .to(edgeRef.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "exit+=0.26");
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <>
      {/* maroon edge — sits behind the ink panel and trails it on the way up */}
      <div ref={edgeRef} className="fixed inset-0 z-[99] bg-[#97163D]" aria-hidden="true" />

      <div
        ref={inkRef}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6"
        aria-hidden="true"
      >
        {/* invisible until initial animation states are applied */}
        <div ref={lockupRef} className="invisible flex w-[min(80vw,540px)] flex-col items-center will-change-transform">
          <div className="relative w-full">
            <Logo variant="reversed" className="block h-auto w-full" />
            {/* glint, clipped to the mark's footprint (left ~29% of the lockup) */}
            <span
              className="pointer-events-none absolute overflow-hidden"
              style={{ left: "0.14%", top: "0.65%", width: "29.05%", height: "98.7%" }}
            >
              <span
                ref={glintRef}
                className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              />
            </span>
          </div>

          <p
            ref={taglineRef}
            className="mt-8 text-center font-sans text-[0.6rem] uppercase text-parchment/60 sm:text-[0.68rem]"
          >
            Advocates. Commissioners for Oaths. Notaries Public
          </p>
        </div>
      </div>
    </>
  );
}
