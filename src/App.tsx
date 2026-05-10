import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const Projects = lazy(() => import("./pages/Projects.tsx"));
const Experience = lazy(() => import("./pages/Experience.tsx"));
const Education = lazy(() => import("./pages/Education.tsx"));
const Activities = lazy(() => import("./pages/Activities.tsx"));
const Insights = lazy(() => import("./pages/Blog.tsx"));
const InsightsPost = lazy(() => import("./pages/BlogPost.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container flex min-h-[60vh] items-center justify-center py-24">
      <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm text-muted-foreground shadow-cell">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        Loading page
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightsPost />} />
            {/* Legacy redirects - keep old /blog URLs working */}
            <Route path="/blog" element={<Insights />} />
            <Route path="/blog/:slug" element={<InsightsPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
