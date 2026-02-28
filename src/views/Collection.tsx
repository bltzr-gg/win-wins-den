"use client";

import { useState } from "react";
import { Lock, Star, Pin, X, Calendar, Award, Search, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const badgeFirstBlood = "/assets/badges/first-blood.png";
const badgeSlotsMaster = "/assets/badges/slots-master.png";
const badgeHighRoller = "/assets/badges/high-roller.png";
const badgeLucky7 = "/assets/badges/lucky-7.png";
const badgeStreakKing = "/assets/badges/streak-king.png";
const badgeDiamondHands = "/assets/badges/diamond-hands.png";
const badgeChestHunter = "/assets/badges/chest-hunter.png";
const badgeOgPlayer = "/assets/badges/og-player.png";

const badgeImageMap: Record<string, string> = {
  "first-blood": badgeFirstBlood,
  "10-wins": badgeFirstBlood,
  "lucky-7": badgeLucky7,
  "slots-master": badgeSlotsMaster,
  "high-roller": badgeHighRoller,
  "streak-king": badgeStreakKing,
  "blackjack-pro": badgeLucky7,
  "dice-lord": badgeStreakKing,
  "mine-sweeper": badgeChestHunter,
  "roulette-royal": badgeOgPlayer,
  "social-butterfly": badgeFirstBlood,
  "diamond-hands": badgeDiamondHands,
};

/* ─── Badge data with categories ─── */
const allBadges = [
  { id: "first-blood", name: "First Blood", rarity: "Common", category: "Combat", earned: true, bonus: "+0.1%", desc: "Place your very first wager.", earnedDate: "Jan 12, 2025", hint: "" },
  { id: "10-wins", name: "10 Victories", rarity: "Common", category: "Combat", earned: true, bonus: "+0.1%", desc: "Win 10 games across any arena.", earnedDate: "Jan 18, 2025", hint: "" },
  { id: "lucky-7", name: "Lucky Seven", rarity: "Rare", category: "Luck", earned: true, bonus: "+0.2%", desc: "Hit a 7x multiplier on any game.", earnedDate: "Feb 2, 2025", hint: "" },
  { id: "slots-master", name: "Slots Master", rarity: "Epic", category: "Games", earned: true, bonus: "+0.3%", desc: "Complete 100 rounds in Slots.", earnedDate: "Feb 14, 2025", hint: "" },
  { id: "high-roller", name: "High Roller", rarity: "Legendary", category: "Combat", earned: true, bonus: "+0.5%", desc: "Wager over 10,000 REAL Points.", earnedDate: "Mar 1, 2025", hint: "" },
  { id: "streak-king", name: "Streak King", rarity: "Epic", category: "Loyalty", earned: true, bonus: "+0.3%", desc: "Maintain a 30-day daily login streak.", earnedDate: "Mar 20, 2025", hint: "" },
  { id: "blackjack-pro", name: "Blackjack Pro", rarity: "Rare", category: "Games", earned: false, bonus: "+0.2%", desc: "Win 10 blackjack games.", hint: "Win 3 more", progress: "7/10" },
  { id: "dice-lord", name: "Dice Lord", rarity: "Epic", category: "Games", earned: false, bonus: "+0.3%", desc: "Win 20 dice rounds.", hint: "Win 17 more", progress: "3/20" },
  { id: "mine-sweeper", name: "Mine Sweeper", rarity: "Rare", category: "Games", earned: false, bonus: "+0.2%", desc: "Survive 25 rounds in Mines.", hint: "Survive 13 more", progress: "12/25" },
  { id: "roulette-royal", name: "Roulette Royal", rarity: "Legendary", category: "Luck", earned: false, bonus: "+0.5%", desc: "Hit the jackpot 5 times.", hint: "Hit 4 more", progress: "1/5" },
  { id: "social-butterfly", name: "Social Butterfly", rarity: "Common", category: "Social", earned: false, bonus: "+0.1%", desc: "Refer 5 friends.", hint: "Refer 3 more", progress: "2/5" },
  { id: "diamond-hands", name: "Diamond Hands", rarity: "Legendary", category: "Loyalty", earned: false, bonus: "+0.5%", desc: "Hold 50,000 REAL Points for 7 days.", hint: "Coming Soon", progress: "—" },
];

const categories = ["All", "Combat", "Games", "Luck", "Loyalty", "Social"];

/* ─── Rarity styling ─── */
const rarityStyles: Record<string, {
  borderClass: string;
  glowStyle: string;
  textClass: string;
  badgeClass: string;
  silhouetteBg: string;
}> = {
  Common: {
    borderClass: "border-common/20",
    glowStyle: "",
    textClass: "text-common",
    badgeClass: "bg-common/10 text-common border-common/20",
    silhouetteBg: "bg-[hsl(240_4%_12%)]",
  },
  Rare: {
    borderClass: "border-rare/25",
    glowStyle: "0 0 16px hsl(220 70% 55% / 0.1)",
    textClass: "text-rare",
    badgeClass: "bg-rare/10 text-rare border-rare/20",
    silhouetteBg: "bg-[hsl(220_10%_10%)]",
  },
  Epic: {
    borderClass: "border-epic/25",
    glowStyle: "0 0 20px hsl(260 60% 55% / 0.12)",
    textClass: "text-epic",
    badgeClass: "bg-epic/10 text-epic border-epic/20",
    silhouetteBg: "bg-[hsl(260_8%_10%)]",
  },
  Legendary: {
    borderClass: "border-gold/25",
    glowStyle: "0 0 24px hsl(41 60% 53% / 0.12)",
    textClass: "text-gold",
    badgeClass: "bg-gold/10 text-gold border-gold/20",
    silhouetteBg: "bg-[hsl(41_8%_10%)]",
  },
};

/* ─── Badge Image ─── */
function BadgeImage({ id, rarity, earned, size = "lg" }: { id: string; rarity: string; earned: boolean; size?: "sm" | "lg" }) {
  const style = rarityStyles[rarity];
  const dim = size === "lg" ? "w-24 h-24" : "w-20 h-20";

  return (
    <div className={`${dim} rounded-2xl overflow-hidden border-2 transition-all ${
      earned ? style.borderClass : "border-border/30"
    }`}
      style={earned && style.glowStyle ? { boxShadow: style.glowStyle } : {}}
    >
      {earned ? (
        <img src={badgeImageMap[id]} alt={id} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full ${style.silhouetteBg} flex items-center justify-center`}>
          <Lock className="w-6 h-6 text-muted-foreground/30" />
        </div>
      )}
    </div>
  );
}

/* ─── Collection Header ─── */
function CollectionHeader() {
  const earned = allBadges.filter(b => b.earned).length;
  const total = allBadges.length;
  const pct = Math.round((earned / total) * 100);
  const totalBonus = Math.min(5, allBadges.filter(b => b.earned).reduce((sum, b) => sum + parseFloat(b.bonus), 0));

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(260_15%_7%)] via-card to-card" />
      <div className="absolute top-1/2 left-1/4 w-80 h-40 bg-[hsl(260_40%_30%/0.04)] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 border border-[hsl(260_20%_15%/0.2)] rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl">ORIGINALS COLLECTION</h1>
            <p className="text-sm text-muted-foreground mt-1">Offchain SBT badges earned through gameplay</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Collected</p>
              <p className="font-display text-xl">{earned} <span className="text-muted-foreground">/ {total}</span></p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Collection Bonus</p>
              <p className="font-display text-xl text-gold">+{totalBonus.toFixed(1)}%</p>
              <p className="text-[9px] text-muted-foreground">Allocation · Max 5%</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-epic to-rare"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            Collect 10 badges to unlock <span className="text-gold font-semibold">Gold Collector</span> status
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Badge Detail Modal ─── */
function BadgeDetailModal({ badge, onClose }: { badge: typeof allBadges[0]; onClose: () => void }) {
  const style = rarityStyles[badge.rarity];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.8)] backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 space-y-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={style.glowStyle ? { boxShadow: style.glowStyle } : {}}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <BadgeImage id={badge.id} rarity={badge.rarity} earned={badge.earned} />
          <div>
            <h3 className="font-display text-xl">{badge.name}</h3>
            <span className={`inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${style.badgeClass}`}>
              {badge.rarity}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{badge.desc}</p>

          {badge.earned ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              Earned {badge.earnedDate}
            </div>
          ) : (
            <div className="space-y-2 w-full">
              <div className="px-4 py-3 rounded-xl bg-secondary/30 border border-border/50">
                <p className="text-xs text-muted-foreground">{badge.hint}</p>
                {badge.progress && badge.progress !== "—" && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${style.textClass === "text-gold" ? "bg-gold" : style.textClass === "text-epic" ? "bg-epic" : style.textClass === "text-rare" ? "bg-rare" : "bg-common"}`}
                        style={{ width: `${(parseInt(badge.progress) / parseInt(badge.progress.split("/")[1])) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-foreground mt-1">{badge.progress}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-gold font-semibold">{badge.bonus}</span>
            <span className="text-muted-foreground">allocation bonus</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Badge Card (Flip) ─── */
function BadgeCard({ badge, onSelect, isPinned, onTogglePin }: {
  badge: typeof allBadges[0];
  onSelect: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const style = rarityStyles[badge.rarity];

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "800px" }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* ── FRONT ── */}
        <motion.div
          className={`relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
            badge.earned ? style.borderClass : "border-border/30 opacity-50"
          }`}
          style={{
            backfaceVisibility: "hidden",
            ...(badge.earned && style.glowStyle ? { boxShadow: style.glowStyle } : {}),
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: badge.earned ? 1 : 0.5, y: 0 }}
        >
          <div className="absolute inset-0 metallic-sheen pointer-events-none" />

          {badge.earned && (
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
              className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all z-20 ${
                isPinned
                  ? "bg-gold/15 text-gold border border-gold/25"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary border border-transparent"
              }`}
            >
              <Pin className="w-3 h-3" />
            </button>
          )}

          {!badge.earned && (
            <div className="absolute top-3 right-3 z-20">
              <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
            </div>
          )}

          <div className="relative z-10 p-5 flex flex-col items-center text-center space-y-3">
            <BadgeImage id={badge.id} rarity={badge.rarity} earned={badge.earned} />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{badge.name}</h3>
              <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full border font-semibold ${style.badgeClass}`}>
                {badge.rarity}
              </span>
            </div>
            <p className="text-xs text-gold font-semibold">{badge.bonus} Allocation</p>
          </div>
        </motion.div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 rounded-2xl border bg-card overflow-hidden ${
            badge.earned ? style.borderClass : "border-border/30"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            ...(badge.earned && style.glowStyle ? { boxShadow: style.glowStyle } : {}),
          }}
        >
          <div className="absolute inset-0 metallic-sheen pointer-events-none" />
          <div className="relative z-10 p-5 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{badge.name}</h3>
                <RotateCcw className="w-3.5 h-3.5 text-muted-foreground/50" />
              </div>
              <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full border font-semibold ${style.badgeClass}`}>
                {badge.rarity}
              </span>
            </div>

            {/* How to earn */}
            <div className="space-y-2 my-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-display">
                {badge.earned ? "How you earned it" : "How to earn"}
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed">{badge.desc}</p>

              {!badge.earned && badge.progress && badge.progress !== "—" && (
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        badge.rarity === "Legendary" ? "bg-gold" :
                        badge.rarity === "Epic" ? "bg-epic" :
                        badge.rarity === "Rare" ? "bg-rare" : "bg-common"
                      }`}
                      style={{ width: `${(parseInt(badge.progress) / parseInt(badge.progress.split("/")[1])) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{badge.progress} · {badge.hint}</p>
                </div>
              )}

              {!badge.earned && badge.progress === "—" && (
                <p className="text-[10px] text-muted-foreground italic">{badge.hint}</p>
              )}

              {badge.earned && badge.earnedDate && (
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Earned {badge.earnedDate}</span>
                </div>
              )}
            </div>

            {/* Bonus */}
            <div className={`rounded-lg border p-2.5 text-center ${
              badge.earned
                ? "border-gold/20 bg-gold/5"
                : "border-border/30 bg-secondary/10"
            }`}>
              <div className="flex items-center justify-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span className="text-sm font-display text-gold">{badge.bonus}</span>
              </div>
              <p className="text-[9px] text-muted-foreground mt-0.5">Allocation Bonus</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════ COLLECTION PAGE ═══════════ */
export default function Collection() {
  const [selectedBadge, setSelectedBadge] = useState<typeof allBadges[0] | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>(["slots-master", "high-roller", "streak-king"]);
  const [activeCategory, setActiveCategory] = useState("All");

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const pinnedBadges = allBadges.filter(b => pinnedIds.includes(b.id));
  const filteredBadges = activeCategory === "All"
    ? allBadges
    : allBadges.filter(b => b.category === activeCategory);

  return (
    <div className="space-y-8">
      <CollectionHeader />

      {/* Pinned Showcase */}
      {pinnedBadges.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gold" />
            <h2 className="font-display text-sm tracking-wider text-muted-foreground">
              SHOWCASE <span className="text-gold">({pinnedBadges.length}/3)</span>
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-1">
            {pinnedBadges.map((b) => (
              <motion.div
                key={b.id}
                className={`rounded-2xl border bg-card p-5 flex items-center gap-4 w-64 flex-shrink-0 ${rarityStyles[b.rarity].borderClass}`}
                style={rarityStyles[b.rarity].glowStyle ? { boxShadow: rarityStyles[b.rarity].glowStyle } : {}}
                layout
              >
                <BadgeImage id={b.id} rarity={b.rarity} earned={true} size="sm" />
                <div>
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className={`text-[10px] ${rarityStyles[b.rarity].textClass}`}>{b.rarity}</p>
                  <p className="text-xs text-gold font-semibold mt-1">{b.bonus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
              activeCategory === cat
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-secondary/50 text-muted-foreground border border-border/30 hover:bg-secondary hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Full Badge Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">
          {activeCategory === "All" ? "ALL BADGES" : activeCategory.toUpperCase()}
          <span className="text-foreground/50 ml-2">({filteredBadges.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge, i) => (
            <motion.div
              key={badge.id}
              transition={{ delay: i * 0.03 }}
            >
              <BadgeCard
                badge={badge}
                onSelect={() => setSelectedBadge(badge)}
                isPinned={pinnedIds.includes(badge.id)}
                onTogglePin={() => togglePin(badge.id)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
