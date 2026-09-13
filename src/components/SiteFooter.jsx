import Link from "next/link";
import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Meet Our Team", href: "/team" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog Articles", href: "/blog" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Submit a Testimonial", href: "/testimonials/submit" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "X (Twitter)" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-fg/10 bg-ink text-fg">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 72 72" fill="none">
                <path
                  d="M36 4 L68 36 L36 68 L4 36 Z M22 50 L22 22 L50 50 L50 22"
                  stroke="#8fa89a"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-lg">Nyamurongi &amp; Co.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Advocates of the High Court of Kenya. Legal representation, on the record.
            </p>
            <div className="mt-5 flex gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted transition-colors hover:text-sage"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-[0.72rem] uppercase tracking-[0.18em] text-fg">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-sage"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-fg/10 pt-6 text-center text-xs text-muted/70">
          Copyright © {new Date().getFullYear()} · Nyamurongi &amp; Co. Advocates · All rights reserved
        </div>
      </div>
    </footer>
  );
}
