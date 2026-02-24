import { useState } from "react";
import { Flame, Box, Sparkles, Lock, Gift, Zap, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Streak Tracker ─── */
function StreakTracker() {
  const currentDay = 4;
  const days = [1, 2, 3, 4, 5, 6, 7];
  const multiplier = 1.3;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_30%_8%/0.4)] via-card to-card" />
      <div className="absolute top-0 left-[20%] w-64 h-32 bg-[hsl(0_84%_40%/0.04)] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 border border-border/60 rounded-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg tracking-wider">Daily Streak</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Open boxes daily to build your multiplier</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</p>
              <p className="font-display text-2xl text-primary">{currentDay} Days</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-multiplier/10 border border-multiplier/20">
              <p className="text-[10px] text-muted-foreground">Multiplier</p>
              <p className="font-display text-xl text-multiplier">{multiplier}x</p>
            </div>
          </div>
        </div>

        {/* 7-day visual tracker */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const completed = d <= currentDay;
            const isToday = d === currentDay;
            return (
              <motion.div
                key={d}
                className={`relative flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                  completed
                    ? isToday
                      ? "bg-primary/8 border-primary/30"
                      : "bg-multiplier/5 border-multiplier/15"
                    : "bg-secondary/30 border-border/40"
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: d * 0.05 }}
              >
                <span className="text-[10px] text-muted-foreground font-medium">D{d}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  completed
                    ? "bg-multiplier/15 text-multiplier border border-multiplier/30"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}>
                  {completed ? "✓" : d}
                </div>
                {isToday && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Box types ─── */
const boxes = [
  {
    name: "Bronze Box",
    tier: "bronze" as const,
    unlock: "Free daily drop",
    rewardRange: "50–200 REAL Points",
    available: true,
    glowColor: "hsl(25 50% 45%)",
    borderClass: "border-bronze/25",
    bgGlow: "bg-[hsl(25_50%_45%/0.04)]",
    accentClass: "text-bronze",
    btnClass: "bg-bronze/10 text-bronze border-bronze/20 hover:bg-bronze/15",
  },
  {
    name: "Silver Box",
    tier: "silver" as const,
    unlock: "Complete 3 daily tasks",
    rewardRange: "200–1,000 REAL Points",
    available: true,
    glowColor: "hsl(220 8% 65%)",
    borderClass: "border-silver/25",
    bgGlow: "bg-[hsl(220_8%_65%/0.03)]",
    accentClass: "text-silver",
    btnClass: "bg-silver/10 text-silver border-silver/20 hover:bg-silver/15",
  },
  {
    name: "Gold Box",
    tier: "gold" as const,
    unlock: "7-day streak required",
    rewardRange: "500–5,000 REAL Points",
    available: false,
    glowColor: "hsl(41 60% 53%)",
    borderClass: "border-gold/25",
    bgGlow: "bg-[hsl(41_60%_53%/0.04)]",
    accentClass: "text-gold",
    btnClass: "bg-gold/10 text-gold border-gold/20 hover:bg-gold/15",
  },
];

/* ─── Box Card ─── */
function BoxCard({ box, onOpen }: { box: typeof boxes[0]; onOpen: () => void }) {
  return (
    <motion.div
      className={`group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${box.borderClass}`}
      whileHover={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Rarity glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
        style={{ backgroundColor: `${box.glowColor.replace(")", " / 0.12)")}` }}
      />
      {/* Glass overlay */}
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-6 space-y-5">
        {/* Box visual — 3D-ish representation */}
        <div className="flex justify-center py-4">
          <motion.div
            className={`relative w-28 h-28 rounded-2xl border-2 flex items-center justify-center ${box.borderClass}`}
            style={{
              background: `radial-gradient(circle at 30% 30%, ${box.glowColor.replace(")", " / 0.1)")}, transparent 70%)`,
              boxShadow: `0 8px 32px ${box.glowColor.replace(")", " / 0.08)")}, inset 0 1px 0 hsl(0 0% 100% / 0.06)`,
            }}
            animate={box.available ? {
              boxShadow: [
                `0 8px 32px ${box.glowColor.replace(")", " / 0.06)")}`,
                `0 8px 40px ${box.glowColor.replace(")", " / 0.14)")}`,
                `0 8px 32px ${box.glowColor.replace(")", " / 0.06)")}`,
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Inner face */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[hsl(0_0%_100%/0.04)] to-transparent pointer-events-none" />
            {box.available ? (
              <Box className={`w-10 h-10 ${box.accentClass}`} />
            ) : (
              <Lock className="w-10 h-10 text-muted-foreground/50" />
            )}
            {/* Bottom shadow for depth */}
            <div className="absolute -bottom-3 left-3 right-3 h-4 rounded-b-xl bg-[hsl(0_0%_0%/0.3)] blur-md pointer-events-none" />
          </motion.div>
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
          <h3 className={`font-display text-lg ${box.accentClass}`}>{box.name}</h3>
          <p className="text-xs text-muted-foreground">{box.unlock}</p>
          <p className="text-xs font-semibold text-foreground/80">{box.rewardRange}</p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={onOpen}
          disabled={!box.available}
          className={`relative w-full py-3.5 rounded-xl font-display text-sm border transition-all overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed ${box.btnClass}`}
          whileHover={box.available ? { scale: 1.02 } : {}}
          whileTap={box.available ? { scale: 0.98 } : {}}
        >
          {/* Shimmer on hover */}
          {box.available && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.06)] to-transparent pointer-events-none"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {box.available ? <><Sparkles className="w-4 h-4" /> Open</> : <><Lock className="w-4 h-4" /> Locked</>}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Reward Reveal Overlay ─── */
function RewardReveal({ tier, onClaim }: { tier: string; onClaim: () => void }) {
  const rewards: Record<string, { amount: number; bonus: string }> = {
    bronze: { amount: 120, bonus: "+0.1x Multiplier" },
    silver: { amount: 650, bonus: "+0.2x Multiplier" },
    gold: { amount: 3200, bonus: "+0.5x Multiplier" },
  };
  const reward = rewards[tier] || rewards.bronze;
  const [counting, setCounting] = useState(true);
  const [display, setDisplay] = useState(0);

  // Count-up animation
  useState(() => {
    let start = 0;
    const step = reward.amount / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= reward.amount) {
        setDisplay(reward.amount);
        clearInterval(timer);
        setCounting(false);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 30);
  });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dim background */}
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.85)] backdrop-blur-sm" />

      {/* Burst rays */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${
            tier === "gold" ? "hsl(41 60% 53% / 0.15)" : tier === "silver" ? "hsl(220 8% 65% / 0.12)" : "hsl(25 50% 45% / 0.12)"
          }, transparent 70%)`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1.2] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center space-y-6"
        initial={{ scale: 0.5, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Gift className={`w-16 h-16 mx-auto ${
            tier === "gold" ? "text-gold" : tier === "silver" ? "text-silver" : "text-bronze"
          }`} />
        </motion.div>

        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">You Won</p>
          <motion.p
            className={`font-display text-6xl ${
              tier === "gold" ? "text-gradient-gold" : tier === "silver" ? "text-silver" : "text-bronze"
            }`}
            animate={counting ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.1, repeat: counting ? Infinity : 0 }}
          >
            {display.toLocaleString()}
          </motion.p>
          <p className="text-sm text-muted-foreground mt-1">REAL Points</p>
        </div>

        <motion.p
          className="text-xs text-multiplier font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {reward.bonus}
        </motion.p>

        <motion.button
          onClick={onClaim}
          className={`px-8 py-3.5 rounded-xl font-display text-sm transition-all ${
            tier === "gold"
              ? "bg-gold/15 text-gold border border-gold/30 hover:bg-gold/20"
              : tier === "silver"
              ? "bg-silver/15 text-silver border border-silver/30 hover:bg-silver/20"
              : "bg-bronze/15 text-bronze border border-bronze/30 hover:bg-bronze/20"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Claim Reward
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════ VAULT PAGE ═══════════ */
export default function Vault() {
  const [openingTier, setOpeningTier] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl">THE VAULT</h1>
        <p className="text-sm text-muted-foreground mt-1">Open mystery boxes and claim your rewards</p>
      </div>

      {/* Streak Tracker */}
      <StreakTracker />

      {/* Boxes Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">AVAILABLE BOXES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {boxes.map((box) => (
            <BoxCard
              key={box.name}
              box={box}
              onOpen={() => setOpeningTier(box.tier)}
            />
          ))}
        </div>
      </section>

      {/* Recent Drops */}
      <section className="space-y-4">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">RECENT DROPS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { amount: 320, tier: "Bronze", time: "2h ago" },
            { amount: 85, tier: "Bronze", time: "1d ago" },
            { amount: 740, tier: "Silver", time: "2d ago" },
            { amount: 150, tier: "Bronze", time: "3d ago" },
          ].map((drop, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border/50 bg-card/50 p-4 text-center space-y-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <p className="font-display text-lg text-foreground">{drop.amount}</p>
              <p className="text-[10px] text-muted-foreground">REAL Points</p>
              <p className={`text-[9px] font-semibold ${
                drop.tier === "Gold" ? "text-gold" : drop.tier === "Silver" ? "text-silver" : "text-bronze"
              }`}>{drop.tier} Box</p>
              <p className="text-[9px] text-muted-foreground">{drop.time}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full-screen reward reveal */}
      <AnimatePresence>
        {openingTier && (
          <RewardReveal tier={openingTier} onClaim={() => setOpeningTier(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
