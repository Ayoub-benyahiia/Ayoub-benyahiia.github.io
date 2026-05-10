import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbSkill } from "@/types/database.types";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbSkill[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
