import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbValueProp } from "@/types/database.types";

export function useValueProps() {
  return useQuery({
    queryKey: ["value_props"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("value_props")
        .select("*")
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbValueProp[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
