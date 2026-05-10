import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbProfile } from "@/types/database.types";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      return data as DbProfile;
    },
    staleTime: 1000 * 60 * 5,
  });
}
