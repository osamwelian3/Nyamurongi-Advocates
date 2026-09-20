import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ValueCard from "@/components/ValueCard";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `The Firm | ${firm.name}`,
  description: firm.blurb,
};

export default function About() {
  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="The Firm"
        title="A chambers for the long matter."
        lede={firm.blurb}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {firm.about.map((p, i) => (
              <p key={i} className="mt-5 text-base leading-relaxed first:mt-0 sm:text-lg">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <dl className="space-y-6 border-t border-ink/10 pt-6">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-ink/45">Seat</dt>
                <dd className="mt-1 text-sm">
                  {firm.address.line1}, {firm.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-ink/45">Hours</dt>
                <dd className="mt-1 text-sm">{firm.hours}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-ink/45">On the list</dt>
                <dd className="mt-1 text-sm">
                  Public record from 2008. Chambers listing from 2013.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3 sm:px-8 sm:py-20">
          {firm.values.map((v, i) => (
            <ValueCard key={v.title} title={v.title} body={v.body} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-maroon">Counsel</p>
            <h2 className="mt-2 font-display text-4xl">The people who keep the file.</h2>
          </div>
          <Link
            href="/team"
            className="inline-flex h-12 items-center gap-2 bg-ink px-6 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-elevated"
          >
            Meet Counsel
            <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden" delay={0.1}>
          <div className="group">
            <PhotoPlaceholder
              label="Stone colonnade in late light"
              aspect="aspect-[16/8]"
              className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
