import Image from "next/image";
import StarRating from "@/components/StarRating";
import { mediaUrl } from "@/lib/strapi";

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/**
 * One approved testimonial. Shows the Media Library photo if an admin added
 * one in Strapi, otherwise an initials tile. The submitter's email is never
 * part of this data (private field), and their website is not linked.
 */
export default function TestimonialCard({ item }) {
  const photo = mediaUrl(item.photo);

  return (
    <figure className="group border border-ink/10 bg-parchment p-7 transition-colors duration-150 hover:bg-parchment-2 sm:p-8">
      <StarRating rating={item.rating} />
      <blockquote className="mt-5 font-display text-2xl leading-snug">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {photo ? (
          <Image src={photo} alt="" width={44} height={44} className="h-11 w-11 object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink font-display text-lg text-parchment"
          >
            {initials(item.fullName)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-sm font-medium">{item.fullName}</span>
          {item.companyName && <span className="block truncate text-xs text-ink/55">{item.companyName}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
