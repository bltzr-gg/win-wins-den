import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Star, Check, Pin } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  earned: boolean;
  earnDate?: string;
  hint?: string;
  pinned?: boolean;
}

const badges: Badge[] = [
  { id: "1", name: "First Bet", description: "Place your first wager", rarity: "Common", earned: true, earnDate: "Jan 15" },
  { id: "2", name: "Lucky 7", description: "Win 7 bets in a row", rarity: "Rare", earned: true, earnDate: "Jan 22" },
  { id: "3", name: "High Roller", description: "Wager 10,000 points", rarity: "Epic", earned: true, earnDate: "Feb 1", pinned: true },
  { id: "4", name: "Crash Master", description: "Play Crash 100 times", rarity: "Common", earned: true, earnDate: "Feb 5" },
  { id: "5", name: "Social Butterfly", description: "Refer 5 friends", rarity: "Rare", earned: true, earnDate: "Feb 10" },
  { id: "6", name: "Streak Lord", description: "30-day login streak", rarity: "Epic", earned: false, hint: "Keep logging in daily" },
  { id: "7", name: "Whale Alert", description: "Top 10 on leaderboard", rarity: "Legendary", earned: false, hint: "Climb the ranks" },
  { id: "8", name: "OG Player", description: "Join during Season 1", rarity: "Legendary", earned: true, earnDate: "Jan 1", pinned: true },
  { id: "9", name: "Dice Degen", description: "Play Dice 50 times", rarity: "Common", earned: false, hint: "Try our Dice game" },
  { id: "10", name: "Roulette Royal", description: "Hit 0 on roulette", rarity: "Rare", earned: false, hint: "Spin the wheel" },
  { id: "11", name: "Diamond Hands", description: "Hold 50k points", rarity: "Epic", earned: false, hint: "Stack those points" },
  { id: "12", name: "Genesis Badge", description: "Mint the first NFT", rarity: "Legendary", earned: false, hint: "NFT drop coming soon" },
];

const rarityStyles: Record<string, string> = {
  Common: "border-muted-foreground/30 text-muted-foreground",
  Rare: "border-rare/50 text-rare",
  Epic: "border-epic/50 text-epic",
  Legendary: "border-accent/50 text-accent",
};

const rarityBg: Record<string, string> = {
  Common: "from-muted-foreground/10 to-transparent",
  Rare: "from-rare/15 to-transparent",
  Epic: "from-epic/15 to-transparent",
  Legendary: "from-accent/15 to-transparent",
};

const Badges = () => {
  const earned = badges.filter((b) => b.earned).length;
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "Earned", "Locked", "Legendary", "Epic"];

  const filtered = badges.filter((b) => {
    if (filter === "All") return true;
    if (filter === "Earned") return b.earned;
    if (filter === "Locked") return !b.earned;
    return b.rarity === filter;
  });

  return (
    <div className="px-4 pt-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Badges</h1>
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-semibold">{earned}</span>/{badges.length} collected
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="glass-card p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Collection Progress</span>
          <span>{Math.round((earned / badges.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(earned / badges.length) * 100}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-3 gap-3">
        {filtered.map((badge, i) => (
          <motion.div
            key={badge.id}
            className={`glass-card p-3 flex flex-col items-center text-center gap-2 relative ${
              !badge.earned ? "opacity-50" : ""
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: badge.earned ? 1 : 0.5, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={badge.earned ? { y: -3 } : {}}
          >
            {badge.pinned && (
              <Pin className="absolute top-1.5 right-1.5 w-3 h-3 text-accent" />
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${rarityBg[badge.rarity]} border ${rarityStyles[badge.rarity].split(" ")[0]} flex items-center justify-center`}>
              {badge.earned ? (
                <Star className={`w-6 h-6 ${rarityStyles[badge.rarity].split(" ")[1]}`} />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground/50" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-display font-semibold leading-tight">{badge.name}</p>
              <p className={`text-[9px] font-semibold ${rarityStyles[badge.rarity].split(" ")[1]}`}>
                {badge.rarity}
              </p>
            </div>
            {badge.earned && badge.earnDate && (
              <span className="text-[8px] text-muted-foreground flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5 text-primary" /> {badge.earnDate}
              </span>
            )}
            {!badge.earned && badge.hint && (
              <span className="text-[8px] text-muted-foreground italic">{badge.hint}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
