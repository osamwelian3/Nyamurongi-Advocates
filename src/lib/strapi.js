import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Server-side only — never expose this token to the browser bundle.
// Used for reads that need the API token (e.g. approved testimonials,
// which the Public role deliberately can't read directly — see cms/SETUP.md step 5).
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
  return data;
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
        article: { id: { $eq: article.id } },
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
  const byId = new Map(flatComments.map((c) => [c.id, { ...c, replies: [] }]));

  for (const comment of byId.values()) {
    const parentId = comment.attributes?.parent?.data?.id;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId).replies.push(comment);
    } else {
      topLevel.push(comment);
    }
  }
  return topLevel;
}

/**
 * Submit a new comment (or reply, if parentId is provided).
 * Always lands as `status: pending` — enforced server-side by the
 * Strapi lifecycle hook regardless of what's sent here.
 */
export async function submitComment({ articleId, content, authorName, authorEmail, parentId = null }) {
  const { data } = await strapiPublic.post("/comments", {
    data: {
      content,
      authorName,
      authorEmail,
      article: articleId,
      ...(parentId ? { parent: parentId } : {}),
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
