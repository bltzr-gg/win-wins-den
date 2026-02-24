import { Lock, Star, Pin } from "lucide-react";

const rarityColors: Record<string, string> = {
  Common: "text-common border-common/20 bg-common/5",
  Rare: "text-rare border-rare/20 bg-rare/5",
  Epic: "text-epic border-epic/20 bg-epic/5",
  Legendary: "text-legendary border-legendary/20 bg-legendary/5",
};

const rarityGlow: Record<string, string> = {
  Common: "",
  Rare: "glow-rare",
  Epic: "glow-epic",
  Legendary: "glow-gold",
};

const rarityBadge: Record<string, string> = {
  Common: "bg-common/10 text-common",
  Rare: "bg-rare/10 text-rare",
  Epic: "bg-epic/10 text-epic",
  Legendary: "bg-legendary/10 text-legendary",
};

const pinnedBadges = [
  { name: "Slots Master", rarity: "Epic", emoji: "🎰" },
  { name: "First Blood", rarity: "Common", emoji: "⚔️" },
  { name: "High Roller", rarity: "Legendary", emoji: "💎" },
  { name: "Lucky 7", rarity: "Rare", emoji: "🍀" },
  { name: "Streak King", rarity: "Epic", emoji: "🔥" },
];

const allBadges = [
  { name: "First Blood", rarity: "Common", emoji: "⚔️", earned: true, bonus: "+1%" },
  { name: "10 Wins", rarity: "Common", emoji: "🏆", earned: true, bonus: "+1%" },
  { name: "Lucky 7", rarity: "Rare", emoji: "🍀", earned: true, bonus: "+2%" },
  { name: "Slots Master", rarity: "Epic", emoji: "🎰", earned: true, bonus: "+5%" },
  { name: "High Roller", rarity: "Legendary", emoji: "💎", earned: true, bonus: "+10%" },
  { name: "Streak King", rarity: "Epic", emoji: "🔥", earned: true, bonus: "+5%" },
  { name: "Blackjack Pro", rarity: "Rare", emoji: "🃏", earned: false, progress: "7/10 wins", bonus: "+2%" },
  { name: "Dice Lord", rarity: "Epic", emoji: "🎲", earned: false, progress: "3/20 wins", bonus: "+5%" },
  { name: "Mine Sweeper", rarity: "Rare", emoji: "💣", earned: false, progress: "12/25 rounds", bonus: "+2%" },
  { name: "Roulette Royal", rarity: "Legendary", emoji: "👑", earned: false, progress: "1/5 jackpots", bonus: "+10%" },
  { name: "Social Butterfly", rarity: "Common", emoji: "🦋", earned: false, progress: "2/5 referrals", bonus: "+1%" },
  { name: "Diamond Hands", rarity: "Legendary", emoji: "💠", earned: false, progress: "Coming Soon", bonus: "+10%" },
];

export default function Badges() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">ORIGINALS COLLECTION</h1>
        <p className="text-sm text-muted-foreground mt-1">Offchain SBT badges earned by playing</p>
      </div>

      <div className="card-surface p-4">
        <p className="text-xs text-muted-foreground">
          Your badges give a cumulative <span className="text-gold font-semibold">+24%</span> points bonus on all earnings
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">SHOWCASE (TOP 5)</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {pinnedBadges.map((b) => (
            <div
              key={b.name}
              className={`flex-shrink-0 w-28 p-4 rounded-xl border text-center space-y-2 ${rarityColors[b.rarity]} ${rarityGlow[b.rarity]}`}
            >
              <div className="text-3xl">{b.emoji}</div>
              <p className="text-xs font-semibold">{b.name}</p>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${rarityBadge[b.rarity]}`}>
                {b.rarity}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">ALL BADGES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {allBadges.map((b) => (
            <div
              key={b.name}
              className={`card-surface p-4 text-center space-y-2 relative transition-all hover:-translate-y-0.5 ${
                b.earned ? rarityGlow[b.rarity] : "opacity-50"
              }`}
            >
              {!b.earned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
              <div className="text-3xl">{b.emoji}</div>
              <p className="text-xs font-semibold">{b.name}</p>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold inline-block ${rarityBadge[b.rarity]}`}>
                {b.rarity}
              </span>
              <p className="text-[10px] text-gold font-semibold">{b.bonus}</p>
              {b.progress && <p className="text-[10px] text-muted-foreground">{b.progress}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
