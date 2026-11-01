import { Helmet } from 'react-helmet-async';
import { PAGES, SITE_URL, SHARE_IMAGE } from '../seo/pages';

/**
 * Page <head> tags. Pass `path` to use the shared settings in src/seo/pages.js,
 * or pass title/description directly. `jsonLd` adds structured data.
 */
export default function Seo({ path, title, description, type, jsonLd, noindex = false }) {
  const page = (path && PAGES[path]) || {};
  const pageTitle = title || page.title;
  const pageDescription = description || page.description;
  const pageType = type || page.type || 'website';
  const url = `${SITE_URL}${path && path !== '/' ? path : '/'}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      {/* Open Graph (Facebook/LinkedIn previews) */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={pageType} />
      <meta property="og:image" content={SHARE_IMAGE} />

      {/* Twitter/X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={SHARE_IMAGE} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
