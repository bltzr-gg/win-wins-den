import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronRight, Trophy, Award, Gift, Zap, Timer, Crown } from "lucide-react";

const STREAK_DAYS = 7;

const Hub = () => {
  const [streakDay, setStreakDay] = useState(4);
  const [claimed, setClaimed] = useState(false);
  const points = 12450;

  const handleClaim = () => {
    if (!claimed) {
      setClaimed(true);
      setStreakDay((d) => Math.min(d + 1, STREAK_DAYS));
    }
  };

  const cards = [
    { icon: Zap, title: "Today's Tasks", subtitle: "3 tasks available", href: "/tasks", color: "text-primary" },
    { icon: Gift, title: "Open a Chest", subtitle: "1 chest ready!", href: "#", color: "text-accent" },
    { icon: Trophy, title: "Leaderboard", subtitle: "Rank #42", href: "/leaderboard", color: "text-rare" },
    { icon: Award, title: "Badges", subtitle: "12/30 collected", href: "/badges", color: "text-epic" },
  ];

  return (
    <div className="px-4 pt-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/40 flex items-center justify-center">
            <span className="text-lg font-display font-bold text-primary">R</span>
          </div>
          <div>
            <h2 className="font-display font-semibold text-sm">RealBettor</h2>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold">
                Gold Tier
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">S1 · 23d left</span>
        </div>
      </motion.div>

      {/* Points Balance */}
      <motion.div
        className="glass-card p-5 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 shimmer" />
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">REAL Points</p>
        <p className="text-4xl font-display font-bold text-gradient-primary">
          {points.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">≈ ${(points / 20).toFixed(0)} value</p>
      </motion.div>

      {/* Streak + Daily Claim */}
      <motion.div
        className="glass-card p-4 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-streak" />
            <span className="font-display font-semibold text-sm">{streakDay}-Day Streak</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-streak/15 text-streak font-semibold">
            {streakDay >= 7 ? "1.5x" : `${(1 + streakDay * 0.07).toFixed(1)}x`} multiplier
          </span>
        </div>

        {/* Streak dots */}
        <div className="flex items-center justify-between gap-1">
          {Array.from({ length: STREAK_DAYS }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-full h-2 rounded-full ${
                  i < streakDay
                    ? "bg-gradient-to-r from-streak to-accent"
                    : i === streakDay
                    ? "bg-muted border border-streak/40"
                    : "bg-muted"
                }`}
                initial={i === streakDay - 1 ? { scale: 0 } : {}}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              />
              <span className="text-[9px] text-muted-foreground">D{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Claim button */}
        <motion.button
          onClick={handleClaim}
          disabled={claimed}
          className={`w-full h-12 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            claimed
              ? "bg-secondary text-muted-foreground"
              : "bg-primary text-primary-foreground glow-primary hover:brightness-110"
          }`}
          whileTap={!claimed ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {claimed ? (
              <motion.span key="claimed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ✓ Claimed Today
              </motion.span>
            ) : (
              <motion.span key="claim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <Gift className="w-4 h-4" /> Claim Daily Points
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            className="glass-card-hover p-4 flex flex-col gap-3 group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
          </motion.a>
        ))}
      </div>

      {/* Season Banner */}
      <motion.div
        className="glass-card p-4 flex items-center gap-4 border-accent/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-sm">Season 1 Active</p>
          <p className="text-xs text-muted-foreground">20 pts = $1 · Climb the ranks to earn bigger rewards</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hub;
