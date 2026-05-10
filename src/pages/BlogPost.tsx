import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useBlogPost } from "@/hooks/queries/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const InsightsPost = () => {
  const { slug } = useParams<{ slug: string }>();
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

  return (
    <Layout>
      <SEO
        title={post.title}
        description={
          post.excerpt ??
          `Read the full insight: ${post.title}. Data analytics, dashboards, and business intelligence explained clearly.`
        }
        canonical={`https://ayoub-benyahia.com/insights/${post.slug}`}
        ogImage={post.cover_url ?? undefined}
        type="article"
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
                alt={post.title}
                className="w-full object-cover"
                loading="eager"
              />
            </motion.div>
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
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 border-t border-border pt-8"
          >
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
