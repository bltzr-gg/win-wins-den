"use client";

import { useAuth } from "@/lib/auth";
import { LogIn, Lock } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
  message?: string;
  compact?: boolean; // for small inline sections — shows a link instead of a full button
}

export default function AuthGate({
  children,
  message = "Sign in to view your stats",
  compact = false,
}: AuthGateProps) {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="relative animate-pulse opacity-30 pointer-events-none select-none">
        {children}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50 backdrop-blur-[2px]">
          {compact ? (
            <button
              onClick={signIn}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Lock className="w-3 h-3" />
              Sign in to unlock
            </button>
          ) : (
            <div className="text-center space-y-3 px-4">
              <Lock className="w-5 h-5 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">{message}</p>
              <button
                onClick={signIn}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-xs hover:brightness-110 transition-all mx-auto"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign in with X
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
