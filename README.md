# Ayoub Ben Yahia Portfolio

Professional portfolio for Ayoub Ben Yahia, a Data Analyst & Marketing Analytics Specialist based in Morocco.

Live site: `https://ayoub-benyahiia.github.io`

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Supabase
- Formspree contact form
- react-helmet-async
- Vitest
- GitHub Pages

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

Run lint:

```bash
npm run lint
```

## Environment Variables

The app reads public Supabase configuration from Vite environment variables:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Do not commit `.env` or real secret values. GitHub Pages deployment reads these values from repository secrets.

If Supabase variables are missing locally, the app now renders safe fallback profile/CTA data and empty states instead of crashing.

## Routes

- `/` - Home
- `/projects` - Projects
- `/experience` - Experience
- `/education` - Education and certificates
- `/activities` - Activities
- `/contact` - Formspree contact form
- `/insights` - Insights listing
- `/insights/:slug` - Insight article
- `/blog` - Legacy insights listing route
- `/blog/:slug` - Legacy insight article route
- `*` - Not found page

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`.

The workflow:

- runs on push to `main`
- supports `workflow_dispatch`
- uses Node 20
- installs dependencies with `npm ci`
- builds with `npm run build`
- copies `dist/index.html` to `dist/404.html` for GitHub Pages SPA fallback
- uploads the `dist` artifact
- deploys with `actions/deploy-pages@v4`

Do not remove the `cp ./dist/index.html ./dist/404.html` fallback step.

## SEO

SEO helpers live in:

- `src/components/SEO.tsx`
- `src/lib/seo.ts`
- `src/lib/schema.ts`

Crawler files live in:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`
- `public/og-image.svg`
- `public/.nojekyll`

## Contact Form

The contact page uses Formspree through `@formspree/react` with form id `xojrpwnl`.

The visible form fields are:

- `name`
- `email`
- `company`
- `project_type`
- `budget`
- `message`

Do not expose private Gmail addresses or add backend code for this form unless the data model changes intentionally.
