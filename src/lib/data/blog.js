export const blogPosts = [
  {
    slug: "herbert-nyamurongi-the-legal-mind-behind-trusted-advocacy-and-results",
    title: "Herbert Nyamurongi: The Legal Mind Behind Trusted Advocacy and Results",
    author: "Samuel Ian",
    date: "2026-04-13",
    category: "Uncategorized",
    excerpt:
      "In the ever-evolving legal landscape, few professionals stand out for their dedication, integrity, and results-driven approach.",
    content: [
      "In the ever-evolving legal landscape, few professionals stand out for their dedication, integrity, and results-driven approach. Herbert Nyamurongi, Senior Advocate at Nyamurongi Advocates, has built a reputation grounded in professionalism, strategic thinking, and a deep commitment to serving clients with excellence.",
      "With years of experience in legal practice, Herbert Nyamurongi has handled a wide range of matters, offering practical solutions to individuals, businesses, and organizations. His approach combines thorough legal knowledge with a strong understanding of real-world challenges, allowing him to deliver effective outcomes tailored to each client's unique needs.",
      "What truly distinguishes Herbert Nyamurongi is his client-centered philosophy. He believes that every client deserves clear communication, honest advice, and unwavering representation. This commitment has earned him the trust of clients who rely on his guidance in navigating complex legal issues with confidence and peace of mind.",
      "Beyond courtroom advocacy, Herbert Nyamurongi is also passionate about legal advisory and preventive legal solutions. He works closely with clients to identify potential risks, provide strategic counsel, and ensure informed decision-making at every stage. His dedication to professionalism and ethical practice continues to shape the firm's commitment to excellence.",
      "As Nyamurongi Advocates continues to grow, Herbert Nyamurongi remains focused on delivering reliable legal services while building lasting relationships with clients. His leadership, expertise, and integrity continue to define the firm's mission of providing trusted legal support and achieving meaningful results.",
      "Have you worked with Herbert Nyamurongi or Nyamurongi Advocates? Share your experience or reach out to learn how our team can assist you with your legal needs today.",
    ],
    comments: [
      {
        id: "c1",
        authorName: "Samuel Ian",
        date: "2026-04-13",
        content: "Trusted legal partner",
        replies: [],
      },
    ],
  },
  {
    slug: "are-kenyas-new-digital-laws-protecting-citizens-or-limiting-freedoms",
    title: "Are Kenya's New Digital Laws Protecting Citizens or Limiting Freedoms?",
    author: "Samuel Ian",
    date: "2026-04-11",
    category: "Uncategorized",
    excerpt:
      "Kenya is experiencing a rapid transformation in the digital space, but with this growth has come an equally fast expansion of legal regulation.",
    content: [
      "Kenya is experiencing a rapid transformation in the digital space, but with this growth has come an equally fast expansion of legal regulation. From proposed amendments to data protection laws to the enforcement of cybercrime legislation and taxation of digital income, the legal landscape is evolving — and not without controversy. These developments are sparking nationwide debate among businesses, professionals, content creators, and ordinary citizens alike.",
      "Recent discussions around digital regulation have intensified following concerns that new cybercrime and surveillance-related laws may grant authorities broader powers to monitor online activity. Critics argue that such laws risk being used to silence dissent and restrict freedom of expression, while supporters maintain they are necessary to combat misinformation, cyber fraud, and online harassment. Legal challenges have already emerged, with civil society groups petitioning courts over provisions they claim could enable surveillance and limit democratic participation.",
      "At the same time, taxation of digital businesses and online income continues to raise questions. As more Kenyans turn to freelancing, online trading, and digital entrepreneurship, proposals to expand tax definitions to include digital marketplaces have generated mixed reactions. While the government seeks to broaden revenue streams, critics argue that heavy taxation could discourage innovation and disproportionately affect young entrepreneurs and small businesses.",
      "Public sentiment around these issues has also been strong. Online discussions show growing frustration over perceived overregulation, with some citizens expressing fears about privacy, surveillance, and increased taxation of digital activities. Others, however, argue that regulation is necessary to create accountability and protect consumers from fraud and misuse of personal data.",
      "The key question remains: how can Kenya strike the right balance between regulation and freedom? On one hand, effective legal frameworks are necessary to maintain order, protect consumers, and support national security. On the other hand, overly restrictive laws risk stifling innovation, limiting free speech, and discouraging economic growth in the digital economy.",
      "As Kenya continues to position itself as a technology hub in Africa, these legal debates are likely to intensify. Businesses, policymakers, and citizens must actively participate in shaping laws that protect rights while fostering innovation. The outcome of these discussions will ultimately determine the future of Kenya's digital economy and the extent to which the law empowers — or restricts — the modern Kenyan.",
    ],
    comments: [],
  },
  {
    slug: "renowned-law-firm-with-a-proven-track-record",
    title: "Renowned Law Firm with a Proven Track Record",
    author: "Samuel Ian",
    date: "2025-11-12",
    category: "Uncategorized",
    excerpt:
      "At Nyamurongi & Company Advocates, we pride ourselves on delivering reliable legal solutions backed by experience, professionalism, and integrity.",
    content: [
      "At Nyamurongi & Company Advocates, we pride ourselves on delivering reliable legal solutions backed by experience, professionalism, and integrity. As a renowned law firm, our team is committed to understanding each client's unique needs and providing practical, results-driven advice across a wide range of legal matters.",
      "From complex corporate transactions to dispute resolution and personal legal services, we approach every case with diligence and attention to detail. We believe in building long-term relationships with our clients by maintaining transparency, responsiveness, and excellence in service delivery.",
      "Through strategic thinking and strong advocacy, we strive to protect our clients' interests and achieve favorable outcomes while upholding the highest standards of legal practice.",
    ],
    comments: [
      {
        id: "c2",
        authorName: "Samuel Ian",
        date: "2026-04-11",
        content: "Trusted legal partner",
        replies: [
          {
            id: "c2-r1",
            authorName: "Nyamurongi Advocates",
            date: "2026-04-12",
            content: "Thank you for the kind words — we're glad we could help.",
          },
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getAllCategories() {
  return [...new Set(blogPosts.map((p) => p.category))];
}
