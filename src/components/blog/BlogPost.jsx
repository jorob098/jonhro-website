import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../Seo';
import NotFound from '../NotFound';
import { POSTS, formatPostDate } from '../../content/posts';
import { SITE_URL, SHARE_IMAGE } from '../../seo/pages';
import portrait from '../../assets/jonhro-port.webp';
import './Blog.css';

// slug -> article body
const BODIES = {
  'de-minimis-10000-review': lazy(() => import('./posts/DeMinimisReview')),
  'importing-steel-into-cebu': lazy(() => import('./posts/ImportingSteelCebu')),
  'cebu-trade-landscape': lazy(() => import('./posts/CebuTradeLandscape')),
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const Body = BODIES[slug];
  if (!post || !Body) return <NotFound />;

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Jonhro Robles', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Jonhro Robles', url: SITE_URL },
    image: SHARE_IMAGE,
    mainEntityOfPage: url,
  };

  return (
    <>
      <Seo path={`/blog/${post.slug}`} jsonLd={jsonLd} />
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
              <span>PRC Licensed Customs Broker · {formatPostDate(post.date)} · {post.readMinutes} min read</span>
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
