import { Crown } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-primary">SEASON 1</h1>
        <h2 className="font-display text-2xl mt-1">LEADERBOARD</h2>
        <p className="text-sm text-muted-foreground mt-1">See where you stand among the best</p>
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
            {/* Pinned user row */}
            <tr className="border-b border-primary/20 bg-primary/5">
              <td className="p-4 font-display text-sm text-primary">#42</td>
              <td className="p-4 text-sm font-bold text-primary">YOU — degen_whale</td>
              <td className="p-4 text-sm text-right font-display text-primary">12,450</td>
              <td className="p-4 text-sm text-right font-semibold text-gold">Gold</td>
              <td className="p-4 text-sm text-right">
                <span className="px-2 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-semibold border border-gold/20">2.0x</span>
              </td>
            </tr>
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
