import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbEducation } from "@/types/database.types";

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("education")
        .select("*, certificates(*)")
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbEducation[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
