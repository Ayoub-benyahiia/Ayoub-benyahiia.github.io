import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  JOB_TITLE,
  KEY_TOPICS,
  LOCATION,
  OWNER_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type JsonLd = Record<string, unknown>;

const compact = <T extends JsonLd>(schema: T): T =>
  Object.fromEntries(
    Object.entries(schema).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    })
  ) as T;

export const createPersonSchema = (options?: {
  image?: string | null;
  sameAs?: string[];
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: OWNER_NAME,
    jobTitle: JOB_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    image: options?.image ?? undefined,
    sameAs: options?.sameAs ?? [],
    address: {
      "@type": "PostalAddress",
      addressCountry: LOCATION,
    },
    knowsAbout: KEY_TOPICS,
  });

export const createWebsiteSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en",
  });

export const createProfessionalServiceSchema = (options?: {
  url?: string;
  sameAs?: string[];
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professional-service`,
    name: `${OWNER_NAME} - ${JOB_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    url: options?.url ?? absoluteUrl("/services"),
    areaServed: ["Morocco", "International remote"],
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    sameAs: options?.sameAs ?? [],
    knowsAbout: KEY_TOPICS,
    serviceType: [
      "Data analytics",
      "Dashboard creation",
      "Marketing analytics",
      "Business reporting",
      "KPI tracking",
      "Reporting automation",
    ],
  });

export const createBreadcrumbSchema = (
  items: Array<{ name: string; path: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const createWebPageSchema = (options: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage";
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": options.type ?? "WebPage",
    "@id": `${absoluteUrl(options.path)}#webpage`,
    url: absoluteUrl(options.path),
    name: options.title,
    description: options.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en",
  });

export const createCollectionPageSchema = (options: {
  title: string;
  description: string;
  path: string;
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(options.path)}#collection`,
    url: absoluteUrl(options.path),
    name: options.title,
    description: options.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    inLanguage: "en",
  });

export const createBlogSchema = (options: {
  title: string;
  description: string;
  path: string;
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl(options.path)}#blog`,
    url: absoluteUrl(options.path),
    name: options.title,
    description: options.description,
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en",
  });

export const createArticleSchema = (options: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedTime?: string | null;
  modifiedTime?: string | null;
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(options.path)}#article`,
    headline: options.title,
    description: options.description,
    url: absoluteUrl(options.path),
    image: options.image ?? undefined,
    datePublished: options.publishedTime ?? undefined,
    dateModified: options.modifiedTime ?? options.publishedTime ?? undefined,
    author: {
      "@id": `${SITE_URL}/#person`,
      name: OWNER_NAME,
    },
    publisher: {
      "@id": `${SITE_URL}/#person`,
      name: OWNER_NAME,
    },
    mainEntityOfPage: {
      "@id": `${absoluteUrl(options.path)}#webpage`,
    },
    inLanguage: "en",
  });

export const createContactPageSchema = (options: {
  description: string;
  path?: string;
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(options.path ?? "/contact")}#contact`,
    url: absoluteUrl(options.path ?? "/contact"),
    name: `Contact ${OWNER_NAME}`,
    description: options.description,
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en",
  });

export const createServiceSchema = (options: {
  title: string;
  description: string;
  path?: string;
}) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.title,
    description: options.description,
    url: absoluteUrl(options.path ?? "/services"),
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    areaServed: ["Morocco", "International remote"],
    serviceType: options.title,
  });

export const createFAQSchema = (
  items: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
