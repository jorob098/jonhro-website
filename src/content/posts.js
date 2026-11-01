// Blog post list (newest first). Each post's text lives in
// src/components/blog/posts/<Component>.jsx, registered in BlogPost.jsx.

export const POSTS = [
  {
    slug: "importing-steel-into-cebu",
    title: "Importing Steel into Cebu: Rebar, H-Beams and Prefab Buildings",
    description:
      "What importers need to know about BPS certification, documents, duties and common delays when bringing steel products through the Port of Cebu.",
    date: "2026-11-01",
    tag: "Steel",
    readMinutes: 8,
  },
  {
    slug: "cebu-trade-landscape",
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
