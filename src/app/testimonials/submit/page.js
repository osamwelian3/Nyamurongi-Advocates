import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TestimonialForm from "@/components/TestimonialForm";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `Submit a testimonial | ${firm.name}`,
  description: `Tell us about your experience with ${firm.name}.`,
};

export default function SubmitTestimonialPage() {
  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Share your experience"
        title="Tell us how we did."
        lede="Testimonials are read by the chambers and published once approved."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="border border-ink/10 bg-parchment-2/40 p-6 sm:p-10">
            <TestimonialForm />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
