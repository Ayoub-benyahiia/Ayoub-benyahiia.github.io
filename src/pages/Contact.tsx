import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Send,
  CheckCircle2,
  Briefcase,
  Globe,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Layout } from "@/components/Layout";
import { useProfile } from "@/hooks/queries/useProfile";
import { SEO } from "@/components/SEO";
import { absoluteUrl } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createContactPageSchema,
  createWebPageSchema,
} from "@/lib/schema";

const PROJECT_TYPES = [
  "Dashboard",
  "Data Analysis",
  "Marketing Analytics",
  "Reporting Automation",
  "SEO Analytics",
  "Remote Role",
  "On-site Opportunity",
  "Other",
] as const;

const BUDGET_RANGES = [
  "Not sure yet",
  "Small project",
  "Medium project",
  "Long-term collaboration",
  "Hiring / job opportunity",
] as const;

interface FormState {
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  project_type: "",
  budget: "",
  message: "",
};

const Contact = () => {
  const { data: profile } = useProfile();
  const [state, handleSubmit, resetForm] = useForm("xojrpwnl");
  const description =
    "Contact Ayoub Ben Yahia to hire a Data Analyst & Marketing Analytics Specialist for freelance projects, remote data analyst roles, or on-site opportunities in Morocco.";

  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    if (state.succeeded) {
      setForm(INITIAL_FORM);
    }
  }, [state.succeeded]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (state.succeeded) {
      resetForm();
    }
  };

  return (
    <Layout>
      <SEO
        title="Work With Me - Hire a Freelance Data Analyst"
        description={description}
        canonical={absoluteUrl("/contact")}
        structuredData={[
          createContactPageSchema({ description }),
          createWebPageSchema({
            title: "Work With Me - Hire a Freelance Data Analyst",
            description,
            path: "/contact",
            type: "ContactPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
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
            // Contact
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something useful with your data
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Tell me about your project, dashboard, reporting problem, or
            analytics needs. Use this page to hire Ayoub for freelance data
            analytics work, remote roles, or on-site opportunities in Morocco.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Review services
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              See project examples
            </Link>
          </div>
        </motion.header>

        {/* ── Two-column layout ── */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-[1fr_340px]">
          {/* ── Left — Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {state.succeeded ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-accent/30 bg-surface p-10 text-center sm:p-14"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 ring-4 ring-accent/20">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">Message sent!</h2>
                    <p className="mt-2 text-muted-foreground">
                      Thanks! Your message has been sent. I&rsquo;ll get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                      <ValidationError
                        field="email"
                        errors={state.errors}
                        className="text-xs text-red-500"
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-company"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Company
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    {/* Project type */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-project-type"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Project type <span className="text-accent">*</span>
                      </label>
                      <select
                        id="contact-project-type"
                        name="project_type"
                        required
                        value={form.project_type}
                        onChange={handleChange}
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Select a type…</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget range — full width */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="contact-budget"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Budget range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_RANGES.map((b) => (
                          <button
                            key={b}
                            type="button"
                            id={`contact-budget-${b.toLowerCase().replace(/[\s/]+/g, "-")}`}
                            onClick={() =>
                              setForm((prev) => ({ ...prev, budget: b }))
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                              form.budget === b
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                        <input type="hidden" name="budget" value={form.budget} />
                      </div>
                    </div>

                    {/* Message — full width */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="contact-message"
                        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                      >
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your project, challenge, or opportunity…"
                        className="resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                      <ValidationError
                        field="message"
                        errors={state.errors}
                        className="text-xs text-red-500"
                      />
                    </div>
                  </div>

                  {state.errors && (
                    <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                      Something went wrong while sending your message. Please
                      check the form and try again.
                    </p>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={state.submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                    >
                      <Send className="h-4 w-4" />
                      {state.submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right — Sidebar cards ── */}
          <aside className="flex flex-col gap-5">
            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10">
                  <Briefcase className="h-5 w-5 text-accent" />
                </span>
                <h2 className="text-sm font-semibold">Availability</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Available for freelance projects, remote roles, and on-site
                opportunities in Morocco. Open to international remote
                collaborations.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Freelance",
                  "Remote",
                  "On-site (Morocco)",
                  "International",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Location card */}
            {profile?.location && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10">
                    <Globe className="h-5 w-5 text-accent" />
                  </span>
                  <h2 className="text-sm font-semibold">Contact info</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {profile?.location && (
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-accent" />
                      {profile.location}
                    </li>
                  )}
                </ul>
              </motion.div>
            )}

            {/* Response time note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-accent/20 bg-accent/5 p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Typical response time
              </p>
              <p className="mt-1.5 text-sm text-foreground/80">
                Within 24–48 hours on working days.
              </p>
            </motion.div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
