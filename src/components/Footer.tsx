import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  BookOpen,
  ArrowRight,
  Circle,
} from "lucide-react";
import { useProfile } from "@/hooks/queries/useProfile";
import { useSocialLinks } from "@/hooks/queries/useSocialLinks";

const ICON_MAP: Record<string, typeof Mail> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  whatsapp: MessageCircle,
  medium: BookOpen,
};

const POSITIONING =
  "Data Analyst & Marketing Analytics Specialist helping businesses turn raw data into dashboards, insights, and better decisions.";

const AVAILABILITY =
  "Available for freelance projects, remote roles, and on-site opportunities in Morocco. Open to international remote collaborations.";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Activities", href: "/activities" },
];

const SERVICE_LINKS = [
  { label: "Data Analytics", href: "/services#data-analytics" },
  { label: "Dashboard Creation", href: "/services#dashboard-creation" },
  { label: "Marketing Analytics", href: "/services#marketing-analytics" },
  { label: "Reporting Automation", href: "/services#reporting-automation" },
  { label: "SEO & Content Analytics", href: "/services#seo-content-analytics" },
];

export const Footer = () => {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();

  const publicSocialLinks =
    socialLinks?.filter((social) => !social.href.startsWith("mailto:")) ?? [];

  if (!profile) return null;

  return (
    <footer className="relative mt-24 border-t border-border/60 bg-surface/40">
      {/* ── Top CTA strip ── */}
      <div className="border-b border-border/40 bg-accent/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              // Ready to start?
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Let&apos;s turn your data into decisions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              id="footer-cta-start-project"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
            >
              Start a Project
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/services"
              id="footer-cta-view-services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Brand & Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold">
              <span className="text-accent">{profile.name.charAt(0)}</span>
              {profile.name.slice(1)}.
            </h2>
            <p className="mt-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {profile.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {POSITIONING}
            </p>

            {/* Availability badge */}
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <Circle className="mt-0.5 h-2 w-2 shrink-0 fill-accent text-accent animate-pulse" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {AVAILABILITY}
              </p>
            </div>

            {/* Service tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Analytics", "Dashboards", "Marketing", "Reporting"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Services + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {SERVICE_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="transition hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-accent">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {profile.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-accent" />
                  {profile.phone}
                </li>
              )}
              {profile.location && (
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0 text-accent" />
                  {profile.location}
                </li>
              )}
            </ul>
          </motion.div>

          {/* Column 4 — Connect & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Connect
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {publicSocialLinks.map((social) => {
                const Icon = ICON_MAP[social.icon] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:scale-110 hover:border-accent hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>

            {/* Primary CTA */}
            <div className="mt-6 space-y-2">
              <Link
                to="/contact"
                id="footer-cta-work-with-me"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:bg-accent-glow"
              >
                Work With Me
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="transition hover:text-accent">
              Work With Me
            </Link>
            <Link to="/services" className="transition hover:text-accent">
              Services
            </Link>
            <Link to="/projects" className="transition hover:text-accent">
              Projects
            </Link>
            <Link to="/insights" className="transition hover:text-accent">
              Insights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
