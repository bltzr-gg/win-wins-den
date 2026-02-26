import { useState } from "react";
import { Gift, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MysteryBoxCard, { type MysteryBox } from "@/components/vault/MysteryBoxCard";
import WeeklyDraw from "@/components/vault/WeeklyDraw";
import BoxHistory from "@/components/vault/BoxHistory";
import DailyStreakTracker from "@/components/vault/DailyStreakTracker";

/* ─── Box data ─── */
const mysteryBoxes: MysteryBox[] = [
  {
    name: "Bronze Mystery Box",
    tier: "bronze",
    cost: "FREE",
    costLabel: "FREE — Daily",
    topReward: "$10",
    available: true,
    freeProgress: 72,
  },
  {
    name: "Silver Mystery Box",
    tier: "silver",
    cost: 500,
    costLabel: "500 REAL Points · Eligible Free on Day 5 Streak",
    topReward: "$50",
    available: true,
  },
  {
    name: "Gold Mystery Box",
    tier: "gold",
    cost: 2000,
    costLabel: "2,000 REAL Points",
    topReward: "$250",
    available: true,
  },
  {
    name: "Legendary Mystery Box",
    tier: "legendary",
    cost: 10000,
    costLabel: "10,000 REAL Points",
    topReward: "$2,500",
    available: true,
  },
];

/* ─── Reward Reveal Overlay ─── */
function RewardReveal({ tier, onClaim }: { tier: string; onClaim: () => void }) {
  const rewards: Record<string, { amount: number; bonus: string }> = {
    bronze: { amount: 120, bonus: "+0.1x Multiplier" },
    silver: { amount: 650, bonus: "+0.2x Multiplier" },
    gold: { amount: 3200, bonus: "+0.5x Multiplier" },
    legendary: { amount: 10000, bonus: "+1.0x Multiplier" },
  };
  const reward = rewards[tier] || rewards.bronze;
  const [counting, setCounting] = useState(true);
  const [display, setDisplay] = useState(0);

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

  const accentClass = tier === "gold" ? "text-gold" : tier === "silver" ? "text-silver" : tier === "legendary" ? "text-epic" : "text-bronze";
  const btnClass = tier === "gold"
    ? "bg-gold/15 text-gold border-gold/30 hover:bg-gold/20"
    : tier === "silver"
    ? "bg-silver/15 text-silver border-silver/30 hover:bg-silver/20"
    : tier === "legendary"
    ? "bg-epic/15 text-epic border-epic/30 hover:bg-epic/20"
    : "bg-bronze/15 text-bronze border-bronze/30 hover:bg-bronze/20";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.85)] backdrop-blur-sm" onClick={onClaim} />
      <motion.div
        className="relative z-10 text-center space-y-6"
        initial={{ scale: 0.5, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div initial={{ rotate: -10, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
          <Gift className={`w-16 h-16 mx-auto ${accentClass}`} />
        </motion.div>
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">You Won</p>
          <motion.p
            className={`font-display text-6xl ${accentClass}`}
            animate={counting ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.1, repeat: counting ? Infinity : 0 }}
          >
            {display.toLocaleString()}
          </motion.p>
          <p className="text-sm text-muted-foreground mt-1">REAL Points</p>
        </div>
        <motion.p className="text-xs text-multiplier font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {reward.bonus}
        </motion.p>
        <motion.button
          onClick={onClaim}
          className={`px-8 py-3.5 rounded-xl font-display text-sm border transition-all ${btnClass}`}
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
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl">THE VAULT</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Open Mystery Boxes. Compete for weekly prizes. Climb the ranks.
        </p>
      </div>

      {/* Daily Streak Tracker */}
      <DailyStreakTracker />

      {/* Mystery Box Tiers — horizontal scroll */}
      <section className="space-y-4">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">MYSTERY BOXES</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {mysteryBoxes.map((box) => (
            <MysteryBoxCard key={box.tier} box={box} />
          ))}
        </div>
      </section>

      {/* Weekly Bonus Draw */}
      <WeeklyDraw />

      {/* Mystery Box History */}
      <BoxHistory />

      {/* Reward reveal overlay */}
      <AnimatePresence>
        {openingTier && (
          <RewardReveal tier={openingTier} onClaim={() => setOpeningTier(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
