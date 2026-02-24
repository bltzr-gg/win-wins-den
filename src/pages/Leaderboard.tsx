import { useState } from "react";
import { Crown, TrendingUp } from "lucide-react";

const leaderboardData = [
  { rank: 1, user: "crypto_king", points: 89200, tier: "Diamond", multiplier: "3.5x" },
  { rank: 2, user: "whale_hunter", points: 74500, tier: "Diamond", multiplier: "3.2x" },
  { rank: 3, user: "bet_maxi", points: 68100, tier: "Platinum", multiplier: "2.8x" },
  { rank: 4, user: "moon_degen", points: 55400, tier: "Platinum", multiplier: "2.5x" },
  { rank: 5, user: "alpha_trader", points: 49800, tier: "Gold", multiplier: "2.0x" },
  { rank: 6, user: "nft_flipper", points: 42300, tier: "Gold", multiplier: "2.0x" },
  { rank: 7, user: "stake_lord", points: 38900, tier: "Gold", multiplier: "1.8x" },
  { rank: 8, user: "rng_wizard", points: 31200, tier: "Silver", multiplier: "1.5x" },
  { rank: 9, user: "lucky_roll", points: 27800, tier: "Silver", multiplier: "1.5x" },
  { rank: 10, user: "chad_bettor", points: 24100, tier: "Silver", multiplier: "1.2x" },
];

const tierColors: Record<string, string> = {
  Diamond: "text-accent",
  Platinum: "text-foreground",
  Gold: "text-gold",
  Silver: "text-silver",
  Bronze: "text-bronze",
};

export default function Leaderboard() {
  const [season, setSeason] = useState<"s1" | "s0">("s1");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">LEADERBOARD</h1>
          <p className="text-sm text-muted-foreground mt-1">See where you stand among the best</p>
        </div>
        <div className="flex gap-2">
          {(["s1", "s0"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                season === s
                  ? "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground glow-crimson"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {s === "s1" ? "Season 1" : "Season 0"}
            </button>
          ))}
        </div>
      </div>

      {/* Your rank pinned */}
      <div className="card-surface card-glow-red p-5">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Your Rank</p>
            <p className="font-display text-3xl text-primary">#142</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-[10px] text-muted-foreground">Points</p>
            <p className="font-display text-lg">12,450</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-[10px] text-muted-foreground">Tier</p>
            <p className="font-display text-lg text-gold">Gold</p>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-xs text-multiplier">
            <TrendingUp className="w-3.5 h-3.5" />
            +12 today
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="card-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
              <th className="text-left p-4">Rank</th>
              <th className="text-left p-4">User</th>
              <th className="text-right p-4">Points</th>
              <th className="text-right p-4">Tier</th>
              <th className="text-right p-4">Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row) => (
              <tr key={row.rank} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-4 font-display text-sm">
                  {row.rank <= 3 ? ["🥇", "🥈", "🥉"][row.rank - 1] : `#${row.rank}`}
                </td>
                <td className="p-4 text-sm font-medium">{row.user}</td>
                <td className="p-4 text-sm text-right font-display">{row.points.toLocaleString()}</td>
                <td className={`p-4 text-sm text-right font-semibold ${tierColors[row.tier] || "text-foreground"}`}>
                  {row.tier}
                </td>
                <td className="p-4 text-sm text-right">
                  <span className="px-2 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-semibold border border-gold/20">
                    {row.multiplier}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
