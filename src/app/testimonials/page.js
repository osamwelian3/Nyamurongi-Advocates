import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import Reveal from "@/components/Reveal";

export default function TestimonialsPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Testimonials
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              What Our Clients Say
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              We take pride in delivering reliable, professional, and
              results-driven legal services. Hear directly from our clients as
              they share their experiences working with Nyamurongi Advocates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS GRID ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} direction="up" delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col rounded-sm border border-ink/10 bg-white/60 p-7">
                <div className="flex gap-0.5 text-brass">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={15}
                      fill={si < t.rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="mt-5 flex-1 font-serif text-[15px] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-5 text-sm text-slate">{t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              href="/testimonials/submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-sans text-sm text-parchment transition-colors hover:bg-maroon"
            >
              Submit a Testimonial
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}