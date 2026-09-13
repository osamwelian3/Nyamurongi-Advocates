import Link from "next/link";
import { Phone, Mail, ArrowRight, Scale } from "lucide-react";
import { teamMembers, firmStats } from "@/lib/data/team";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

export default function TeamPage() {
  const lead = teamMembers[0];

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Meet Our Team
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              The People Behind Trusted Advocacy
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              Our team is committed to providing personalized and effective
              legal solutions that achieve the best possible outcome for our
              clients.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FIRM STATS ============ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6">
          {firmStats.map((stat, i) => (
            <Reveal key={stat.label} direction="up" delay={i * 0.1}>
              <div className="rounded-sm border border-ink/10 bg-white/60 p-8 text-center">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-serif text-5xl text-maroon"
                />
                <p className="mt-2 text-sm text-slate">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TEAM MEMBER ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal direction="up">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div className="flex aspect-[4/5] items-center justify-center rounded-sm bg-ink">
              <div className="text-center">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <path
                    d="M36 4 L68 36 L36 68 L4 36 Z M22 50 L22 22 L50 50 L50 22"
                    stroke="#a98139"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-4 font-serif text-xl text-parchment">
                  {lead.name}
                </p>
                <p className="mt-1 text-sm text-brass">{lead.title}</p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-ink">{lead.name}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-maroon">
                <Scale size={16} />
                {lead.credentials}
              </p>
              <div className="mt-6 space-y-4">
                {lead.bio.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+254711205997"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm text-parchment transition-colors hover:bg-maroon"
                >
                  <Phone size={15} />
                  Call the Firm
                </a>
                <a
                  href="mailto:info@nyamurongiadvocates.local"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-sans text-sm text-ink transition-colors hover:border-maroon hover:text-maroon"
                >
                  <Mail size={15} />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-ink py-20 text-parchment">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="scale">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl">
                Have You Worked With Us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-parchment/70">
                Share your experience or reach out to learn how our team can
                assist you with your legal needs today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/testimonials/submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 font-sans text-sm text-ink transition-colors hover:bg-parchment"
                >
                  Submit a Testimonial
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-parchment/30 px-7 py-3 font-sans text-sm text-parchment transition-colors hover:border-parchment hover:bg-parchment/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}