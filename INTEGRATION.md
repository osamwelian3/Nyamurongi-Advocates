# Logo update — what's in this zip and how to wire it in

NEW files (safe to copy straight in, nothing of yours is overwritten):

    src/lib/brand/logoPaths.js   the designer's vector outlines as data
    src/components/Logo.jsx      <Logo variant="reversed" | "color" className="..." />
    src/app/icon.svg             favicon (maroon square + N). If you have an old
                                 src/app/favicon.ico, delete it so browsers don't prefer it.
    public/brand/                logo-color.svg, logo-reversed.svg, mark.svg
                                 (for OG images, letterheads, emails, etc.)

REPLACES a file (compare with yours before overwriting):

    src/components/Preloader.jsx

  Built from the last version I wrote. If you've edited Preloader.jsx since,
  diff first. It keeps the same contract: adds/removes body.js-loading, fires
  window "preloader:done", skips animation for prefers-reduced-motion.

EDITS to make by hand (I couldn't read your current header/footer, so these
are find-and-replace, not file replacements):

## src/components/SiteHeader.jsx
1. Add:  import Logo from "@/components/Logo";
2. Inside the home <Link href="/"> ... </Link>, replace the inline <svg>...</svg>
   monogram AND the <span>Nyamurongi &amp; Co.</span> next to it with:

       <Logo variant="reversed" className="h-9 w-auto" />

   (h-9 = 36px tall; use h-8 on very small screens if it feels wide.)

## src/components/SiteFooter.jsx
1. Add the same import.
2. Replace the same inline <svg> + wordmark <span> with:

       <Logo variant="reversed" className="h-11 w-auto" />

## Nothing else references the old monogram path
Search your project for  "M36 4 L68 36"  — every hit is an old inline monogram
and can be swapped for <Logo />.

## Colours
Brand colours from the designer: maroon #97163D, teal #316082 (exported as
LOGO.colors). The site still uses brass as its accent; the logo has no gold.
Worth a conversation with the designer/firm about whether to move the site
accent to the brand teal. I haven't changed the site palette.
On dark backgrounds the wordmark is reversed (parchment + lightened teal
#8DB7D6) because #316082 is too dim on navy. Change REVERSED_FILL in Logo.jsx
if the firm wants different values.
