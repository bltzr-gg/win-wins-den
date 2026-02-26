import { Zap, DollarSign, Ticket } from "lucide-react";

const chances = [
  { label: "REAL Points", pct: 50, Icon: Zap },
  { label: "USDC", pct: 25, Icon: DollarSign },
  { label: "Tickets", pct: 25, Icon: Ticket },
];

export default function WinChancesBar() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/60 p-4">
      <h3 className="font-display text-xs tracking-wider text-muted-foreground mb-3">WIN CHANCES</h3>
      <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-secondary/50">
        {chances.map((c, i) => (
          <div
            key={c.label}
            className="h-full transition-all"
            style={{
              width: `${c.pct}%`,
              backgroundColor: [
                "hsl(var(--primary))",
                "hsl(var(--multiplier))",
                "hsl(var(--amber))",
              ][i],
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-3">
        {chances.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <c.Icon className="w-3 h-3" />
            <span>{c.label}</span>
            <span className="text-foreground/60 font-medium">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
