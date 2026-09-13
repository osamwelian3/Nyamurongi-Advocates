import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="bg-ink text-parchment">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal direction="up">
            <p className="font-sans text-sm tracking-[0.2em] text-brass">
              Contact Us
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Reach Out for Trusted Legal Support & Guidance
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-parchment/70">
              Nyamurongi Advocates is a professional law firm in Kenya offering
              reliable legal advice, representation, and consultation services.
              We are committed to providing prompt, confidential, and practical
              legal support across a wide range of legal matters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT INFO + FORM ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          {/* Contact details */}
          <Reveal direction="left">
            <div className="space-y-6">
              <a
                href="tel:+254711205997"
                className="group flex items-start gap-4 rounded-sm border border-ink/10 bg-white/60 p-6 transition-colors hover:border-maroon/40"
              >
                <Phone
                  size={22}
                  className="mt-0.5 shrink-0 text-brass"
                />
                <div>
                  <p className="font-sans text-sm font-medium text-ink">
                    Call Now
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    +254 711 205 997
                  </p>
                </div>
              </a>

              <a
                href="mailto:info@nyamurongiadvocates.local"
                className="group flex items-start gap-4 rounded-sm border border-ink/10 bg-white/60 p-6 transition-colors hover:border-maroon/40"
              >
                <Mail
                  size={22}
                  className="mt-0.5 shrink-0 text-brass"
                />
                <div>
                  <p className="font-sans text-sm font-medium text-ink">
                    Email Us
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    info@nyamurongiadvocates.local
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-sm border border-ink/10 bg-white/60 p-6">
                <MapPin
                  size={22}
                  className="mt-0.5 shrink-0 text-brass"
                />
                <div>
                  <p className="font-sans text-sm font-medium text-ink">
                    Visit Office
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    Lengetia Place, 2nd Floor
                    <br />
                    Moi Highway
                    <br />
                    Kisii
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal direction="right" delay={0.1}>
            <div className="rounded-sm border border-ink/10 bg-white/60 p-8 md:p-10">
              <h2 className="font-serif text-2xl text-ink">Send Us a Message</h2>
              <p className="mt-2 text-sm text-slate">
                Reach out to our team today for expert guidance from
                experienced advocates dedicated to protecting your rights and
                interests.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}