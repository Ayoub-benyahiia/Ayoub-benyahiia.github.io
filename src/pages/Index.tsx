import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { HomeTrustSections } from "@/components/HomeTrustSections";
import { RecentPosts } from "@/components/RecentPosts";
import { SEO } from "@/components/SEO";
import { absoluteUrl, DEFAULT_DESCRIPTION } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createPersonSchema,
  createProfessionalServiceSchema,
  createWebPageSchema,
  createWebsiteSchema,
} from "@/lib/schema";

const Index = () => {
  const description =
    "Portfolio of Ayoub Ben Yahia, a Junior Data Analyst / BI Analyst focused on Marketing Analytics, dashboards, KPI reporting, SQL, Power BI, Excel, and Python.";

  return (
    <Layout>
      <SEO
        title="Junior Data Analyst / BI Analyst Portfolio"
        description={description}
        canonical={absoluteUrl("/")}
        structuredData={[
          createPersonSchema(),
          createWebsiteSchema(),
          createProfessionalServiceSchema({ url: absoluteUrl("/") }),
          createWebPageSchema({
            title: "Junior Data Analyst / BI Analyst Portfolio",
            description: DEFAULT_DESCRIPTION,
            path: "/",
          }),
          createBreadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero />
      <HomeTrustSections />
      <RecentPosts />
    </Layout>
  );
};

export default Index;
