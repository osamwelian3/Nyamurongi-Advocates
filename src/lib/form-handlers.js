import { validateContact, validateTestimonial, checkRateLimit } from "@/lib/forms";

/**
 * The decision logic behind /api/contact and /api/testimonials, kept free of
 * Next so it can be tested directly. The route files are thin adapters.
 *
 * Each function returns { status, body, headers? } and NEVER throws.
 * Order matters: rate-limit first (every attempt counts, including invalid
 * and bot ones), then validate, then drop bots silently, then save.
 */

const TOO_MANY = "Too many attempts. Please wait a few minutes and try again.";
const SAVE_FAILED =
  "We couldn't send this just now. Please try again shortly, or contact us by phone.";

async function run({ kind, body, ip, validate, save, limit, rate, log }) {
  // Without a usable IP everyone shares one bucket, so give it more room
  // rather than risk locking real clients out.
  const unknownIp = ip === "unknown";
  const rl = checkRateLimit(`${kind}:${ip}`, { limit: unknownIp ? limit * 6 : limit, ...rate });
  if (!rl.ok) {
    return { status: 429, body: { error: TOO_MANY }, headers: { "Retry-After": String(rl.retryAfter) } };
  }

  const v = validate(body);
  if (v.honeypot) {
    // Look like success so the bot moves on; store nothing.
    return { status: 200, body: { ok: true } };
  }
  if (!v.ok) return { status: 400, body: { error: v.error, fields: v.fields } };

  try {
    await save(v.data);
  } catch (err) {
    // Detail goes to the server log only; visitors get a plain message.
    log(`[${kind}] could not save to Strapi: ${err?.message ?? err}`);
    return { status: 502, body: { error: SAVE_FAILED } };
  }
  return { status: 200, body: { ok: true } };
}

export function processContact({ body, ip, create, rate, log = console.error }) {
  return run({ kind: "contact", body, ip, validate: validateContact, save: create, limit: 5, rate, log });
}

export function processTestimonial({ body, ip, create, rate, log = console.error }) {
  return run({ kind: "testimonial", body, ip, validate: validateTestimonial, save: create, limit: 3, rate, log });
}
