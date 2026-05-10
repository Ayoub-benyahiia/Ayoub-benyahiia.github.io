import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const ArticleCTA = () => (
  <section
    className="rounded-3xl border border-border bg-surface p-6 text-center sm:p-8"
    aria-labelledby="article-cta-heading"
  >
    <p className="font-mono text-xs uppercase tracking-widest text-accent">
      Next step
    </p>
    <h2
      id="article-cta-heading"
      className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
    >
      Need help turning data into dashboards, reports, or marketing insights?
    </h2>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <Link
        to="/contact"
        className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
      >
        Work With Me
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link
        to="/services"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
      >
        View Services
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
      >
        View Projects
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);
