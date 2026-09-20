import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamMemberCard from "@/components/TeamMemberCard";
import { teamMembers } from "@/lib/data/team";
import { firm } from "@/lib/data/firm";

export const metadata = {
  title: `Counsel | ${firm.name}`,
  description:
    "The advocates of Nyamurongi & Company Advocates — a small Kisii chambers appearing in the fora where the dispute lives.",
};

export default function TeamIndex() {
  return (
    <main className="bg-parchment text-ink">
      <PageHero
        tone="ink"
        image
        kicker="Counsel"
        title="The people who keep the file."
        lede="A small Kisii chambers. Advocates of the High Court of Kenya, instructed by name, appearing in the fora where the dispute lives."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {teamMembers.map((member, i) => (
            <Reveal key={member.slug} delay={i * 0.06}>
              <TeamMemberCard member={member} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 max-w-2xl">
          <h2 className="font-display text-3xl">How the chambers work</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
            Clients instructing the firm are attended by counsel of the
            chambers — not by a rotating cast of unnamed clerks. Files in
            land that are also files in succession move between divisions
            without a second retainer. That is the advantage of a small
            practice that still keeps a full menu.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
