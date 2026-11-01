import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PAGES, SITE_URL } from './src/seo/pages.js'

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * After building, write one HTML file per page (about.html, services.html, …)
 * with that page's title, description and share tags already in place.
 * GitHub Pages serves /about from about.html with a normal 200 status, so
 * Google indexes every page and Facebook/LinkedIn previews show the right text.
 * Also writes 404.html (for unknown URLs) and sitemap.xml.
 */
function perPageHtml() {
  let outDir = 'dist'
  return {
    name: 'per-page-html',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')

      const render = (path, page) => {
        const url = `${SITE_URL}${path === '/' ? '/' : path}`
        const title = escapeHtml(page.title)
        const desc = escapeHtml(page.description)
        return template
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:type" content=")[^"]*/, `$1${page.type || 'website'}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${desc}`)
      }

      for (const [path, page] of Object.entries(PAGES)) {
        const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
        writeFileSync(resolve(outDir, file), render(path, page))
      }

      // Unknown URLs: GitHub Pages serves this with a 404 status; the app shows its "not found" page.
      const notFound = template
        .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Jonhro Robles</title>')
        .replace(/<link rel="canonical"[^>]*>\s*/, '<meta name="robots" content="noindex" />\n    ')
      writeFileSync(resolve(outDir, '404.html'), notFound)

      const today = new Date().toISOString().slice(0, 10)
      const urls = Object.keys(PAGES)
        .map((p) => `  <url>\n    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
        .join('\n')
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n  <url>\n    <loc>${SITE_URL}/track</loc>\n  </url>\n</urlset>\n`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/', // custom domain: www.jonhrorobles.com
  plugins: [react(), perPageHtml()],
})
