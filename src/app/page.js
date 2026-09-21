import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import Matters from "@/components/Matters";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import CtaBanner from "@/components/CtaBanner";
import { firm } from "@/lib/data/firm";
import { practiceAreas } from "@/lib/data/practiceAreas";
import { blogPosts } from "@/lib/data/blog";
import { getArticles, mediaUrl } from "@/lib/strapi";

// Re-fetches Strapi data on every request instead of caching a build-time
// snapshot, so a newly published article (or approved comment) shows up
// on a plain refresh with no rebuild needed.
export const dynamic = "force-dynamic";

export default async function Home() {
  const insights = await getLatestInsights();

  return (
    <>
      <Hero />
      <Stats />
      <PracticePreview />
      <FirmStrip />
      <Matters />
      <Insights items={insights} />
      <CtaBanner />
    </>
  );
}

/**
 * Pulls the 3 latest articles from Strapi, normalized to one shape
 * regardless of source. Falls back to the local `blog.js` data if Strapi
 * isn't reachable at build/request time — the homepage should never look
 * broken just because the CMS is briefly down, unlike the dedicated /blog
 * page where showing a "can't reach the CMS" message is actually useful.
 */
async function getLatestInsights() {
  try {
    const res = await getArticles({ pageSize: 3 });
    return res.data.map((a) => ({
      slug: a.slug,
      title: a.title,
      categoryLabel: a.category?.name,
      dateLabel: a.publishedAt
        ? new Date(a.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : null,
      coverImageUrl: mediaUrl(a.coverImage),
    }));
  } catch {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        categoryLabel: p.category,
        dateLabel: new Date(p.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        coverImageUrl: null,
      }));
  }
}

function Stats() {
  return (
    <section className="border-y border-parchment/10 bg-elevated">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-parchment/10 sm:grid-cols-4">
        {firm.stats.map((s) => (
          <Reveal key={s.label} className="px-5 py-8 sm:px-8">
            <p className="font-display text-3xl text-parchment sm:text-4xl">
              {typeof s.value === "number" ? <Counter value={s.value} /> : s.value}
            </p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-parchment/50">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PracticePreview() {
  return (
    <section className="bg-parchment py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-maroon">Expertise</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl">
            Six divisions, and the files that follow them.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {practiceAreas.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <PracticeAreaCard area={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FirmStrip() {
  return (
    <section className="relative overflow-hidden bg-ink text-parchment">
      <div className="mx-auto grid max-w-6xl items-center lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:min-h-[36rem]">
          <PhotoPlaceholder
            label="Morning mist over the Kisii highlands"
            aspect="h-full"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="px-5 py-16 sm:px-12 sm:py-24">
          <Reveal>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brass">The Firm</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              A Kisii chambers, on the record.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/75 sm:text-base">
              {firm.about[0]}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-11 items-center gap-2 border border-parchment/25 px-5 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:border-parchment/50 hover:bg-parchment/5"
            >
              Read the Chambers <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Insights({ items }) {
  return (
    <section className="bg-ink py-20 text-parchment sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brass">Insights</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">From the chambers desk.</h2>
          </div>
          <Link
            href="/blog"
            className="text-[0.72rem] uppercase tracking-[0.2em] text-parchment/50 hover:text-parchment"
          >
            All pieces
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <Link href={`/blog/${a.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  {a.coverImageUrl ? (
                    <Image
                      src={a.coverImageUrl}
                      alt=""
                      width={600}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PhotoPlaceholder
                      label={a.categoryLabel}
                      aspect="aspect-[4/3]"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-parchment/50">
                  {a.dateLabel}
                  {a.categoryLabel ? ` \u00b7 ${a.categoryLabel}` : ""}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-brass">
                  {a.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
