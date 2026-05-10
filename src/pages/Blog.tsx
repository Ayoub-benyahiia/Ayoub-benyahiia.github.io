import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Search, Calendar, ArrowRight, FileText } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePublishedBlogPosts } from "@/hooks/queries/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import {
  createBlogSchema,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createWebPageSchema,
} from "@/lib/schema";

const Insights = () => {
  const { data: posts, isLoading } = usePublishedBlogPosts();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const description =
    "Practical insights, guides, and use cases on data analytics, marketing analytics, dashboards, reporting, KPI tracking, and better business decisions.";
  const canonical = location.pathname.startsWith("/blog")
    ? absoluteUrl("/insights")
    : absoluteUrl("/insights");

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    let result = posts;
    if (activeTag) {
      result = result.filter((p) => p.tags?.includes(activeTag));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, query, activeTag]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Layout>
      <SEO
        title="Data Analytics Insights, Dashboard Guides & Marketing Analytics"
        description={description}
        canonical={canonical}
        structuredData={[
          createBlogSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createCollectionPageSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createWebPageSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />
        <section className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Skeleton className="h-6 w-20 mx-auto" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="mx-auto mt-10 max-w-xl">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-3xl" />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Data Analytics Insights, Dashboard Guides & Marketing Analytics"
        description={description}
        canonical={canonical}
        structuredData={[
          createBlogSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createCollectionPageSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createWebPageSchema({
            title: "Data Analytics Insights, Dashboard Guides & Marketing Analytics",
            description,
            path: "/insights",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
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
            // Insights
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Guides, use cases &amp; data insights.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Practical guides and use cases around dashboards, analytics,
            reporting, KPI tracking, and marketing performance, written to help
            teams make better decisions with their data.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              View Services
            </Link>
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

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search insights by title, topic, or tag…"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                !activeTag
                  ? "bg-accent text-accent-foreground shadow-glow"
                  : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-20 flex flex-col items-center gap-4 text-center"
          >
            <div className="grid h-20 w-20 place-items-center rounded-3xl border border-border bg-surface">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-muted-foreground">
              No insights yet. Check back soon.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Insights on engineering, automation, and data systems are on the way.
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/insights/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-cell"
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-elevated">
                    {post.cover_url ? (
                      <img
                        src={post.cover_url}
                        alt={`Cover image for ${post.title}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={360}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="absolute inset-0 bg-grid opacity-30" />
                        <FileText className="h-12 w-12 text-accent/30 transition-colors duration-500 group-hover:text-accent/60" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span className="font-mono text-[11px] uppercase tracking-widest">
                        {formatDate(post.published_at)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-base font-semibold leading-snug transition-colors duration-300 group-hover:text-accent sm:text-lg">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="rounded-md border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Read more */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Read insight
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-20 max-w-2xl rounded-3xl border border-border bg-surface p-8 text-center sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Apply the ideas
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Need help applying these ideas to your business?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Turn an insight into a dashboard, report, or marketing analytics
            workflow built around your real business questions.
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

export default Insights;
