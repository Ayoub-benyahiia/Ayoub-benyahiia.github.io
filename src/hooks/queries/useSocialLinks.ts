import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PRIMARY_SOCIALS, SECONDARY_SOCIALS } from "@/data/portfolio";
import type { DbSocialLink } from "@/types/database.types";

const fallbackSocialLinks: DbSocialLink[] = [
  ...PRIMARY_SOCIALS.map((item, index) => ({
    id: `fallback-primary-social-${index + 1}`,
    label: item.label,
    href: item.href,
    icon: item.icon,
    tier: "primary" as const,
    sort_order: index + 1,
    is_visible: true,
  })),
  ...SECONDARY_SOCIALS.map((item, index) => ({
    id: `fallback-secondary-social-${index + 1}`,
    label: item.label,
    href: item.href,
    icon: item.icon,
    tier: "secondary" as const,
    sort_order: PRIMARY_SOCIALS.length + index + 1,
    is_visible: true,
  })),
];

interface UseSocialLinksOptions {
  publicOnly?: boolean;
}

export function useSocialLinks(
  tier?: "primary" | "secondary",
  options: UseSocialLinksOptions = {}
) {
  const { publicOnly = false } = options;

  return useQuery({
    queryKey: ["social_links", tier, publicOnly],
    queryFn: async () => {
      if (!supabase) {
        const links = tier
          ? fallbackSocialLinks.filter((social) => social.tier === tier)
          : fallbackSocialLinks;
        return publicOnly
          ? links.filter((social) => social.is_visible !== false)
          : links;
      }

      let query = supabase.from("social_links").select("*").order("sort_order");
      if (tier) query = query.eq("tier", tier);
      if (publicOnly) query = query.eq("is_visible", true);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data as DbSocialLink[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
