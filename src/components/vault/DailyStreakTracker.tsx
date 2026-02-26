import { Flame, AlertTriangle, Gift, Zap } from "lucide-react";
import { motion } from "framer-motion";

/* ─── Streak config ─── */
const currentStreak = 4;
const missedYesterday = false; // toggle for reset state

function getMultiplier(streak: number) {
  if (streak >= 30) return 2.0;
  if (streak >= 7) return 1.5;
  return 1.0;
}

function getNextMilestone(streak: number) {
  if (streak < 7) return { day: 7, label: "1.5x Daily Rewards", reward: "Free Silver Mystery Box" };
  if (streak < 30) return { day: 30, label: "2.0x Daily Rewards", reward: "Free Gold Mystery Box" };
  return null;
}

const BASE_DAILY_REWARD = 100;

const milestones = [
  { day: 7, reward: "Free Silver Mystery Box", multiplier: "1.5x" },
  { day: 30, reward: "Free Gold Mystery Box", multiplier: "2.0x" },
];

export default function DailyStreakTracker() {
  const multiplier = getMultiplier(currentStreak);
  const nextMilestone = getNextMilestone(currentStreak);
  const dailyReward = Math.floor(BASE_DAILY_REWARD * multiplier);

  // Progress bar: show 7-day cycle for < 7, then 30-day for < 30
  const progressMax = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : 30;
  const progressPct = Math.min(100, (currentStreak / progressMax) * 100);

  return (
    <div className="rounded-2xl border border-primary/15 bg-card overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 space-y-5">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-5 h-5 text-primary" />
            </motion.span>
            <h2 className="font-display text-sm tracking-wider text-muted-foreground">DAILY LOGIN STREAK</h2>
          </div>

          {/* Multiplier badge */}
          <motion.div
            className={`px-3 py-1.5 rounded-lg border font-display text-sm flex items-center gap-1.5 ${
              multiplier >= 2.0
                ? "bg-gold/10 border-gold/25 text-gold"
                : multiplier >= 1.5
                  ? "bg-multiplier/10 border-multiplier/25 text-multiplier"
                  : "bg-secondary/50 border-border/50 text-muted-foreground"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Zap className="w-3.5 h-3.5" />
            {multiplier}x
          </motion.div>
        </div>

        {/* Streak count + multiplier status */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="space-y-3">
            {/* Current streak */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Streak</p>
              <p className="font-display text-3xl text-primary leading-none mt-1">{currentStreak} <span className="text-base text-muted-foreground">Days</span></p>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="relative h-2.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
                <motion.div
                  className="absolute top-0 h-full w-16 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(0 84% 50% / 0.2), transparent)" }}
                  animate={{ left: ["0%", `${progressPct}%`] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              {nextMilestone && (
                <p className="text-[10px] text-muted-foreground">
                  Day {nextMilestone.day} → <span className="text-foreground/70 font-medium">{nextMilestone.label}</span>
                </p>
              )}
            </div>
          </div>

          {/* Multiplier active panel */}
          {multiplier > 1.0 && (
            <motion.div
              className={`rounded-xl border p-4 text-center space-y-1 ${
                multiplier >= 2.0
                  ? "border-gold/20 bg-gold/5"
                  : "border-multiplier/20 bg-multiplier/5"
              }`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Streak Bonus Active</p>
              <p className={`font-display text-2xl ${multiplier >= 2.0 ? "text-gold" : "text-multiplier"}`}>
                {multiplier}x
              </p>
              <p className="text-[10px] text-muted-foreground">Daily Rewards</p>
            </motion.div>
          )}
        </div>

        {/* Daily reward preview */}
        <div className="rounded-xl border border-border/40 bg-secondary/15 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Today's Daily Box Reward</span>
          </div>
          <div className="text-right">
            <span className="font-display text-sm text-foreground">{dailyReward} RP</span>
            {multiplier > 1.0 && (
              <span className="text-[9px] text-multiplier ml-1.5">({multiplier}x applied)</span>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 gap-3">
          {milestones.map((m) => {
            const reached = currentStreak >= m.day;
            return (
              <div
                key={m.day}
                className={`rounded-lg border p-3 space-y-1 ${
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
                    {reached ? "✓ Unlocked" : m.multiplier}
                  </span>
                </div>
                <p className={`text-[10px] ${reached ? "text-foreground/80" : "text-muted-foreground/60"}`}>
                  {m.reward}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warning / Reset notice */}
        {missedYesterday ? (
          <p className="text-[10px] text-destructive flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Missed yesterday → streak reset to 0.
          </p>
        ) : (
          <p className="text-[10px] text-muted-foreground/70 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Miss a day → streak resets to 0
          </p>
        )}

        {/* Multiplier note */}
        <p className="text-[9px] text-muted-foreground/50">
          Streak multiplier applies to Daily Mystery Box REAL Points only. Does not affect USDC, Weekly Draw, or Premium boxes.
        </p>
      </div>
    </div>
  );
}
