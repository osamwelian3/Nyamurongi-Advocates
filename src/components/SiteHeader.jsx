"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/blog", label: "Insights" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    triggerRef.current = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 24),
    });
    return () => triggerRef.current?.kill();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm border-b border-fg/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 72 72" fill="none">
            <path
              d="M36 4 L68 36 L36 68 L4 36 Z M22 50 L22 22 L50 50 L50 22"
              stroke="#8fa89a"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-lg text-fg">Nyamurongi &amp; Co.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[0.8rem] uppercase tracking-[0.14em] text-fg/70 transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="tel:+254711205997"
            className="flex items-center gap-1.5 text-sm text-fg/70 hover:text-fg"
          >
            <Phone size={15} strokeWidth={1.75} />
            +254 711 205 997
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center border border-fg/20 px-5 font-sans text-sm font-medium tracking-wide text-fg transition-colors hover:border-fg/50 hover:bg-fg/5"
          >
            Consult Us
          </Link>
        </div>

        <button
          className="text-fg md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-fg/10 bg-ink px-5 py-4 sm:px-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 font-sans text-sm uppercase tracking-[0.14em] text-fg/80"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 border border-fg/20 px-5 py-2.5 text-center font-sans text-sm text-fg"
            onClick={() => setMenuOpen(false)}
          >
            Consult Us
          </Link>
        </nav>
      )}
    </header>
  );
}
