import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { getPracticeAreaBySlug, practiceAreas } from "@/lib/data/practiceAreas";
import { PracticeIcon } from "@/components/IconMap";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }) {
  const area = getPracticeAreaBySlug(params.slug);
  if (!area) return { title: "Practice Area Not Found" };
  return {
    title: `${area.title} | Nyamurongi & Co. Advocates`,
    description: area.summary,
  };
}

export default function PracticeAreaPage({ params }) {
  const area = getPracticeAreaBySlug(params.slug);
  if (!area) notFound();

  const others = practiceAreas.filter((a) => a.slug !== area.slug).slice(0, 3);

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-1.5 text-sm text-brass transition-colors hover:text-parchment"
            >
              <ArrowRight size={14} className="rotate-180" />
              All Services
            </Link>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="mt-6 flex items-center gap-4">
              <PracticeIcon
                name={area.icon}
                size={36}
                strokeWidth={1.5}
                className="text-brass"
              />
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                {area.title}
              </h1>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-parchment/70">
              {area.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal direction="left">
            <div>
              <h2 className="font-serif text-3xl text-ink">Overview</h2>
              <p className="mt-5 leading-relaxed text-slate">{area.intro}</p>
              <p className="mt-4 leading-relaxed text-slate">{area.closing}</p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="rounded-sm bg-ink p-8 text-parchment">
              <h3 className="font-serif text-xl">Need Legal Support?</h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                Our team is ready to help you navigate this area of law with
                confidence.
              </p>
              <a
                href="tel:+254711205997"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-sans text-sm text-ink transition-colors hover:bg-parchment"
              >
                <Phone size={15} />
                +254 711 205 997
              </a>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3 font-sans text-sm text-parchment transition-colors hover:border-parchment hover:bg-parchment/10"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT IT COVERS ============ */}
      <section className="bg-white/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="up">
            <h2 className="font-serif text-3xl text-ink">What It Covers</h2>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {area.coverage.map((group, gi) => (
              <Reveal key={group.group} direction="up" delay={gi * 0.1}>
                <div>
                  <h3 className="font-serif text-xl text-ink">{group.group}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-brass"
                        />
                        <span className="text-sm leading-relaxed text-slate">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXAMPLE SITUATIONS ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal direction="up">
          <h2 className="font-serif text-3xl text-ink">Example Situations</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {area.exampleSituations.map((situation, i) => (
            <Reveal key={situation} direction="up" delay={i * 0.1}>
              <div className="h-full rounded-sm border border-ink/10 bg-white/60 p-6">
                <span className="font-serif text-3xl text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {situation}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ OTHER PRACTICE AREAS ============ */}
      <section className="bg-ink py-20 text-parchment">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="up">
            <h2 className="font-serif text-3xl">Explore Other Services</h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} direction="up" delay={i * 0.08}>
                <Link
                  href={`/practice-areas/${other.slug}`}
                  className="group flex items-center justify-between border border-parchment/10 p-5 transition-colors hover:border-brass/50"
                >
                  <span className="font-serif text-lg text-parchment transition-colors group-hover:text-brass">
                    {other.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-brass transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}