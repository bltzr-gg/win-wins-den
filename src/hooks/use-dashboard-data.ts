"use client";

import { useAuth } from "@/lib/auth";
import { usePointsBalance, usePointsBreakdown } from "@/hooks/use-points";
import { useUserRank } from "@/hooks/use-leaderboard";

/**
 * Provides the user state used by the Dashboard.
 * User-specific fields return null when unauthenticated or data is unavailable.
 */
export function useDashboardData() {
  const { profile } = useAuth();
  const { data: pointsData } = usePointsBalance();
  const { data: rank } = useUserRank();
  const { data: breakdown } = usePointsBreakdown();

  const hasRealData = !!pointsData;

  const userState = {
    points: pointsData?.points_balance ?? profile?.points_balance ?? null,
    rank: rank ?? null,
    walletLinked: !!profile?.wallet_address,
    accountLinked: profile?.account_linked ?? false,
    firstBetPlaced: false,
    arenaActivity: false,
    streak: pointsData?.streak_current ?? profile?.streak_current ?? null,
    tier: pointsData?.tier ?? profile?.tier ?? null,
    nftMultiplier: pointsData?.nft_multiplier ?? profile?.nft_multiplier ?? null,
    displayName: profile?.twitter_handle ?? profile?.display_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    referralCode: profile?.referral_code ?? null,
    // Computed stats (mock for now, can be derived from leaderboard later)
    top100Cutoff: 10200,
    cutoffMovedToday: 150,
    ptsToPassNext: 300,
    nextRankUser: rank != null ? `#${rank - 1}` : null,
    ptsToTop25: 1800,
  };

  return { userState, breakdown, hasRealData };
}
