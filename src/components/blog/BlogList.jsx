import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../Seo';
import { POSTS, formatPostDate } from '../../content/posts';
import './Blog.css';

export default function BlogList() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Seo path="/blog" />
      <main className="blog-wrap">
        <section className="blog-head">
          <span className="blog-eyebrow">Blog</span>
          <h1>Customs &amp; Trade Insights</h1>
          <p>Practical guides on Philippine customs, permits and duties, written from the Port of Cebu.</p>
        </section>

        <section className="blog-list">
          <Link to={`/blog/${featured.slug}`} className="blog-card featured">
            <span className="blog-tag">{featured.tag}</span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <span className="blog-meta">
              {formatPostDate(featured.date)} · {featured.readMinutes} min read
            </span>
            <span className="blog-read">Read article <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>

          {rest.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-tag">{post.tag}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="blog-meta">
                {formatPostDate(post.date)} · {post.readMinutes} min read
              </span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
