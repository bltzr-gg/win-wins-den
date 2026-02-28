import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function useLeaderboard(limit = 50) {
  return useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_leaderboard", {
        p_limit: limit,
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useUserRank() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-rank", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_rank", {
        p_user_id: user!.id,
      });
      if (error) throw error;
      return data as number;
    },
  });
}
