"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, Crosshair, Lock, Award, Target, Trophy, Rocket, Wallet, Sparkles, LogOut, LogIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth";

const navItems = [
  { label: "Hub", path: "/", icon: Swords, variant: "default" as const },
  { label: "Arena", path: "/arena", icon: Crosshair, variant: "default" as const },
  { label: "The Vault", path: "/vault", icon: Lock, variant: "default" as const },
  { label: "Collection", path: "/collection", icon: Award, variant: "default" as const },
  { label: "Tasks", path: "/tasks", icon: Target, variant: "default" as const },
  { label: "Leaderboard", path: "/leaderboard", icon: Trophy, variant: "default" as const },
  { label: "Public Sale", path: "/public-sale", icon: Rocket, variant: "default" as const, badge: "Soon" },
  { label: "Switch Bonus", path: "/switch", icon: Sparkles, variant: "red" as const },
  { label: "Profile", path: "/profile", icon: Wallet, variant: "default" as const },
];

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { user, profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-hub mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl tracking-wider text-primary">REALBET</span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.variant === "red"
                      ? active
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:brightness-110"
                      : active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {"badge" in item && item.badge && (
                    <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/15 uppercase tracking-wider leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {profile?.twitter_handle ?? profile?.display_name ?? "User"}
                </span>
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                    {(profile?.display_name ?? "U")[0].toUpperCase()}
                  </div>
                )}
                <button
                  onClick={signOut}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Page content with transitions */}
      <main className="max-w-hub mx-auto px-6 py-8">
        <AnimatePresence mode="sync">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
