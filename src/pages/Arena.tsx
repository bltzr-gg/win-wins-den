import { useState } from "react";
import { TrendingUp, TrendingDown, Zap, Trophy, Crown, Dices, CircleDot, Target, Bomb, Swords, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

/* ─── Performance Card ─── */
function PerformanceCard() {
  const netResult = 4250;
  const isPositive = netResult >= 0;

  return (
    <motion.div
      className="relative rounded-2xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Subtle depth glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[hsl(41_40%_30%/0.03)] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-display text-sm tracking-wider">Arena Performance</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Available Points — primary stat */}
          <div className="lg:col-span-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Available</p>
            <p className="font-display text-3xl text-foreground">12,450</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">REAL Points</p>
          </div>

          {/* Total Wagered */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Wagered</p>
            <p className="font-display text-2xl text-gold">8,200</p>
          </div>

          {/* Net Result */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Net Result</p>
            <div className="flex items-center gap-1.5">
              <p className={`font-display text-2xl ${isPositive ? "text-multiplier" : "text-primary"}`}>
                {isPositive ? "+" : ""}{netResult.toLocaleString()}
              </p>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-multiplier" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary" />
              )}
            </div>
          </div>

          {/* Arena Multiplier */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Arena Multi</p>
            <p className="font-display text-2xl text-gold">1.5x</p>
          </div>

          {/* Win Rate */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Win Rate</p>
            <p className="font-display text-2xl text-foreground/80">62%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Daily Arena Challenge ─── */
const challengeLeaders = [
  { name: "alpha_grinder", gain: "+2,840", rank: 1 },
  { name: "whale_plays", gain: "+1,920", rank: 2 },
  { name: "rng_master", gain: "+1,450", rank: 3 },
];

function DailyChallenge() {
  return (
    <motion.div
      className="relative rounded-2xl border border-gold/15 bg-card overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(41_30%_8%/0.3)] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[30%] w-40 h-24 bg-[hsl(41_50%_40%/0.04)] rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            <h3 className="font-display text-sm tracking-wider">Daily Arena Challenge</h3>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 font-semibold">
            Ends in 14h
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          Top Net Gain today wins <span className="text-gold font-semibold">2,000 Bonus Points</span>
        </p>

        <div className="grid grid-cols-3 gap-3">
          {challengeLeaders.map((p, i) => (
            <div key={p.name} className="rounded-xl border border-border/50 bg-secondary/20 p-3 text-center space-y-1.5">
              <span className="text-base">{["🥇", "🥈", "🥉"][i]}</span>
              <p className="text-xs font-medium truncate">{p.name}</p>
              <p className="text-xs text-multiplier font-semibold">{p.gain}</p>
            </div>
          ))}
        </div>

        {/* User's position */}
        <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <span className="font-display text-sm text-primary">#12</span>
          <p className="text-xs flex-1">You — <span className="font-semibold">degen_whale</span></p>
          <p className="text-xs text-multiplier font-semibold">+680</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Game Cards ─── */
const games = [
  { name: "Slots", icon: Dices, risk: "High", volume: "142k", desc: "Spin to win big" },
  { name: "Blackjack", icon: Swords, risk: "Medium", volume: "98k", desc: "Beat the dealer" },
  { name: "Roulette", icon: CircleDot, risk: "High", volume: "87k", desc: "Pick your number" },
  { name: "Dice", icon: Dices, risk: "Low", volume: "65k", desc: "Roll the odds" },
  { name: "Strike Zone", icon: Target, risk: "High", volume: "54k", desc: "Aim for the top" },
  { name: "Mines", icon: Bomb, risk: "Medium", volume: "43k", desc: "Don't hit the mine" },
];

const riskColors: Record<string, string> = {
  Low: "text-multiplier bg-multiplier/10 border-multiplier/20",
  Medium: "text-gold bg-gold/10 border-gold/20",
  High: "text-primary bg-primary/10 border-primary/20",
};

function GameGrid() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-sm tracking-wider text-muted-foreground">ARENA GAMES</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game, i) => (
          <motion.div
            key={game.name}
            className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-border/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            {/* Edge highlight on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.06), inset 1px 0 0 hsl(0 0% 100% / 0.04)" }}
            />
            <div className="absolute inset-0 metallic-sheen pointer-events-none" />

            <div className="relative z-10 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-secondary/60 border border-border flex items-center justify-center">
                  <game.icon className="w-5 h-5 text-foreground/70" />
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${riskColors[game.risk]}`}>
                  {game.risk} Risk
                </span>
              </div>

              <div>
                <h3 className="font-display text-base">{game.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{game.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">24h Volume</span>
                <span className="text-[10px] text-foreground/70 font-semibold">{game.volume} pts</span>
              </div>

              <motion.button
                className="w-full py-3 rounded-xl bg-primary/8 text-primary border border-primary/15 font-display text-sm hover:bg-primary/12 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4" />
                Enter Arena
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════ ARENA PAGE ═══════════ */
export default function Arena() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl">REAL ARENA</h1>
        <p className="text-sm text-muted-foreground mt-1">Compete, wager, and climb the ranks</p>
      </div>

      <PerformanceCard />
      <DailyChallenge />
      <GameGrid />
    </div>
  );
}
