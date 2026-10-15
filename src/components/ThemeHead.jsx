import { themesToCss, themeBootstrapScript } from "@/lib/themes";

/**
 * Render inside <head> in the root layout. Does two things, both before
 * first paint so there is no flash of the wrong palette:
 *
 *  1. injects the CSS variables for every theme (html[data-theme="..."])
 *  2. a tiny inline script that lets a browser override the default theme:
 *       ?theme=designer   switch to that theme and remember it in this browser
 *       ?theme=reset      forget the override, back to the site default
 *     (this is what makes "send the firm a link to each palette" work)
 *
 * Normal visitors never have an override, so they get the site default.
 */
const TRANSITION_CSS =
  "html.theme-transition,html.theme-transition *,html.theme-transition *::before,html.theme-transition *::after" +
  "{transition:background-color .45s ease,color .45s ease,border-color .45s ease,fill .45s ease,stroke .45s ease!important}";

export default function ThemeHead() {
  return (
    <>
      <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themesToCss() + "\n" + TRANSITION_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript() }} />
    </>
  );
}
