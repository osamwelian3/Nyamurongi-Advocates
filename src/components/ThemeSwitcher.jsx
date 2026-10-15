"use client";

import { useEffect, useState } from "react";
import { Palette, Check, Link2, RotateCcw, X } from "lucide-react";
import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";

/**
 * Floating palette switcher, for previewing/presenting themes.
 *
 * Hidden from normal visitors. It appears when:
 *   - NEXT_PUBLIC_THEME_SWITCHER=true was set at build time, or
 *   - the page is opened with ?themes=1  (remembered for the browser tab
 *     session; ?themes=0 hides it again) — handy for showing the firm the
 *     live site without a rebuild.
 *
 * Choosing a theme only changes it in THIS browser (localStorage). It does
 * not change what other visitors see; that is the site default
 * (DEFAULT_THEME in src/lib/themes.js).
 */
export default function ThemeSwitcher() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(DEFAULT_THEME);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("themes") === "0") sessionStorage.removeItem("themes-ui");
    if (params.get("themes") === "1") sessionStorage.setItem("themes-ui", "1");
    setEnabled(
      process.env.NEXT_PUBLIC_THEME_SWITCHER === "true" ||
        sessionStorage.getItem("themes-ui") === "1"
    );
    setActive(document.documentElement.getAttribute("data-theme") || DEFAULT_THEME);
  }, []);

  if (!enabled) return null;

  const apply = (slug) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", slug);
    window.setTimeout(() => root.classList.remove("theme-transition"), 600);
    setActive(slug);
  };

  const choose = (slug) => {
    localStorage.setItem(THEME_STORAGE_KEY, slug);
    apply(slug);
  };

  const reset = () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    apply(DEFAULT_THEME);
  };

  const copyLink = async (slug) => {
    const url = `${window.location.origin}${window.location.pathname}?theme=${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(slug);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[90] font-sans text-sm text-parchment">
      {open && (
        <div
          role="radiogroup"
          aria-label="Site colour theme"
          className="mb-3 w-72 border border-parchment/15 bg-ink/95 p-3 shadow-2xl backdrop-blur-sm"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-parchment/60">Colour theme</p>
            <button onClick={() => setOpen(false)} aria-label="Close theme panel" className="text-parchment/60 hover:text-parchment">
              <X size={15} />
            </button>
          </div>

          <ul className="space-y-2">
            {THEMES.map((t) => {
              const on = t.slug === active;
              return (
                <li key={t.slug}>
                  <div
                    className={`flex items-stretch border ${on ? "border-parchment/60" : "border-parchment/15"}`}
                  >
                    <button
                      role="radio"
                      aria-checked={on}
                      onClick={() => choose(t.slug)}
                      className="flex flex-1 items-center gap-3 p-2.5 text-left hover:bg-parchment/5"
                    >
                      <span className="flex shrink-0 overflow-hidden border border-parchment/20">
                        {[t.tokens.ink, t.tokens.parchment, t.tokens.accentOnDark, t.tokens.accentOnLight].map((c) => (
                          <span key={c} className="block h-8 w-4" style={{ background: c }} />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          {t.name}
                          {on && <Check size={13} className="text-brass" />}
                        </span>
                        {t.slug === DEFAULT_THEME && (
                          <span className="text-[0.65rem] text-parchment/50">site default</span>
                        )}
                      </span>
                    </button>
                    <button
                      onClick={() => copyLink(t.slug)}
                      aria-label={`Copy a link to the ${t.name} theme`}
                      title="Copy shareable link"
                      className="border-l border-parchment/15 px-2.5 text-parchment/60 hover:bg-parchment/5 hover:text-parchment"
                    >
                      {copied === t.slug ? <Check size={14} /> : <Link2 size={14} />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={reset}
            className="mt-3 flex items-center gap-1.5 text-xs text-parchment/60 hover:text-parchment"
          >
            <RotateCcw size={12} /> Back to site default
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open colour theme switcher"
        className="flex h-11 w-11 items-center justify-center border border-parchment/25 bg-ink/95 shadow-xl hover:border-parchment/60"
      >
        <Palette size={18} />
      </button>
    </div>
  );
}
