import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import CtaBanner from "@/components/CtaBanner";
import { practiceAreas } from "@/lib/data/practiceAreas";
import { teamMembers, firmStats } from "@/lib/data/team";
import { testimonials } from "@/lib/data/testimonials";
import { blogPosts } from "@/lib/data/blog";

export default function Home() {
  const herbert = teamMembers[0];
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <Hero />
      <Stats />
      <PracticeAreas />
      <FirmStrip herbert={herbert} />
      <Testimonials />
      <Insights posts={latestPosts} />
      <CtaBanner />
    </>
  );
}

function Stats() {
  return (
    <section className="border-y border-fg/10 bg-elevated">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-fg/10">
        {firmStats.map((stat) => (
          <Reveal key={stat.label} className="px-5 py-10 text-center sm:px-8">
            <p className="font-display text-4xl text-fg sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PracticeAreas() {
  return (
    <section className="bg-paper py-20 text-charcoal sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sage-deep">Expertise</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl">
            Six divisions, and the files that follow them.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.slug} delay={Math.min(i * 0.05, 0.3)}>
              <PracticeAreaCard area={area} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FirmStrip({ herbert }) {
  return (
    <section className="relative overflow-hidden bg-ink text-fg">
      <div className="mx-auto grid max-w-6xl items-center lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:min-h-[34rem]">
          <PhotoPlaceholder
            label="Herbert Nyamurongi, Sr. Advocate"
            aspect="h-full"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="px-5 py-16 sm:px-12 sm:py-24">
          <Reveal>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sage">The Firm</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Trusted legal partner for your success.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-fg/75 sm:text-base">
              We are committed to providing personalized and effective legal
              solutions that achieve the best possible outcome for our
              clients. Don&rsquo;t face your legal challenges alone.
            </p>
            <p className="mt-4 text-sm text-fg/60">
              {herbert.name} &middot; {herbert.title}
            </p>
            <Link
              href="/team"
              className="mt-8 inline-flex h-11 items-center gap-2 border border-fg/20 px-5 font-sans text-sm font-medium tracking-wide text-fg transition-colors hover:border-fg/50 hover:bg-fg/5"
            >
              Meet the Team <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-paper py-20 text-charcoal sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sage-deep">
              Client Reviews
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              What our clients say.
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="text-[0.72rem] uppercase tracking-[0.2em] text-muted hover:text-charcoal"
          >
            Read more
          </Link>
        </Reveal>

        <Reveal className="mt-10">
          <TestimonialCarousel testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}

function Insights({ posts }) {
  return (
    <section className="bg-ink py-20 text-fg sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sage">Insights</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">From the chambers desk.</h2>
          </div>
          <Link
            href="/blog"
            className="text-[0.72rem] uppercase tracking-[0.2em] text-muted hover:text-fg"
          >
            All pieces
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <PhotoPlaceholder
                    label={post.category}
                    aspect="aspect-[4/3]"
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-sage">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
