import { useMemo, type ReactNode } from "react";
import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ArticleCTA } from "@/components/ArticleCTA";
import { useBlogPost } from "@/hooks/queries/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { absoluteUrl, OWNER_NAME } from "@/lib/seo";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";

const headingText = (children: ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(headingText).join("");
  }

  return "";
};

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const extractHeadings = (content?: string | null) =>
  (content ?? "")
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1].length,
      text: match[2].replace(/[*_`]/g, "").trim(),
      id: slugifyHeading(match[2].replace(/[*_`]/g, "").trim()),
    }))
    .filter((heading) => heading.text.length > 0);

const InsightsPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { data: post, isLoading, isError } = useBlogPost(slug ?? "");

  if (isLoading) {
    return (
      <Layout>
        <article className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="aspect-[2/1] w-full rounded-3xl" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
        </article>
      </Layout>
    );
  }

  if (isError || !post) return <Navigate to="/insights" replace />;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const readingTime = Math.max(1, Math.ceil((post.content?.length ?? 0) / 1200));
  const canonicalPath = `/insights/${post.slug}`;
  const canonical = location.pathname.startsWith("/blog")
    ? absoluteUrl(canonicalPath)
    : absoluteUrl(canonicalPath);
  const description =
    post.excerpt ??
    `Read the full insight: ${post.title}. Data analytics, dashboards, and business intelligence explained clearly.`;
  const tableOfContents = useMemo(() => extractHeadings(post.content), [post.content]);

  return (
    <Layout>
      <SEO
        title={post.title}
        description={description}
        canonical={canonical}
        ogImage={post.cover_url ?? undefined}
        ogType="article"
        publishedTime={post.published_at}
        modifiedTime={post.updated_at}
        author={OWNER_NAME}
        structuredData={[
          createArticleSchema({
            title: post.title,
            description,
            path: canonicalPath,
            image: post.cover_url,
            publishedTime: post.published_at,
            modifiedTime: post.updated_at,
          }),
          createWebPageSchema({
            title: post.title,
            description,
            path: canonicalPath,
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: canonicalPath },
          ]),
        ]}
      />
      <article className="container py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Insights
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8"
          >
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-md border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {post.excerpt && (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            )}
          </motion.header>

          {/* Cover image */}
          {post.cover_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={post.cover_url}
                alt={`Cover image for ${post.title}`}
                className="w-full object-cover"
                loading="eager"
                decoding="async"
                width={960}
                height={480}
              />
            </motion.div>
          )}

          {tableOfContents.length > 0 && (
            <nav
              className="mt-8 rounded-2xl border border-border bg-surface p-5"
              aria-label="Table of contents"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                In this insight
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {tableOfContents.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.level === 3 ? "pl-4" : undefined}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="transition hover:text-accent"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Markdown content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="blog-content mt-10"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h2: ({ children, ...props }) => (
                  <h2 id={slugifyHeading(headingText(children))} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 id={slugifyHeading(headingText(children))} {...props}>
                    {children}
                  </h3>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 space-y-8 border-t border-border pt-8"
          >
            <ArticleCTA />

            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                to="/services"
                className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground transition hover:border-accent hover:text-accent"
              >
                View Services
              </Link>
              <Link
                to="/projects"
                className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground transition hover:border-accent hover:text-accent"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-border bg-surface px-4 py-2 text-muted-foreground transition hover:border-accent hover:text-accent"
              >
                Work With Me
              </Link>
            </div>

            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              All insights
            </Link>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default InsightsPost;
