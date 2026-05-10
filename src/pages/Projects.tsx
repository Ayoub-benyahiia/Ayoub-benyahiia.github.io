import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ExternalLink,
  Cog,
  Bot,
  Cpu,
  Wrench,
  Box,
  Brain,
  Github,
  Globe,
  TrendingUp,
  ArrowRight,
  Star,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ExpandableCell } from "@/components/ExpandableCell";
import { useProjects } from "@/hooks/queries/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createWebPageSchema,
} from "@/lib/schema";

const CATEGORY_ICON: Record<string, typeof Cog> = {
  "Industrial Automation": Cog,
  Robotics: Bot,
  "IIoT & Data Systems": Cpu,
  "Mechanical Engineering": Wrench,
  "CAD & Design": Box,
  "AI & Computer Vision": Brain,
  "Data Analytics": BarChart3,
  "Dashboard Creation": BarChart3,
  "Marketing Analytics": BarChart3,
};

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const { data: projectCells, isLoading } = useProjects();
  const description =
    "Browse data analytics projects covering Power BI dashboards, marketing analytics, business reporting, KPI tracking, automation, and measurable business results.";

  const filteredCells = useMemo(() => {
    if (!projectCells) return [];
    const q = query.trim().toLowerCase();
    if (!q) return projectCells;
    return projectCells
      .map((cell) => ({
        ...cell,
        projects: cell.projects.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            p.industry?.toLowerCase().includes(q) ||
            p.result_summary?.toLowerCase().includes(q) ||
            p.tags?.some((t) => t.toLowerCase().includes(q)) ||
            p.tools?.some((t) => t.toLowerCase().includes(q)) ||
            cell.category.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.projects.length > 0);
  }, [query, projectCells]);

  if (isLoading) {
    return (
      <Layout>
        <section className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
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
        title="Data Projects & Analytics Portfolio"
        description={description}
        canonical={absoluteUrl("/projects")}
        structuredData={[
          createCollectionPageSchema({
            title: "Data Projects & Analytics Portfolio",
            description,
            path: "/projects",
          }),
          createWebPageSchema({
            title: "Data Projects & Analytics Portfolio",
            description,
            path: "/projects",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <section className="container py-12 sm:py-16">
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // Projects
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Real problems. Measurable results.
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            A portfolio of data projects that helped businesses make better
            decisions through dashboards, analytics, reporting, KPI tracking,
            and automation. Each project is documented openly.
          </p>
        </motion.header>

        {/* ── Search ── */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="projects-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by tool, industry, or keyword…"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {/* ── Categories & Project Cards ── */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-4">
          {filteredCells.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No projects match &ldquo;{query}&rdquo;.
            </p>
          )}

          {filteredCells.map((cell, idx) => {
            const Icon = CATEGORY_ICON[cell.category] ?? Cog;
            const isOpen = openIndex === idx;

            return (
              <ExpandableCell
                key={cell.slug}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : idx)}
                leftVisual={<Icon className="h-6 w-6 text-accent" />}
                title={cell.category}
                subtitle={
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground">{cell.tagline}</span>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                      {cell.projects.length}{" "}
                      {cell.projects.length === 1 ? "project" : "projects"}
                    </span>
                  </span>
                }
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {cell.projects.map((project) => (
                    <article
                      key={project.id}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-cell"
                    >
                      {/* Featured badge */}
                      {project.is_featured && (
                        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                          <Star className="h-2.5 w-2.5" />
                          Featured
                        </span>
                      )}

                      {/* Name + industry */}
                      <div className="flex flex-col gap-1 pr-16">
                        <h4 className="text-sm font-semibold leading-snug sm:text-base transition-colors group-hover:text-accent">
                          {project.name}
                        </h4>
                        {project.industry && (
                          <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            {project.industry}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {project.description && (
                        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      {/* Result / business value callout */}
                      {project.result_summary && (
                        <div className="mt-3 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/5 px-3 py-2">
                          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                          <p className="text-xs font-medium leading-relaxed text-accent">
                            {project.result_summary}
                          </p>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl bg-surface">
                        {project.image_url || project.cover_url ? (
                          <img
                            src={project.image_url ?? project.cover_url ?? ""}
                            alt={`Screenshot of ${project.name}`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-grid opacity-30" />
                            <div className="absolute inset-0 grid place-items-center">
                              <Icon className="h-12 w-12 text-accent/30 transition-all duration-500 group-hover:scale-110 group-hover:text-accent/60" />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Tools */}
                      {project.tools && project.tools.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-accent transition-colors group-hover:bg-accent/20"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* ── Action buttons ── */}
                      <div className="mt-auto pt-5 flex flex-wrap gap-2">
                        {/* Primary: Read Case Study */}
                        {project.medium_url && (
                          <a
                            href={project.medium_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-accent-glow"
                          >
                            Read Case Study
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}

                        {/* Always: Build Similar Project → /contact */}
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:scale-[1.03]"
                        >
                          Build Similar
                          <ArrowRight className="h-3 w-3" />
                        </Link>

                        {/* Optional: View Live */}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
                          >
                            View Live
                            <Globe className="h-3 w-3" />
                          </a>
                        )}

                        {/* Optional: GitHub */}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
                          >
                            GitHub
                            <Github className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </ExpandableCell>
            );
          })}
        </div>

        {/* ── Bottom conversion CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-20 max-w-2xl rounded-3xl border border-border bg-surface p-8 text-center sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Have a similar challenge?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s solve it together.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every project here started with a business problem. Tell me yours
            and I&apos;ll propose the right data approach — dashboard, analysis,
            automation, or reporting system.
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
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            >
              View Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Projects;
