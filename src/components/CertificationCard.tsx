import { Award, FileBadge, ExternalLink } from "lucide-react";
import type { DbCertificate } from "@/types/database.types";

interface CertificationCardProps {
  certificate: DbCertificate;
}

export const CertificationCard = ({ certificate }: CertificationCardProps) => {
  // If the certificate has a URL, we wrap the entire card in an anchor tag
  const CardWrapper = certificate.url ? "a" : "div";
  const wrapperProps = certificate.url 
    ? { href: certificate.url, target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-cell ${
        certificate.url ? "cursor-pointer" : ""
      }`}
    >
      
      {/* Top Image Zone */}
      {certificate.image_url ? (
        <div className="relative h-40 border-b border-border">
          <img
            src={certificate.image_url}
            alt={`${certificate.name} certificate from ${certificate.provider}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative flex h-40 flex-col items-center justify-center border-b border-border bg-gradient-to-br from-[#1c1c1c] to-[#222]">
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <FileBadge className="h-8 w-8 text-muted-foreground/60" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Image non définie
            </span>
          </div>
        </div>
      )}

      {/* Bottom Info Zone */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <Award className="h-6 w-6 text-accent" />
            {certificate.url && (
              <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
            )}
          </div>
          <div>
            <h4 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
              {certificate.name}
            </h4>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {certificate.provider}
            </p>
          </div>
        </div>
        
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 mt-auto pt-4">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
