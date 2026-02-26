import { Flame, AlertTriangle, Gift, Zap, Box } from "lucide-react";
import { motion } from "framer-motion";

/* ─── Streak config (mock) ─── */
const currentStreak = 12;
const missedYesterday = false;

/* ─── Multiplier ladder ─── */
function getMultiplier(streak: number) {
  if (streak >= 60) return 2.0;
  if (streak >= 30) return 1.8;
  if (streak >= 15) return 1.5;
  if (streak >= 7) return 1.2;
  return 1.0;
}

function getMultiplierLabel(streak: number) {
  if (streak >= 60) return "2.0x (Max)";
  if (streak >= 30) return "1.8x";
  if (streak >= 15) return "1.5x";
  if (streak >= 7) return "1.2x";
  return "1.0x";
}

/* ─── Milestones ─── */
const milestones = [
  { day: 3, reward: "+1 Bronze Mystery Box", icon: "🟫" },
  { day: 7, reward: "+2 Bronze Mystery Boxes", icon: "🟫" },
  { day: 15, reward: "+1 Silver Mystery Box", icon: "🥈" },
  { day: 21, reward: "+2 Silver Mystery Boxes", icon: "🥈" },
  { day: 30, reward: "+1 Gold Mystery Box", icon: "🥇" },
  { day: 60, reward: "+1 Legendary Mystery Box", icon: "💎" },
  { day: 90, reward: "+1 Legendary Mystery Box", icon: "💎" },
];

function getNextMilestone(streak: number) {
  return milestones.find((m) => m.day > streak) || null;
}

const BASE_DAILY_REWARD = 100;
const PROGRESS_MAX = 90; // full bar = day 90

/* ─── Milestone marker positions ─── */
function markerPct(day: number) {
  return Math.min(100, (day / PROGRESS_MAX) * 100);
}

export default function DailyStreakTracker() {
  const multiplier = getMultiplier(currentStreak);
  const nextMilestone = getNextMilestone(currentStreak);
  const dailyReward = Math.floor(BASE_DAILY_REWARD * multiplier);
  const progressPct = Math.min(100, (currentStreak / PROGRESS_MAX) * 100);

  const multiplierColor =
    multiplier >= 2.0
      ? "text-gold"
      : multiplier >= 1.5
        ? "text-multiplier"
        : "text-muted-foreground";

  const multiplierBg =
    multiplier >= 2.0
      ? "bg-gold/10 border-gold/25 text-gold"
      : multiplier >= 1.5
        ? "bg-multiplier/10 border-multiplier/25 text-multiplier"
        : multiplier >= 1.2
          ? "bg-primary/10 border-primary/25 text-primary"
          : "bg-secondary/50 border-border/50 text-muted-foreground";

  return (
    <div className="rounded-2xl border border-primary/15 bg-card overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-5 h-5 text-primary" />
            </motion.span>
            <h2 className="font-display text-sm tracking-wider text-muted-foreground">DAILY STREAK</h2>
          </div>

          {/* Active Multiplier badge */}
          <motion.div
            className={`px-3 py-1.5 rounded-lg border font-display text-sm flex items-center gap-1.5 ${multiplierBg}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Zap className="w-3.5 h-3.5" />
            {getMultiplierLabel(currentStreak)}
          </motion.div>
        </div>

        {/* Streak count + multiplier panel */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="space-y-4">
            {/* Current streak */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Streak</p>
              <p className="font-display text-3xl text-primary leading-none mt-1">
                {currentStreak} <span className="text-base text-muted-foreground">Days</span>
              </p>
            </div>

            {/* Active multiplier display */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Multiplier</p>
              <p className={`font-display text-2xl leading-none mt-1 ${multiplierColor}`}>
                {multiplier}x
              </p>
            </div>
          </div>

          {/* Streak Bonus panel */}
          {multiplier > 1.0 && (
            <motion.div
              className={`rounded-xl border p-4 text-center space-y-1 ${
                multiplier >= 2.0
                  ? "border-gold/20 bg-gold/5"
                  : multiplier >= 1.5
                    ? "border-multiplier/20 bg-multiplier/5"
                    : "border-primary/20 bg-primary/5"
              }`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Streak Bonus Active</p>
              <p className={`font-display text-2xl ${multiplierColor}`}>{multiplier}x</p>
              <p className="text-[10px] text-muted-foreground">Daily Rewards</p>
            </motion.div>
          )}
        </div>

        {/* Today's Reward calculation */}
        <div className="rounded-xl border border-border/40 bg-secondary/15 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Today's Reward</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{BASE_DAILY_REWARD} REAL Points</span>
            {multiplier > 1.0 && (
              <>
                <span className="text-muted-foreground">×</span>
                <span className={`font-display ${multiplierColor}`}>{multiplier}</span>
                <span className="text-muted-foreground">=</span>
              </>
            )}
            <span className="font-display text-foreground text-base">{dailyReward} REAL Points</span>
          </div>
          {multiplier > 1.0 && (
            <p className="text-[9px] text-multiplier font-medium">
              ({multiplier}x streak bonus applied)
            </p>
          )}
        </div>

        {/* Progress bar with milestone markers */}
        <div className="space-y-2">
          {nextMilestone && (
            <p className="text-[10px] text-muted-foreground">
              Next Milestone: Day {nextMilestone.day} →{" "}
              <span className="text-foreground/70 font-medium">{nextMilestone.reward}</span>
            </p>
          )}

          <div className="relative h-3 rounded-full bg-secondary overflow-visible">
            {/* Filled bar */}
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary/80 to-primary z-[1]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute top-0 h-full w-16 pointer-events-none z-[2]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(0 84% 50% / 0.2), transparent)" }}
              animate={{ left: ["0%", `${progressPct}%`] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Milestone markers */}
            {milestones.map((m) => {
              const pct = markerPct(m.day);
              const reached = currentStreak >= m.day;
              return (
                <div
                  key={m.day}
                  className="absolute top-1/2 -translate-y-1/2 z-[3] group"
                  style={{ left: `${pct}%` }}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 -ml-1.5 transition-colors ${
                      reached
                        ? "bg-primary border-primary"
                        : "bg-secondary border-muted-foreground/30"
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-card border border-border rounded-lg px-2.5 py-1.5 text-[9px] whitespace-nowrap shadow-lg">
                      <span className="font-display">Day {m.day}</span>
                      <br />
                      <span className="text-muted-foreground">{m.reward}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day labels under bar */}
          <div className="relative h-4">
            {milestones.map((m) => (
              <span
                key={m.day}
                className={`absolute text-[8px] -translate-x-1/2 ${
                  currentStreak >= m.day ? "text-primary" : "text-muted-foreground/50"
                }`}
                style={{ left: `${markerPct(m.day)}%` }}
              >
                {m.day}
              </span>
            ))}
          </div>
        </div>

        {/* Multiplier Ladder */}
        <div className="space-y-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Multiplier Ladder</p>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { range: "1–6", mult: "1.0x", active: currentStreak >= 1 && currentStreak < 7 },
              { range: "7–14", mult: "1.2x", active: currentStreak >= 7 && currentStreak < 15 },
              { range: "15–29", mult: "1.5x", active: currentStreak >= 15 && currentStreak < 30 },
              { range: "30–59", mult: "1.8x", active: currentStreak >= 30 && currentStreak < 60 },
              { range: "60+", mult: "2.0x", active: currentStreak >= 60 },
            ].map((tier) => (
              <div
                key={tier.range}
                className={`rounded-lg border p-2 text-center ${
                  tier.active
                    ? "border-primary/30 bg-primary/10"
                    : "border-border/30 bg-secondary/10"
                }`}
              >
                <p className={`font-display text-xs ${tier.active ? "text-primary" : "text-muted-foreground/60"}`}>
                  {tier.mult}
                </p>
                <p className="text-[8px] text-muted-foreground mt-0.5">Day {tier.range}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone rewards list */}
        <div className="space-y-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Milestone Box Rewards</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {milestones.slice(0, 4).map((m) => {
              const reached = currentStreak >= m.day;
              return (
                <div
                  key={m.day}
                  className={`rounded-lg border p-2.5 space-y-1 ${
                    reached
                      ? "border-multiplier/20 bg-multiplier/5"
                      : "border-border/30 bg-secondary/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-[10px] ${reached ? "text-multiplier" : "text-muted-foreground"}`}>
                      DAY {m.day}
                    </span>
                    <span className={`text-[9px] font-semibold ${reached ? "text-multiplier" : "text-muted-foreground/60"}`}>
                      {reached ? "✓ Claimed" : "Locked"}
                    </span>
                  </div>
                  <p className={`text-[9px] ${reached ? "text-foreground/80" : "text-muted-foreground/60"}`}>
                    {m.reward}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {milestones.slice(4).map((m) => {
              const reached = currentStreak >= m.day;
              return (
                <div
                  key={m.day}
                  className={`rounded-lg border p-2.5 space-y-1 ${
                    reached
                      ? "border-gold/20 bg-gold/5"
                      : "border-border/30 bg-secondary/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-[10px] ${reached ? "text-gold" : "text-muted-foreground"}`}>
                      DAY {m.day}
                    </span>
                    <span className={`text-[9px] font-semibold ${reached ? "text-gold" : "text-muted-foreground/60"}`}>
                      {reached ? "✓ Claimed" : "Locked"}
                    </span>
                  </div>
                  <p className={`text-[9px] ${reached ? "text-foreground/80" : "text-muted-foreground/60"}`}>
                    {m.reward}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset warning */}
        {missedYesterday ? (
          <p className="text-[10px] text-destructive flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Missed yesterday → streak reset to 0.
          </p>
        ) : (
          <p className="text-[10px] text-muted-foreground/70 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Miss a day → streak resets to 0.
          </p>
        )}

        {/* System note */}
        <p className="text-[9px] text-muted-foreground/50">
          Streak multiplier applies to Daily Base Reward (REAL Points) only. Does not affect Mystery Boxes, Weekly Draw, Allocation %, or USDC rewards.
        </p>
      </div>
    </div>
  );
}
