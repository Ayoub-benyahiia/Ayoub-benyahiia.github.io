import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbSocialLink } from "@/types/database.types";

export function useSocialLinks(tier?: "primary" | "secondary") {
  return useQuery({
    queryKey: ["social_links", tier],
    queryFn: async () => {
      let query = supabase.from("social_links").select("*").order("sort_order");
      if (tier) query = query.eq("tier", tier);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data as DbSocialLink[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
