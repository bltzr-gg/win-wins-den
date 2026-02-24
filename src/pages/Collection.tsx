import { useState } from "react";
import { Lock, Star, Pin, X, Calendar, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import badgeFirstBlood from "@/assets/badges/first-blood.png";
import badgeSlotsMaster from "@/assets/badges/slots-master.png";
import badgeHighRoller from "@/assets/badges/high-roller.png";
import badgeLucky7 from "@/assets/badges/lucky-7.png";
import badgeStreakKing from "@/assets/badges/streak-king.png";
import badgeDiamondHands from "@/assets/badges/diamond-hands.png";
import badgeChestHunter from "@/assets/badges/chest-hunter.png";
import badgeOgPlayer from "@/assets/badges/og-player.png";

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

/* ─── Badge data ─── */
const allBadges = [
  { id: "first-blood", name: "First Blood", rarity: "Common", earned: true, bonus: "+1%", desc: "Place your very first wager in the arena.", earnedDate: "Jan 12, 2025", hint: "" },
  { id: "10-wins", name: "10 Victories", rarity: "Common", earned: true, bonus: "+1%", desc: "Win 10 games across any arena.", earnedDate: "Jan 18, 2025", hint: "" },
  { id: "lucky-7", name: "Lucky Seven", rarity: "Rare", earned: true, bonus: "+2%", desc: "Hit a 7x multiplier on any game.", earnedDate: "Feb 2, 2025", hint: "" },
  { id: "slots-master", name: "Slots Master", rarity: "Epic", earned: true, bonus: "+5%", desc: "Complete 100 rounds in Slots.", earnedDate: "Feb 14, 2025", hint: "" },
  { id: "high-roller", name: "High Roller", rarity: "Legendary", earned: true, bonus: "+10%", desc: "Wager over 10,000 REAL Points in a single session.", earnedDate: "Mar 1, 2025", hint: "" },
  { id: "streak-king", name: "Streak King", rarity: "Epic", earned: true, bonus: "+5%", desc: "Maintain a 30-day daily login streak.", earnedDate: "Mar 20, 2025", hint: "" },
  { id: "blackjack-pro", name: "Blackjack Pro", rarity: "Rare", earned: false, bonus: "+2%", desc: "Win 10 blackjack games.", hint: "Win 3 more blackjack games", progress: "7/10" },
  { id: "dice-lord", name: "Dice Lord", rarity: "Epic", earned: false, bonus: "+5%", desc: "Win 20 dice rounds.", hint: "Win 17 more dice rounds", progress: "3/20" },
  { id: "mine-sweeper", name: "Mine Sweeper", rarity: "Rare", earned: false, bonus: "+2%", desc: "Survive 25 rounds in Mines.", hint: "Survive 13 more rounds", progress: "12/25" },
  { id: "roulette-royal", name: "Roulette Royal", rarity: "Legendary", earned: false, bonus: "+10%", desc: "Hit the jackpot 5 times in Roulette.", hint: "Hit 4 more jackpots", progress: "1/5" },
  { id: "social-butterfly", name: "Social Butterfly", rarity: "Common", earned: false, bonus: "+1%", desc: "Refer 5 friends to the platform.", hint: "Refer 3 more friends", progress: "2/5" },
  { id: "diamond-hands", name: "Diamond Hands", rarity: "Legendary", earned: false, bonus: "+10%", desc: "Hold 50,000 REAL Points without wagering for 7 days.", hint: "Coming Soon", progress: "—" },
];

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

/* ─── Badge Image Component ─── */
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
  const totalBonus = allBadges.filter(b => b.earned).reduce((sum, b) => sum + parseInt(b.bonus), 0);

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
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Bonus</p>
              <p className="font-display text-xl text-gold">+{totalBonus}%</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
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
                  <p className="text-xs font-semibold text-foreground mt-1">{badge.progress}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-gold font-semibold">{badge.bonus}</span>
            <span className="text-muted-foreground">points bonus</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Badge Card ─── */
function BadgeCard({ badge, onSelect, isPinned, onTogglePin }: {
  badge: typeof allBadges[0];
  onSelect: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  const style = rarityStyles[badge.rarity];

  return (
    <motion.div
      className={`group relative rounded-2xl border bg-card overflow-hidden cursor-pointer transition-all duration-300 ${
        badge.earned ? style.borderClass : "border-border/30 opacity-50"
      }`}
      onClick={onSelect}
      whileHover={badge.earned ? { y: -4, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: badge.earned ? 1 : 0.5, y: 0 }}
      style={badge.earned && style.glowStyle ? {
        boxShadow: style.glowStyle,
      } : {}}
    >
      {/* Metallic overlay */}
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      {/* Glow intensify on hover */}
      {badge.earned && style.glowStyle && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
          style={{ boxShadow: style.glowStyle.replace(/0\.\d+\)/, "0.2)") }}
        />
      )}

      {/* Pin button */}
      {badge.earned && (
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all z-20 ${
            isPinned
              ? "bg-gold/15 text-gold border border-gold/25"
              : "bg-secondary/50 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary border border-transparent"
          }`}
        >
          <Pin className="w-3 h-3" />
        </button>
      )}

      {/* Lock icon for unearned */}
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
        <p className="text-xs text-gold font-semibold">{badge.bonus}</p>

        {/* Hover info for locked badges */}
        {!badge.earned && badge.hint && (
          <div className="absolute inset-0 bg-card/90 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
            <p className="text-xs text-muted-foreground text-center">{badge.hint}</p>
          </div>
        )}

        {badge.progress && !badge.earned && (
          <p className="text-[10px] text-muted-foreground">{badge.progress}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════ COLLECTION PAGE ═══════════ */
export default function Collection() {
  const [selectedBadge, setSelectedBadge] = useState<typeof allBadges[0] | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>(["slots-master", "high-roller", "streak-king"]);

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const pinnedBadges = allBadges.filter(b => pinnedIds.includes(b.id));

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
          <div className="flex gap-4">
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

      {/* Full Badge Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">ALL BADGES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBadges.map((badge, i) => (
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
