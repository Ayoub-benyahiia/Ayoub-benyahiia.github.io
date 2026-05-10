import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Briefcase,
  Globe,
} from "lucide-react";
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
  projectType: string;
  budgetRange: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budgetRange: "",
  message: "",
};

const Contact = () => {
  const { data: profile } = useProfile();
  const profileEmail = profile?.email ?? "";
  const description =
    "Contact Ayoub Ben Yahia to hire a Data Analyst & Marketing Analytics Specialist for freelance projects, remote data analyst roles, or on-site opportunities in Morocco.";

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.projectType) newErrors.projectType = "Please select a project type.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(INITIAL_FORM);
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
              {submitted ? (
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
                    <h2 className="text-xl font-semibold">Message ready!</h2>
                    <p className="mt-2 text-muted-foreground">
                      Thanks! Your message is ready. Please send it by email for
                      now.
                    </p>
                  </div>
                  {profileEmail && (
                    <a
                      href={`mailto:${profileEmail}`}
                      id="contact-email-btn-success"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
                    >
                      <Mail className="h-4 w-4" />
                      Email Me at {profileEmail}
                    </a>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
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
                  noValidate
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
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                          errors.name ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500">{errors.name}</span>
                      )}
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
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                          errors.email ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500">{errors.email}</span>
                      )}
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
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className={`rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                          errors.projectType ? "border-red-500" : "border-border"
                        }`}
                      >
                        <option value="">Select a type…</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <span className="text-xs text-red-500">
                          {errors.projectType}
                        </span>
                      )}
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
                              setForm((prev) => ({ ...prev, budgetRange: b }))
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                              form.budgetRange === b
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
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
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your project, challenge, or opportunity…"
                        className={`resize-none rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                          errors.message ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-xs text-red-500">{errors.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>

                    {profileEmail && (
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        Prefer email?{" "}
                        <a
                          id="contact-email-btn"
                          href={`mailto:${profileEmail}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent hover:text-accent"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email Me
                        </a>
                      </span>
                    )}
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
            {(profile?.location || profile?.email) && (
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
                  {profile?.email && (
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-accent" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="transition hover:text-accent"
                      >
                        {profile.email}
                      </a>
                    </li>
                  )}
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
