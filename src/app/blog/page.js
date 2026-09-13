import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, getAllCategories } from "@/lib/data/blog";
import Reveal from "@/components/Reveal";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Blog
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Legal Insights & Firm News
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              Analysis, commentary, and updates from the team at Nyamurongi
              Advocates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <Reveal direction="up">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-ink px-4 py-1.5 text-xs text-parchment">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-ink/15 px-4 py-1.5 text-xs text-slate"
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ POSTS ============ */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} direction="up" delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col border border-ink/10 bg-white/60 p-7 transition-colors duration-300 hover:border-maroon/40"
              >
                <p className="text-xs text-brass">{formatDate(post.date)}</p>
                <h2 className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-maroon">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-5">
                  <p className="text-xs text-slate/70">
                    {post.author} · {post.category}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-maroon">
                    Read Article
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}