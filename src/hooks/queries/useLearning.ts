import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbLearning } from "@/types/database.types";

export function useLearning() {
  return useQuery({
    queryKey: ["learning"],
    queryFn: async () => {
      // Return a mocked array until the 'learning_in_progress' table is actually created in Supabase
      // Once created, you can uncomment the actual fetch logic below.
      
      /*
      const { data, error } = await supabase
        .from("learning_in_progress")
        .select("*")
        .order("sort_order");
      if (error) throw new Error(error.message);
      return data as DbLearning[];
      */

      // Mock Data
      return [
        {
          id: "mock-1",
          title: "AWS Certified Solutions Architect",
          provider: "Amazon Web Services",
          expected_completion: "August 2026",
          skills: ["Cloud Computing", "AWS", "Architecture"],
          url: "https://aws.amazon.com/certification/",
          sort_order: 1
        }
      ] as DbLearning[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
