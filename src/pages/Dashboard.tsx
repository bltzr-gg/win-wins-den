import { useState, useEffect, useMemo } from "react";
import {
  Wallet, ChevronRight, Flame, Trophy, Star, Gift, Target,
  Copy, Check, Lock, Zap, ArrowRight, Crown, Shield,
  Box, Sparkles, Users, ExternalLink, TrendingUp, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
              className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
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
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
            style={{ boxShadow: "0 0 16px hsl(0 84% 40% / 0.1)" }}
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
      className={`relative rounded-xl border bg-card overflow-hidden p-4 flex items-center justify-between ${
        isNearCutoff ? "border-gold/25" : "border-border/50"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {isNearCutoff && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 12px hsl(41 60% 53% / 0.06)",
              "0 0 24px hsl(41 60% 53% / 0.12)",
              "0 0 12px hsl(41 60% 53% / 0.06)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gold" />
          <span className="text-xs text-muted-foreground">Season 1 Reward Pool:</span>
          <span className="text-xs text-gold font-semibold">6.6% Allocation</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Top 100 Currently at:</span>
          <span className="text-xs text-foreground font-semibold">{userState.top100Cutoff.toLocaleString()} pts</span>
        </div>
      </div>
      {isNearCutoff && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-semibold relative z-10">
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
  const primaryCTA = getPrimaryCTA();
  const isGlowing = primaryCTA === "arena";

  return (
    <motion.div
      className="rounded-xl border border-gold/15 bg-card p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
        <Zap className="w-5 h-5 text-gold" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium">You have <span className="text-gold font-semibold">{userState.points.toLocaleString()} REAL Points</span> sitting idle.</p>
        <p className="text-[10px] text-muted-foreground">Enter Arena to multiply them.</p>
      </div>
      <motion.div
        animate={isGlowing ? {
          boxShadow: ["0 0 8px hsl(41 60% 53% / 0.08)", "0 0 16px hsl(41 60% 53% / 0.16)", "0 0 8px hsl(41 60% 53% / 0.08)"],
        } : {}}
        transition={isGlowing ? { duration: 2.5, repeat: Infinity } : {}}
        className="rounded-lg"
      >
        <Link
          to="/arena"
          className="px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/20 text-xs font-semibold hover:bg-gold/15 transition-all flex items-center gap-1.5"
        >
          Enter Arena <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
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
            <h3 className="font-display text-sm tracking-wider">Originals Collection</h3>
            <span className="text-[10px] text-muted-foreground">12 / 80 collected</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rare/10 text-rare border border-rare/20 font-semibold">Competitor</span>
          </div>
          <Link to="/collection" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View Collection <ChevronRight className="w-3 h-3" />
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
   6. LEADERBOARD PREVIEW
   ═══════════════════════════════════════════════ */
const topPlayers = [
  { rank: 1, name: "cryptoking_99", points: "89,240" },
  { rank: 2, name: "moon_degen", points: "76,100" },
  { rank: 3, name: "whale_hunter", points: "61,500" },
];

function LeaderboardPreview() {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(240_8%_5%)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[hsl(41_50%_40%/0.03)] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[hsl(41_30%_10%/0.04)] to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 p-5 space-y-5 border border-[hsl(41_20%_15%/0.12)] rounded-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" /> Leaderboard
          </h3>
          <Link to="/leaderboard" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View Full Leaderboard <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-end justify-center gap-4 pt-2 pb-1">
          {[topPlayers[1], topPlayers[0], topPlayers[2]].map((p, i) => {
            const heights = ["h-16", "h-24", "h-12"];
            const medals = ["🥈", "🥇", "🥉"];
            return (
              <div key={p.rank} className="flex flex-col items-center gap-1.5 flex-1 max-w-[140px]">
                <span className="text-xl">{medals[i]}</span>
                <p className="text-[10px] text-muted-foreground truncate max-w-full">{p.name}</p>
                <div
                  className={`w-full ${heights[i]} rounded-t-lg bg-gradient-to-t from-secondary to-secondary/30 border border-border border-b-0 flex items-center justify-center`}
                  style={i === 1 ? { boxShadow: "0 0 16px hsl(41 60% 53% / 0.08)" } : {}}
                >
                  <span className="text-[10px] font-display text-gold">{p.points}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <span className="font-display text-sm text-primary">#{userState.rank}</span>
          <div className="flex-1">
            <p className="text-xs font-semibold">YOU — degen_whale</p>
            <p className="text-[10px] text-muted-foreground">You are <span className="text-gold font-semibold">{userState.ptsToTop25.toLocaleString()} pts</span> away from Top 25.</p>
          </div>
          <span className="font-display text-sm text-foreground">{userState.points.toLocaleString()}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. SWITCH BONUS BANNER — compact, not dominant
   ═══════════════════════════════════════════════ */
function SwitchBannerPromo() {
  const [walletState, setWalletState] = useState<"disconnected" | "eligible" | "claimed">("disconnected");

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_60%_8%)] via-[hsl(0_50%_10%)] to-[hsl(0_30%_6%)]" />
      <div className="absolute top-0 left-0 w-60 h-full bg-[hsl(0_80%_30%/0.06)] blur-[60px] pointer-events-none" />

      <div className="relative z-10 px-5 py-5 lg:py-6 border border-[hsl(0_40%_18%/0.25)] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 space-y-1.5">
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
          <p className="text-xs text-muted-foreground">
            Connect your wallet to reveal your personalized bonus from Stake, Rollbit, or Shuffle — up to <span className="text-gold font-semibold">$500</span>.
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
   DASHBOARD — New priority order
   ═══════════════════════════════════════════════ */
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 1. Switch Bonus — promotional, leads the page */}
      <SwitchBannerPromo />

      {/* 2. Status / Rank Card */}
      <PlayerStatusCard />
      <SeasonBanner />

      {/* Arena nudge if idle points */}
      <ArenaNudge />

      {/* 3 & 4. Vault + Chest + Path — 3 col row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VaultTeaser />
        <RewardChestCard />
        <YourPath />
      </div>

      {/* Badges strip */}
      <BadgeStrip />

      {/* 5. Tasks */}
      <TasksPreview />

      {/* 6. Leaderboard */}
      <LeaderboardPreview />
    </div>
  );
}
