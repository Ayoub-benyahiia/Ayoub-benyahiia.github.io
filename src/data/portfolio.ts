import type {
  ProjectCell,
  ExperienceItem,
  EducationCell,
  ActivityPost,
  SocialLink,
} from "@/types/portfolio.types";

export const PROFILE = {
  name: "Ayoub Ben Yahia",
  title: "Data Analyst & Expert in Marketing",
  subtitle: "Data-Driven Growth · Business Intelligence · Expert Positioning",
  greeting: "Hi, I'm Ayoub",
  pitch:
    "I combine analytics and marketing strategy to help businesses grow faster, smarter, and with measurable results.",
  bio: "I am a Data Analyst and Marketing Expert focused on turning raw data into profitable decisions. I help brands, consultants, and companies scale through dashboards, customer insights, growth systems, performance marketing, and personal branding strategies.",
  location: "Rabat, Morocco",
  email: "ayoubbenyahia@gmail.com",
  phone: "+212 770 854 534",
} as const;

export const VALUE_PROPS = [
  {
    title: "Data-Driven Decisions",
    body: "Transform complex data into clear dashboards, KPIs, and insights that improve business performance.",
  },
  {
    title: "Growth Marketing Systems",
    body: "Build scalable acquisition funnels, campaigns, and automations that generate leads and revenue.",
  },
  {
    title: "Brand Authority & Positioning",
    body: "Help experts and businesses dominate their niche through smart positioning and trust-building content.",
  },
];

export const PRIMARY_SOCIALS: SocialLink[] = [
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: "mail" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayoub-ben-yahia-data/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/benyahia__ayoub?igsh=NnAxeW0xeDRoMXJ2&utm_source=qr",
    icon: "instagram",
  },
];

export const SECONDARY_SOCIALS: SocialLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/212770854534",
    icon: "whatsapp",
  },
  { label: "Medium", href: "https://medium.com/", icon: "medium" },
];

/* ======================================================================
   PROJECTS
   ====================================================================== */
export const PROJECT_CELLS: ProjectCell[] = [
  {
    category: "Data Analytics",
    tagline: "Insights, dashboards, and business intelligence.",
    projects: [
      { name: "Executive KPI Dashboard in Power BI", category: "Data Analytics" },
      { name: "Sales Forecasting Model with Python", category: "Data Analytics" },
      { name: "Customer Churn Analysis & Retention Strategy", category: "Data Analytics" },
      { name: "Marketing Attribution Dashboard", category: "Data Analytics" },
    ],
  },
  {
    category: "Marketing Strategy",
    tagline: "Growth systems built on numbers, not guesses.",
    projects: [
      { name: "Lead Generation Funnel for Consulting Brand", category: "Marketing Strategy" },
      { name: "High-Ticket Webinar Funnel Campaign", category: "Marketing Strategy" },
      { name: "Offer Positioning Strategy for Expert Coach", category: "Marketing Strategy" },
      { name: "CRM Automation for Sales Follow-Up", category: "Marketing Strategy" },
    ],
  },
  {
    category: "Performance Marketing",
    tagline: "Paid acquisition optimized for ROI.",
    projects: [
      { name: "Meta Ads Campaign — 4.2x ROAS", category: "Performance Marketing" },
      { name: "Google Ads Lead Generation System", category: "Performance Marketing" },
      { name: "Retargeting Funnel for E-commerce Brand", category: "Performance Marketing" },
      { name: "A/B Testing Landing Pages for Conversions", category: "Performance Marketing" },
    ],
  },
  {
    category: "Personal Branding",
    tagline: "Build trust, visibility, and authority.",
    projects: [
      { name: "LinkedIn Growth Strategy for CEO", category: "Personal Branding" },
      { name: "Content Engine for Industry Expert", category: "Personal Branding" },
      { name: "Instagram Authority Funnel for Consultant", category: "Personal Branding" },
      { name: "Newsletter Growth Strategy", category: "Personal Branding" },
    ],
  },
];

/* ======================================================================
   EXPERIENCE
   ====================================================================== */
export const EXPERIENCES: ExperienceItem[] = [
  {
    jobTitle: "Data Analyst & Growth Strategist",
    company: "Independent Consultant",
    location: "Rabat, Morocco",
    startDate: "January 2022",
    endDate: "Present",
    type: "Full-time",
    workMode: "Hybrid",
    narrative:
      "Helping businesses and personal brands scale through data analysis, dashboards, acquisition systems, and growth-focused marketing strategies.",
    responsibilities: [
      "Built Power BI dashboards for executive decision-making",
      "Analyzed sales and campaign performance data",
      "Created marketing funnels generating qualified leads",
      "Optimized paid campaigns for ROI growth",
      "Developed customer segmentation strategies",
      "Automated reporting systems",
    ],
    skills: [
      "Power BI",
      "SQL",
      "Python",
      "Excel",
      "Marketing Funnels",
      "Meta Ads",
      "Google Ads",
    ],
  },
  {
    jobTitle: "Marketing Analyst",
    company: "Growth Agency",
    location: "Casablanca, Morocco",
    startDate: "March 2020",
    endDate: "December 2021",
    type: "Full-time",
    workMode: "Remote",
    narrative:
      "Combined analytics with campaign execution to improve acquisition efficiency and customer lifetime value.",
    responsibilities: [
      "Tracked campaign KPIs and CAC",
      "Built reports for paid media channels",
      "Conducted A/B tests on landing pages",
      "Improved lead quality scoring systems",
    ],
    skills: ["Analytics", "CRO", "Paid Media", "Dashboards", "Reporting"],
  },
];

/* ======================================================================
   EDUCATION
   ====================================================================== */
export const EDUCATION_CELLS: EducationCell[] = [
  {
    kind: "academic",
    level: "Bachelor's Degree",
    speciality: "Business Intelligence & Marketing",
    department: "Business Department",
    school: "University Institute",
    university: "Morocco University",
    location: "Morocco",
    period: "2017 – 2020",
    description:
      "Studied analytics, statistics, business strategy, and digital marketing.",
    skills: ["Statistics", "SQL", "Excel", "Marketing", "Business Strategy"],
  },
  {
    kind: "bootcamp",
    title: "Data Analytics Professional Program",
    format: "Hybrid",
    location: "Morocco",
    operator: "Tech Academy",
    period: "2021",
    description:
      "Hands-on training in analytics, BI tools, dashboards, and business reporting.",
    skills: ["Power BI", "Python", "SQL", "Tableau"],
  },
  {
    kind: "certification",
    title: "Online Courses & Certifications",
    certificates: [
      {
        name: "Google Data Analytics",
        provider: "Google",
        skills: ["Data Cleaning", "Analysis", "Sheets"],
      },
      {
        name: "Meta Digital Marketing Associate",
        provider: "Meta",
        skills: ["Paid Ads", "Campaign Setup"],
      },
      {
        name: "Power BI Masterclass",
        provider: "Udemy",
        skills: ["DAX", "Dashboards", "Visualization"],
      },
      {
        name: "SQL for Business Analysis",
        provider: "Coursera",
        skills: ["SQL", "Queries", "Reporting"],
      },
    ],
  },
];

/* ======================================================================
   ACTIVITIES
   ====================================================================== */
export const ACTIVITIES: ActivityPost[] = [
  {
    title: "Weekly Data & Growth Insights",
    date: "Ongoing",
    category: "Content",
    description:
      "Publishing practical insights on analytics, dashboards, growth strategy, and marketing performance.",
  },
  {
    title: "Business Consulting Sessions",
    date: "Ongoing",
    category: "Consulting",
    description:
      "Helping brands improve acquisition, reporting, and decision-making systems.",
  },
  {
    title: "Speaker — Marketing Through Data",
    date: "2025",
    category: "Speaking",
    description:
      "Workshops on how companies can use analytics to increase ROI and growth.",
  },
  {
    title: "Mentoring Freelancers & Entrepreneurs",
    date: "Always",
    category: "Community",
    description:
      "Helping ambitious professionals grow with skills, systems, and strategy.",
  },
];
