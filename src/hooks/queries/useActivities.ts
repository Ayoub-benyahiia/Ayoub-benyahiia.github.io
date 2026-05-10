import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbActivity } from "@/types/database.types";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbActivity[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
