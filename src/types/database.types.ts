/* =============================================
   Database types — mirrors Supabase schema
   ============================================= */

export interface DbProfile {
  id: string;
  name: string;
  title: string;
  subtitle: string | null;
  greeting: string | null;
  pitch: string | null;
  bio: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface DbValueProp {
  id: string;
  title: string;
  body: string;
  sort_order: number;
}

export interface DbSocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
  tier: "primary" | "secondary";
  sort_order: number;
}

export interface DbSkill {
  id: string;
  name: string;
  sort_order: number;
  is_visible: boolean;
}

export interface DbProjectCategory {
  slug: string;
  label: string;
  tagline: string | null;
  icon: string | null;
  sort_order: number;
}

export interface DbProject {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_slug: string;
  tags: string[];
  tools: string[];
  cover_url: string | null;
  image_url: string | null;
  medium_url: string | null;
  github_url: string | null;
  live_url: string | null;
  industry: string | null;
  main_keyword: string | null;
  result_summary: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  project_categories?: DbProjectCategory;
}

export interface DbExperience {
  id: string;
  job_title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string;
  type: string;
  work_mode: string;
  narrative: string | null;
  responsibilities: string[];
  skills: string[];
  sort_order: number;
}

export interface DbEducation {
  id: string;
  kind: "academic" | "bootcamp" | "certification";
  level: string | null;
  speciality: string | null;
  department: string | null;
  school: string | null;
  university: string | null;
  title: string | null;
  format: string | null;
  operator: string | null;
  location: string | null;
  period: string | null;
  description: string | null;
  skills: string[];
  sort_order: number;
  certificates?: DbCertificate[];
}

export interface DbCertificate {
  id: string;
  education_id: string;
  name: string;
  provider: string;
  skills: string[];
  image_url?: string | null;
  url?: string | null;
  sort_order: number;
}

export interface DbActivity {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string | null;
  media_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

/* Grouped project shape for public UI */
export interface ProjectCellFromDb {
  category: string;
  slug: string;
  tagline: string;
  icon: string | null;
  projects: DbProject[];
}

export interface DbLearning {
  id: string;
  title: string;
  provider: string;
  expected_completion: string;
  skills: string[];
  url?: string | null;
  sort_order: number;
}
