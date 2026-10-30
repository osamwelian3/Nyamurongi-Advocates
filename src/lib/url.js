/**
 * Base URL of the Strapi server, tolerant of the typo that has already cost
 * time once: NEXT_PUBLIC_STRAPI_URL set without "http://". A scheme-less
 * value is not a valid absolute URL for Node's HTTP client.
 */
export function normalizeBaseUrl(raw, fallback = "http://localhost:1337") {
  let u = String(raw ?? "").trim().replace(/\/+$/, "");
  if (!u) return fallback;
  if (!/^https?:\/\//i.test(u)) u = `http://${u}`;
  return u;
}
