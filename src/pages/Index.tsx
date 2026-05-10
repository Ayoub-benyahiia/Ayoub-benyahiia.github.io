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
    "Ayoub Ben Yahia helps businesses use data analytics, dashboards, marketing analytics, business reporting, and KPI tracking to make better decisions.";

  return (
    <Layout>
      <SEO
        title="Freelance Data Analyst & Dashboard Expert"
        description={description}
        canonical={absoluteUrl("/")}
        structuredData={[
          createPersonSchema(),
          createWebsiteSchema(),
          createProfessionalServiceSchema({ url: absoluteUrl("/") }),
          createWebPageSchema({
            title: "Freelance Data Analyst & Dashboard Expert",
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
