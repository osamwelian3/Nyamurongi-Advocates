import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import HoverUnderlineItem from "@/components/HoverUnderlineItem";
import { teamMembers, getTeamMember } from "@/lib/data/team";
import { firm } from "@/lib/data/firm";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }) {
  const member = getTeamMember(params.slug);
  if (!member) return {};
  return {
    title: `${member.name} | ${firm.name}`,
    description: member.courts,
  };
}

export default function TeamMemberDetail({ params }) {
  const member = getTeamMember(params.slug);
  if (!member) notFound();

  return (
    <main className="bg-parchment text-ink">
      <PageHero tone="ink" kicker={member.role} title={member.name} lede={member.courts} />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          {member.bio.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed first:mt-0 sm:text-lg">
              {p}
            </p>
          ))}
          <Link
            href="/contact"
            className="mt-10 inline-flex h-12 items-center gap-2 bg-ink px-6 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-elevated"
          >
            Instruct Chambers
            <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">Focus</p>
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {member.focus.map((item, i) => (
              <HoverUnderlineItem key={item} index={i}>
                {item}
              </HoverUnderlineItem>
            ))}
          </ul>
        </Reveal>
      </section>
    </main>
  );
}
