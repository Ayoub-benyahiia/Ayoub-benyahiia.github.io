# My Digital Showcase

Welcome to the **My Digital Showcase** repository! This is a modern, high-performance portfolio and blog platform built to highlight professional experience, skills, projects, and articles.

## 🚀 Tech Stack

- **Framework:** React 18 powered by Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS with `tailwind-merge` & `tailwindcss-animate`
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Routing:** React Router v7 (`react-router-dom`)
- **State & Data Fetching:** React Query (`@tanstack/react-query`)
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Visualization:** Recharts

---

## 📂 Project Structure (A to Z)

The workspace is organized to be clean, modular, and easy to scale. Here is the complete breakdown of the project directories and files:

### Root Directory
```text
/
├── .env                  # Environment variables
├── package.json          # Project metadata, scripts, and dependencies
├── vite.config.ts        # Vite build tool configuration
├── tailwind.config.ts    # Tailwind CSS configuration and theme tokens
├── tsconfig.*.json       # TypeScript configuration files
├── components.json       # Shadcn UI CLI configuration
├── eslint.config.js      # ESLint configuration for code linting
├── vitest.config.ts      # Vitest testing configuration
└── index.html            # Main HTML entry point
```

### Source Directory (`/src`)
```text
src/
├── App.tsx               # Main application component & Routing Configuration
├── main.tsx              # Application entry point (React DOM render)
├── index.css             # Global CSS and Tailwind directives
├── App.css               # Additional global styles
├── vite-env.d.ts         # Vite TypeScript declarations
│
├── assets/               # Static assets (images, icons)
│   └── Ayoub.webp        # Main profile portrait
│
├── components/           # Reusable UI Components
│   ├── ExpandableCell.tsx# Custom UI component for expandable content
│   ├── Footer.tsx        # Global site footer
│   ├── Hero.tsx          # Main hero section (used on the Home page)
│   ├── Layout.tsx        # Main page wrapper (Navbar + Content + Footer)
│   ├── NavLink.tsx       # Custom navigation link component
│   ├── Navbar.tsx        # Global site navigation header
│   ├── RecentPosts.tsx   # Displays latest blog posts on the Home page
│   ├── ToggleTheme.tsx   # Dark/Light mode switcher
│   └── ui/               # Shadcn UI building blocks (Buttons, Dialogs, Cards, etc.)
│
├── hooks/                # Custom React Hooks
│   ├── use-mobile.tsx    # Hook to detect mobile viewports
│   ├── useTheme.ts       # Hook for managing Light/Dark theme state
│   ├── use-toast.ts      # Hook for managing toast notifications
│   └── queries/          # React Query hooks for data fetching
│       ├── useActivities.ts
│       ├── useBlogPosts.ts
│       ├── useEducation.ts
│       ├── useExperiences.ts
│       ├── useProfile.ts
│       ├── useProjects.ts
│       ├── useSkills.ts
│       ├── useSocialLinks.ts
│       └── useValueProps.ts
│
├── pages/                # Application Routes / Views
│   ├── Index.tsx         # Home Page (Renders Hero + RecentPosts)
│   ├── Projects.tsx      # Projects Showcase Page
│   ├── Experience.tsx    # Professional Experience Page
│   ├── Education.tsx     # Education & Certifications Page
│   ├── Activities.tsx    # Extracurriculars & Activities Page
│   ├── Blog.tsx          # Blog Hub (Lists all published articles)
│   ├── BlogPost.tsx      # Dynamic Route for individual blog articles
│   └── NotFound.tsx      # 404 Error Catch-all Page
│
├── lib/                  # Utility Functions
│   └── utils.ts          # Common utilities (like Tailwind class merging)
│
├── data/                 # Static data / Mock data
│
├── types/                # Global TypeScript interfaces & types
│
└── test/                 # Test suites and configuration
```

---

## 🚦 Routing Configuration

The app relies on `react-router-dom` in `App.tsx` for client-side navigation. 

- `/` ➡️ `Index.tsx` (Home)
- `/projects` ➡️ `Projects.tsx`
- `/experience` ➡️ `Experience.tsx`
- `/education` ➡️ `Education.tsx`
- `/activities` ➡️ `Activities.tsx`
- `/blog` ➡️ `Blog.tsx`
- `/blog/:slug` ➡️ `BlogPost.tsx` (Dynamic)
- `*` ➡️ `NotFound.tsx` (404 Page)

---

## 🛠️ Development Scripts

To run the project locally, you can use the following commands:

- **`npm run dev`**: Starts the Vite development server (usually on `http://localhost:8080` or `http://localhost:5173`).
- **`npm run build`**: Builds the app for production into the `dist` folder.
- **`npm run lint`**: Runs ESLint to check for code quality.
- **`npm run preview`**: Serves the built production bundle locally for testing.
- **`npm run test`**: Runs the Vitest test suites.

## 🤝 Next Steps & Extensibility

The project's modular nature allows for easy extensions:
- Add new Shadcn UI components using the CLI into `/src/components/ui`.
- Create new targeted landing pages in `/src/pages` and add them to the router in `App.tsx`.
- Enhance global data hooks in `/src/hooks/queries` to connect to a real backend (e.g., Supabase or a custom CMS) instead of mock data.
