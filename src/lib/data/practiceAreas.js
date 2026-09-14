export const practiceAreas = [
  {
    slug: "litigation",
    icon: "Gavel",
    kicker: "Division I",
    title: "Litigation & Dispute Resolution",
    summary:
      "Representation in court, strategic advice through the life of a matter, and protection of the client's rights when the brief turns adversarial.",
    body: [
      "When a matter ends in court, counsel must present the case in its most favourable light and keep the client's rights intact through every step of the proceeding. That is the first work of this chambers.",
      "The litigation division appears in civil, commercial, land and employment disputes before the High Court, the Environment and Land Court, the Employment and Labour Relations Court, and the Court of Appeal. We take instructions to prosecute and to defend; we also hold brief, settle, and advise on whether a matter should be fought at all.",
      "Our published view is simple: an advocate's value is legal expertise, protection of rights, strategic advice, and representation. We do not dress that work in theatre. We keep a file, we know the record, and we appear.",
    ],
    work: [
      "Civil and commercial suits",
      "Appellate advocacy",
      "Injunctions and interim relief",
      "Defence of institutional respondents",
      "Negotiated settlement and ADR",
    ],
  },
  {
    slug: "probate",
    icon: "ScrollText",
    kicker: "Division II",
    title: "Probate & Succession",
    summary:
      "Letters of administration, testamentary dispositions, and the drafting and custody of wills — the quiet work of an estate done properly.",
    body: [
      "Probate, as we describe it, is a precise menu: taking out letters of administration, preparation of testamentary dispositions, and the drafting and custody of wills. Families come to us when a death has left land, shares, and unfinished paper.",
      "Kenyan succession is procedural and unforgiving of gaps. We prepare petitions for grant, citations, summons for confirmation, and the instruments that follow a confirmed grant. Where a will is contested or a grant is to be revoked, the file moves into the litigation division without the client having to instruct a second chambers.",
      "Custody of a will is a confidence. We keep it as such.",
    ],
    work: [
      "Drafting and custody of wills",
      "Petitions for grant of probate and letters of administration",
      "Confirmation of grant",
      "Rectification and revocation",
      "Dependants' and family provision",
    ],
  },
  {
    slug: "conveyancing",
    icon: "Home",
    kicker: "Division III",
    title: "Conveyancing & Real Estate",
    summary:
      "Mortgages, sales and transfers of land, charges, debentures, leases, changes of user, discharges, caveats, cautions and licences.",
    body: [
      "Conveyancing in these chambers is a broad menu: mortgages, sales and transfers of land, registration of charges and debentures, leases, changes of user, discharges, caveats, cautions and licences. The list is long because Kenyan land is long on procedure.",
      "We act for purchasers, vendors, lenders and developers. Due diligence on title, the agreement for sale, completion, and registration are run as a single file — not as a chain of disconnected clerks. Where a caution or caveat must be registered or withdrawn, we do that work in the same breath as the transfer.",
      "Nyanza land — ancestral, adjudicated, leasehold, and company — has its own grain. We have practised in it for years.",
    ],
    work: [
      "Sale and transfer of land",
      "Charges, mortgages and discharges",
      "Leases and licences",
      "Caveats, cautions and restrictions",
      "Change of user and development consents",
    ],
  },
  {
    slug: "commercial",
    icon: "Briefcase",
    kicker: "Division IV",
    title: "Commercial & Corporate",
    summary:
      "Company work, commercial contracts, and counsel to trading houses, factories, and institutions that need a Kisii record and a Nairobi reach.",
    body: [
      "The commercial and corporate division advises on the instruments that keep a business standing: incorporation and reconstitution, shareholders' arrangements, supply and distribution contracts, securities, and the disputes that follow when those papers fail.",
      "Chambers have acted for bottlers, supermarkets, construction groups and banks. The work is not boutique fashion; it is the day-to-day law of companies that employ people and hold land in the region.",
      "When a commercial dispute hardens, the file is tried by the same chambers that drafted the contract. Continuity of instruction is part of the value.",
    ],
    work: [
      "Company formation and reconstitution",
      "Commercial contracts and securities",
      "Shareholder and partnership disputes",
      "Debt recovery",
      "Regulatory and licensing advice",
    ],
  },
  {
    slug: "employment",
    icon: "HardHat",
    kicker: "Division V",
    title: "Employment & Labour",
    summary:
      "Counsel to employers and, where instructed, to unions — with a standing record for Kisii University, bottlers, and trading companies before the ELRC.",
    body: [
      "Employment and labour is a substantial part of the chambers' public record. We have appeared for Kisii University, Kisii Bottlers, Almasi Bottlers, Shivling Supermarket and other employers before the Employment and Labour Relations Court at Kisumu, Nakuru and Nairobi.",
      "The work covers unfair termination, collective bargaining, union recognition, garnishee and execution of awards, and the daily hygiene of contracts, policies and disciplinary process. Institutions instruct us because we know both the statute and the forum.",
      "A workplace dispute is rarely improved by delay. We take early instructions and keep the record tight.",
    ],
    work: [
      "Unfair termination and constructive dismissal",
      "Union claims and collective bargaining",
      "Employment contracts and handbooks",
      "Disciplinary process and redundancy",
      "Enforcement and stay of awards",
    ],
  },
  {
    slug: "land",
    icon: "Trees",
    kicker: "Division VI",
    title: "Land & Environment",
    summary:
      "Title, occupation, boundary and environment — tried in the Environment and Land Court at Kisii, Kilgoris, Kericho and beyond.",
    body: [
      "Land in Kisii, Nyamira, Transmara and Kericho is not an abstraction. It is tea, ancestral occupation, company leasehold, and the long memory of families. The Environment and Land Court is the ordinary forum of this chambers.",
      "We take instructions on recovery of possession, trespass, trust and occupation, adverse claims, and the environmental overlay that now sits on development. Construction clients and private landowners instruct us in the same division.",
      "Where a land file is also a succession file, the two divisions work as one. That is the advantage of a small chambers that still keeps a full menu.",
    ],
    work: [
      "Recovery of land and trespass",
      "Occupation, trust and family land",
      "ELC petitions and judicial review",
      "Boundaries and mutation disputes",
      "Development and environmental compliance",
    ],
  },
];

export function getPracticeArea(slug) {
  return practiceAreas.find((p) => p.slug === slug);
}
