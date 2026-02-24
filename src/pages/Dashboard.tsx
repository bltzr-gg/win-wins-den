import { useState, useEffect, useMemo } from "react";
import {
  Wallet, ChevronRight, Flame, Trophy, Star, Gift, Target,
  Copy, Check, Lock, Zap, ArrowRight, Crown, Shield,
  Box, Sparkles, Users, ExternalLink, TrendingUp, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import switchBonusBg from "@/assets/switch-bonus-bg.jpg";

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

/* ─── Mock user state for dynamic CTA logic ─── */
const userState = {
  points: 12450,
  rank: 42,
  walletLinked: true,
  accountLinked: false,
  firstBetPlaced: false,
  arenaActivity: false,
  streak: 4,
  top100Cutoff: 10200,
  cutoffMovedToday: 150,
  ptsToPassNext: 300,
  nextRankUser: "#41",
  ptsToTop25: 1800,
  nearCutoff: false, // within 500 pts
};
// Derived
const isNearCutoff = userState.points - userState.top100Cutoff < 500 && userState.points >= userState.top100Cutoff;
const idlePoints = userState.points > 1000 && !userState.arenaActivity;

/* ─── Determine single primary CTA ─── */
type PrimaryCTA = "link-account" | "first-bet" | "arena" | "climb";
function getPrimaryCTA(): PrimaryCTA {
  if (!userState.accountLinked) return "link-account";
  if (!userState.firstBetPlaced) return "first-bet";
  if (idlePoints) return "arena";
  return "climb";
}

/* ═══════════════════════════════════════════════
   1. STATUS / RANK CARD (Primary Anchor)
   ═══════════════════════════════════════════════ */
function PlayerStatusCard() {
  const progressPct = 72;
  const primaryCTA = getPrimaryCTA();

  return (
    <motion.div
      className="relative rounded-xl border border-[hsl(41_30%_15%/0.2)] bg-card overflow-hidden p-6 lg:p-7"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(41_40%_12%/0.06)] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(41_50%_40%/0.03)] rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Player identity */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(41_40%_20%/0.3)] to-secondary border border-[hsl(41_30%_20%/0.2)] flex items-center justify-center text-lg font-bold">
              D
            </div>
            <div>
              <h2 className="font-display text-xl tracking-wide">DEGEN_WHALE</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gold/12 text-gold border border-gold/20">Gold</span>
                <span className="text-[10px] text-muted-foreground">Season 1</span>
                <span className="text-muted-foreground/30">|</span>
                <span className="text-[10px] text-multiplier flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {userState.streak}-Day Streak
                  <span className="px-1.5 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 text-[9px] font-semibold">1.3x</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gold">
            <Crown className="w-3.5 h-3.5" />
            <span>NFT 1.1x</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">REAL Points</p>
            <p className="font-display text-4xl text-foreground leading-none"><AnimatedNumber value={userState.points} /></p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rank</p>
            <p className="font-display text-4xl text-gold leading-none">#{userState.rank}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Season Ends</p>
            <p className="font-display text-4xl text-muted-foreground leading-none">23d</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {/* Dynamic microcopy */}
          <div className="flex items-center justify-between text-[10px] flex-wrap gap-1">
            <span className="text-muted-foreground">+{userState.ptsToPassNext} pts to pass {userState.nextRankUser}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-gold font-semibold">{userState.ptsToTop25.toLocaleString()} pts to Top 25</span>
            {userState.cutoffMovedToday > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary flex items-center gap-0.5">
                  <AlertTriangle className="w-3 h-3" /> Cutoff moved +{userState.cutoffMovedToday} pts today
                </span>
              </>
            )}
          </div>
        </div>

        {/* Single primary CTA */}
        {primaryCTA === "climb" && (
          <Link
            to="/leaderboard"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gold/10 text-gold border border-gold/20 font-semibold text-sm hover:bg-gold/15 transition-all"
          >
            Climb Leaderboard <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Season Banner ─── */
function SeasonBanner() {
  return (
    <motion.div
      className={`relative rounded-xl border bg-card overflow-hidden p-4 flex items-center justify-between border-border/50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Season 1 Reward Pool:</span>
          <span className="text-xs text-foreground font-semibold">6.6% Allocation</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Top 100 Currently at:</span>
          <span className="text-xs text-foreground font-semibold">{userState.top100Cutoff.toLocaleString()} pts</span>
        </div>
      </div>
      {isNearCutoff && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold relative z-10">
          Near Cutoff
        </span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   2. VAULT TEASER (Daily Loop) — red accent, urgency
   ═══════════════════════════════════════════════ */
function VaultTeaser() {
  const streakDays = [1, 2, 3, 4, 5, 6, 7];

  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm tracking-wider">The Vault</h3>
        </div>
        <motion.span
          className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          1 Free Daily Box
        </motion.span>
      </div>

      {/* Streak tracker */}
      <div className="flex items-center gap-1.5">
        {streakDays.map((d) => (
          <motion.div
            key={d}
            className={`flex-1 h-2.5 rounded-full ${d <= userState.streak ? "bg-primary" : "bg-secondary"}`}
            initial={d === userState.streak ? { scale: 0 } : {}}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + d * 0.04 }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-muted-foreground flex items-center gap-1">
          <Flame className="w-3 h-3 text-multiplier" /> D{userState.streak}/D7
        </span>
        <span className="px-1.5 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 font-semibold">1.3x</span>
      </div>

      <Link
        to="/vault"
        className="w-full py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 font-display text-sm hover:bg-primary/15 transition-all flex items-center justify-center gap-2"
      >
        <Box className="w-4 h-4" />
        Open Vault
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   3. REWARD CHEST — gold only, differentiated
   ═══════════════════════════════════════════════ */
function RewardChestCard() {
  return (
    <motion.div
      className="rounded-xl border border-gold/15 bg-card p-5 flex flex-col justify-between gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <h3 className="font-display text-sm tracking-wider">Reward Chest</h3>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-gold/20 text-gold font-semibold">
          Gold Tier
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] text-muted-foreground">Cost: 200–300 REAL Points</p>
        <p className="text-[10px] text-muted-foreground">You can open <span className="text-gold font-semibold">4 chests</span> now</p>
        <p className="text-[10px] text-muted-foreground/70 italic">Earned via Tasks & Referrals</p>
      </div>
      <div className="flex gap-2">
        {["🎟️", "💰", "🔥", "💎"].map((e, i) => (
          <div key={i} className="w-9 h-9 rounded-lg bg-secondary/40 border border-gold/10 flex items-center justify-center text-base">
            {e}
          </div>
        ))}
      </div>
      <motion.button
        className="relative w-full py-3 rounded-lg bg-gold/10 text-gold border border-gold/20 font-display text-sm hover:bg-gold/15 transition-all flex items-center justify-center gap-2 overflow-hidden"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(41_60%_53%/0.06)] to-transparent pointer-events-none"
          animate={{ x: ["-200%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <Box className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Open a Chest</span>
      </motion.button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   4. YOUR PATH — dynamic highlight
   ═══════════════════════════════════════════════ */
function YourPath() {
  const primaryCTA = getPrimaryCTA();
  const steps = [
    { label: "Enter Code", done: true, reward: "+50 pts", key: "enter-code" },
    { label: "Connect Wallet", done: true, reward: "+100 pts", key: "connect-wallet" },
    { label: "Link Account", done: userState.accountLinked, current: !userState.accountLinked, reward: "+200 pts", key: "link-account" },
    { label: "Place First Bet", done: userState.firstBetPlaced, current: userState.accountLinked && !userState.firstBetPlaced, reward: "+500 pts", key: "first-bet" },
    { label: "Open Chest", done: false, current: false, reward: "+1 Chest", key: "open-chest" },
  ];

  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider">Your Path</h3>
        <Target className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const isHighlighted = step.current && (
            (step.key === "link-account" && primaryCTA === "link-account") ||
            (step.key === "first-bet" && primaryCTA === "first-bet")
          );
          return (
            <motion.div
              key={i}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all ${
                isHighlighted ? "bg-primary/5 border border-primary/15" : ""
              }`}
              animate={isHighlighted ? {
                boxShadow: ["0 0 0px hsl(0 84% 40% / 0)", "0 0 12px hsl(0 84% 40% / 0.08)", "0 0 0px hsl(0 84% 40% / 0)"]
              } : {}}
              transition={isHighlighted ? { duration: 2.5, repeat: Infinity } : {}}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                step.done
                  ? "bg-multiplier/15 text-multiplier border border-multiplier/25"
                  : step.current
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}>
                {step.done ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <p className={`flex-1 text-xs ${step.done ? "text-muted-foreground line-through" : step.current ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {step.label}
              </p>
              <span className="text-[10px] text-muted-foreground">{step.reward}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ARENA NUDGE — idle points connector
   ═══════════════════════════════════════════════ */
function ArenaNudge() {
  if (!idlePoints) return null;

  return (
    <motion.div
      className="relative rounded-xl border border-[hsl(30_60%_30%/0.25)] bg-[hsl(240_8%_6%)] overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Animated shimmer background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 30%, hsl(30 60% 50% / 0.04) 45%, hsl(30 60% 50% / 0.07) 50%, hsl(30 60% 50% / 0.04) 55%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Radial warm glow */}
      <div className="absolute top-0 right-[15%] w-[300px] h-[120px] bg-[hsl(30_60%_45%/0.05)] rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[200px] h-[80px] bg-[hsl(30_50%_40%/0.03)] rounded-full blur-[50px] pointer-events-none" />

      <div className="relative z-10 px-6 py-8 lg:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[hsl(30_60%_50%/0.1)] border border-[hsl(30_60%_50%/0.2)] flex items-center justify-center flex-shrink-0">
          <Zap className="w-7 h-7 text-[hsl(30_80%_55%)]" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-3 flex-wrap">
            <motion.span
              className="font-display text-4xl lg:text-5xl text-[hsl(30_80%_55%)] leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {userState.points.toLocaleString()}
            </motion.span>
            <span className="text-sm text-muted-foreground font-medium">REAL Points sitting idle</span>
          </div>
          <p className="text-sm text-foreground/80">
            Multiply them in the Arena — potential <span className="font-display text-[hsl(30_80%_55%)] tracking-wide">x2–x5</span> return.
          </p>
        </div>

        {/* CTA */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 12px hsl(30 60% 50% / 0.1)",
              "0 0 28px hsl(30 60% 50% / 0.25)",
              "0 0 12px hsl(30 60% 50% / 0.1)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="rounded-lg flex-shrink-0"
        >
          <Link
            to="/arena"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[hsl(30_60%_35%)] to-[hsl(30_70%_45%)] text-white font-display text-sm tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
          >
            Enter Arena <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   BADGES STRIP — 25% larger, stronger glow
   ═══════════════════════════════════════════════ */
import badgeFirstBlood from "@/assets/badges/first-blood.png";
import badgeSlotsMaster from "@/assets/badges/slots-master.png";
import badgeHighRoller from "@/assets/badges/high-roller.png";
import badgeLucky7 from "@/assets/badges/lucky-7.png";
import badgeStreakKing from "@/assets/badges/streak-king.png";
import badgeDiamondHands from "@/assets/badges/diamond-hands.png";
import badgeChestHunter from "@/assets/badges/chest-hunter.png";
import badgeOgPlayer from "@/assets/badges/og-player.png";

const badgeImages: Record<string, string> = {
  "First Blood": badgeFirstBlood,
  "Slots Master": badgeSlotsMaster,
  "High Roller": badgeHighRoller,
  "Lucky 7": badgeLucky7,
  "Streak King": badgeStreakKing,
  "Diamond Hands": badgeDiamondHands,
  "Chest Hunter": badgeChestHunter,
  "OG Player": badgeOgPlayer,
};

const badges = [
  { name: "First Blood", rarity: "Common", earned: true, desc: "Place your first wager" },
  { name: "Slots Master", rarity: "Epic", earned: true, desc: "Play 100 slots rounds" },
  { name: "High Roller", rarity: "Legendary", earned: true, desc: "Wager 10k+ points" },
  { name: "Lucky 7", rarity: "Rare", earned: true, desc: "Win 7 bets in a row" },
  { name: "Streak King", rarity: "Epic", earned: true, desc: "30-day streak" },
  { name: "Diamond Hands", rarity: "Legendary", earned: false, desc: "Hold 50k points" },
  { name: "Chest Hunter", rarity: "Rare", earned: false, desc: "Open 25 chests" },
  { name: "OG Player", rarity: "Legendary", earned: true, desc: "Season 1 member" },
];

const rarityBorder: Record<string, string> = {
  Common: "border-silver/30",
  Rare: "border-rare/40",
  Epic: "border-epic/40",
  Legendary: "border-gold/40",
};

function BadgeStrip() {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(260_20%_6%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[hsl(260_50%_30%/0.04)] rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        className="relative z-10 p-5 border border-[hsl(260_20%_20%/0.15)] rounded-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-sm tracking-wider">Badges</h3>
            <span className="text-[10px] text-muted-foreground">12 / 80 collected</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rare/10 text-rare border border-rare/20 font-semibold">Competitor</span>
          </div>
          <Link to="/collection" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Completion reward hint */}
        <p className="text-[10px] text-muted-foreground mb-3">
          Collect 20 Originals → <span className="text-gold font-semibold">+0.2x Leaderboard Multiplier</span>
        </p>

        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
          {badges.map((b, i) => {
            const isEpic = b.rarity === "Epic" && b.earned;
            const isLegendary = b.rarity === "Legendary" && b.earned;
            return (
              <motion.div
                key={b.name}
                className={`group relative flex-shrink-0 w-[140px] p-4 rounded-xl border bg-[hsl(260_10%_8%/0.5)] text-center space-y-2.5 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] cursor-default ${
                  b.earned ? rarityBorder[b.rarity] : "border-border/40 opacity-35"
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: b.earned ? 1 : 0.35, y: 0 }}
                transition={{ delay: 0.35 + i * 0.03 }}
                {...(isEpic ? {
                  animate: {
                    opacity: 1, y: 0,
                    boxShadow: [
                      "0 0 12px hsl(260 60% 55% / 0.1)",
                      "0 0 24px hsl(260 60% 55% / 0.2)",
                      "0 0 12px hsl(260 60% 55% / 0.1)",
                    ],
                  },
                  transition: { delay: 0.35 + i * 0.03, duration: 3, repeat: Infinity, boxShadow: { duration: 3, repeat: Infinity } },
                } : {})}
                {...(isLegendary ? {
                  animate: {
                    opacity: 1, y: 0,
                    boxShadow: [
                      "0 0 16px hsl(41 60% 53% / 0.1)",
                      "0 0 28px hsl(41 60% 53% / 0.2)",
                      "0 0 16px hsl(41 60% 53% / 0.1)",
                    ],
                  },
                  transition: { delay: 0.35 + i * 0.03, duration: 2.5, repeat: Infinity, boxShadow: { duration: 2.5, repeat: Infinity } },
                } : {})}
              >
                <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden">
                  {b.earned ? (
                    <img src={badgeImages[b.name]} alt={b.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-semibold truncate">{b.name}</p>
                <p className={`text-[10px] ${
                  b.rarity === "Legendary" ? "text-gold" : b.rarity === "Epic" ? "text-epic" : b.rarity === "Rare" ? "text-rare" : "text-common"
                }`}>
                  {b.rarity}
                </p>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-card border border-border text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
                  {b.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. TASKS PREVIEW
   ═══════════════════════════════════════════════ */
const previewTasks = [
  { title: "Place 3 Sports Bets", reward: 150, progress: 66, current: "2/3" },
  { title: "Try a RealBet Original", reward: 100, progress: 0, current: "0/1" },
  { title: "Share a bet slip on X", reward: 75, progress: 0, current: "0/1" },
  { title: "Refer a Friend", reward: 200, progress: 0, current: "0/1" },
];

function TasksPreview() {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider text-muted-foreground">Today's Tasks</h3>
        <Link to="/tasks" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View All Tasks <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {previewTasks.map((t, i) => (
          <motion.div
            key={t.title}
            className="rounded-xl border border-border/50 bg-[hsl(240_6%_6%)] p-4 space-y-3 hover:border-border transition-all"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.04 }}
          >
            <p className="text-xs font-medium leading-snug min-h-[32px] text-muted-foreground">{t.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gold font-semibold">+{t.reward}</span>
              <span className="text-[10px] text-muted-foreground">{t.current}</span>
            </div>
            <div className="w-full h-1 rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary/70"
                initial={{ width: 0 }}
                animate={{ width: `${t.progress}%` }}
                transition={{ delay: 0.5 + i * 0.04, duration: 0.5 }}
              />
            </div>
            <button className="w-full py-1.5 rounded-md bg-primary/8 text-primary text-[10px] font-semibold border border-primary/10 hover:bg-primary/12 transition-colors">
              Go
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   6. LEADERBOARD SIDEBAR
   ═══════════════════════════════════════════════ */
const topPlayers = [
  { rank: 1, name: "cryptoking_99", points: "89,240" },
  { rank: 2, name: "moon_degen", points: "76,100" },
  { rank: 3, name: "whale_hunter", points: "61,500" },
  { rank: 4, name: "bet_maxi", points: "54,300" },
  { rank: 5, name: "degen_alpha", points: "48,900" },
  { rank: 6, name: "realbet_og", points: "41,200" },
  { rank: 7, name: "lucky_strike", points: "38,750" },
  { rank: 8, name: "chain_smoker", points: "35,100" },
  { rank: 9, name: "risk_taker_x", points: "31,400" },
  { rank: 10, name: "moon_shot_22", points: "28,600" },
  { rank: 11, name: "flip_king", points: "26,300" },
  { rank: 12, name: "sigma_grind", points: "24,100" },
  { rank: 13, name: "onchain_ape", points: "22,800" },
  { rank: 14, name: "wagmi_lord", points: "20,500" },
  { rank: 15, name: "nft_degen_x", points: "18,900" },
  { rank: 16, name: "based_bettor", points: "17,200" },
  { rank: 17, name: "real_mvp_42", points: "15,800" },
  { rank: 18, name: "diamond_bet", points: "14,300" },
  { rank: 19, name: "chad_plays", points: "13,100" },
  { rank: 20, name: "alpha_hunter", points: "12,500" },
];

function LeaderboardSidebar() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[calc(100vh-6rem)]">
      <div className="absolute inset-0 bg-[hsl(240_6%_5%)]" />

      <motion.div
        className="relative z-10 p-5 space-y-4 border border-border/40 rounded-2xl h-full flex flex-col"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-muted-foreground" /> Leaderboard
          </h3>
          <Link to="/leaderboard" className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Full <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Top 3 podium compact */}
        <div className="flex items-end justify-center gap-3 pt-1 pb-2">
          {[topPlayers[1], topPlayers[0], topPlayers[2]].map((p, i) => {
            const heights = ["h-12", "h-18", "h-10"];
            const medals = ["🥈", "🥇", "🥉"];
            return (
              <div key={p.rank} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-base">{medals[i]}</span>
                <p className="text-[9px] text-muted-foreground truncate max-w-full">{p.name}</p>
                <div
                  className={`w-full ${heights[i]} rounded-t-md bg-gradient-to-t from-secondary to-secondary/30 border border-border border-b-0 flex items-center justify-center`}
                >
                  <span className="text-[9px] font-display text-muted-foreground">{p.points}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranking list */}
        <div className="flex-1 space-y-1 overflow-y-auto scrollbar-none">
          {topPlayers.slice(3).map((p) => (
            <div key={p.rank} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary/30 transition-colors">
              <span className="font-display text-[10px] text-muted-foreground w-5 text-right">#{p.rank}</span>
              <p className="flex-1 text-[11px] truncate">{p.name}</p>
              <span className="text-[10px] text-muted-foreground font-display">{p.points}</span>
            </div>
          ))}
        </div>

        {/* You */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/40 border border-border/60">
          <span className="font-display text-xs text-foreground">#{userState.rank}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold truncate">YOU</p>
          </div>
          <span className="font-display text-xs text-foreground">{userState.points.toLocaleString()}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. SWITCH BONUS BANNER — compact, not dominant
   ═══════════════════════════════════════════════ */
import platformStake from "@/assets/platforms/stake.png";
import platformRollbit from "@/assets/platforms/rollbit.png";
import platformShuffle from "@/assets/platforms/shuffle.png";

const platforms = [
  { name: "Stake", logo: platformStake },
  { name: "Rollbit", logo: platformRollbit },
  { name: "Shuffle", logo: platformShuffle },
];

function SwitchBannerPromo() {
  const [walletState, setWalletState] = useState<"disconnected" | "eligible" | "claimed">("disconnected");

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img src={switchBonusBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_0%/0.6)] via-[hsl(0_0%_0%/0.3)] to-[hsl(0_0%_0%/0.7)]" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[hsl(0_80%_40%/0.3)] to-transparent" />

      <div className="relative z-10 px-5 py-5 lg:py-6 border border-[hsl(0_40%_18%/0.25)] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <motion.span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 uppercase tracking-wider"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Live
            </motion.span>
            <h2 className="font-display text-base lg:text-lg tracking-wide">
              Switch Bonus<span className="text-primary"> Is Live</span>
            </h2>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            Connect your wallet to reveal your personalized bonus from{" "}
            {platforms.map((p, i) => (
              <span key={p.name} className="inline-flex items-center gap-1 align-middle">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-4 h-4 rounded-sm object-cover inline-block grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                />
                <span className="text-foreground/80 font-medium">{p.name}</span>
                {i < platforms.length - 1 && <span className="text-muted-foreground">,{" "}</span>}
              </span>
            ))}{" "}
            or other major platforms — up to <span className="text-primary font-semibold">$500</span>.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.button
            className={`px-5 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all ${
              walletState === "claimed"
                ? "bg-multiplier/15 text-multiplier border border-multiplier/30"
                : "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground hover:brightness-110"
            }`}
            style={walletState !== "claimed" ? { boxShadow: "0 0 20px hsl(0 84% 40% / 0.15)" } : {}}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setWalletState(walletState === "disconnected" ? "eligible" : "claimed")}
          >
            <Wallet className="w-3.5 h-3.5" />
            {walletState === "disconnected" && "Check Eligibility"}
            {walletState === "eligible" && "Claim Bonus"}
            {walletState === "claimed" && <><Check className="w-3.5 h-3.5" /> Claimed</>}
          </motion.button>
          <Link to="/switch" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline">
            How It Works
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   INVITE & EARN CARD
   ═══════════════════════════════════════════════ */
function InviteEarnCard() {
  const [copied, setCopied] = useState(false);
  const code = "DEGEN-7X42";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="rounded-xl border border-amber/15 bg-card p-5 flex flex-col justify-between gap-4 h-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber" />
          <h3 className="font-display text-sm tracking-wider">Invite & Earn</h3>
        </div>

        {/* Referral code */}
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-secondary/50 border border-amber/10 hover:border-amber/20 transition-all group"
        >
          <span className="font-display text-lg tracking-widest text-foreground">{code}</span>
          {copied ? (
            <Check className="w-4 h-4 text-multiplier flex-shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-amber flex-shrink-0 transition-colors" />
          )}
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="font-display text-base">12</p>
            <p className="text-[9px] text-muted-foreground">Joined</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="font-display text-base text-amber">7</p>
            <p className="text-[9px] text-muted-foreground">Qualified</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="font-display text-base text-amber">3</p>
            <p className="text-[9px] text-muted-foreground">Chests</p>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground italic">Earn chests from active friends</p>
      </div>

      <Link
        to="/referrals"
        className="w-full py-2.5 rounded-lg bg-amber/10 text-amber border border-amber/20 font-display text-xs hover:bg-amber/15 transition-all flex items-center justify-center gap-2"
      >
        View Referrals <ChevronRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
/* ═══════════════════════════════════════════════
   GETTING STARTED — Onboarding Funnel
   ═══════════════════════════════════════════════ */
const onboardingTiles = [
  {
    step: 1,
    title: "LINK REALBET ACCOUNT",
    sub: "Connect your gaming profile to start earning.",
    cta: "Link Account",
    href: "#",
  },
  {
    step: 2,
    title: "WIN WELCOME PRIZES",
    sub: "Claim your free mystery box and bonus points.",
    cta: "Claim Prizes",
    href: "/vault",
  },
  {
    step: 3,
    title: "CHECK SWITCH BONUSES",
    sub: "See what you qualify for from other platforms.",
    cta: "Check Eligibility",
    href: "/switch",
  },
];

function GettingStarted() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-sm tracking-wider text-muted-foreground">GETTING STARTED</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {onboardingTiles.map((tile, i) => (
          <motion.div
            key={tile.step}
            className="group relative rounded-2xl overflow-hidden border border-[hsl(0_30%_15%/0.2)] bg-[hsl(240_8%_6%)] min-h-[220px] flex flex-col justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            {/* Textured dark background with red brush overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_20%_8%)] via-[hsl(240_8%_6%)] to-[hsl(240_6%_5%)]" />
            {/* Red abstract brush accent — unique per tile */}
            <div
              className="absolute pointer-events-none opacity-[0.07]"
              style={{
                top: i === 0 ? "-20%" : i === 1 ? "30%" : "10%",
                left: i === 0 ? "-10%" : i === 1 ? "40%" : "60%",
                width: "180px",
                height: "180px",
                background: `radial-gradient(ellipse at ${i === 0 ? "30% 40%" : i === 1 ? "60% 50%" : "70% 30%"}, hsl(0 80% 40% / 0.8), transparent 70%)`,
                filter: "blur(30px)",
              }}
            />
            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px hsl(0 60% 30% / 0.06), 0 0 20px hsl(0 60% 30% / 0.06)" }}
            />

            <div className="relative z-10 p-6 flex flex-col justify-between h-full gap-5">
              {/* Step number */}
              <span
                className="font-display text-[72px] leading-none tracking-tighter text-[hsl(0_50%_25%/0.25)]"
                style={{ WebkitTextStroke: "1px hsl(0 50% 30% / 0.15)" }}
              >
                {tile.step}
              </span>

              <div className="space-y-4">
                {/* Title + subtext */}
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg tracking-wide text-foreground leading-tight">{tile.title}</h3>
                  <p className="text-xs text-muted-foreground">{tile.sub}</p>
                </div>

                {/* CTA */}
                <Link
                  to={tile.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-xs hover:brightness-110 transition-all"
                  style={{ boxShadow: "0 0 14px hsl(0 84% 40% / 0.12)" }}
                >
                  {tile.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SEASON CAPTION
   ═══════════════════════════════════════════════ */
function SeasonCaption() {
  return (
    <motion.div
      className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-5 py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <Trophy className="w-4 h-4 text-muted-foreground" />
        <span className="font-display text-sm tracking-wider text-foreground">SEASON 1</span>
        <span className="text-[10px] text-muted-foreground">6.6% Reward Pool Allocation</span>
      </div>
      <div className="flex items-center gap-3 text-[10px]">
        <span className="text-muted-foreground">Ends in <span className="text-foreground font-semibold">23d</span></span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">Top 100 at <span className="text-foreground font-semibold">{userState.top100Cutoff.toLocaleString()} pts</span></span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   DASHBOARD — New priority order
   ═══════════════════════════════════════════════ */
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Season 1 caption */}
      <SeasonCaption />

      {/* 1. Switch Bonus — promotional, leads the page */}
      <SwitchBannerPromo />

      {/* 2. Getting Started — full width above the grid */}
      <GettingStarted />

      {/* Main content + Leaderboard sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
        {/* Left: main content */}
        <div className="space-y-6 min-w-0">
          {/* 3. Status + Invite side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
            <div className="space-y-4">
              <PlayerStatusCard />
              <SeasonBanner />
            </div>
            <InviteEarnCard />
          </div>

          {/* Badges under profile */}
          <BadgeStrip />

          {/* Arena nudge if idle points */}
          <ArenaNudge />

          {/* 4 & 5. Vault + Chest + Path */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <VaultTeaser />
            <RewardChestCard />
            <YourPath />
          </div>

          {/* 6. Tasks */}
          <TasksPreview />
        </div>

        {/* Right: Leaderboard sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <LeaderboardSidebar />
          </div>
        </div>
      </div>

      {/* Mobile leaderboard fallback */}
      <div className="lg:hidden">
        <LeaderboardSidebar />
      </div>
    </div>
  );
}
