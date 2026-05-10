// Portfolio domain types
export type Theme = "dark" | "light";

export interface SocialLink {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "medium" | "instagram" | "whatsapp";
}

export interface ProjectItem {
  name: string;
  category: ProjectCategory;
  // Medium article URL — placeholder until published
  mediumUrl?: string;
  description?: string;
  tags?: string[];
}

export type ProjectCategory =
  | "Industrial Automation"
  | "Robotics"
  | "IIoT & Data Systems"
  | "Mechanical Engineering"
  | "CAD & Design"
  | "AI & Computer Vision";

export interface ProjectCell {
  category: ProjectCategory;
  tagline: string;
  projects: ProjectItem[];
}

export interface ExperienceItem {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: "Internship" | "Full-time" | "Part-time" | "Project";
  workMode: "On-site" | "Remote" | "Hybrid";
  narrative: string;
  responsibilities: string[];
  skills: string[];
}

export interface AcademicEducation {
  kind: "academic";
  level: string;
  speciality: string;
  department?: string;
  school: string;
  university: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
}

export interface BootcampEducation {
  kind: "bootcamp";
  title: string;
  format: "In-person" | "Remote" | "Hybrid";
  location: string;
  operator: string;
  period: string;
  description: string;
  skills: string[];
}

export interface CertificationGroup {
  kind: "certification";
  title: string;
  certificates: {
    name: string;
    provider: string;
    skills: string[];
  }[];
}

export type EducationCell = AcademicEducation | BootcampEducation | CertificationGroup;

export interface ActivityPost {
  title: string;
  date: string;
  description: string;
  category: "Leadership" | "Hackathon" | "Sport" | "Community" | "Creative";
  // Visual media — placeholder for now
  media?: string;
}
