import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Users, Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useActivities } from "@/hooks/queries/useActivities";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityGallery } from "@/components/ActivityGallery";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

const CATEGORY_ICON: Record<string, typeof Trophy> = {
  Leadership: Users,
  Hackathon: Trophy,
  Sport: Heart,
  Community: Users,
  Creative: Sparkles,
};

// Mock data for development and fallback
const MOCK_ACTIVITIES = [
  {
    id: "1",
    title: "Founded Robotics Club at ENSA Agadir",
    category: "Leadership",
    date: "2023 - Present",
    description: "Created and led the first robotics club at ENSA Agadir. Organized weekly workshops, recruited 30+ members, and coordinated participation in national robotics competitions.",
    images: [
      "https://images.unsplash.com/photo-1561144443-f54683cb461b?q=80&w=800",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800"
    ]
  },
  {
    id: "2",
    title: "Data Analysis Workshop - Morocco BI",
    category: "Community",
    date: "Oct 2024",
    description: "Led a hands-on workshop on Business Intelligence and Data Analytics for local university students, focusing on Power BI and SQL applications in marketing.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bbbda5366a71?q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      "https://images.unsplash.com/photo-1504868584819-f8e905263543?q=80&w=800",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=800"
    ]
  }
];

const Activities = () => {
  const { data: dbActivities, isLoading } = useActivities();
  const description =
    "Activities, community involvement, learning, and public work that show Ayoub Ben Yahia's growth beyond data analytics projects.";

  // Merge DB data with mock data or use mock if DB is empty/fails
  const activities = dbActivities?.length 
    ? dbActivities.map(a => ({
        ...a,
        images: a.media_url ? [a.media_url, ...MOCK_ACTIVITIES[0].images.slice(1)] : MOCK_ACTIVITIES[0].images
      }))
    : MOCK_ACTIVITIES;

  if (isLoading && !activities.length) {
    return (
      <Layout>
        <section className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-3xl" />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Activities & Community Involvement"
        description={description}
        canonical={absoluteUrl("/activities")}
        structuredData={[
          createWebPageSchema({
            title: "Activities & Community Involvement",
            description,
            path: "/activities",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Activities", path: "/activities" },
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
            // Activities
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            A living feed of growth, leadership and play.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Clubs founded, hackathons joined, sports played, ideas published. The story
            outside the CV.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/experience"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              View experience
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent-glow"
            >
              Contact Ayoub
            </Link>
          </div>
        </motion.header>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6">
          {activities.map((post, i) => {
            const Icon = CATEGORY_ICON[post.category] ?? Users;
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="overflow-hidden rounded-3xl border border-border bg-surface shadow-cell transition-all duration-500 hover:border-accent/60 hover:shadow-elevated"
              >
                {/* Header */}
                <div className="flex items-start gap-4 p-5 sm:p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug sm:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {post.category} · {post.date}
                    </p>
                  </div>
                </div>

                {/* Media frame - Now using ActivityGallery */}
                <div className="mx-5 sm:mx-6">
                  <ActivityGallery images={post.images} title={post.title} />
                </div>

                {/* Description */}
                <div className="p-5 sm:p-6">
                  <p className="leading-relaxed text-foreground/90">
                    {post.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Activities;
