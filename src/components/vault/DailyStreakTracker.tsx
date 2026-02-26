import { Flame, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const streakDays = [1, 2, 3, 4, 5, 6, 7];
const currentStreak = 4;

export default function DailyStreakTracker() {
  return (
    <div className="rounded-2xl border border-primary/15 bg-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-5 h-5 text-primary" />
            </motion.span>
            <h2 className="font-display text-sm tracking-wider text-muted-foreground">DAILY STREAK PROGRESS</h2>
          </div>
          <span className="text-xs text-primary font-display">{currentStreak}-Day Streak</span>
        </div>

        {/* Streak dots */}
        <div className="flex items-center gap-2">
          {streakDays.map((d) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-full h-3.5 rounded-full relative overflow-hidden ${
                  d <= currentStreak ? "bg-primary" : "bg-secondary"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: d * 0.04 }}
              >
                {d === currentStreak && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
              <span className={`text-[9px] ${d <= currentStreak ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {d}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground/70 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Miss a day → streak resets
          </p>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Next Reward:</p>
            <p className="text-xs text-silver font-display">Day 5 → Free Silver Mystery Box</p>
          </div>
        </div>
      </div>
    </div>
  );
}
