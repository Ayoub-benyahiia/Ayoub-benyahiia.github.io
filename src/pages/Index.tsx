import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { HomeTrustSections } from "@/components/HomeTrustSections";
import { RecentPosts } from "@/components/RecentPosts";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Freelance Data Analyst & Dashboard Expert"
        description="Ayoub Ben Yahia is a freelance data analyst based in Morocco, specialising in Power BI dashboards, marketing analytics, business reporting, and KPI tracking. Open to remote and on-site projects."
        canonical="https://ayoub-benyahia.com/"
      />
      <Hero />
      <HomeTrustSections />
      <RecentPosts />
    </Layout>
  );
};

export default Index;
