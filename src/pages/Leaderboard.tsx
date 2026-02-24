import { motion } from "framer-motion";
import { Crown, Timer, TrendingUp, Gem } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  points: number;
  tier: string;
  nftMultiplier?: number;
  isYou?: boolean;
}

const players: Player[] = [
  { rank: 1, name: "CryptoKing", points: 98500, tier: "Diamond", nftMultiplier: 2.5 },
  { rank: 2, name: "0xWhale", points: 87200, tier: "Diamond", nftMultiplier: 2.0 },
  { rank: 3, name: "DegenerateApe", points: 76300, tier: "Platinum" },
  { rank: 4, name: "LuckyRoller", points: 65000, tier: "Gold" },
  { rank: 5, name: "BetMaxi", points: 58400, tier: "Gold", nftMultiplier: 1.5 },
  ...Array.from({ length: 35 }, (_, i) => ({
    rank: i + 6,
    name: `Player${i + 6}`,
    points: 55000 - i * 1100,
    tier: i < 5 ? "Gold" : i < 15 ? "Silver" : "Bronze",
  })),
];

// Insert "you" at rank 42
const youIndex = 41;
players[youIndex] = { ...players[youIndex], name: "RealBettor", isYou: true, points: 12450 };

const podiumColors = [
  "from-accent/30 to-accent/10 border-accent/50",
  "from-muted to-muted border-muted-foreground/30",
  "from-streak/20 to-streak/5 border-streak/40",
];
const podiumIcons = ["🥇", "🥈", "🥉"];

const tierColor = (tier: string) => {
  switch (tier) {
    case "Diamond": return "text-rare";
    case "Platinum": return "text-muted-foreground";
    case "Gold": return "text-accent";
    case "Silver": return "text-muted-foreground";
    default: return "text-streak";
  }
};

const Leaderboard = () => {
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);
  const you = players[youIndex];

  return (
    <div className="px-4 pt-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Leaderboard</h1>
        <div className="flex items-center gap-2 mt-1">
          <Timer className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Season 1 · 23 days remaining</span>
        </div>
      </motion.div>

      {/* Prize pool */}
      <motion.div
        className="glass-card p-4 flex items-center gap-3 border-accent/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Crown className="w-6 h-6 text-accent" />
        <div>
          <p className="text-xs text-muted-foreground">Season Prize Pool</p>
          <p className="text-lg font-display font-bold text-gradient-accent">$50,000</p>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 pt-4">
        {[1, 0, 2].map((idx, vi) => {
          const p = top3[idx];
          const heights = ["h-28", "h-36", "h-24"];
          return (
            <motion.div
              key={p.rank}
              className={`flex-1 flex flex-col items-center`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + vi * 0.1 }}
            >
              <div className="text-2xl mb-2">{podiumIcons[idx]}</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 flex items-center justify-center mb-2">
                <span className="font-display font-bold text-sm">{p.name[0]}</span>
              </div>
              <p className="text-xs font-semibold truncate max-w-full">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.points.toLocaleString()} pts</p>
              {p.nftMultiplier && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-epic/20 text-epic font-semibold mt-1 flex items-center gap-0.5">
                  <Gem className="w-2.5 h-2.5" />{p.nftMultiplier}x
                </span>
              )}
              <div className={`w-full ${heights[vi]} mt-2 rounded-t-lg bg-gradient-to-t ${podiumColors[idx]} border border-b-0`} />
            </motion.div>
          );
        })}
      </div>

      {/* Your rank - pinned */}
      <motion.div
        className="glass-card p-3 flex items-center gap-3 border-primary/30 glow-primary-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm font-display font-bold text-primary w-8 text-center">#{you.rank}</span>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">R</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{you.name} <span className="text-xs text-primary">(You)</span></p>
          <p className="text-xs text-muted-foreground">{you.points.toLocaleString()} pts</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+5</span>
        </div>
      </motion.div>

      {/* Rest of leaderboard */}
      <div className="space-y-1.5">
        {rest.slice(0, 15).map((p, i) => (
          <motion.div
            key={p.rank}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              p.isYou ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/50"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.03 }}
          >
            <span className="text-xs font-display font-bold text-muted-foreground w-6 text-center">
              {p.rank}
            </span>
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-[10px] font-bold">{p.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{p.name}</p>
            </div>
            <span className={`text-[10px] font-semibold ${tierColor(p.tier)}`}>{p.tier}</span>
            {p.nftMultiplier && (
              <span className="text-[9px] px-1 py-0.5 rounded bg-epic/15 text-epic">
                {p.nftMultiplier}x
              </span>
            )}
            <span className="text-xs text-muted-foreground font-medium w-16 text-right">
              {p.points.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
