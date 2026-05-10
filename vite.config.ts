import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, "/");
          if (!normalizedId.includes("node_modules")) return undefined;

          if (
            normalizedId.includes("/react/") ||
            normalizedId.includes("/react-dom/") ||
            normalizedId.includes("/react-router-dom/")
          ) {
            return "react-vendor";
          }

          if (normalizedId.includes("/framer-motion/")) {
            return "animation-vendor";
          }

          if (
            normalizedId.includes("/lucide-react/") ||
            normalizedId.includes("/@radix-ui/")
          ) {
            return "ui-vendor";
          }

          if (
            normalizedId.includes("/@tanstack/react-query/") ||
            normalizedId.includes("/@tanstack/query-core/")
          ) {
            return "query-vendor";
          }

          if (normalizedId.includes("/@supabase/supabase-js/")) {
            return "supabase-vendor";
          }

          if (normalizedId.includes("formspree")) {
            return "form-vendor";
          }

          return undefined;
        },
      },
    },
  },
}));
