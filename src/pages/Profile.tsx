import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import {
  Wallet, Link2, Crown, Flame, Shield, Gift, ChevronRight,
  Check, Copy, ExternalLink, TrendingUp, Zap, Target, Users, Box
} from "lucide-react";

/* ─── Mock state ─── */
const user = {
  username: "degen_whale",
  tier: "Gold",
  rank: 42,
  points: 12450,
  streak: 4,
  accountLinked: false,
  walletConnected: true,
  nftMultiplier: 1.1,
  welcomeClaimed: false,
};

const pointsBreakdown = [
  { label: "Wager Points", value: 6200, icon: Zap },
  { label: "Tasks Points", value: 3100, icon: Target },
  { label: "Chest/Box Rewards", value: 1850, icon: Box },
  { label: "Referral Bonuses", value: 1300, icon: Users },
];

export default function Profile() {
  const [copiedRef, setCopiedRef] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText("DEGEN-7X42");
    setCopiedRef(true);
    toast({ title: "Copied ✓", description: "Referral code copied to clipboard" });
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl">PROFILE</h1>
        <p className="text-sm text-muted-foreground mt-1">Account settings, connections, and stats</p>
      </div>

      {/* Welcome Prizes Banner */}
      {!user.welcomeClaimed && (
        <motion.div
          className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Welcome Prizes Unclaimed</p>
              <p className="text-xs text-muted-foreground">Claim your free mystery box and bonus points</p>
            </div>
          </div>
          <Link
            to="/vault"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-xs hover:brightness-110 transition-all flex items-center gap-2"
          >
            Claim Now <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      )}

      {/* Profile + Connections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identity Card */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 space-y-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(41_40%_20%/0.3)] to-secondary border border-[hsl(41_30%_20%/0.2)] flex items-center justify-center text-2xl font-bold">
              D
            </div>
            <div>
              <h2 className="font-display text-xl tracking-wide">{user.username.toUpperCase()}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gold/12 text-gold border border-gold/20">{user.tier}</span>
                <span className="text-[10px] text-muted-foreground">Rank #{user.rank}</span>
                <span className="text-[10px] text-multiplier flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {user.streak}-Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-secondary/30 border border-border/50 p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total REAL Points</p>
              <p className="font-display text-3xl">{user.points.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-secondary/30 border border-border/50 p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Season Rank</p>
              <p className="font-display text-3xl text-gold">#{user.rank}</p>
            </div>
          </div>
        </motion.div>

        {/* Connections */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="font-display text-sm tracking-wider">CONNECTIONS</h3>

          {/* RealBet Account */}
          <div className={`rounded-xl border p-4 flex items-center justify-between ${
            user.accountLinked ? "border-multiplier/20 bg-multiplier/5" : "border-primary/20 bg-primary/5"
          }`}>
            <div className="flex items-center gap-3">
              <Link2 className={`w-5 h-5 ${user.accountLinked ? "text-multiplier" : "text-primary"}`} />
              <div>
                <p className="text-sm font-medium">RealBet Account</p>
                <p className="text-[10px] text-muted-foreground">
                  {user.accountLinked ? "Connected" : "Not connected — link to start earning"}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
              user.accountLinked
                ? "bg-multiplier/10 text-multiplier border-multiplier/20"
                : "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground hover:brightness-110"
            }`}>
              {user.accountLinked ? <><Check className="w-3 h-3 inline mr-1" />Linked</> : "Link Account"}
            </button>
          </div>

          {/* Wallet */}
          <div className={`rounded-xl border p-4 flex items-center justify-between ${
            user.walletConnected ? "border-multiplier/20 bg-multiplier/5" : "border-border"
          }`}>
            <div className="flex items-center gap-3">
              <Wallet className={`w-5 h-5 ${user.walletConnected ? "text-multiplier" : "text-muted-foreground"}`} />
              <div>
                <p className="text-sm font-medium">Wallet</p>
                <p className="text-[10px] text-muted-foreground">
                  {user.walletConnected ? "0x1a2b...9f3c" : "Connect for Switch Bonus & NFT perks"}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
              user.walletConnected
                ? "bg-multiplier/10 text-multiplier border-multiplier/20"
                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            }`}>
              {user.walletConnected ? <><Check className="w-3 h-3 inline mr-1" />Connected</> : "Connect"}
            </button>
          </div>

          {/* Manage */}
          <button className="w-full py-2.5 rounded-lg bg-secondary/50 text-muted-foreground text-xs font-medium border border-border/50 hover:bg-secondary/80 transition-colors">
            Manage Connections
          </button>
        </motion.div>
      </div>

      {/* NFT Multiplier */}
      <motion.div
        className="rounded-xl border border-gold/15 bg-card p-5 flex items-center justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm font-semibold">NFT Multiplier</p>
            <p className="text-[10px] text-muted-foreground">Applies to leaderboard ranking only. Hold qualifying NFTs to boost your position.</p>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold border border-gold/20 font-display text-sm">{user.nftMultiplier}x</span>
      </motion.div>

      {/* Points Breakdown */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">POINTS BREAKDOWN</h3>
          <span className="text-xs text-muted-foreground">Total: <span className="text-foreground font-semibold">{user.points.toLocaleString()}</span></span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {pointsBreakdown.map((item) => (
            <div key={item.label} className="rounded-xl bg-secondary/30 border border-border/50 p-4 space-y-2">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="font-display text-lg">{item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referral Code */}
      <motion.div
        className="rounded-2xl border border-amber/15 bg-card p-6 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber" />
          <h3 className="font-display text-sm tracking-wider">REFERRAL CODE</h3>
        </div>
        <button
          onClick={handleCopyRef}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-secondary/50 border border-amber/10 hover:border-amber/20 transition-all group"
        >
          <span className="font-display text-lg tracking-widest text-foreground">DEGEN-7X42</span>
          {copiedRef ? (
            <Check className="w-4 h-4 text-multiplier flex-shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-amber flex-shrink-0 transition-colors" />
          )}
        </button>
        <Link
          to="/referrals"
          className="inline-flex items-center gap-1 text-xs text-amber hover:text-amber/80 transition-colors"
        >
          View Referral Stats <ExternalLink className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  );
}
