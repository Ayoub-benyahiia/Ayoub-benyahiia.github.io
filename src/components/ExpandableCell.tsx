import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface ExpandableCellProps {
  isOpen: boolean;
  onToggle: () => void;
  /** Left visual (illustration / logo / icon) */
  leftVisual: ReactNode;
  /** Compact label shown when collapsed */
  title: ReactNode;
  /** Optional sub-label under title */
  subtitle?: ReactNode;
  /** Right-side meta when collapsed (e.g. dates, location) */
  meta?: ReactNode;
  children: ReactNode;
}

/**
 * The signature interaction primitive of the portfolio.
 * Stacked, rounded, expands in place. Only one open at a time
 * is enforced by the parent.
 */
export const ExpandableCell = ({
  isOpen,
  onToggle,
  leftVisual,
  title,
  subtitle,
  meta,
  children,
}: ExpandableCellProps) => {
  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
      className={`group overflow-hidden rounded-3xl border bg-surface transition-colors duration-300 ${
        isOpen
          ? "border-accent shadow-cell"
          : "border-border hover:border-accent/50"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-4 text-left sm:gap-6 sm:p-5"
      >
        <div
          className="shrink-0 grid h-14 w-14 sm:h-16 sm:w-16 place-items-center overflow-hidden rounded-2xl border border-accent/10 bg-accent/10 transition-all duration-500"
        >
          {leftVisual}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="truncate text-base font-semibold sm:text-lg">{title}</h3>
          {subtitle && (
            <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
              {subtitle}
            </div>
          )}
        </div>

        {meta && (
          <div className="hidden shrink-0 text-right md:block">{meta}</div>
        )}

        <div
          className={`shrink-0 grid place-items-center transition-transform duration-500 ${
            isOpen ? "rotate-180 text-accent" : "text-muted-foreground"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 p-5 sm:p-7">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
