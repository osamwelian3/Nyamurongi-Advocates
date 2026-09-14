export const authors = [
  { slug: "chambers", name: "Nyamurongi & Co.", role: "Chambers" },
  { slug: "h-nyamurongi", name: "H. Nyamurongi", role: "Managing Partner" },
];

export const categories = [
  { slug: "practice", name: "Practice" },
  { slug: "succession", name: "Succession" },
  { slug: "land", name: "Land" },
  { slug: "counsel", name: "Counsel" },
];

export const blogPosts = [
  {
    slug: "why-instruct-an-advocate",
    title: "Why you may need to instruct an advocate",
    excerpt:
      "Legal expertise, protection of your rights, strategic advice, and representation in court — four reasons the brief should not be kept in the drawer.",
    category: "counsel",
    author: "h-nyamurongi",
    date: "2023-05-03",
    body: [
      "Attorneys are trained and licensed professionals with a deep understanding of the law and of legal process. They have the knowledge to navigate a complex file and to help you reach the best available outcome. That is the starting point, not a slogan.",
      "Protection of rights comes next. Counsel can ensure you are not taken advantage of by the other party, and that any action taken against you is handled fairly and in accordance with the law. A letter on chambers paper is not decoration; it is a marker that the matter is now on a professional record.",
      "Strategic advice runs through the life of the file. An advocate helps you understand the options and make informed decisions about how to proceed — including the unfashionable decision to settle, or not to sue.",
      "If the matter ends in court, counsel represents you and advocates for your interests. They present the case in its most favourable light and keep your rights intact throughout the proceeding. That is the work we take when instructed.",
    ],
  },
  {
    slug: "importance-of-law",
    title: "The importance of law in a society",
    excerpt:
      "Law sets the standard for acceptable conduct and supplies the framework for resolving dispute. Without it, people are left to their own devices.",
    category: "practice",
    author: "chambers",
    date: "2023-05-04",
    body: [
      "Law is crucial to maintaining a peaceful and just society. It sets the standards for acceptable behaviour and provides a framework for resolving disputes and addressing grievances. This is not an academic observation; it is the daily premise of a Kisii chambers.",
      "Without the law, people would be left to their own devices, leading to chaos and anarchy. The law provides the framework for protecting individual rights, promoting justice, maintaining order, creating a predictable environment, and preserving democracy.",
      "Our work is a small part of that framework: a will that can be proved, a transfer that can be registered, a claim that can be tried. The grandeur of the constitution is nothing if the ordinary file is not kept.",
    ],
  },
  {
    slug: "conveyancing-in-kenya",
    title: "Conveyancing: the broad menu of Kenyan land",
    excerpt:
      "Mortgages, sales and transfers, charges, debentures, leases, change of user, discharges, caveats, cautions and licences — and why each of them is a file, not a form.",
    category: "land",
    author: "chambers",
    date: "2023-03-07",
    body: [
      "Conveyancing in Kenya is a broad menu. It involves mortgages, sales and transfers of land, registration of charges, debentures, leases, changes of user, discharges, caveats, cautions and licences, among others. Each item has a statute, a registry, and a habit of going wrong when rushed.",
      "The purchaser who treats a search as a formality, or the lender who takes a charge over land that is already cautioned, discovers this too late. Due diligence is not a courtesy; it is the work.",
      "Nyamurongi & Company Advocates is at your service for legal representation on these instruments. We act for vendors, purchasers and chargees from our Kisii chambers, with the land of Nyanza as our ordinary subject.",
    ],
  },
  {
    slug: "probate-and-letters-of-administration",
    title: "Probate, wills, and letters of administration",
    excerpt:
      "Taking out letters of administration, preparing testamentary dispositions, and the drafting and custody of wills — succession as it is actually practised.",
    category: "succession",
    author: "chambers",
    date: "2023-03-07",
    body: [
      "Probate, as practised in these chambers, includes taking out letters of administration, the preparation of testamentary dispositions, and the drafting and custody of wills. It is family work, and it is land work, and it is almost never only one of those.",
      "A grant that is not confirmed cannot distribute. A will that is not attested cannot be proved. A dependant who is omitted does not disappear. The Law of Succession Act is particular, and the probate registry is more particular still.",
      "We advise on the making of a will while the testator can still speak, and we petition for grant when they cannot. Custody of the will is held in confidence at chambers.",
    ],
  },
  {
    slug: "instructing-chambers",
    title: "How to instruct these chambers",
    excerpt:
      "A short note on what we need from you, what you should expect from us, and the difference between a consultation and a brief.",
    category: "counsel",
    author: "h-nyamurongi",
    date: "2024-09-12",
    body: [
      "A consultation is a conversation. A brief is a file. We are happy to begin with the first; we cannot act in a forum until we have the second.",
      "Bring the papers you have: title, correspondence, a will, a contract, a demand, a statement of claim. If you have none, bring a chronology in your own words. We will tell you what is missing.",
      "Fees are discussed before work is done. We do not surprise a client with a bill for a step they did not authorise. Where a matter is urgent — an injunction, a caveat, a limitation date — say so at the first call.",
      "You may write to info@nyamurongiadvocates.com, telephone +254 711 205 997, or attend at Lengetia Place, Moi Highway, Kisii, between 8:00 and 17:00 on a working day.",
    ],
  },
  {
    slug: "employment-files-in-the-elrc",
    title: "Employment files in the ELRC",
    excerpt:
      "Notes from a chambers that has kept standing instructions for a university, bottlers, and trading houses before the Employment and Labour Relations Court.",
    category: "practice",
    author: "h-nyamurongi",
    date: "2024-11-20",
    body: [
      "Employment litigation in Kenya has a dedicated court, a dedicated statute, and a dedicated appetite for delay. The Employment and Labour Relations Court at Kisumu, Nakuru and Nairobi is a forum we know because we have been there, repeatedly, for the same class of client: institutions with payrolls and unions.",
      "The files are often the same in shape — alleged unfair termination, a recognition dispute, a garnishee on a decree — and different in their facts. What they share is the value of an early, complete record: the contract, the show-cause, the minutes, the collective bargaining agreement.",
      "Employers who keep that record instruct us before the claim is filed. Employers who do not, instruct us after. Both are entitled to a defence. The first are easier to help.",
    ],
  },
];

export function getArticle(slug) {
  return blogPosts.find((a) => a.slug === slug);
}
export function getAuthor(slug) {
  return authors.find((a) => a.slug === slug);
}
