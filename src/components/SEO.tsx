import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ayoub Ben Yahia";
const DEFAULT_TITLE = "Ayoub Ben Yahia — Freelance Data Analyst & Dashboard Expert";
const DEFAULT_DESCRIPTION =
  "Freelance data analyst based in Morocco. I help businesses build dashboards, automate reports, and improve marketing analytics decisions. Open to remote and on-site projects.";
const DEFAULT_OG_IMAGE = "/og-image.png"; // place your OG image in /public

interface SEOProps {
  /** Browser tab + OG title. Appends site name automatically. */
  title?: string;
  /** Meta description — 140–160 chars recommended. */
  description?: string;
  /** Full canonical URL, e.g. https://ayoub.dev/services */
  canonical?: string;
  /** Override OG title (defaults to title). */
  ogTitle?: string;
  /** Override OG description (defaults to description). */
  ogDescription?: string;
  /** OG image URL — absolute path or URL. */
  ogImage?: string;
  /** OG page type. Defaults to "website". */
  type?: "website" | "article" | "profile";
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDesc = ogDescription ?? description;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
