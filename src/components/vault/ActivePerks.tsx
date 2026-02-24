import { Zap, Rocket, Shield, Package } from "lucide-react";
import { motion } from "framer-motion";

interface Perk {
  icon: "xp" | "booster" | "shield";
  name: string;
  effect: string;
  expiresIn: string;
}

const iconMap = {
  xp: Zap,
  booster: Rocket,
  shield: Shield,
};

const demoPerks: Perk[] = [
  // Set to empty array to show empty state
  { icon: "xp", name: "XP Boost", effect: "+10% XP Boost", expiresIn: "2d 14h" },
  { icon: "booster", name: "Luck Boost", effect: "+5% Drop Rate", expiresIn: "1d 3h" },
];

export default function ActivePerks() {
  const perks = demoPerks;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-sm tracking-wider text-muted-foreground">ACTIVE PERKS</h2>

      {perks.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/50 p-10 text-center space-y-3">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/30" />
          <p className="font-display text-sm text-muted-foreground">No active perks yet.</p>
          <p className="text-xs text-muted-foreground/60">Open Mystery Boxes to unlock boosts and multipliers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {perks.map((perk, i) => {
            const Icon = iconMap[perk.icon];
            return (
              <motion.div
                key={i}
                className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs">{perk.name}</p>
                  <p className="text-xs text-multiplier font-medium">{perk.effect}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Expires in {perk.expiresIn}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
