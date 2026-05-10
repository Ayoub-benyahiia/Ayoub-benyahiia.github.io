import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ProjectCellFromDb, DbProject } from "@/types/database.types";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data: categories, error: catErr } = await supabase
        .from("project_categories")
        .select("*, projects(*)")
        .eq("projects.is_published", true)
        .order("sort_order");
      if (catErr) throw new Error(catErr.message);

      return (categories as any[]).map((cat) => ({
        category: cat.label,
        slug: cat.slug,
        tagline: cat.tagline ?? "",
        icon: cat.icon,
        projects: ((cat.projects as DbProject[]) ?? [])
          .sort((a, b) => {
            if (a.sort_order !== b.sort_order) {
              return a.sort_order - b.sort_order;
            }
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }),
      })) as ProjectCellFromDb[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
