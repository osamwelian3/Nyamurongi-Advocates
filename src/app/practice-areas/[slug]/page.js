import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import HoverUnderlineItem from "@/components/HoverUnderlineItem";
import { practiceAreas, getPracticeArea } from "@/lib/data/practiceAreas";
import { firm } from "@/lib/data/firm";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }) {
  const area = getPracticeArea(params.slug);
  if (!area) return {};
  return {
    title: `${area.title} | ${firm.name}`,
    description: area.summary,
  };
}

export default function PracticeAreaDetail({ params }) {
  const area = getPracticeArea(params.slug);
  if (!area) notFound();

  const others = practiceAreas.filter((p) => p.slug !== area.slug).slice(0, 3);

  return (
    <main className="bg-parchment text-ink">
      <PageHero tone="ink" image kicker={area.kicker} title={area.title} lede={area.summary}>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center gap-2 bg-parchment px-6 font-sans text-sm font-medium tracking-wide text-ink transition-colors hover:bg-parchment-2"
        >
          Instruct This Division
          <ArrowRight size={16} />
        </Link>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          {area.body.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed first:mt-0 sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">Typical work</p>
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {area.work.map((item, i) => (
              <HoverUnderlineItem key={item} index={i}>
                {item}
              </HoverUnderlineItem>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-ink/10 bg-parchment-2 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-3xl">Other divisions</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/practice-areas/${p.slug}`} className="block hover:text-maroon">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-ink/45">{p.kicker}</p>
                  <p className="mt-2 font-display text-2xl">{p.title}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
