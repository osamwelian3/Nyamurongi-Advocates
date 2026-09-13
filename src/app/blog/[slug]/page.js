import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/lib/data/blog";
import CommentThread from "@/components/CommentThread";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Nyamurongi & Co. Advocates`,
    description: post.excerpt,
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-brass transition-colors hover:text-parchment"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to Blog
            </Link>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-parchment/60">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="rounded-full border border-parchment/20 px-3 py-0.5 text-xs">
                {post.category}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ARTICLE BODY ============ */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Reveal direction="up">
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-slate">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* ============ COMMENTS ============ */}
        <Reveal direction="up" delay={0.1}>
          <CommentThread
            articleId={post.slug}
            initialComments={post.comments}
          />
        </Reveal>
      </article>

      {/* ============ RELATED POSTS ============ */}
      {related.length > 0 && (
        <section className="bg-white/40 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal direction="up">
              <h2 className="font-serif text-2xl text-ink">Related Articles</h2>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} direction="up" delay={i * 0.1}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block border border-ink/10 bg-white/60 p-7 transition-colors hover:border-maroon/40"
                  >
                    <p className="text-xs text-brass">{formatDate(r.date)}</p>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-maroon">
                      {r.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-slate">
                      {r.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}