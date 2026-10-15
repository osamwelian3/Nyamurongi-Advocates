# Two switchable colour themes

## What's in this zip (all NEW files, nothing of yours is overwritten)

    src/lib/themes.js                 the palettes, as plain data (+ helpers)
    src/components/ThemeHead.jsx      injects the palette CSS + the ?theme= bootstrap
    src/components/ThemeSwitcher.jsx  floating switcher for presenting

Themes:
  classic    "Navy & Brass"             the current look
  designer   "Designer Maroon & Teal"   the logo designer's colours
                                        (maroon #97163D, teal #316082)

## Wire-up: 4 small edits to src/app/layout.js
(I couldn't read your current layout.js, so these are find-and-replace.)

1. Imports, add:
       import ThemeHead from "@/components/ThemeHead";
       import ThemeSwitcher from "@/components/ThemeSwitcher";
       import { DEFAULT_THEME } from "@/lib/themes";

2. On the <html> tag add two attributes (keep your existing ones):
       <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning ...>
   (suppressHydrationWarning is needed because the inline script may change
   data-theme before React hydrates.)

3. As the first child of <html>, add:
       <head>
         <ThemeHead />
       </head>

4. Inside <body>, anywhere (e.g. right after <SiteFooter />):
       <ThemeSwitcher />

5. In src/app/globals.css, check the @theme block says `@theme {` and NOT
   `@theme inline {`. (inline bakes the colours into every utility, which
   would stop the themes from overriding them.) Nothing else in the CSS changes.

No component code needs touching: every bg-ink / text-brass / text-maroon /
bg-parchment... already reads the CSS variables the themes override.

## Using it

Set the default for ALL visitors (rebuild after changing):
    src/lib/themes.js   ->  the first theme in THEMES is the default, or
    NEXT_PUBLIC_DEFAULT_THEME=designer   in .env.production

Presenting to the firm, no rebuild needed:
    https://your-site/?themes=1          shows the floating palette button
                                         (?themes=0 hides it again)
    https://your-site/?theme=designer    opens the site in that palette
    https://your-site/?theme=classic
    https://your-site/?theme=reset       back to the site default
The switcher also has a "copy link" button per theme, so you can send the
firm one link per palette. Choosing a theme only changes it in THAT
browser; other visitors still see the site default.
To show the button permanently while you're still developing:
    NEXT_PUBLIC_THEME_SWITCHER=true   (then remove it before launch)

## Adding a third palette
Add one object to THEMES in src/lib/themes.js (copy a block, new slug, six
#rrggbb values). It appears in the switcher automatically. Only 6-digit hex
values are accepted; anything else is ignored.

## About the token names
`brass` and `maroon` are legacy names from the first palette; they are now
ROLES: `brass` = accent used on dark sections, `maroon` = accent used on
light sections. In the designer theme `brass` is a light teal. If that bothers
you later, a find-and-replace of text-brass/bg-brass/border-brass ->
text-accent-dark etc. (plus renaming the two @theme tokens and
TOKEN_TO_CSS_VAR) cleans it up. Not done now because I can't see your latest
code and it would touch many files.

## What does NOT change with the theme
The logo keeps the designer's maroon/teal in both themes, and the splash's
maroon curtain edge is the logo maroon in both. Photos/placeholders follow
the theme (placeholders are tinted with the maroon token).

## Later: managing themes from Strapi (not built yet)
The theme objects are already shaped like a CMS entry, so the move is small:
  - Collection type  "theme":  name (string), slug (uid), description (text),
    and six string fields ink, elevated, parchment, parchment2,
    accentOnDark, accentOnLight (regex ^#[0-9a-fA-F]{6}$ on each).
  - Single type "site-setting": relation activeTheme -> theme.
  - Editors: give the Editor role access to "theme" (add/edit palettes) and
    keep "site-setting" update for the Admin/Super Admin role only if you want
    that privilege split.
  - Frontend: in the root layout fetch themes + activeTheme (fall back to the
    THEMES array if Strapi is down), pass them to themesToCss() /
    themeBootstrapScript() (both already take a `themes` argument) and set
    data-theme from activeTheme. themesToCss() already validates slugs and hex
    values, because CMS-supplied text must never be injected as raw CSS.
  - Note: reading Strapi in the root layout makes every page render per
    request (fine on the VPS, and most pages already do).
Say when you want it and I'll build the schema + fetch.

## Tested / not tested
Tested (node, simulated browser): generated CSS, value/slug validation
(injection attempts stripped), the ?theme= logic incl. persistence, reset,
unknown/stale themes, and blocked localStorage.
NOT tested: a real Next build or browser. Please eyeball the Home page in
both themes once, especially the hero, the Stats bar and the Matters section.
