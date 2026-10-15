/**
 * SITE THEMES — the single place colour palettes are defined.
 *
 * Each theme is plain data (no code), deliberately shaped like a Strapi
 * "Theme" entry would be, so these can later be fetched from the CMS
 * instead of living in this file (see THEMES.md).
 *
 * Six colour roles. The CSS variable names are the existing Tailwind
 * tokens, so every `bg-ink`, `text-brass`, `text-maroon`... in the site
 * follows the active theme without touching component code.
 *
 *   ink            dark section background / text on light sections
 *   elevated       slightly lifted dark surface (stats bar, hovers on dark)
 *   parchment      light section background / text on dark sections
 *   parchment2     slightly deeper light surface (hovers, alt sections)
 *   accentOnDark   accent used on DARK sections   -> the `brass` token
 *   accentOnLight  accent used on LIGHT sections  -> the `maroon` token
 *
 * NOTE on names: the `brass` and `maroon` tokens are legacy names from the
 * first palette. They are now *roles*: in the designer theme `brass` holds
 * a light teal and `maroon` holds the brand maroon. Rename them later with a
 * find-and-replace if the confusion bothers you (see THEMES.md).
 */
export const THEMES = [
  {
    slug: "classic",
    name: "Navy & Brass",
    description:
      "The original palette: near-black navy, warm parchment, brass accent on dark, deep maroon accent on light.",
    tokens: {
      ink: "#0b1220",
      elevated: "#141d2c",
      parchment: "#f7f5f0",
      parchment2: "#ece4d6",
      accentOnDark: "#a98139",
      accentOnLight: "#7a2436",
    },
  },
  {
    slug: "designer",
    name: "Designer Maroon & Teal",
    description:
      "Built from the logo designer's colours: brand maroon #97163D and brand teal #316082 (as a deep teal-navy ground and a light teal accent for dark sections).",
    tokens: {
      ink: "#0a1822",
      elevated: "#11222f",
      parchment: "#f5f6f7",
      parchment2: "#e7ebee",
      accentOnDark: "#8db7d6",
      accentOnLight: "#97163d",
    },
  },
];

/** Which theme visitors see by default. Change here, or set NEXT_PUBLIC_DEFAULT_THEME at build time. */
export const DEFAULT_THEME =
  THEMES.find((t) => t.slug === process.env.NEXT_PUBLIC_DEFAULT_THEME)?.slug ?? THEMES[0].slug;

/** theme token key -> the CSS variable the site's Tailwind utilities read */
export const TOKEN_TO_CSS_VAR = {
  ink: "--color-ink",
  elevated: "--color-elevated",
  parchment: "--color-parchment",
  parchment2: "--color-parchment-2",
  accentOnDark: "--color-brass",
  accentOnLight: "--color-maroon",
};

const HEX = /^#[0-9a-f]{6}$/i;
const SLUG = /^[a-z0-9-]+$/;

/**
 * Builds the CSS for every theme: `html[data-theme="slug"] { --color-...: ... }`.
 * Values are validated because this output is injected as raw CSS — once
 * themes come from the CMS, a bad value must not be able to break the page
 * or smuggle in extra CSS.
 */
export function themesToCss(themes = THEMES) {
  return themes
    .filter((t) => SLUG.test(t.slug))
    .map((t) => {
      const decls = Object.entries(TOKEN_TO_CSS_VAR)
        .filter(([key]) => HEX.test(t.tokens?.[key] ?? ""))
        .map(([key, cssVar]) => `${cssVar}:${t.tokens[key]}`)
        .join(";");
      return `html[data-theme="${t.slug}"]{${decls}}`;
    })
    .join("\n");
}

export const THEME_STORAGE_KEY = "site-theme";

/**
 * Inline script run in <head> before first paint (see ThemeHead.jsx).
 *   ?theme=<slug>   use that theme and remember it in this browser
 *   ?theme=reset    forget the override, back to the site default
 */
export function themeBootstrapScript(themes = THEMES) {
  const valid = JSON.stringify(themes.filter((t) => SLUG.test(t.slug)).map((t) => t.slug));
  return `(function(){try{var K=${JSON.stringify(THEME_STORAGE_KEY)},V=${valid};
var q=new URLSearchParams(location.search).get('theme');
if(q==='reset'){localStorage.removeItem(K)}else if(q&&V.indexOf(q)>-1){localStorage.setItem(K,q)}
var s=localStorage.getItem(K);
if(s&&V.indexOf(s)>-1){document.documentElement.setAttribute('data-theme',s)}
}catch(e){}})();`;
}
