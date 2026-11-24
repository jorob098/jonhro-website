import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../Seo';
import NotFound from '../NotFound';
import { POSTS, formatPostDate } from '../../content/posts';
import portrait from '../../assets/jonhro-port.webp';
import './Blog.css';

// slug -> article body, from each post's `component` in posts.js
const files = import.meta.glob('./posts/*.jsx');
const BODIES = Object.fromEntries(
  POSTS.filter((p) => files[`./posts/${p.component}.jsx`]).map((p) => [
    p.slug,
    lazy(files[`./posts/${p.component}.jsx`]),
  ])
);

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const Body = BODIES[slug];
  if (!post || !Body) return <NotFound />;

  return (
    <>
      {/* Structured data is written into the built HTML by vite.config.js (postJsonLd) */}
      <Seo path={`/blog/${post.slug}`} />
      <main className="blog-wrap">
        <article className="post">
          <Link to="/blog" className="post-back">
            <ArrowLeft size={16} aria-hidden="true" /> All articles
          </Link>
          <span className="blog-tag">{post.tag}</span>
          <h1>{post.title}</h1>
          <div className="post-author">
            <img src={portrait} alt="" width="44" height="44" />
            <div>
              <strong>Jonhro Robles</strong>
              <span>PRC Licensed Customs Broker · {formatPostDate(post.date)}
                {post.updated && post.updated !== post.date && <> · Updated {formatPostDate(post.updated)}</>}
                {' '}· {post.readMinutes} min read</span>
            </div>
          </div>
          <div className="post-body">
            <Suspense fallback={<p className="post-loading">Loading…</p>}>
              <Body />
            </Suspense>
          </div>
        </article>
      </main>
    </>
  );
}
