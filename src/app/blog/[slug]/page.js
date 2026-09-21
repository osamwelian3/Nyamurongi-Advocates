import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CommentThread from "@/components/CommentThread";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { getArticleBySlug, getAllArticleSlugs, mediaUrl } from "@/lib/strapi";
import { firm } from "@/lib/data/firm";

// Static (baked in at build time, using generateStaticParams below) for
// the GH Pages export, since that target has no server to render
// on-demand. Dynamic (re-fetched on every request, any slug resolved
// live — generateStaticParams is simply bypassed) everywhere else, i.e.
// a real Node host like the VPS. Both builds come from this one file;
// only the DEPLOY_TARGET env var differs.
export const dynamic = process.env.DEPLOY_TARGET === "gh-pages" ? "force-static" : "force-dynamic";

// Runs only during `next build` when the route above resolves to
// "force-static" (the GH Pages export) — requires Strapi to be reachable
// at build time. This is why `npm run deploy` must be run while your
// local Strapi is running: the build itself needs to ask it "what
// articles exist?" up front, since a static export has no server left
// afterward to ask that question live.
export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Strapi unreachable at build time — build the site with zero article
    // pages rather than failing the whole deploy. Fix by ensuring Strapi
    // is running before `npm run deploy`.
    return [];
  }
}

export async function generateMetadata({ params }) {
  const result = await getArticleBySlug(params.slug).catch(() => null);
  if (!result) return {};
  return {
    title: `${result.article.title} | ${firm.name}`,
    description: result.article.excerpt,
  };
}

export default async function ArticleDetail({ params }) {
  let result;
  try {
    result = await getArticleBySlug(params.slug);
  } catch (err) {
    return (
      <main className="bg-parchment px-5 py-24 text-center text-ink sm:px-8">
        <p className="font-medium text-maroon">Couldn&rsquo;t reach the CMS.</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          This page reads from Strapi at{" "}
          <code className="bg-ink/10 px-1.5 py-0.5">
            {process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}
          </code>
          . Start it locally with <code className="bg-ink/10 px-1.5 py-0.5">npm run develop</code>{" "}
          and refresh.
        </p>
      </main>
    );
  }

  if (!result) notFound();
  const { article, comments } = result;

  // Strapi's richtext field returns a single markdown string. Rendered
  // here as plain paragraphs split on blank lines — enough for how this
  // chambers writes (no embedded images/tables in body copy) without
  // pulling in a full markdown renderer for six short articles.
  const paragraphs = (article.content || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker={article.category?.name || "Insights"}
        title={article.title}
        lede={article.excerpt}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        {article.coverImage && (
          <Reveal className="mb-10 overflow-hidden">
            <Image
              src={mediaUrl(article.coverImage)}
              alt=""
              width={1200}
              height={700}
              className="w-full"
            />
          </Reveal>
        )}

        <Reveal>
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-base leading-relaxed first:mt-0 sm:text-lg">
                {p}
              </p>
            ))
          ) : (
            <p className="text-ink/60">This article has no body content yet.</p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex items-center gap-3 border-t border-ink/10 pt-6">
          {article.author?.avatar ? (
            <Image
              src={mediaUrl(article.author.avatar)}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          ) : (
            <div className="h-10 w-10 shrink-0">
              <PhotoPlaceholder aspect="h-10" className="h-10 w-10" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{article.author?.name || "Chambers"}</p>
            <p className="text-xs text-ink/45">{article.author?.role}</p>
          </div>
        </Reveal>

        <CommentThread articleDocumentId={article.documentId} initialComments={comments} />
      </article>
    </main>
  );
}
