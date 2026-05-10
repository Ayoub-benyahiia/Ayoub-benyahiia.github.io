import { Helmet } from "react-helmet-async";
import { DEFAULT_DESCRIPTION, OWNER_NAME, SITE_NAME } from "@/lib/seo";

const DEFAULT_TITLE =
  "Ayoub Ben Yahia - Data Analyst & Marketing Analytics Specialist";
const DEFAULT_OG_IMAGE = "/og-image.svg";

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  structuredData?: JsonLd | JsonLd[];
  publishedTime?: string | null;
  modifiedTime?: string | null;
  author?: string;
  type?: "website" | "article" | "profile";
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType,
  twitterCard = "summary_large_image",
  noIndex = false,
  structuredData,
  publishedTime,
  modifiedTime,
  author = OWNER_NAME,
  type,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDesc = ogDescription ?? description;
  const resolvedOgType = ogType ?? type ?? "website";
  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";
  const googlebotContent = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";
  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={googlebotContent} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={resolvedOgType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={SITE_NAME} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {resolvedOgType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {resolvedOgType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {resolvedOgType === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
