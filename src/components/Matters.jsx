import Reveal from "@/components/Reveal";
import { matters } from "@/lib/data/matters";

export default function Matters() {
  return (
    <section className="bg-parchment py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-maroon">
            Selected record
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Matters on the public list.
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {matters.map((m) => (
            <Reveal key={m.title} as="li">
              <div className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink/45 sm:col-span-2">
                  {m.year}
                </p>
                <div className="sm:col-span-10">
                  <p className="font-display text-2xl">{m.title}</p>
                  <p className="mt-1 text-sm text-ink/45">{m.court}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
                    {m.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
