// Blog post list (newest first). Each post's text lives in
// src/components/blog/posts/<component>.jsx.
//
// Optional fields:
//   updated  - date of the last real content change (shown to Google as dateModified)
//   image    - share image under /public (defaults to the site share card)
//   faq      - [{ q, a }] shown at the end of the post and sent to Google as FAQ data.
//              Keep answers plain text and in sync with what the article says.

export const POSTS = [
  {
    slug: "passed-customs-broker-exam-2026-next-steps",
    component: "CubleNextSteps2026",
    title: "Passed the November 2026 Customs Broker Exam (CuBLE)? Your Next Steps, from a Cebu Customs Broker",
    description:
      "2,377 of 3,440 passed the November 2026 CuBLE. PRC registration from December 21, what to prepare, BOC accreditation, and why the people around you matter most in your first year.",
    date: "2026-11-24",
    tag: "Careers",
    readMinutes: 7,
    image: "/images/share-cuble-2026.png",
    faq: [
      {
        q: "How many passed the November 2026 Customs Brokers Licensure Examination?",
        a: "The PRC announced that 2,377 out of 3,440 examinees passed, a passing rate of about 69.1%. The exam was held on November 17 and 18, 2026 in NCR, Butuan, Cebu, Davao, Koronadal and Lucena, and results came out on November 23, 2026.",
      },
      {
        q: "When can November 2026 CuBLE passers register with the PRC?",
        a: "Online registration for the Professional Identification Card and Certificate of Registration starts on December 21, 2026 through the PRC website. Bring a screenshot of your system-generated registration form and a valid government-issued ID, and sign the Roster of Registered Professionals in person.",
      },
      {
        q: "When is the oath-taking for the November 2026 customs broker passers?",
        a: "As of November 24, 2026, the PRC has not announced the oath-taking date and venue. It said they will be announced later. This article will be updated when the schedule is out.",
      },
      {
        q: "Can I process customs entries right after passing the exam?",
        a: "No. You first need to register with the PRC and get your license. To file entries with the Bureau of Customs, you also need to be accredited by the BOC Account Management Office (AMO), which requires an application form and a BIR Customs Broker Clearance Certificate, among other documents.",
      },
      {
        q: "Do I need to join the Chamber of Customs Brokers, Inc. (CCBI)?",
        a: "Membership in the CCBI, the PRC-accredited integrated professional organization of customs brokers, comes automatically when you register. Keeping it in good standing matters: proof of membership is required when you obtain or renew your PRC registration, and BOC registration renewal asks for a Certificate of Good Standing from the accredited organization.",
      },
      {
        q: "What should I do if I did not pass the 2026 CuBLE?",
        a: "The regular Customs Brokers Licensure Examination is held once a year, in November. Watch for the PRC's schedule of licensure examinations for the next year, which it usually posts in November, and request your verification of ratings to see which subjects to focus on.",
      },
    ],
  },
  {
    slug: "de-minimis-10000-review",
    component: "DeMinimisReview",
    title: "Will Imports Under ₱10,000 Soon Be Taxed? What the De Minimis Review Means for You",
    description:
      "The DOF is studying the removal of the ₱10,000 de minimis exemption. What the rule covers today, what could change, and what importers and online sellers should do now.",
    date: "2026-11-07",
    tag: "Policy",
    readMinutes: 5,
  },
  {
    slug: "importing-steel-into-cebu",
    component: "ImportingSteelCebu",
    title: "Importing Steel into Cebu: Rebar, H-Beams and Prefab Buildings",
    description:
      "What importers need to know about BPS certification, documents, duties and common delays when bringing steel products through the Port of Cebu.",
    date: "2026-11-01",
    tag: "Steel",
    readMinutes: 8,
  },
  {
    slug: "cebu-trade-landscape",
    component: "CebuTradeLandscape",
    title: "Cebu's Evolving Trade Landscape: Why Customs Expertise Matters",
    description:
      "How customs modernization and stricter regulations are reshaping Cebu's trade environment, and why customs expertise matters more than ever.",
    date: "2025-07-26",
    tag: "Insights",
    readMinutes: 4,
  },
];

export const formatPostDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
