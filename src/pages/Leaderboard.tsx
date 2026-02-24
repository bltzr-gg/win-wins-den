import { useState } from "react";
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
  ...Array.from({ length: 45 }, (_, i) => ({
    rank: i + 6,
    name: `Player${i + 6}`,
    points: 55000 - i * 1000,
    tier: i < 5 ? "Gold" : i < 15 ? "Silver" : "Bronze",
  })),
];

const youIndex = 46;
players[youIndex] = { ...players[youIndex], name: "RealBettor", isYou: true, points: 12450, tier: "Silver" };

const podiumColors = [
  "from-accent/20 to-accent/5 border-accent/30",
  "from-muted-foreground/10 to-muted-foreground/5 border-muted-foreground/20",
  "from-primary/15 to-primary/5 border-primary/20",
];

const tierColor = (tier: string) => {
  switch (tier) {
    case "Diamond": return "text-rare";
    case "Platinum": return "text-muted-foreground";
    case "Gold": return "text-accent";
    case "Silver": return "text-muted-foreground";
    default: return "text-primary";
  }
};

const Leaderboard = () => {
  const [filter, setFilter] = useState<"all" | "week" | "today">("all");
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);
  const you = players[youIndex];
  const above = players[youIndex - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Leaderboard</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Timer className="w-3.5 h-3.5" /> Season 1 · 47 days remaining
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2.5 flex items-center gap-2 border-accent/20">
            <Crown className="w-4 h-4 text-accent" />
            <div>
              <p className="text-[9px] text-muted-foreground leading-none">Prize Pool</p>
              <p className="text-sm font-display font-bold text-gradient-accent leading-tight">6.6% of Supply</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 max-w-xs">
        {(["all", "week", "today"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-semibold capitalize transition-all ${
              filter === f ? "bg-card text-foreground" : "text-muted-foreground"
            }`}
          >
            {f === "all" ? "All Time" : f === "week" ? "This Week" : "Today"}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 lg:gap-6 pt-4 max-w-2xl mx-auto">
        {[1, 0, 2].map((idx, vi) => {
          const p = top3[idx];
          const heights = ["h-24", "h-32", "h-20"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <motion.div
              key={p.rank}
              className="flex-1 max-w-[180px] flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + vi * 0.1 }}
            >
              <span className="text-3xl mb-2">{medals[vi]}</span>
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 border-2 border-accent/30 flex items-center justify-center mb-2 glow-gold">
                <span className="font-display font-bold text-lg">{p.name[0]}</span>
              </div>
              <p className="text-sm font-semibold truncate max-w-full">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.points.toLocaleString()} pts</p>
              {p.nftMultiplier && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-epic/20 text-epic font-semibold mt-1 flex items-center gap-0.5">
                  <Gem className="w-3 h-3" />{p.nftMultiplier}x
                </span>
              )}
              <div className={`w-full ${heights[vi]} mt-2 rounded-t-xl bg-gradient-to-t ${podiumColors[idx]} border border-b-0`} />
            </motion.div>
          );
        })}
      </div>

      {/* Your rank pinned */}
      <motion.div
        className="glass-card p-4 flex items-center gap-4 border-primary/20 glow-primary-sm max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <span className="text-lg font-display font-bold text-primary w-10 text-center">#{you.rank}</span>
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">R</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{you.name} <span className="text-primary text-xs">(You)</span></p>
          <p className="text-xs text-muted-foreground">{you.points.toLocaleString()} pts</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-accent font-display font-semibold">
            {above ? `${(above.points - you.points).toLocaleString()} pts to #${above.rank}` : ""}
          </p>
          <div className="flex items-center gap-1 text-xs text-primary justify-end mt-0.5">
            <TrendingUp className="w-3 h-3" /> +5
          </div>
        </div>
      </motion.div>

      {/* Season Info */}
      <div className="glass-card p-4 max-w-2xl mx-auto flex flex-wrap gap-6 text-xs text-muted-foreground">
        <div><span className="font-semibold text-foreground">Season:</span> 1</div>
        <div><span className="font-semibold text-foreground">Value:</span> 20 pts = $1</div>
        <div><span className="font-semibold text-foreground">Split:</span> 30% Free Play · 30% Deposit Match · 40% REAL Points</div>
      </div>

      {/* Rest of leaderboard */}
      <div className="space-y-1 max-w-2xl mx-auto">
        {rest.slice(0, 25).map((p, i) => (
          <motion.div
            key={p.rank}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
              p.isYou ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/50"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.015 }}
          >
            <span className="text-sm font-display font-bold text-muted-foreground w-8 text-center">{p.rank}</span>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold">{p.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${p.isYou ? "text-primary" : ""}`}>
                {p.name} {p.isYou && <span className="text-xs text-primary">(You)</span>}
              </p>
            </div>
            <span className={`text-xs font-semibold ${tierColor(p.tier)}`}>{p.tier}</span>
            {p.nftMultiplier && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-epic/15 text-epic">{p.nftMultiplier}x</span>
            )}
            <span className="text-sm text-muted-foreground font-medium w-20 text-right">
              {p.points.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
