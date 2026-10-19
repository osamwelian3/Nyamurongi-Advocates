/**
 * Pure helpers (no imports) for turning a Strapi `shared.image` component
 * into the plain props <CmsImage> needs. Kept dependency-free so the logic
 * can be tested without Next or Strapi running.
 *
 * A `shared.image` component from Strapi looks like:
 *   { alt: "...", focus: "top", file: { url: "/uploads/x.jpg", alternativeText: "..." } }
 */

/** `focus` choices in Strapi -> CSS object-position (which part of a cropped photo stays visible). */
export const OBJECT_POSITION = {
  center: "center",
  top: "center top",
  bottom: "center bottom",
  left: "left center",
  right: "right center",
};

const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export function objectPositionFor(focus) {
  return has(OBJECT_POSITION, focus) ? OBJECT_POSITION[focus] : OBJECT_POSITION.center;
}

/**
 * @param slot        the populated `shared.image` component (or null/undefined)
 * @param resolveUrl  (mediaObject) => absolute URL | null   (see mediaUrl in strapi.js)
 * @returns { src, alt, focus } or null when nothing has been uploaded
 */
export function buildImage(slot, resolveUrl) {
  const file = slot?.file;
  const src = file ? resolveUrl(file) : null;
  if (!src) return null;
  return {
    src,
    // Editor-written alt wins, then the Media Library's own alt text, else
    // empty (correct for purely decorative images such as the hero background).
    alt: slot.alt || file.alternativeText || "",
    focus: has(OBJECT_POSITION, slot.focus) ? slot.focus : "center",
  };
}
