import { practiceAreas } from "@/lib/data/practiceAreas";
import Reveal from "@/components/Reveal";
import PracticeAreaCard from "@/components/PracticeAreaCard";

export default function PracticeAreasPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Our Services
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Our Legal Services for You
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              At Nyamurongi & Co. Advocates, we offer the following legal
              services.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ PRACTICE AREAS GRID ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.slug} direction="up" delay={(i % 3) * 0.08}>
              <PracticeAreaCard area={area} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}