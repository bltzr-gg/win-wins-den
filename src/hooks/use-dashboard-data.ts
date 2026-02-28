"use client";

import { useAuth } from "@/lib/auth";
import { usePointsBalance, usePointsBreakdown } from "@/hooks/use-points";
import { useUserRank } from "@/hooks/use-leaderboard";

/**
 * Provides the user state used by the Dashboard, with mock fallbacks.
 * Once the DB is populated with real data, the mock values are replaced.
 */
export function useDashboardData() {
  const { profile } = useAuth();
  const { data: pointsData } = usePointsBalance();
  const { data: rank } = useUserRank();
  const { data: breakdown } = usePointsBreakdown();

  const hasRealData = !!pointsData;

  const userState = {
    points: pointsData?.points_balance ?? profile?.points_balance ?? 12450,
    rank: rank ?? 42,
    walletLinked: !!profile?.wallet_address,
    accountLinked: profile?.account_linked ?? false,
    firstBetPlaced: false,
    arenaActivity: false,
    streak: pointsData?.streak_current ?? profile?.streak_current ?? 4,
    tier: pointsData?.tier ?? profile?.tier ?? "Gold",
    nftMultiplier: pointsData?.nft_multiplier ?? profile?.nft_multiplier ?? 1.1,
    displayName: profile?.twitter_handle ?? profile?.display_name ?? "DEGEN_WHALE",
    avatarUrl: profile?.avatar_url ?? null,
    referralCode: profile?.referral_code ?? "DEGEN-7X42",
    // Computed stats (mock for now, can be derived from leaderboard later)
    top100Cutoff: 10200,
    cutoffMovedToday: 150,
    ptsToPassNext: 300,
    nextRankUser: `#${(rank ?? 42) - 1}`,
    ptsToTop25: 1800,
  };

  return { userState, breakdown, hasRealData };
}
