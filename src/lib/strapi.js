import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Strapi 5's REST API returns a flat shape — fields live directly on the
 * object (article.title, article.author.name), not nested under
 * `.attributes` the way Strapi 4 did. Relations, updates, and filters all
 * key off `documentId` (a persistent string id), not the numeric `id`.
 * If you're reading older Strapi tutorials/blog posts, watch for this —
 * a lot of copy-pasted v4-shaped code silently returns `undefined` on v5.
 */

// Server-side only — never expose this token to the browser bundle.
// Used for reads that need the API token (e.g. approved testimonials,
// which the Public role deliberately can't read directly — see cms/SETUP.md).
const strapiServer = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});

// Client-safe instance for public reads/writes that only need the Public role
// (articles, categories, and submitting new comments/testimonials).
const strapiPublic = axios.create({
  baseURL: `${STRAPI_URL}/api`,
});

/** Prefixes a Strapi media object's relative URL with the Strapi origin. */
export function mediaUrl(media) {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

/**
 * Fetch all published articles, newest first, with author/category populated.
 */
export async function getArticles({ page = 1, pageSize = 10 } = {}) {
  const { data } = await strapiPublic.get("/articles", {
    params: {
      populate: ["author", "author.avatar", "category", "coverImage"],
      sort: ["publishedAt:desc"],
      pagination: { page, pageSize },
    },
  });
  return data; // { data: [article, ...], meta: { pagination } }
}

/** Fetch every published article's slug — used by generateStaticParams. */
export async function getAllArticleSlugs() {
  const { data } = await strapiPublic.get("/articles", {
    params: { fields: ["slug"], pagination: { pageSize: 100 } },
  });
  return data.data.map((a) => a.slug);
}

/**
 * Fetch a single article by slug, including its approved comments
 * (nested one level via `parent`).
 */
export async function getArticleBySlug(slug) {
  const { data } = await strapiPublic.get("/articles", {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ["author", "author.avatar", "category", "coverImage"],
    },
  });

  const article = data.data?.[0];
  if (!article) return null;

  const { data: commentsData } = await strapiPublic.get("/comments", {
    params: {
      filters: {
        article: { documentId: { $eq: article.documentId } },
        status: { $eq: "approved" },
      },
      populate: ["parent"],
      sort: ["createdAt:asc"],
    },
  });

  return { article, comments: buildCommentTree(commentsData.data) };
}

/**
 * Groups flat approved comments into a one-level-deep reply tree.
 */
function buildCommentTree(flatComments) {
  const topLevel = [];
  const byId = new Map(flatComments.map((c) => [c.documentId, { ...c, replies: [] }]));

  for (const comment of byId.values()) {
    const parentId = comment.parent?.documentId;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId).replies.push(comment);
    } else {
      topLevel.push(comment);
    }
  }
  return topLevel;
}

/**
 * Submit a new comment (or reply, if parentDocumentId is provided).
 * Always lands as `status: pending` — enforced server-side by the
 * Strapi lifecycle hook regardless of what's sent here.
 */
export async function submitComment({
  articleDocumentId,
  content,
  authorName,
  authorEmail,
  parentDocumentId = null,
}) {
  const { data } = await strapiPublic.post("/comments", {
    data: {
      content,
      authorName,
      authorEmail,
      article: articleDocumentId,
      ...(parentDocumentId ? { parent: parentDocumentId } : {}),
    },
  });
  return data;
}

/**
 * Submit a new testimonial via the public form. Held for admin approval.
 */
export async function submitTestimonial({ fullName, email, companyName, companyWebsite, quote, rating }) {
  const { data } = await strapiPublic.post("/testimonials", {
    data: { fullName, email, companyName, companyWebsite, quote, rating },
  });
  return data;
}

/**
 * Fetch approved testimonials for public display.
 * Requires the server-side token since Public role can't read testimonials directly.
 * Call only from Server Components / route handlers, never client components.
 */
export async function getApprovedTestimonials() {
  const { data } = await strapiServer.get("/testimonials", {
    params: {
      filters: { status: { $eq: "approved" } },
      populate: ["photo"],
      sort: ["createdAt:desc"],
    },
  });
  return data;
}

export async function getPracticeAreas() {
  const { data } = await strapiPublic.get("/practice-areas", {
    params: { sort: ["displayOrder:asc"] },
  });
  return data;
}

export async function getTeamMembers() {
  const { data } = await strapiPublic.get("/team-members", {
    params: { populate: ["photo"], sort: ["displayOrder:asc"] },
  });
  return data;
}
