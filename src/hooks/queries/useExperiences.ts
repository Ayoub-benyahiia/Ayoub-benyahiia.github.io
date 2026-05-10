import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbExperience } from "@/types/database.types";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbExperience[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
