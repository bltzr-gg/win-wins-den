import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function usePointsBalance() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["points-balance", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("points_balance, tier, streak_current, nft_multiplier")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function usePointsBreakdown() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["points-breakdown", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("points_transactions")
        .select("reason, amount")
        .eq("user_id", user!.id);
      if (error) throw error;

      const breakdown: Record<string, number> = {};
      for (const tx of data ?? []) {
        breakdown[tx.reason] = (breakdown[tx.reason] ?? 0) + tx.amount;
      }
      return breakdown;
    },
  });
}

export function usePointsHistory(limit = 20) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["points-history", user?.id, limit],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("points_transactions")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    },
  });
}
