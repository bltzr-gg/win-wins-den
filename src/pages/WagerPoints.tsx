import { Dices, Spade, CircleDot, Dice1, Target, Bomb } from "lucide-react";

const stats = [
  { label: "Available", value: "12,450", color: "text-primary" },
  { label: "Wagered", value: "8,200", color: "text-gold" },
  { label: "Net P/L", value: "+4,250", color: "text-multiplier" },
];

const games = [
  { name: "Slots", icon: Dices, description: "Spin to win big", multiplier: "Up to 100x", color: "from-primary/20 to-accent/10" },
  { name: "Blackjack", icon: Spade, description: "Beat the dealer", multiplier: "Up to 3x", color: "from-gold/20 to-bronze/10" },
  { name: "Roulette", icon: CircleDot, description: "Pick your number", multiplier: "Up to 36x", color: "from-destructive/20 to-gold/10" },
  { name: "Dice", icon: Dice1, description: "Roll the odds", multiplier: "Up to 6x", color: "from-accent/20 to-primary/10" },
  { name: "Strike Zone", icon: Target, description: "Aim for the top", multiplier: "Up to 50x", color: "from-epic/20 to-primary/10" },
  { name: "Mines", icon: Bomb, description: "Don't hit the mine", multiplier: "Up to 25x", color: "from-primary/20 to-gold/10" },
];

export default function WagerPoints() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">WAGER POINTS</h1>
        <p className="text-sm text-muted-foreground mt-1">Wager your REAL Points across games</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4 text-center">
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className={`font-display text-xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {games.map((game) => (
          <div key={game.name} className="card-surface metallic-sheen edge-highlight p-5 space-y-3 hover:-translate-y-0.5 transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center border border-border`}>
              <game.icon className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="font-display text-sm">{game.name}</p>
              <p className="text-[10px] text-muted-foreground">{game.description}</p>
            </div>
            <p className="text-[10px] text-gold font-semibold">{game.multiplier}</p>
            <button className="w-full py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary/20 transition-colors">
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
