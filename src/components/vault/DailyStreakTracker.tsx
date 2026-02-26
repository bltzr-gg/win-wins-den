import { Flame, AlertTriangle, Gift, Zap } from "lucide-react";
import { motion } from "framer-motion";

const currentStreak = 12;
const missedYesterday = false;

function getMultiplier(streak: number) {
  if (streak >= 60) return 2.0;
  if (streak >= 30) return 1.8;
  if (streak >= 15) return 1.5;
  if (streak >= 7) return 1.2;
  return 1.0;
}

function getMultiplierLabel(streak: number) {
  if (streak >= 60) return "2.0x";
  if (streak >= 30) return "1.8x";
  if (streak >= 15) return "1.5x";
  if (streak >= 7) return "1.2x";
  return "1.0x";
}

const milestones = [
  { day: 3, reward: "+1 Bronze Mystery Box" },
  { day: 7, reward: "+2 Bronze Mystery Boxes" },
  { day: 15, reward: "+1 Silver Mystery Box" },
  { day: 21, reward: "+2 Silver Mystery Boxes" },
  { day: 30, reward: "+1 Gold Mystery Box" },
  { day: 60, reward: "+1 Legendary Mystery Box" },
  { day: 90, reward: "+1 Legendary Mystery Box" },
];

function getNextMilestone(streak: number) {
  return milestones.find((m) => m.day > streak) || null;
}

const BASE_DAILY_REWARD = 100;
const PROGRESS_MAX = 90;

function markerPct(day: number) {
  return Math.min(100, (day / PROGRESS_MAX) * 100);
}

export default function DailyStreakTracker() {
  const multiplier = getMultiplier(currentStreak);
  const nextMilestone = getNextMilestone(currentStreak);
  const dailyReward = Math.floor(BASE_DAILY_REWARD * multiplier);
  const progressPct = Math.min(100, (currentStreak / PROGRESS_MAX) * 100);

  const multiplierBg =
    multiplier >= 2.0
      ? "bg-gold/10 border-gold/25 text-gold"
      : multiplier >= 1.5
        ? "bg-multiplier/10 border-multiplier/25 text-multiplier"
        : multiplier >= 1.2
          ? "bg-primary/10 border-primary/25 text-primary"
          : "bg-secondary/50 border-border/50 text-muted-foreground";

  const multiplierColor =
    multiplier >= 2.0 ? "text-gold" : multiplier >= 1.5 ? "text-multiplier" : "text-muted-foreground";

  return (
    <div className="rounded-2xl border border-primary/15 bg-card overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 space-y-4">
        {/* Header: streak + multiplier badge */}
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="w-5 h-5 text-primary" />
          </motion.span>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-3xl text-primary leading-none">
              {currentStreak}
            </p>
            <span className="text-sm text-muted-foreground">Day Streak</span>
          </div>
          <motion.div
            className={`ml-auto px-3 py-1.5 rounded-lg border font-display text-sm flex items-center gap-1.5 ${multiplierBg}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Zap className="w-3.5 h-3.5" />
            {getMultiplierLabel(currentStreak)}
          </motion.div>
        </div>

        {/* Today's Reward */}
        <div className="flex items-center gap-2 text-sm">
          <Gift className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">{BASE_DAILY_REWARD}</span>
          {multiplier > 1.0 && (
            <>
              <span className="text-muted-foreground">×</span>
              <span className={`font-display ${multiplierColor}`}>{multiplier}</span>
              <span className="text-muted-foreground">=</span>
            </>
          )}
          <span className="font-display text-foreground">{dailyReward} REAL Points</span>
        </div>

        {/* Progress bar with milestone markers */}
        <div className="space-y-2">
          <div className="relative h-3 rounded-full bg-secondary overflow-visible">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary/80 to-primary z-[1]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.div
              className="absolute top-0 h-full w-16 pointer-events-none z-[2]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(0 84% 50% / 0.2), transparent)" }}
              animate={{ left: ["0%", `${progressPct}%`] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
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
                      reached ? "bg-primary border-primary" : "bg-secondary border-muted-foreground/30"
                    }`}
                  />
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

        {/* Next milestone */}
        {nextMilestone && (
          <p className="text-[10px] text-muted-foreground">
            Next Reward: Day {nextMilestone.day} →{" "}
            <span className="text-foreground/70 font-medium">{nextMilestone.reward}</span>
          </p>
        )}

        {/* Reset warning */}
        <p className={`text-[10px] flex items-center gap-1 ${missedYesterday ? "text-destructive" : "text-muted-foreground/70"}`}>
          <AlertTriangle className="w-3 h-3" />
          {missedYesterday ? "Missed yesterday — streak reset to 0." : "Miss a day → streak resets to 0."}
        </p>
      </div>
    </div>
  );
}
