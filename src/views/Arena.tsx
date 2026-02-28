"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, Zap, Trophy, Crown, Dices, CircleDot,
  Target, Bomb, Swords, BarChart3, Flame, Activity, ChevronDown, ChevronUp,
  Shield, HelpCircle, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Performance Overview ─── */
function PerformanceCard() {
  const netResult = 4250;
  const isPositive = netResult >= 0;

  return (
    <motion.div
      className="relative rounded-2xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[hsl(30_40%_30%/0.03)] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-display text-sm tracking-wider">ARENA PERFORMANCE</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Arena Points Earned</p>
            <p className="font-display text-3xl text-foreground">12,450</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">Based on wagering activity</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Wagered</p>
            <p className="font-display text-2xl text-amber">$8,200</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Detailed Breakdown Panel (expandable) ─── */
function ArenaBreakdown() {
  const [expanded, setExpanded] = useState(false);

  const stats = [
    { label: "Slots", value: "3,200 pts", icon: Dices, color: "text-amber" },
    { label: "Blackjack", value: "2,800 pts", icon: Swords, color: "text-foreground" },
    { label: "Roulette", value: "2,450 pts", icon: CircleDot, color: "text-amber" },
    { label: "Dice", value: "1,900 pts", icon: Dices, color: "text-foreground" },
    { label: "Strike Zone", value: "1,200 pts", icon: Target, color: "text-primary" },
    { label: "Mines", value: "900 pts", icon: Bomb, color: "text-amber" },
  ];

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber" />
          <h3 className="font-display text-sm tracking-wider">DETAILED BREAKDOWN</h3>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl bg-secondary/20 border border-border/40 p-4 space-y-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className={`font-display text-xl ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── How Arena Points Work ─── */
function HowArenaWorks() {
  const points = [
    { icon: Dices, text: "Wager REAL Points on competitive arena games." },
    { icon: TrendingUp, text: "Winning accelerates your leaderboard climb with Arena Multiplier." },
    
    { icon: Shield, text: "Arena is a competitive sub-engine — separate from passive earning." },
  ];

  return (
    <motion.div
      className="rounded-xl border border-border/40 bg-card p-5 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-display text-sm tracking-wider text-muted-foreground">HOW ARENA POINTS WORK</h3>
      </div>
      <div className="space-y-2">
        {points.map((p, i) => (
          <div key={i} className="flex items-start gap-3 py-1.5">
            <p.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{p.text}</p>
          </div>
        ))}
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
  const medalColors = ["text-gold", "text-silver", "text-bronze"];

  return (
    <motion.div
      className="relative rounded-2xl border border-amber/15 bg-card overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30_30%_8%/0.3)] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[30%] w-40 h-24 bg-[hsl(30_50%_40%/0.04)] rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber" />
            <h3 className="font-display text-sm tracking-wider">DAILY ARENA CHALLENGE</h3>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-semibold">
            Resets in 14h
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          Top Net Gain today wins <span className="text-amber font-semibold">2,000 Bonus Points</span>
        </p>

        <div className="grid grid-cols-3 gap-3">
          {challengeLeaders.map((p, i) => (
            <div key={p.name} className="rounded-xl border border-border/50 bg-secondary/20 p-3 text-center space-y-1.5">
              <span className={`font-display text-sm ${medalColors[i]}`}>#{p.rank}</span>
              <p className="text-xs font-medium truncate">{p.name}</p>
              <p className="text-xs text-multiplier font-semibold">{p.gain}</p>
            </div>
          ))}
        </div>

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
  Medium: "text-amber bg-amber/10 border-amber/20",
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
            transition={{ delay: 0.2 + i * 0.04 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
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
        <p className="text-sm text-muted-foreground mt-1">Competitive acceleration layer — wager, win, and climb faster</p>
      </div>

      <PerformanceCard />
      <ArenaBreakdown />
      <DailyChallenge />
      <GameGrid />
      <HowArenaWorks />
    </div>
  );
}
