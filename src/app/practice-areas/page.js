import PageHero from "@/components/PageHero";
import PracticeAreaRow from "@/components/PracticeAreaRow";
import { practiceAreas } from "@/lib/data/practiceAreas";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `Expertise | ${firm.name}`,
  description:
    "Six working divisions at Nyamurongi & Company Advocates: litigation, probate, conveyancing, commercial & corporate, employment, and land.",
};

export default function PracticeAreasIndex() {
  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Expertise"
        title="Our working divisions."
        lede="Litigation, probate, conveyancing and commercial — with employment and land as the files that keep those divisions honest."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10">
          {practiceAreas.map((area, i) => (
            <PracticeAreaRow key={area.slug} area={area} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
