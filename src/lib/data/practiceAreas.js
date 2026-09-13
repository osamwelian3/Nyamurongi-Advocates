export const practiceAreas = [
  {
    slug: "corporate-business-law",
    title: "Corporate & Business Law",
    tagline: "Building and Protecting Your Business the Right Way",
    icon: "Briefcase",
    summary:
      "Starting and running a business involves more than just great ideas and hard work — it requires strong legal foundations.",
    intro:
      "Corporate and Business Law focuses on helping entrepreneurs, companies, and organizations operate legally, minimize risks, and grow sustainably. At Nyamurongi Advocates, we assist businesses at every stage, from formation to expansion and even restructuring. Whether you are launching a startup, entering into partnerships, or negotiating contracts, our team ensures your interests are protected.",
    coverage: [
      {
        group: "What Corporate & Business Law Covers",
        items: [
          "Business registration and company formation",
          "Partnership agreements and shareholder agreements",
          "Drafting and reviewing contracts",
          "Business compliance and regulatory advice",
          "Mergers and acquisitions",
          "Corporate governance and advisory",
          "Business dispute resolution",
        ],
      },
    ],
    exampleSituations: [
      "Two partners want to start a company but need a legally binding partnership agreement to avoid future disputes",
      "A business owner needs help reviewing a supplier contract before signing",
      "A company wants to expand operations and needs legal guidance on compliance and licensing",
    ],
    closing:
      "Corporate law helps prevent legal issues before they arise and ensures your business operates smoothly and securely.",
  },
  {
    slug: "civil-criminal-litigation",
    title: "Civil & Criminal Litigation",
    tagline: "Strong Representation When It Matters Most",
    icon: "Gavel",
    summary:
      "Legal disputes can arise unexpectedly, and when they do, having experienced legal representation is critical.",
    intro:
      "Civil and Criminal Litigation involves representing clients in court and resolving disputes through legal proceedings or negotiations. At Nyamurongi Advocates, we provide strategic representation designed to protect your rights and achieve favorable outcomes.",
    coverage: [
      {
        group: "Civil Litigation",
        items: [
          "Contract disputes",
          "Debt recovery",
          "Property disputes",
          "Business disputes",
          "Personal injury claims",
        ],
      },
      {
        group: "Criminal Litigation",
        items: [
          "Criminal defense representation",
          "Bail applications",
          "Appeals",
          "Legal advice during investigations",
          "Representation in criminal trials",
        ],
      },
    ],
    exampleSituations: [
      "A client is owed money and needs help recovering unpaid debts",
      "A property ownership dispute arises between two parties",
      "An individual is charged with a criminal offense and requires legal defense",
    ],
    closing:
      "Our approach focuses on careful case preparation, strategic negotiation, and effective courtroom advocacy.",
  },
  {
    slug: "property-real-estate-law",
    title: "Property & Real Estate Law",
    tagline: "Securing Your Property Investments",
    icon: "Home",
    summary:
      "Property transactions often involve significant financial commitments, making legal guidance essential.",
    intro:
      "Property and Real Estate Law focuses on ensuring safe and legally compliant property transactions. At Nyamurongi Advocates, we help clients navigate land purchases, property transfers, and disputes with confidence.",
    coverage: [
      {
        group: "What Property & Real Estate Law Covers",
        items: [
          "Land purchase and sale agreements",
          "Title deed verification",
          "Property transfers",
          "Lease agreements",
          "Property disputes",
          "Land ownership advisory",
          "Real estate transactions",
        ],
      },
    ],
    exampleSituations: [
      "A client wants to buy land and needs help verifying ownership documents",
      "A landlord requires a lease agreement for tenants",
      "A dispute arises over property boundaries",
    ],
    closing:
      "Proper legal support helps protect your investment and avoid costly mistakes.",
  },
  {
    slug: "employment-labor-law",
    title: "Employment & Labor Law",
    tagline: "Protecting Workplace Rights",
    icon: "HardHat",
    summary:
      "Employment and Labor Law governs the relationship between employers and employees.",
    intro:
      "Whether you're an employer managing a workforce or an employee protecting your rights, legal guidance is essential. Nyamurongi Advocates offers support to ensure fair, lawful, and compliant workplace practices.",
    coverage: [
      {
        group: "What Employment & Labor Law Covers",
        items: [
          "Employment contracts",
          "Wrongful termination disputes",
          "Workplace disputes",
          "Employee rights advisory",
          "Employer compliance",
          "Redundancy and termination procedures",
          "Workplace policy drafting",
        ],
      },
    ],
    exampleSituations: [
      "An employee is dismissed unfairly and seeks legal advice",
      "A company needs employment contracts drafted",
      "A workplace dispute requires mediation",
    ],
    closing:
      "We aim to resolve employment issues efficiently while protecting your rights.",
  },
  {
    slug: "banking-finance-law",
    title: "Banking & Finance Law",
    tagline: "Navigating Financial Transactions Safely",
    icon: "Landmark",
    summary:
      "Banking and Finance Law involves legal matters related to financial transactions, loans, and banking operations.",
    intro:
      "Whether you're an individual or business, legal guidance ensures financial agreements are fair and secure. Nyamurongi Advocates assists clients in understanding complex financial agreements and minimizing risk.",
    coverage: [
      {
        group: "What Banking & Finance Law Covers",
        items: [
          "Loan agreements",
          "Debt restructuring",
          "Financial disputes",
          "Banking advisory",
          "Securities and guarantees",
          "Financial compliance",
        ],
      },
    ],
    exampleSituations: [
      "A business needs legal advice before signing a loan agreement",
      "A borrower faces difficulties repaying a loan and seeks restructuring advice",
      "A financial dispute arises between a bank and a client",
    ],
    closing: "Our goal is to help clients make informed financial decisions.",
  },
  {
    slug: "family-divorce-law",
    title: "Family & Divorce Law",
    tagline: "Compassionate Legal Support for Personal Matters",
    icon: "Users",
    summary: "Family matters often require sensitive and professional handling.",
    intro:
      "Family and Divorce Law focuses on resolving disputes while protecting the interests of all parties involved. Nyamurongi Advocates provides compassionate legal support during difficult family situations.",
    coverage: [
      {
        group: "What Family & Divorce Law Covers",
        items: [
          "Divorce proceedings",
          "Child custody and support",
          "Spousal maintenance",
          "Property division",
          "Family disputes",
          "Adoption matters",
        ],
      },
    ],
    exampleSituations: [
      "A couple seeking divorce and property division",
      "A parent seeking child custody",
      "Family members involved in inheritance disputes",
    ],
    closing:
      "We approach family matters with professionalism, empathy, and confidentiality to achieve fair outcomes.",
  },
];

export function getPracticeAreaBySlug(slug) {
  return practiceAreas.find((p) => p.slug === slug) || null;
}
