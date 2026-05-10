import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code, Award, CalendarDays, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ExpandableCell } from "@/components/ExpandableCell";
import { CertificationCard } from "@/components/CertificationCard";
import { LearningCard } from "@/components/LearningCard";
import { useEducation } from "@/hooks/queries/useEducation";
import { useLearning } from "@/hooks/queries/useLearning";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";

const Education = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const { data: educationCells, isLoading: isEduLoading } = useEducation();
  const { data: learningItems, isLoading: isLearningLoading } = useLearning();

  const isLoading = isEduLoading || isLearningLoading;

  if (isLoading) {
    return (
      <Layout>
        <section className="container py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-32 w-full rounded-3xl" />
              <Skeleton className="h-32 w-full rounded-3xl" />
              <Skeleton className="h-32 w-full rounded-3xl" />
            </div>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="mt-4 h-24 w-full rounded-3xl" />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  const academicCells = educationCells?.filter((c) => c.kind === "academic") ?? [];
  const bootcampCells = educationCells?.filter((c) => c.kind === "bootcamp") ?? [];
  const certificationCells = educationCells?.filter((c) => c.kind === "certification") ?? [];
    
  const allCertificates = certificationCells.flatMap((c) => c.certificates || []);

  // Stats Calculations
  let totalYears = 0;
  academicCells.forEach(cell => {
    if (cell.period) {
      const years = cell.period.match(/\d{4}/g);
      if (years && years.length === 2) {
        totalYears += (parseInt(years[1]) - parseInt(years[0]));
      }
    }
  });
  
  const displayYears = totalYears > 0 ? `${totalYears}+` : `${academicCells.length > 0 ? '5+' : '0'}`;
  const displayCerts = `${allCertificates.length}+`;
  const displayBootcamps = `${bootcampCells.length}+`;

  return (
    <Layout>
      <SEO
        title="Education & Certifications — Data Analytics"
        description="Academic background and professional certifications in data analytics, business intelligence, and marketing. Continuous learner with hands-on training in SQL, Python, Power BI, and Google Analytics."
        canonical="https://ayoub-benyahia.com/education"
      />
      <section className="container py-12 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-left sm:text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Education
          </h1>
          <p className="mt-4 text-muted-foreground sm:mx-auto sm:max-w-2xl">
            Academic foundations, intensive training programs, and professional
            certifications.
          </p>
        </motion.header>

        {/* Dynamic Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface p-6 text-center shadow-sm">
            <span className="font-mono text-4xl font-bold text-accent">{displayYears}</span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Years of Study</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface p-6 text-center shadow-sm">
            <span className="font-mono text-4xl font-bold text-accent">{displayCerts}</span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Certifications</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface p-6 text-center shadow-sm">
            <span className="font-mono text-4xl font-bold text-accent">{displayBootcamps}</span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Bootcamps</span>
          </div>
        </motion.div>

        {/* SECTION A: The Accordions */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4">
          
          {/* Academic Header */}
          {academicCells.length > 0 && (
            <div className="mt-8 mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
              <GraduationCap className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-accent">
                Academic Education
              </h2>
            </div>
          )}

          {academicCells.map((cell) => {
            const isOpen = openIndex === cell.id;
            return (
              <ExpandableCell
                key={cell.id}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : cell.id)}
                leftVisual={
                  <GraduationCap className="h-6 w-6 text-accent" />
                }
                title={cell.level}
                subtitle={
                  <span className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span>{cell.speciality ?? ""} · {cell.school ?? ""}</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {cell.period}
                    </span>
                  </span>
                }
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Speciality</dt>
                      <dd>{cell.speciality}</dd>
                      {cell.department && (
                        <>
                          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Department</dt>
                          <dd>{cell.department}</dd>
                        </>
                      )}
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">School</dt>
                      <dd>{cell.school}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">University</dt>
                      <dd>{cell.university}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Location</dt>
                      <dd>{cell.location}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Period</dt>
                      <dd>{cell.period}</dd>
                    </dl>
                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Description</p>
                    <p className="mt-3 leading-relaxed text-foreground/90">{cell.description}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">Skillset</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cell.skills?.map((s) => (
                        <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ExpandableCell>
            );
          })}

          {/* Bootcamp Header */}
          {bootcampCells.length > 0 && (
            <div className="mt-16 mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
              <Code className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-accent">
                Bootcamps & Training Programs
              </h2>
            </div>
          )}

          {bootcampCells.map((cell) => {
            const isOpen = openIndex === cell.id;
            return (
              <ExpandableCell
                key={cell.id}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : cell.id)}
                leftVisual={
                  <GraduationCap className="h-6 w-6 text-accent" />
                }
                title={cell.title}
                subtitle={
                  <span className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span>{cell.operator ?? ""} · {cell.location ?? ""}</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {cell.period}
                    </span>
                  </span>
                }
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Format</dt>
                      <dd>{cell.format}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Operator</dt>
                      <dd>{cell.operator}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Location</dt>
                      <dd>{cell.location}</dd>
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Period</dt>
                      <dd>{cell.period}</dd>
                    </dl>
                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Description</p>
                    <p className="mt-3 leading-relaxed text-foreground/90">{cell.description}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">Skillset</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cell.skills?.map((s) => (
                        <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ExpandableCell>
            );
          })}
        </div>

        {/* SECTION B: The Open Grid */}
        {allCertificates.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="mb-6 flex items-center gap-3 border-b border-border/40 pb-4">
              <Award className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-accent">
                Online Certifications
              </h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allCertificates.map((cert) => (
                <CertificationCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION C: Currently Learning */}
        {learningItems && learningItems.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="mb-6 flex items-center gap-3 border-b border-border/40 pb-4">
              <BookOpen className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-accent">
                Currently Learning
              </h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learningItems.map((learning) => (
                <LearningCard key={learning.id} learning={learning} />
              ))}
            </div>
          </div>
        )}

      </section>
    </Layout>
  );
};

export default Education;
