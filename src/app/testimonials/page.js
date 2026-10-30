import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { getApprovedTestimonials } from "@/lib/strapi";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `Testimonials | ${firm.name}`,
  description: `What clients say about ${firm.name}.`,
};

// Re-read Strapi on every request so a newly approved testimonial appears
// without a rebuild.
export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  let items = [];
  let failed = false;
  try {
    const res = await getApprovedTestimonials();
    items = res.data ?? [];
  } catch (err) {
    failed = true;
    console.error("[testimonials] could not load approved testimonials:", err.message);
  }

  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Client reviews"
        title="What our clients say."
        lede="Reliable, professional, results-driven legal services, described in our clients' own words."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {failed && (
          <Reveal className="max-w-xl">
            <p className="font-display text-2xl">We couldn&rsquo;t load the testimonials just now.</p>
            <p className="mt-2 text-sm text-ink/65">Please try again in a little while.</p>
          </Reveal>
        )}

        {/* No placeholder/dummy reviews, ever: an empty list is shown honestly. */}
        {!failed && items.length === 0 && (
          <Reveal className="max-w-xl">
            <p className="font-display text-2xl">Client testimonials will appear here.</p>
            <p className="mt-2 text-sm text-ink/65">
              Have you worked with us? We&rsquo;d be glad to hear how it went.
            </p>
          </Reveal>
        )}

        {items.length > 0 && (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <Reveal key={item.documentId} delay={Math.min(i * 0.05, 0.3)} className="mb-6 break-inside-avoid">
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="bg-ink px-5 py-20 text-parchment sm:px-8">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brass">Share your experience</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl">Worked with the chambers?</h2>
          </div>
          <Link
            href="/testimonials/submit"
            className="inline-flex h-12 items-center gap-2 bg-parchment px-6 font-sans text-sm font-medium tracking-wide text-ink transition-colors hover:bg-parchment-2"
          >
            Write a testimonial <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
