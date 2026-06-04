import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ToggleTheme } from "./ToggleTheme";
import { useProfile } from "@/hooks/queries/useProfile";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/services", label: "Services" },
  { to: "/activities", label: "Activities" },
  { to: "/contact", label: "Contact" },
  { to: "/insights", label: "Insights" },
];

export const Navbar = () => {
  const location = useLocation();
  const { data: profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initial = profile?.name?.charAt(0) ?? "A";
  const firstName = profile?.name?.split(" ")[0] ?? "";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const renderNavLink = (
    item: (typeof NAV_ITEMS)[number],
    variant: "desktop" | "mobile"
  ) => {
    const active =
      item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

    if (variant === "mobile") {
      return (
        <NavLink
          to={item.to}
          className={`flex min-h-11 items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
            active
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted-foreground hover:border-accent/50 hover:text-foreground"
          }`}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
          {active && <span className="font-mono text-[10px] uppercase">Current</span>}
        </NavLink>
      );
    }

    return (
      <NavLink
        to={item.to}
        className={`relative z-10 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
          active
            ? "text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-accent"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        {item.label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex min-w-0 items-center gap-2 rounded-xl font-mono text-sm font-medium tracking-tight"
          aria-label="Ayoub Ben Yahia home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-foreground font-bold">
            {initial}
          </span>
          <span className="hidden sm:inline">{firstName}.</span>
        </NavLink>

        <ul className="relative hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            return (
              <li key={item.to} className="relative">
                {renderNavLink(item, "desktop")}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ToggleTheme />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:text-accent lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border/60 bg-background/95 px-4 pb-5 pt-3 shadow-elevated backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto grid max-w-md gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>{renderNavLink(item, "mobile")}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
