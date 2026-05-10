import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, LayoutDashboard, Megaphone, FileClock, Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createProfessionalServiceSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/schema";

interface Service {
  id: string;
  title: string;
  icon: typeof BarChart3;
  problem: string;
  solution: string;
  deliverables: string[];
  tools: string[];
}

const SERVICES: Service[] = [
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: BarChart3,
    problem:
      "Businesses collect data but don't know how to extract actionable insights that drive growth.",
    solution:
      "I analyze raw data to uncover trends, patterns, and opportunities that help you make smarter decisions faster.",
    deliverables: [
      "Data audit & quality check",
      "Trend & pattern analysis",
      "Actionable insights report",
      "Strategic recommendations",
    ],
    tools: ["Excel", "SQL", "Python", "Power BI", "Google Sheets"],
  },
  {
    id: "dashboard-creation",
    title: "Dashboard Creation",
    icon: LayoutDashboard,
    problem:
      "Data is scattered across Excel, CRMs, and marketing platforms with no single view of performance.",
    solution:
      "I build clean, interactive dashboards that give you a real-time view of KPIs, sales, and marketing performance.",
    deliverables: [
      "Power BI dashboard",
      "Looker Studio dashboard",
      "Excel dashboard",
      "KPI tracking setup",
      "Dashboard documentation",
    ],
    tools: ["Power BI", "Looker Studio", "Excel", "SQL", "Google Sheets"],
  },
  {
    id: "marketing-analytics",
    title: "Marketing Analytics",
    icon: Megaphone,
    problem:
      "Marketing teams struggle to measure campaign performance, attribution, and ROI across channels.",
    solution:
      "I set up tracking, analyze campaign data, and build reports that show exactly which marketing efforts drive results.",
    deliverables: [
      "Campaign performance report",
      "Attribution analysis",
      "ROI tracking setup",
      "Channel comparison report",
    ],
    tools: ["Google Analytics", "Meta Ads Manager", "Google Ads", "Looker Studio"],
  },
  {
    id: "reporting-automation",
    title: "Reporting Automation",
    icon: FileClock,
    problem:
      "Teams waste hours every week manually building the same reports in Excel or slides.",
    solution:
      "I automate recurring reports so your team gets fresh, accurate data delivered on schedule without manual work.",
    deliverables: [
      "Automated report setup",
      "Scheduled data refresh",
      "Email distribution",
      "Documentation & handover",
    ],
    tools: ["Power BI", "Excel", "SQL", "Google Sheets", "Zapier"],
  },
  {
    id: "seo-content-analytics",
    title: "SEO & Content Analytics",
    icon: Search,
    problem:
      "Businesses create content but don't track what drives organic traffic, engagement, and conversions.",
    solution:
      "I analyze SEO and content performance so you can focus on topics and strategies that actually bring results.",
    deliverables: [
      "SEO performance report",
      "Content audit",
      "Keyword tracking setup",
      "Competitor analysis",
    ],
    tools: ["Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", "Looker Studio"],
  },
];

const FAQS = [
  {
    question: "What data analytics services do you offer?",
    answer:
      "I help with data audits, analysis, KPI tracking, business reporting, dashboards, and recommendations that turn raw data into practical decisions.",
  },
  {
    question: "Can you build Power BI dashboards?",
    answer:
      "Yes. I build Power BI dashboards for sales, marketing, operations, and executive reporting, with clear KPIs and documentation.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I am available for international remote collaborations, freelance projects, and remote data analyst roles.",
  },
  {
    question: "Do you support businesses in Morocco?",
    answer:
      "Yes. I support Moroccan businesses with data analytics, dashboard creation, marketing analytics, reporting automation, and KPI tracking.",
  },
];

const Services = () => {
  const description =
    "Professional data analytics services including Power BI dashboard creation, marketing analytics, reporting automation, KPI tracking, and SEO analytics.";

  return (
    <Layout>
      <SEO
        title="Data Analytics & Dashboard Services"
        description={description}
        canonical={absoluteUrl("/services")}
        structuredData={[
          createProfessionalServiceSchema({ url: absoluteUrl("/services") }),
          createWebPageSchema({
            title: "Data Analytics & Dashboard Services",
            description,
            path: "/services",
          }),
          ...SERVICES.map((service) =>
            createServiceSchema({
              title: service.title,
              description: service.solution,
              path: `/services#${service.id}`,
            })
          ),
          createFAQSchema(FAQS),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <section className="container py-12 sm:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // Services
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Services that turn data into business decisions
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            I help businesses understand their data, track KPIs, automate
            reports, and improve marketing performance.
          </p>
        </motion.header>

        {/* Services Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-cell"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-accent/10 bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>

                {/* Problem */}
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Problem
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    What I Do
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                    {service.solution}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Deliverables
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-accent/20 group-hover:text-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6">
                  <Link
                    to="/contact"
                    className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
                  >
                    Work With Me
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-20 max-w-3xl"
          aria-labelledby="services-faq-heading"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // FAQ
          </p>
          <h2
            id="services-faq-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Common questions before we start.
          </h2>
          <div className="mt-8 grid gap-4">
            {FAQS.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-20 max-w-2xl rounded-3xl border border-border bg-surface p-8 text-center sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Not sure what you need?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s talk about your project.
          </h2>
          <p className="mt-3 text-muted-foreground">
            I can help you figure out the right approach — whether it&apos;s a
            dashboard, an analysis, or a full reporting system.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
            >
              Work With Me
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Services;
