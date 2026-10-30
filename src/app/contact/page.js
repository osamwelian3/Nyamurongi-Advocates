import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { firm } from "@/lib/data/firm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Contact | ${firm.name}`,
  description: `Contact ${firm.name} in ${siteConfig.address.city}: telephone, email, office address and a message form.`,
};

function InfoCard({ icon: Icon, label, children, href, external }) {
  const body = (
    <>
      <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-maroon" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-ink/45">{label}</span>
        <span className="mt-1 block text-base leading-snug">{children}</span>
      </span>
      {href && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-ink/35 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-maroon"
        />
      )}
    </>
  );
  const cls = "group flex items-start gap-4 border border-ink/10 bg-parchment p-5 transition-colors duration-150";
  if (!href) return <div className={cls}>{body}</div>;
  return (
    <a
      href={href}
      className={`${cls} hover:bg-parchment-2`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

export default function ContactPage() {
  const { phone, email, address, hours } = siteConfig;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.line1}, ${address.line2}, ${address.city}, ${address.country}`
  )}`;

  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Contact"
        title="Reach out for trusted legal support."
        lede={`A professional law firm in ${address.city} offering reliable legal advice, representation and consultation: prompt, confidential and practical.`}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-5">
          <Reveal>
            <InfoCard icon={Phone} label={phone.label} href={phone.href}>
              {phone.value}
            </InfoCard>
          </Reveal>
          <Reveal delay={0.06}>
            <InfoCard icon={Mail} label="Email" href={`mailto:${email}`}>
              <span className="break-all">{email}</span>
            </InfoCard>
          </Reveal>
          <Reveal delay={0.12}>
            <InfoCard icon={MapPin} label="Visit the chambers" href={directions} external>
              {address.line1}
              <br />
              {address.line2}, {address.city}
              <span className="mt-1 block text-xs text-ink/50">Open in Google Maps</span>
            </InfoCard>
          </Reveal>
          <Reveal delay={0.18}>
            <InfoCard icon={Clock} label="Hours">
              {hours}
            </InfoCard>
          </Reveal>

          <Reveal delay={0.24} className="pt-4">
            <p className="text-sm leading-relaxed text-ink/70">
              A consultation is a conversation; a brief is a file. Not sure what to bring?{" "}
              <Link
                href="/blog/how-to-instruct-these-chambers"
                className="underline underline-offset-4 hover:text-maroon"
              >
                How to instruct these chambers
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="border border-ink/10 bg-parchment-2/40 p-6 sm:p-10">
            <h2 className="font-display text-3xl sm:text-4xl">Send us a message</h2>
            <p className="mt-2 text-sm text-ink/65">We&rsquo;ll reply to the email address you give us.</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
