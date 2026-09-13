"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-charcoal">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sage-deep">
          Need Legal Support?
        </p>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl">
          Get the legal support you deserve.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-charcoal/75">
          Reach out to us today and let us take the burden off your shoulders
          with your legal battles.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center bg-ink px-7 font-sans text-sm font-medium tracking-wide text-fg transition-colors hover:bg-elevated"
        >
          Consult Us Today
        </Link>

        <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-10 border-t border-rule pt-6">
          <a
            href="tel:+254711205997"
            className="flex items-center gap-3 text-charcoal/80 hover:text-charcoal"
          >
            <Phone size={17} className="text-sage-deep" />
            <div className="text-left">
              <p className="text-xs text-muted">Call Now</p>
              <p className="text-sm font-medium">+254 711 205 997</p>
            </div>
          </a>
          <a
            href="mailto:info@nyamurongiadvocates.local"
            className="flex items-center gap-3 text-charcoal/80 hover:text-charcoal"
          >
            <Mail size={17} className="text-sage-deep" />
            <div className="text-left">
              <p className="text-xs text-muted">Email Us</p>
              <p className="text-sm font-medium">info@nyamurongiadvocates.local</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
