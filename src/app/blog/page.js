import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { getArticles, mediaUrl } from "@/lib/strapi";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `Insights | ${firm.name}`,
  description: "Notes from the chambers desk — practice, succession, land, and counsel.",
};

// Re-fetches from Strapi on every request rather than caching a build-time
// snapshot, so newly published articles show up without a rebuild.
export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  let articles = [];
  let cmsError = null;

  try {
    const res = await getArticles({ pageSize: 24 });
    articles = res.data;
  } catch (err) {
    cmsError = err.message;
  }

  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Insights"
        title="From the chambers desk."
        lede="Practice notes, succession, land, and a short word on how to instruct these chambers."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {cmsError && (
          <Reveal className="border border-maroon/30 bg-maroon/5 p-6 text-sm text-ink/80">
            <p className="font-medium text-maroon">Couldn&rsquo;t reach the CMS.</p>
            <p className="mt-2">
              This page reads articles from Strapi at{" "}
              <code className="bg-ink/10 px-1.5 py-0.5">
                {process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}
              </code>
              . If that&rsquo;s a local instance, start it with{" "}
              <code className="bg-ink/10 px-1.5 py-0.5">npm run develop</code> in the CMS
              folder and refresh.
            </p>
          </Reveal>
        )}

        {!cmsError && articles.length === 0 && (
          <Reveal className="text-sm text-ink/60">
            No articles published yet — add one in the Strapi Admin under
            Content Manager &rarr; Article.
          </Reveal>
        )}

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.documentId} delay={Math.min(i * 0.05, 0.3)}>
              <Link href={`/blog/${article.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={mediaUrl(article.coverImage)}
                      alt=""
                      width={600}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PhotoPlaceholder
                      label={article.category?.name}
                      aspect="aspect-[4/3]"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-ink/45">
                  {article.publishedAt &&
                    new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  {article.category?.name ? ` \u00b7 ${article.category.name}` : ""}
                </p>
                <h2 className="mt-2 font-display text-2xl leading-snug group-hover:text-maroon">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{article.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
