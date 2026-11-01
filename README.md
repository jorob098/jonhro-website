# jonhrorobles.com

Website of Jonhro Robles, licensed customs broker in Cebu, Philippines.
Built with React + Vite and hosted on GitHub Pages at **https://www.jonhrorobles.com**.

## Run it locally

```bash
npm install
npm run dev
```

Create a `.env.local` file (never committed) with the same values as the GitHub Secrets:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_RECAPTCHA_SITE_KEY=...
VITE_REACT_APP_GAS_URL=...
```

## Deploying

Every push to `main` builds and publishes the site automatically
(`.github/workflows/deploy.yml`). Work on a branch and merge a pull request
when you're happy with the change.

## Where things live

| What | Where |
| --- | --- |
| Pages and sections | `src/components/` |
| Page titles, descriptions, share image | `src/seo/pages.js` |
| Translations (en, tl, es, ja, zh, ko) | `src/locales/<lang>/translation.json` |
| Site-wide styles | `src/Style.css` |
| Shipment tracker page | `src/components/Track.jsx` (www.jonhrorobles.com/track) |
| Tracker lookup script (Google Apps Script) | `scripts/track-lookup.gs` |
| Chat database rules (Supabase) | `supabase/chat-policies.sql` |

The build also writes one HTML file per page (`about.html`, `services.html`, …),
`404.html` and `sitemap.xml` — see `vite.config.js`.
