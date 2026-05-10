import { Loader, ExternalLink } from "lucide-react";
import type { DbLearning } from "@/types/database.types";

interface LearningCardProps {
  learning: DbLearning;
}

export const LearningCard = ({ learning }: LearningCardProps) => {
  const CardWrapper = learning.url ? "a" : "div";
  const wrapperProps = learning.url 
    ? { href: learning.url, target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:shadow-cell ${
        learning.url ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-background/50 px-3 py-1">
            <Loader className="h-3.5 w-3.5 animate-spin text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              In Progress
            </span>
          </div>
          {learning.url && (
            <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
          )}
        </div>
        
        <div>
          <h4 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
            {learning.title}
          </h4>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {learning.provider} · Target: {learning.expected_completion}
          </p>
        </div>
      </div>
      
      {learning.skills && learning.skills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 pt-4">
          {learning.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-accent/20 group-hover:text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </CardWrapper>
  );
};
