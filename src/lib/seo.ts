export const SITE_URL = "https://ayoub-benyahiia.github.io";
export const SITE_NAME = "Ayoub Ben Yahia Portfolio";
export const OWNER_NAME = "Ayoub Ben Yahia";
export const JOB_TITLE = "Data Analyst & Marketing Analytics Specialist";
export const DEFAULT_DESCRIPTION =
  "Data Analyst & Marketing Analytics Specialist helping businesses turn raw data into dashboards, insights, and better decisions.";
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
  "Google Analytics",
  "Looker Studio",
  "Reporting automation",
  "SEO and content analytics",
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
