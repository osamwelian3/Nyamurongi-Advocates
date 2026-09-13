"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering plugins is idempotent, but guard for SSR: GSAP touches the
// DOM on registration and Next.js renders this module on the server first.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
