import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  ShoppingBag,
  Building2,
  Globe,
  Rocket,
  Megaphone,
  MapPin,
  Search,
  BarChart3,
  Package,
  Send,
  HeadphonesIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   WHO I HELP
───────────────────────────────────────────── */
const WHO_I_HELP = [
  { label: "Small businesses", icon: Building2 },
  { label: "Marketing teams", icon: Megaphone },
  { label: "E-commerce businesses", icon: ShoppingBag },
  { label: "Startups", icon: Rocket },
  { label: "Agencies", icon: Users },
  { label: "Moroccan companies", icon: MapPin },
  { label: "Remote international clients", icon: Globe },
] as const;

/* ─────────────────────────────────────────────
   HOW I WORK
───────────────────────────────────────────── */
const HOW_I_WORK = [
  {
    step: "01",
    title: "Discovery",
    icon: Search,
    body: "We clarify your goal, data sources, and the decision you need to make.",
  },
  {
    step: "02",
    title: "Data Review",
    icon: BarChart3,
    body: "I audit the raw data, check quality, and identify gaps or opportunities.",
  },
  {
    step: "03",
    title: "Dashboard / Analysis",
    icon: Package,
    body: "I build the dashboard, analysis, or report that answers your question.",
  },
  {
    step: "04",
    title: "Delivery",
    icon: Send,
    body: "You receive a clean, documented deliverable with clear takeaways.",
  },
  {
    step: "05",
    title: "Support",
    icon: HeadphonesIcon,
    body: "Follow-up questions, revisions, and ongoing support are included.",
  },
] as const;

/* ─────────────────────────────────────────────
   TOOLS I USE
───────────────────────────────────────────── */
const TOOLS = [
  "Power BI",
  "Excel",
  "SQL",
  "Python",
  "Google Analytics",
  "Looker Studio",
  "Supabase",
  "React",
  "Google Sheets",
  "Meta Ads data",
  "Marketing dashboards",
] as const;

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay },
});

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-mono text-xs uppercase tracking-widest text-accent">
    {children}
  </p>
);

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const HomeTrustSections = () => {
  return (
    <div className="container space-y-24 pb-24 pt-4">
      {/* ── 1. Who I Help ── */}
      <section aria-labelledby="who-i-help-heading">
        <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
          <SectionLabel>// Who I Help</SectionLabel>
          <h2
            id="who-i-help-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Built for teams that run on data.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Whether you need a dashboard by next week or a long-term analytics
            partner, I work with:
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {WHO_I_HELP.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.06)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-cell"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <Icon className="h-4 w-4 text-accent" />
              </span>
              <span className="text-xs font-medium leading-snug text-foreground/90">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 2. How I Work ── */}
      <section aria-labelledby="how-i-work-heading">
        <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
          <SectionLabel>// How I Work</SectionLabel>
          <h2
            id="how-i-work-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            A simple, transparent process.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            No black box. Every project follows the same clear steps so you
            always know what&apos;s happening.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_I_WORK.map(({ step, title, icon: Icon, body }, i) => (
            <motion.div
              key={step}
              {...fadeUp(i * 0.08)}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-cell lg:col-span-1"
            >
              {/* Step number watermark */}
              <span className="absolute -right-2 -top-3 font-mono text-5xl font-bold text-border/40 select-none transition-colors group-hover:text-accent/10">
                {step}
              </span>

              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <Icon className="h-4 w-4 text-accent" />
              </span>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Step {step}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Tools I Use ── */}
      <section aria-labelledby="tools-heading">
        <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
          <SectionLabel>// Tools I Use</SectionLabel>
          <h2
            id="tools-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            The right tool for every data challenge.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {TOOLS.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all duration-200 hover:border-accent hover:text-accent"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Block ── */}
      <motion.div
        {...fadeUp(0.1)}
        className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-8 text-center sm:p-12"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Ready to start?
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s solve your data problem.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Tell me about your project and I&apos;ll suggest the right approach
          &mdash; dashboard, analysis, automation, or reporting.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            id="trust-cta-work-with-me"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
          >
            Work With Me
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            id="trust-cta-view-services"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            View Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
