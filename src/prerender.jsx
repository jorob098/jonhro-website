// Build-time only (loaded by vite.config.js, never shipped to the browser).
// Turns each blog post into plain HTML so the per-post files GitHub Pages serves
// already contain the article. Google can run JavaScript, but most AI answer
// engines (ChatGPT, Perplexity, Claude and others) read only the raw HTML.

import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { formatPostDate } from './content/posts.js';
import en from './locales/en/translation.json';

// English-only translations for posts that use t() (no browser language detection here)
const i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  initAsync: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

const bodies = import.meta.glob('./components/blog/posts/*.jsx', { eager: true });

export function renderPostHtml(post) {
  const Body = bodies[`./components/blog/posts/${post.component}.jsx`]?.default;
  if (!Body) return null;

  // Same structure and class names as BlogPost.jsx. React replaces it on load.
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
    <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
      <main className="blog-wrap">
        <article className="post">
          <a href="/blog/" className="post-back">All articles</a>
          <span className="blog-tag">{post.tag}</span>
          <h1>{post.title}</h1>
          <div className="post-author">
            <div>
              <strong>Jonhro Robles</strong>
              <span>
                PRC Licensed Customs Broker · {formatPostDate(post.date)} · {post.readMinutes} min read
              </span>
            </div>
          </div>
          <div className="post-body">
            <Body />
          </div>
        </article>
      </main>
    </MemoryRouter>
    </I18nextProvider>
  );
}
