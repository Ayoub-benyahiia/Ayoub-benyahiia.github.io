import { useEffect } from "react";
import {
  absoluteAssetUrl,
  DEFAULT_DESCRIPTION,
  JOB_TITLE,
  OWNER_NAME,
  SITE_NAME,
} from "@/lib/seo";

const DEFAULT_TITLE = `${OWNER_NAME} - ${JOB_TITLE}`;
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
  const resolvedOgImage = ogImage ? absoluteAssetUrl(ogImage) : undefined;
  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";
  const googlebotContent = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";
  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];
  const serializedSchemas = schemas.map((schema) => JSON.stringify(schema));

  useEffect(() => {
    const managedAttr = "data-managed-seo";

    const setMeta = (
      attribute: "name" | "property",
      key: string,
      content?: string | null
    ) => {
      const selector = `meta[${attribute}="${key}"][${managedAttr}="true"]`;
      const existing = document.head.querySelector<HTMLMetaElement>(selector);

      if (!content) {
        existing?.remove();
        return;
      }

      const tag = existing ?? document.createElement("meta");
      tag.setAttribute(attribute, key);
      tag.setAttribute("content", content);
      tag.setAttribute(managedAttr, "true");

      if (!existing) {
        document.head.appendChild(tag);
      }
    };

    const setCanonical = (href?: string) => {
      const existing = document.head.querySelector<HTMLLinkElement>(
        `link[rel="canonical"][${managedAttr}="true"]`
      );

      if (!href) {
        existing?.remove();
        return;
      }

      const tag = existing ?? document.createElement("link");
      tag.setAttribute("rel", "canonical");
      tag.setAttribute("href", href);
      tag.setAttribute(managedAttr, "true");

      if (!existing) {
        document.head.appendChild(tag);
      }
    };

    document.documentElement.lang = "en";
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", robotsContent);
    setMeta("name", "googlebot", googlebotContent);
    setCanonical(canonical);

    setMeta("property", "og:type", resolvedOgType);
    setMeta("property", "og:title", resolvedOgTitle);
    setMeta("property", "og:description", resolvedOgDesc);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", resolvedOgImage);
    setMeta(
      "property",
      "article:published_time",
      resolvedOgType === "article" ? publishedTime : undefined
    );
    setMeta(
      "property",
      "article:modified_time",
      resolvedOgType === "article" ? modifiedTime : undefined
    );
    setMeta(
      "property",
      "article:author",
      resolvedOgType === "article" ? author : undefined
    );

    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:title", resolvedOgTitle);
    setMeta("name", "twitter:description", resolvedOgDesc);
    setMeta("name", "twitter:image", resolvedOgImage);

    document.head
      .querySelectorAll(`script[type="application/ld+json"][${managedAttr}="jsonld"]`)
      .forEach((tag) => tag.remove());

    serializedSchemas.forEach((schema) => {
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.setAttribute(managedAttr, "jsonld");
      tag.text = schema;
      document.head.appendChild(tag);
    });
  }, [
    author,
    canonical,
    description,
    fullTitle,
    googlebotContent,
    modifiedTime,
    publishedTime,
    resolvedOgDesc,
    resolvedOgImage,
    resolvedOgTitle,
    resolvedOgType,
    robotsContent,
    serializedSchemas,
    twitterCard,
  ]);

  return null;
};
