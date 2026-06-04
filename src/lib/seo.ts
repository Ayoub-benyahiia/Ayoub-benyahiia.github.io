export const SITE_URL = "https://ayoub-benyahiia.github.io";
export const SITE_NAME = "Ayoub Ben Yahia Portfolio";
export const OWNER_NAME = "Ayoub Ben Yahia";
export const JOB_TITLE =
  "Junior Data Analyst / BI Analyst focused on Marketing Analytics";
export const DEFAULT_DESCRIPTION =
  "Junior Data Analyst / BI Analyst portfolio focused on Marketing Analytics, SQL, Power BI, Excel, Python, dashboards, KPI reporting, and business intelligence.";
export const LOCATION = "Morocco";

export const KEY_TOPICS = [
  "Data analytics",
  "Dashboard creation",
  "Marketing analytics",
  "Business reporting",
  "KPI tracking",
  "Power BI dashboards",
  "SQL",
  "Python",
  "Excel",
  "Data analysis",
  "Business intelligence",
  "KPI reporting",
  "Dashboarding",
] as const;

export const absoluteUrl = (path: string) => {
  const normalizedPath = path.trim() || "/";

  if (normalizedPath === "/") {
    return `${SITE_URL}/`;
  }

  const withoutLeadingSlash = normalizedPath.replace(/^\/+/, "");
  const withoutTrailingSlash = withoutLeadingSlash.replace(/\/+$/, "");

  return `${SITE_URL}/${withoutTrailingSlash}`;
};

export const absoluteAssetUrl = (url: string) => {
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) {
    return url;
  }

  return absoluteUrl(url);
};
