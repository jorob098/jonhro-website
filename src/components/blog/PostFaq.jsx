import { POSTS } from '../../content/posts';

// Renders a post's `faq` list from posts.js. The same list feeds the FAQPage
// structured data, so the visible answers and what Google reads always match.
export default function PostFaq({ slug, heading = 'Frequently asked questions' }) {
  const faq = POSTS.find((p) => p.slug === slug)?.faq;
  if (!faq?.length) return null;

  return (
    <section className="post-faq">
      <h2>{heading}</h2>
      {faq.map(({ q, a }) => (
        <div key={q} className="post-faq-item">
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}
    </section>
  );
}
