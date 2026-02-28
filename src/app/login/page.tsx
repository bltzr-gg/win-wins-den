"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        className="text-center space-y-8 max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-3">
          <h1 className="font-display text-4xl text-primary tracking-wider">
            REALBET
          </h1>
          <p className="font-display text-lg text-foreground tracking-wider">
            VIP HUB — SEASON 1
          </p>
          <p className="text-sm text-muted-foreground">
            Sign in to track your points, climb the leaderboard, and claim
            rewards.
          </p>
        </div>

        <button
          onClick={signIn}
          className="w-full py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Sign in with X
        </button>

        <p className="text-xs text-muted-foreground">
          By signing in you agree to participate in the RealBet Season 1
          competition.
        </p>
      </motion.div>
    </div>
  );
}
