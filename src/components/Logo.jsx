import { LOGO } from "@/lib/brand/logoPaths";

/**
 * The firm's logo, drawn from the designer's own vector outlines (see
 * src/lib/brand/logoPaths.js) — not a re-draw, not a raster image.
 *
 * variant="reversed" (default) — for dark backgrounds (header, footer,
 *   splash). The maroon block is kept as-is; the wordmark flips to
 *   parchment, and ADVOCATES to a lightened tint of the brand teal,
 *   because #316082 on near-black navy is too dim to read.
 * variant="color" — the original maroon/teal artwork, for light backgrounds.
 *
 * Every shape carries a data-part attribute (block / teal / white /
 * letter) so the splash screen can animate the pieces individually.
 */
const REVERSED_FILL = { top: "#F7F5F0", bottom: "#8DB7D6" };

export default function Logo({
  variant = "reversed",
  className = "",
  title = "Nyamurongi & Company Advocates",
  ...rest
}) {
  const letterFill = (l) => (variant === "color" ? l.fill : REVERSED_FILL[l.row]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-0.5 -0.5 ${LOGO.width + 1} ${LOGO.height + 1}`}
      className={className}
      role="img"
      aria-label={title}
      {...rest}
    >
      <g data-part="mark">
        {LOGO.mark.map((p, i) => (
          <path key={i} data-part={p.role} fill={p.fill} d={p.d} />
        ))}
      </g>
      <g data-part="wordmark">
        {LOGO.letters.map((l, i) => (
          <path key={i} data-part="letter" data-row={l.row} fill={letterFill(l)} d={l.d} />
        ))}
      </g>
    </svg>
  );
}
