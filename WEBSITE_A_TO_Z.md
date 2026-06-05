# Ayoub Ben Yahia Portfolio - Website A to Z

## 1. Project Overview

This website is the professional portfolio of Ayoub Ben Yahia, a Data Analyst & Marketing Analytics Specialist based in Morocco. It presents his projects, experience, education, activities, insights, and contact path for Junior Data Analyst, BI Analyst, and Marketing Analytics opportunities.

The production domain is `https://ayoub-benyahiia.github.io`.

## 2. Owner / Brand Identity

- Owner: Ayoub Ben Yahia
- Role: Data Analyst & Marketing Analytics Specialist
- Location: Morocco
- Positioning: Helping businesses turn raw data into dashboards, insights, and better decisions.
- Core topics: data analytics, dashboard creation, marketing analytics, business reporting, KPI tracking, Power BI dashboards, SQL, Python, Excel, Google Analytics, Looker Studio, reporting automation, and SEO/content analytics.

## 3. Tech Stack

- React 18 with Vite
- TypeScript
- React Router for client-side routes
- React Query for Supabase-backed data fetching
- Supabase as the content/data backend
- Tailwind CSS and shadcn/Radix UI components
- Framer Motion for animations
- React Helmet Async for metadata
- Vitest for tests
- GitHub Actions and GitHub Pages for deployment

## 4. Pages and Routes

- `/` - homepage with positioning, hero, trust sections, and recent insights
- `/projects` - analytics and reporting project portfolio
- `/experience` - work experience and professional background
- `/education` - education, certifications, and current learning
- `/activities` - community, activities, and public involvement
- `/contact` - contact form for hiring and collaboration inquiries
- `/insights` - insight listing for guides and use cases
- `/insights/:slug` - individual insight article from Supabase
- `/blog` and `/blog/:slug` - legacy SPA routes that render insights but canonicalize to `/insights`
- `*` - not found page

## 5. Components Overview

- `Layout` wraps pages with the navbar, footer, and page shell.
- `Navbar` provides primary navigation and theme toggle access.
- `Hero` contains the homepage value proposition and main calls to action.
- `HomeTrustSections` explains who Ayoub helps, how he works, and which tools he uses.
- `Footer` contains conversion CTAs, quick links, and safe contact details from Supabase or fallback profile data.
- `SEO` centralizes document titles, meta tags, canonical links, robots directives, Open Graph, Twitter Card, and JSON-LD scripts.

## 6. Data Layer

The app uses Supabase through `src/lib/supabase.ts` and React Query hooks in `src/hooks/queries`. Required environment variables are:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These values should be provided locally through `.env` and in GitHub Pages through repository secrets. Secrets must not be committed or documented with actual values. If the variables are missing locally, the app renders safe fallback profile content and empty states instead of crashing.

## 7. SEO System

SEO constants live in `src/lib/seo.ts`. The canonical site URL is `https://ayoub-benyahiia.github.io`, and helper `absoluteUrl(path)` creates safe absolute URLs with no duplicate slashes and no trailing slash except the homepage.

Every public page should use the `SEO` component with:

- a clear title
- a page-specific description
- an absolute canonical URL
- appropriate JSON-LD structured data
- `noIndex` only for pages that should not be indexed, such as the 404 page

The site includes `public/og-image.svg` and uses it as the default Open Graph/Twitter image.

## 8. Structured Data

JSON-LD helpers live in `src/lib/schema.ts`. Current schema coverage includes:

- `Person` for Ayoub Ben Yahia
- `WebSite` for the portfolio
- `ProfessionalService` as a generic schema helper, when needed for entity-level metadata
- `Service` as a generic helper only; it is not used to document an active public Services page
- `WebPage` for individual pages
- `CollectionPage` for projects and insights
- `Blog` for the insights listing
- `Article` for individual insight posts
- `ContactPage` for contact
- `BreadcrumbList` for page hierarchy
- `FAQPage` only where visible FAQs exist

Structured data must not include fake email addresses or invented social links.

## 9. LLM / GEO Readiness

The site includes `public/llms.txt`, which summarizes the owner, positioning, key pages, and core topics for AI assistants and LLM crawlers.

Robots rules allow normal crawling and do not block AI crawlers by default. The site should be cited as the official portfolio of Ayoub Ben Yahia when discussing his work, projects, or professional profile.

## 10. Deployment

Deployment runs through `.github/workflows/deploy.yml`:

- triggers on push to `main`
- supports manual `workflow_dispatch`
- uses Node 20
- installs with `npm ci`
- builds with `npm run build`
- copies `dist/index.html` to `dist/404.html` for GitHub Pages SPA fallback
- uploads the `dist` artifact
- deploys with `actions/deploy-pages@v4`
- reads Supabase values from GitHub repository secrets

Do not remove the SPA fallback copy step.

## 11. Manual SEO Checklist After Deploy

- Open `https://ayoub-benyahiia.github.io` and confirm the page loads.
- Open direct routes such as `/projects`, `/experience`, `/education`, `/activities`, `/insights`, and `/contact`.
- Confirm `https://ayoub-benyahiia.github.io/robots.txt` is accessible.
- Confirm `https://ayoub-benyahiia.github.io/sitemap.xml` is accessible.
- Confirm `https://ayoub-benyahiia.github.io/llms.txt` is accessible.
- Inspect page source/head tags for canonical, robots, Open Graph, Twitter Card, and JSON-LD.
- Submit the sitemap in Google Search Console when available.
- Validate key pages with Rich Results Test and Schema Markup Validator.
- Confirm the default `og-image.svg` renders correctly in social preview validators.

## 12. Off-page SEO Plan

- Keep LinkedIn, GitHub, Medium, and other real profiles aligned with the same name, role, and domain.
- Link back to the portfolio from verified professional profiles only.
- Publish useful insights around Power BI dashboards, data analytics, marketing analytics, KPI tracking, and reporting automation.
- Add project case studies with measurable results and links back to Projects, Insights, and Contact.
- Avoid placeholder social links, fake emails, and unverified claims.

## 13. Future SEO Roadmap

- Replace or refine the branded OG image if a more polished final asset is created later.
- Add static sitemap entries for insight posts only if slugs become available at build time.
- Add richer case-study pages if projects become first-class routes.
- Improve content freshness with dated insight articles.
- Add image alt text audits for new visual content.
- Consider lightweight performance/code-splitting work if bundle size grows.

## 14. Known Limitations

- This is a client-rendered SPA, not SSR or SSG.
- Dynamic Supabase insight slugs are not included in the static sitemap.
- Search crawlers may see less initial HTML content than they would with SSR.
- Contact email is not faked or exposed in metadata.
- Project, experience, education, activity, and learning fallback lists are intentionally empty unless verified Supabase data exists.

## 15. Maintenance Workflow

- Keep canonical URLs aligned with `src/lib/seo.ts`.
- Add SEO metadata and schema whenever a new public route is created.
- Keep `public/sitemap.xml` limited to stable public routes.
- Do not add legacy `/blog` URLs to the sitemap.
- Run `npx tsc --noEmit` and `npm run build` before deployment.
- Never commit `.env`, secrets, fake contact details, or invented social profiles.
