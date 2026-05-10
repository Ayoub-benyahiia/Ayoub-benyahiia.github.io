import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ToggleTheme } from "./ToggleTheme";
import { useProfile } from "@/hooks/queries/useProfile";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/activities", label: "Activities" },
  { to: "/insights", label: "Insights" },
];

export const Navbar = () => {
  const location = useLocation();
  const { data: profile } = useProfile();

  const initial = profile?.name?.charAt(0) ?? "A";
  const firstName = profile?.name?.split(" ")[0] ?? "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-foreground font-bold">
            {initial}
          </span>
          <span className="hidden sm:inline">{firstName}.</span>
        </NavLink>

        <ul className="relative flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <li key={item.to} className="relative">
                <NavLink
                  to={item.to}
                  className={`relative z-10 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
                    active
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
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
              </li>
            );
          })}
        </ul>

        <ToggleTheme />
      </nav>
    </header>
  );
};
