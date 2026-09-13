import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Scale } from "lucide-react";
import { firmStats, teamMembers } from "@/lib/data/team";
import { practiceAreas } from "@/lib/data/practiceAreas";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ScrollScrubText from "@/components/ScrollScrubText";

export default function AboutPage() {
  const lead = teamMembers[0];

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              About Us
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Trusted Legal Partner for Your Success
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              Nyamurongi & Co. Advocates is a professional law firm in
              Kenya offering reliable legal advice, representation, and
              consultation services. We are committed to providing prompt,
              confidential, and practical legal support across a wide range of
              legal matters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FIRM OVERVIEW ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal direction="left">
            <div>
              <h2 className="font-serif text-3xl text-ink md:text-4xl">
                A Firm Built on Integrity and Results
              </h2>
              <p className="mt-5 leading-relaxed text-slate">
                At Nyamurongi & Company Advocates, we pride ourselves on
                delivering reliable legal solutions backed by experience,
                professionalism, and integrity. As a renowned law firm, our
                team is committed to understanding each client&rsquo;s unique
                needs and providing practical, results-driven advice across a
                wide range of legal matters.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                From complex corporate transactions to dispute resolution and
                personal legal services, we approach every case with diligence
                and attention to detail. We believe in building long-term
                relationships with our clients by maintaining transparency,
                responsiveness, and excellence in service delivery.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                Through strategic thinking and strong advocacy, we strive to
                protect our clients&rsquo; interests and achieve favorable
                outcomes while upholding the highest standards of legal
                practice.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {firmStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-ink/10 bg-white/60 p-8 text-center"
                >
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-serif text-5xl text-maroon"
                  />
                  <p className="mt-2 text-sm text-slate">{stat.label}</p>
                </div>
              ))}
              <div className="col-span-2 flex items-center gap-4 rounded-sm bg-ink p-6">
                <Scale size={28} className="shrink-0 text-brass" />
                <p className="text-sm leading-relaxed text-parchment/80">
                  Advocate of the High Court of Kenya
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LEADERSHIP ============ */}
      <section className="bg-white/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="up">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Meet Our Leadership
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
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
                <h3 className="font-serif text-2xl text-ink">{lead.name}</h3>
                <p className="mt-1 text-sm text-maroon">
                  {lead.credentials}
                </p>
                    {/* <ScrollScrubText paragraphs={lead.bio} /> */}
                <div className="mt-6 space-y-4">
                    {lead.bio.map((paragraph, i) => (
                        <p key={i} className="leading-relaxed text-slate">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <Link
                  href="/team"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm text-parchment transition-colors hover:bg-maroon"
                >
                  Meet Our Team
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRACTICE AREAS PREVIEW ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal direction="up">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-slate">
              We offer a wide range of legal services to individuals,
              businesses, and organizations.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.slug} direction="up" delay={(i % 3) * 0.08}>
              <Link
                href={`/practice-areas/${area.slug}`}
                className="group flex items-center justify-between border border-ink/10 bg-white/60 p-5 transition-colors hover:border-maroon/40"
              >
                <span className="font-serif text-lg text-ink">
                  {area.title}
                </span>
                <ArrowRight
                  size={16}
                  className="text-brass transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="bg-ink py-20 text-parchment">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="scale">
            <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl">
                  Ready to Work With Us?
                </h2>
                <p className="mt-4 max-w-xl text-parchment/70">
                  Reach out to our team today for expert guidance from
                  experienced advocates dedicated to protecting your rights
                  and interests.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+254711205997"
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-sans text-sm text-ink transition-colors hover:bg-parchment"
                >
                  <Phone size={15} />
                  +254 711 205 997
                </a>
                <a
                  href="mailto:info@nyamurongiadvocates.local"
                  className="inline-flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3 font-sans text-sm text-parchment transition-colors hover:border-parchment hover:bg-parchment/10"
                >
                  <Mail size={15} />
                  info@nyamurongiadvocates.local
                </a>
                <p className="inline-flex items-center gap-2 px-2 text-sm text-parchment/60">
                  <MapPin size={15} />
                  Lengetia Place, 2nd Floor, Moi Highway, Kisii
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}