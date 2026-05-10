import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import { usePublishedBlogPosts } from "@/hooks/queries/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const RecentPosts = () => {
  const { data: posts, isLoading } = usePublishedBlogPosts();

  // Show up to 12 recent posts
  const recentPosts = posts ? posts.slice(0, 12) : [];

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
      <section className="container py-12 sm:py-20">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
        <div className="mt-10 flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
              <Skeleton className="h-80 w-full rounded-3xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // If there are no posts, we don't render the section at all to keep the home page clean
  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="container py-12 sm:py-20 border-t border-border/40">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest text-accent"
          >
            // Insights
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Latest Insights
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/insights"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            Read Insights
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10 w-full relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-6">
            {recentPosts.map((post, i) => (
              <CarouselItem key={post.id} className="pl-4 sm:pl-6 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="h-full"
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
                <h3 className="mt-3 text-base font-semibold leading-snug transition-colors duration-300 group-hover:text-accent sm:text-lg line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
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
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselNext className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 h-20 w-20 border-0 bg-transparent hover:bg-transparent text-foreground [&>svg]:h-12 [&>svg]:w-12 [&>svg]:stroke-[1.5]" />
        </Carousel>
      </div>
    </section>
  );
};
