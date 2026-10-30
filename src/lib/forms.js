/**
 * Validation, abuse protection and request reading for the public forms
 * (contact + testimonial). Pure JavaScript with no imports, so all of it is
 * unit-tested without Next or Strapi running.
 *
 * Why this lives on OUR server and not in the browser: the browser never
 * talks to Strapi for these forms. Our route handlers validate, filter spam,
 * and only then create the entry in Strapi with a server-side token. That
 * means the checks below cannot be bypassed by posting straight to Strapi.
 */

/** Honeypot: hidden from humans, irresistible to form-filling bots. */
export const HONEYPOT_FIELD = "contact_extra";

const EMAIL = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;
// Single-line fields must never contain line breaks (header injection when
// a field later lands in an email subject / reply-to).
const LINE_BREAK = /[\r\n\u2028\u2029]/;
// control characters except \t \n \r
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const str = (v) => (typeof v === "string" ? v : "");

function line(v, { min = 0, max, label, required }) {
  const s = str(v).replace(CONTROL, "").trim();
  if (!s) return required ? { error: `Please enter ${label}.` } : { value: "" };
  if (LINE_BREAK.test(s)) return { error: `${cap(label)} must be on a single line.` };
  if (s.length < min) return { error: `${cap(label)} is too short.` };
  if (s.length > max) return { error: `${cap(label)} is too long (maximum ${max} characters).` };
  return { value: s };
}

function block(v, { min = 0, max, label, required }) {
  const s = str(v).replace(CONTROL, "").replace(/\r\n?/g, "\n").trim();
  if (!s) return required ? { error: `Please enter ${label}.` } : { value: "" };
  if (s.length < min) return { error: `${cap(label)} is too short (at least ${min} characters).` };
  if (s.length > max) return { error: `${cap(label)} is too long (maximum ${max} characters).` };
  return { value: s };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function email(v) {
  const r = line(v, { max: 254, label: "your email address", required: true });
  if (r.error) return r;
  return EMAIL.test(r.value) ? r : { error: "Please enter a valid email address." };
}

/** Optional website: add https:// if missing, accept only real http(s) hosts. */
function website(v) {
  const r = line(v, { max: 200, label: "a website address", required: false });
  if (r.error || !r.value) return r;
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(r.value) ? r.value : `https://${r.value}`;
  let u;
  try {
    u = new URL(candidate);
  } catch {
    return { error: "Please enter a valid website address, or leave it blank." };
  }
  const okProtocol = u.protocol === "http:" || u.protocol === "https:";
  if (!okProtocol || !u.hostname.includes(".") || u.username || u.password) {
    return { error: "Please enter a valid website address, or leave it blank." };
  }
  return { value: u.toString() };
}

function collect(parts, honeypotValue) {
  if (str(honeypotValue).trim() !== "") return { ok: false, honeypot: true };
  const fields = {};
  const data = {};
  for (const [key, r] of Object.entries(parts)) {
    if (r.error) fields[key] = r.error;
    else if (r.value !== "" && r.value !== undefined) data[key] = r.value;
  }
  const first = Object.values(fields)[0];
  return first ? { ok: false, error: first, fields } : { ok: true, data };
}

/** Contact form: name, email, subject required; message optional (as on the original site). */
export function validateContact(body) {
  const b = body && typeof body === "object" ? body : {};
  return collect(
    {
      name: line(b.name, { min: 2, max: 100, label: "your name", required: true }),
      email: email(b.email),
      subject: line(b.subject, { min: 3, max: 200, label: "a subject", required: true }),
      message: block(b.message, { max: 5000, label: "your message", required: false }),
    },
    b[HONEYPOT_FIELD]
  );
}

/** Testimonial form. Limits mirror the Strapi schema (quote max 1000, rating 1-5). */
export function validateTestimonial(body) {
  const b = body && typeof body === "object" ? body : {};
  const n = typeof b.rating === "string" && b.rating.trim() !== "" ? Number(b.rating) : b.rating;
  const rating =
    Number.isInteger(n) && n >= 1 && n <= 5
      ? { value: n }
      : { error: "Please choose a star rating from 1 to 5." };
  return collect(
    {
      fullName: line(b.fullName, { min: 2, max: 100, label: "your full name", required: true }),
      email: email(b.email),
      companyName: line(b.companyName, { max: 100, label: "a company name", required: false }),
      companyWebsite: website(b.companyWebsite),
      quote: block(b.quote, { min: 10, max: 1000, label: "your testimonial", required: true }),
      rating,
    },
    b[HONEYPOT_FIELD]
  );
}

/* ----------------------------- rate limiting ----------------------------- */

const defaultStore = new Map();

/**
 * Sliding-window limiter, in memory. Fine for a single Node process (the
 * VPS runs one); it resets on restart, which is acceptable for spam control.
 * Pass your own `store`/`now` in tests.
 */
export function checkRateLimit(
  key,
  { limit = 5, windowMs = 10 * 60 * 1000, now = Date.now(), store = defaultStore } = {}
) {
  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    store.set(key, recent);
    return { ok: false, retryAfter: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
  }
  recent.push(now);
  store.set(key, recent);
  if (store.size > 2000) {
    for (const [k, times] of store) {
      if (!times.some((t) => now - t < windowMs)) store.delete(k);
    }
  }
  return { ok: true };
}

/** Best-effort client IP behind a reverse proxy. "unknown" if no usable header. */
export function clientIp(headers) {
  const raw = headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim() || headers?.get?.("x-real-ip")?.trim() || "";
  return /^[0-9a-fA-F:.]{3,45}$/.test(raw) ? raw : "unknown";
}

/**
 * Read a JSON body with a hard size cap (so a huge POST can't be used to
 * burn memory). `request` only needs a .text() method.
 */
export async function readJsonBody(request, maxChars = 20000) {
  let raw;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400, error: "Invalid request." };
  }
  if (raw.length > maxChars) return { ok: false, status: 413, error: "That message is too long." };
  try {
    return { ok: true, body: JSON.parse(raw) };
  } catch {
    return { ok: false, status: 400, error: "Invalid request." };
  }
}
