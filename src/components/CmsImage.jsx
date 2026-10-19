import Image from "next/image";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { objectPositionFor } from "@/lib/cms-image";

/**
 * Renders an image managed in Strapi, or the old gradient placeholder when
 * nothing has been uploaded (or Strapi is unreachable) — so a page never
 * breaks just because a slot is empty.
 *
 * `image` is the object produced by toImage() in src/lib/strapi.js
 * ({ src, alt, focus }) or null.
 *
 * Fills its nearest POSITIONED ancestor (relative / absolute), exactly like
 * the placeholder it replaces — the parent decides the size and shape.
 * Pass `priority` for the one image visible on first paint (the hero), and
 * `sizes` so the browser downloads the right width (not the full original).
 */
export default function CmsImage({
  image,
  sizes = "100vw",
  priority = false,
  className = "",
  placeholderLabel,
}) {
  if (!image?.src) {
    return (
      <PhotoPlaceholder
        label={placeholderLabel}
        aspect="h-full"
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={{ objectPosition: objectPositionFor(image.focus) }}
    />
  );
}
