import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FolderOpen, Mail, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  return (
    <Layout>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist. Head back to the homepage or explore Ayoub Ben Yahia's data analytics portfolio."
      />
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        {/* Decorative number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative select-none"
        >
          <span className="bg-gradient-to-b from-accent/30 to-transparent bg-clip-text text-[10rem] font-bold leading-none tracking-tighter text-transparent sm:text-[14rem]">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-bold leading-none tracking-tighter text-accent/10 sm:text-[14rem]">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 max-w-md"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // Page not found
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The URL may have changed, or the page may have been removed. Head
            back and find what you&apos;re looking for.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            id="notfound-go-home"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-glow"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/projects"
            id="notfound-view-projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <FolderOpen className="h-4 w-4" />
            View Projects
          </Link>
          <Link
            to="/contact"
            id="notfound-contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </motion.div>

        {/* Quick nav hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-xs text-muted-foreground/50"
        >
          Or try:{" "}
          <Link to="/services" className="transition hover:text-accent">
            Services
          </Link>
          {" · "}
          <Link to="/insights" className="transition hover:text-accent">
            Insights
          </Link>
          {" · "}
          <Link to="/experience" className="transition hover:text-accent">
            Experience
          </Link>
          <ArrowRight className="ml-1 inline h-3 w-3 text-accent" />
        </motion.p>
      </section>
    </Layout>
  );
};

export default NotFound;
