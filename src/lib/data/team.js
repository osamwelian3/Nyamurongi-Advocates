export const teamMembers = [
  {
    slug: "h-nyamurongi",
    name: "H. Nyamurongi",
    initials: "HN",
    role: "Managing Partner",
    courts: "Advocate of the High Court of Kenya",
    bio: [
      "H. Nyamurongi is the managing partner of Nyamurongi & Company Advocates and an advocate of the High Court of Kenya. The chambers in Kisii are conducted in his name, with a public record of appearance stretching back to 2008.",
      "He takes the lead on litigation, commercial instructions, and institutional employment work. Reported and publicly listed matters include appellate work for Kisii Bottlers, a long run of employment files for Kisii University, and land recovery and construction disputes in the Environment and Land Court.",
      "The practice he keeps is the one the chambers advertise: litigation, probate, conveyancing, and commercial & corporate — discharged with what the firm has called an ethical and trustworthy approach, and a taste for strategy over spectacle.",
    ],
    focus: ["Litigation", "Commercial", "Employment", "Land"],
  },
  {
    slug: "l-kebungo",
    name: "L. Kebungo",
    initials: "LK",
    role: "Associate Advocate",
    courts: "Advocate of the High Court of Kenya",
    bio: [
      "L. Kebungo practises from the chambers as associate advocate, with instructions on the public record in Environment and Land Court matters at Kisii.",
      "The associate's work sits across land, conveyancing support, and the day-to-day conduct of files — mention, holding brief, and the paper that keeps a Kisii chambers moving.",
      "Clients instructing the firm are attended by counsel of the chambers, not by a rotating cast of unnamed clerks.",
    ],
    focus: ["Land", "Conveyancing", "Civil practice"],
  },
];

export function getTeamMember(slug) {
  return teamMembers.find((c) => c.slug === slug);
}
