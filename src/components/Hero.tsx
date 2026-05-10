import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Github, BookOpen, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/Ayoub.webp";
import { useProfile } from "@/hooks/queries/useProfile";
import { useValueProps } from "@/hooks/queries/useValueProps";
import { useSocialLinks } from "@/hooks/queries/useSocialLinks";
import { useSkills } from "@/hooks/queries/useSkills";
import { Skeleton } from "@/components/ui/skeleton";

const ICON_MAP: Record<string, typeof Mail> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  medium: BookOpen,
  instagram: Instagram,
  whatsapp: MessageCircle,
};

const FALLBACK_NAME = "Ayoub Ben Yahia";
const FALLBACK_TITLE = "Data Analyst & Marketing Analytics Specialist";
const FALLBACK_LOCATION = "Morocco";

export const Hero = () => {
  const { data: profile, isLoading: pL } = useProfile();
  const { data: valueProps, isLoading: vL } = useValueProps();
  const { data: socialLinks, isLoading: sL } = useSocialLinks("primary");
  const { data: skills, isLoading: kL } = useSkills();

  const isLoading = pL || vL || sL || kL;

  if (isLoading) {
    return (
      <section className="container pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64 rounded-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <Skeleton className="aspect-square w-full rounded-[2rem]" />
        </div>
      </section>
    );
  }

  const firstName = profile?.name?.split(" ")[0] ?? "Ayoub";
  const fullName = profile?.name ?? FALLBACK_NAME;
  const title = profile?.title ?? FALLBACK_TITLE;
  const location = profile?.location ?? FALLBACK_LOCATION;
  const skillNames = skills?.map((s) => s.name) ?? [];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

      <div className="container relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: copy */}
          <div className="space-y-8">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">
                Available for freelance projects, remote roles, and on-site opportunities in {location}
              </span>
              <span className="sm:hidden">
                Available for freelance & remote
              </span>
            </motion.div>

            {/* International availability */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground/70"
            >
              Open to international remote collaborations.
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              I help businesses turn raw data into dashboards, insights, and better decisions.
            </motion.h1>

            {/* Position + name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="max-w-xl text-base font-medium text-foreground sm:text-lg"
            >
              {title} — {firstName} Ben Yahia
            </motion.p>

            {/* Services paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I specialize in{" "}
              <span className="text-foreground">data analytics</span>,{" "}
              <span className="text-foreground">dashboards</span>,{" "}
              <span className="text-foreground">marketing analytics</span>,{" "}
              <span className="text-foreground">business reporting</span>, and{" "}
              <span className="text-foreground">KPI tracking</span>
              {" — "}turning complex data into clear, profitable decisions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
              >
                Work With Me
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/insights"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
              >
                Read Insights
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3 pt-2"
            >
              {socialLinks?.map((s) => {
                const Icon = ICON_MAP[s.icon] ?? Mail;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-square">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-accent opacity-20 blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
                <img
                  src={profile?.avatar_url || portrait}
                  alt={`${fullName} — portrait`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                {/* Decorative corner badge */}
                <div className="absolute bottom-4 left-4 rounded-2xl border border-border bg-background/80 px-3 py-2 backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {profile?.subtitle || "Data · Marketing · Growth"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skill marquee */}
        {skillNames.length > 0 && (
          <div className="relative mt-20 overflow-hidden border-y border-border/60 py-4">
            <div className="flex w-max animate-scroll-x gap-8">
              {[...skillNames, ...skillNames].map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-sm uppercase tracking-widest text-muted-foreground"
                >
                  {skill} <span className="text-accent">/</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Value props */}
        {valueProps && valueProps.length > 0 && (
          <div className="mt-20">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Why work with me
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Three honest reasons.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {valueProps.map((vp, i) => (
                <motion.div
                  key={vp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-accent hover:shadow-cell"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{vp.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{vp.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
