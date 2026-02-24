import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Star, Check, Pin, Share2, X } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  earned: boolean;
  earnDate?: string;
  category: string;
  pinned?: boolean;
  progress?: { current: number; total: number };
  pointsReward?: number;
}

const badges: Badge[] = [
  { id: "1", name: "First Bet", description: "Place your first wager", rarity: "Common", earned: true, earnDate: "Jan 15", category: "Core Betting", pointsReward: 50 },
  { id: "2", name: "Lucky 7", description: "Win 7 bets in a row", rarity: "Rare", earned: true, earnDate: "Jan 22", category: "Core Betting", pointsReward: 200 },
  { id: "3", name: "High Roller", description: "Wager 10,000 points total", rarity: "Epic", earned: true, earnDate: "Feb 1", category: "Core Betting", pinned: true, pointsReward: 500 },
  { id: "4", name: "Crash Master", description: "Play Crash 100 times", rarity: "Common", earned: true, earnDate: "Feb 5", category: "Originals", pointsReward: 100 },
  { id: "5", name: "Social Butterfly", description: "Refer 5 friends", rarity: "Rare", earned: true, earnDate: "Feb 10", category: "Social", pointsReward: 300 },
  { id: "6", name: "Streak Lord", description: "30-day login streak", rarity: "Epic", earned: false, category: "Streaks", progress: { current: 4, total: 30 }, pointsReward: 1000 },
  { id: "7", name: "Whale Alert", description: "Top 10 on leaderboard", rarity: "Legendary", earned: false, category: "Core Betting", pointsReward: 2000 },
  { id: "8", name: "OG Player", description: "Join during Season 1", rarity: "Legendary", earned: true, earnDate: "Jan 1", category: "Seasonal", pinned: true, pointsReward: 1000 },
  { id: "9", name: "Dice Degen", description: "Play Dice 50 times", rarity: "Common", earned: false, category: "Originals", progress: { current: 12, total: 50 }, pointsReward: 100 },
  { id: "10", name: "Roulette Royal", description: "Hit 0 on roulette", rarity: "Rare", earned: false, category: "Originals", pointsReward: 500 },
  { id: "11", name: "Diamond Hands", description: "Hold 50k points at once", rarity: "Epic", earned: false, category: "Core Betting", pointsReward: 800 },
  { id: "12", name: "Genesis Badge", description: "Mint the first NFT badge", rarity: "Legendary", earned: false, category: "Seasonal", pointsReward: 2000 },
  { id: "13", name: "Chest Hunter", description: "Open 25 reward chests", rarity: "Rare", earned: false, category: "Chest Mastery", progress: { current: 8, total: 25 }, pointsReward: 300 },
  { id: "14", name: "Golden Touch", description: "Pull a $100+ reward from a chest", rarity: "Epic", earned: false, category: "Chest Mastery", pointsReward: 500 },
  { id: "15", name: "Week Warrior", description: "Complete all weekly challenges", rarity: "Rare", earned: true, earnDate: "Feb 12", category: "Streaks", pointsReward: 400 },
  { id: "16", name: "Parlay King", description: "Win a 5-leg parlay", rarity: "Epic", earned: false, category: "Core Betting", pointsReward: 750 },
];

const categories = ["All", "Core Betting", "Originals", "Chest Mastery", "Streaks", "Social", "Seasonal"];

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
  const [category, setCategory] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const showcaseBadges = badges.filter((b) => b.pinned);

  const filtered = badges.filter((b) => {
    if (category === "All") return true;
    return b.category === category;
  });

  const collectorStatus = earned < 5 ? "Rookie" : earned < 10 ? "Regular" : earned < 15 ? "VIP" : "Elite";

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold">Badges</h1>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm text-muted-foreground">
            {collectorStatus} ⭐
          </span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">
            Unlocked <span className="text-primary font-semibold">{earned}</span> / {badges.length}
          </span>
        </div>
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

      {/* Showcase */}
      {showcaseBadges.length > 0 && (
        <motion.div
          className="glass-card p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-display font-semibold">Your Showcase</h3>
            <button className="text-[10px] text-primary font-semibold">Edit Showcase</button>
          </div>
          <div className="flex gap-3">
            {showcaseBadges.map((badge) => (
              <div
                key={badge.id}
                className={`glass-card p-3 flex flex-col items-center gap-2 border ${rarityStyles[badge.rarity].split(" ")[0]}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${rarityBg[badge.rarity]} border ${rarityStyles[badge.rarity].split(" ")[0]} flex items-center justify-center`}>
                  <Star className={`w-6 h-6 ${rarityStyles[badge.rarity].split(" ")[1]}`} />
                </div>
                <p className="text-[10px] font-display font-semibold">{badge.name}</p>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 3 - showcaseBadges.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="glass-card p-3 flex flex-col items-center gap-2 border-dashed border-muted-foreground/20 opacity-30">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Pin className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-[10px] text-muted-foreground">Empty slot</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((badge, i) => (
          <motion.button
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`glass-card-hover p-3 flex flex-col items-center text-center gap-2 relative ${
              !badge.earned ? "opacity-50" : ""
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: badge.earned ? 1 : 0.5, scale: 1 }}
            transition={{ delay: i * 0.03 }}
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
            {!badge.earned && badge.progress && (
              <div className="w-full">
                <div className="w-full h-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
                  />
                </div>
                <p className="text-[8px] text-muted-foreground mt-0.5">
                  {badge.progress.current}/{badge.progress.total}
                </p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              className="glass-card p-6 max-w-sm w-full text-center space-y-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-3 right-3 p-1 rounded-md hover:bg-secondary"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-b ${rarityBg[selectedBadge.rarity]} border-2 ${rarityStyles[selectedBadge.rarity].split(" ")[0]} flex items-center justify-center mx-auto`}>
                {selectedBadge.earned ? (
                  <Star className={`w-10 h-10 ${rarityStyles[selectedBadge.rarity].split(" ")[1]}`} />
                ) : (
                  <Lock className="w-8 h-8 text-muted-foreground/50" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold">{selectedBadge.name}</h3>
                <p className={`text-xs font-semibold ${rarityStyles[selectedBadge.rarity].split(" ")[1]}`}>
                  {selectedBadge.rarity}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{selectedBadge.description}</p>
              {selectedBadge.pointsReward && (
                <p className="text-xs text-accent font-semibold">+{selectedBadge.pointsReward} REAL Points</p>
              )}
              {selectedBadge.earned && selectedBadge.earnDate && (
                <p className="text-xs text-muted-foreground">Earned on {selectedBadge.earnDate}</p>
              )}
              {!selectedBadge.earned && selectedBadge.progress && (
                <div className="max-w-[200px] mx-auto">
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(selectedBadge.progress.current / selectedBadge.progress.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedBadge.progress.current}/{selectedBadge.progress.total}
                  </p>
                </div>
              )}
              <div className="flex gap-2 justify-center pt-2">
                {selectedBadge.earned && (
                  <>
                    <button className="px-4 py-2 rounded-lg bg-primary/15 text-primary text-xs font-semibold border border-primary/30">
                      <Share2 className="w-3 h-3 inline mr-1" /> Share on X
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-accent/15 text-accent text-xs font-semibold border border-accent/30">
                      <Pin className="w-3 h-3 inline mr-1" /> Pin to Showcase
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Badges;
