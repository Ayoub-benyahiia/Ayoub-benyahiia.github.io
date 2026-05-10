import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ExpandableCell } from "@/components/ExpandableCell";
import { useExperiences } from "@/hooks/queries/useExperiences";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: experiences, isLoading } = useExperiences();
  const description =
    "Professional experience in data analytics, marketing analytics, business intelligence, dashboards, KPI reports, and data-driven insights.";

  if (isLoading) {
    return (
      <Layout>
        <section className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-3xl" />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Work Experience - Data & Marketing Analytics"
        description={description}
        canonical={absoluteUrl("/experience")}
        structuredData={[
          createWebPageSchema({
            title: "Work Experience - Data & Marketing Analytics",
            description,
            path: "/experience",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Experience", path: "/experience" },
          ]),
        ]}
      />
      <section className="container py-12 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // Experience
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Experience built around analytics, reporting, and growth.
          </h1>
          <p className="mt-4 text-muted-foreground">
            A record of data analytics, marketing analytics, dashboards, KPI
            tracking, and reporting work for businesses that need clearer
            decisions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent-glow"
            >
              Work With Me
            </Link>
          </div>
        </motion.header>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4">
          {experiences?.map((exp, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ExpandableCell
                key={exp.id}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : idx)}
                leftVisual={
                  <span className="font-mono text-2xl font-bold text-accent">
                    {exp.company.charAt(0)}
                  </span>
                }
                title={exp.job_title}
                subtitle={`${exp.company} · ${exp.location ?? ""}`}
                meta={
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {exp.start_date} → {exp.end_date}
                    </span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {exp.type} · {exp.work_mode}
                    </span>
                  </div>
                }
              >
                {/* Mobile meta */}
                <div className="mb-6 flex flex-wrap gap-3 md:hidden">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {exp.start_date} → {exp.end_date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    {exp.type} · {exp.work_mode}
                  </span>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      Narrative
                    </p>
                    <p className="mt-3 leading-relaxed text-foreground/90">
                      {exp.narrative}
                    </p>

                    <p className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">
                      Key Responsibilities
                    </p>
                    <ul className="mt-3 space-y-2">
                      {exp.responsibilities?.map((r) => (
                        <li
                          key={r}
                          className="flex gap-3 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      Skillset
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.skills?.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ExpandableCell>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
