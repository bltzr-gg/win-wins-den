import { useState } from "react";
import { Lock, Sparkles, Zap, DollarSign, Ticket, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import bronzeBoxImg from "@/assets/boxes/bronze-box.png";
import silverBoxImg from "@/assets/boxes/silver-box.png";
import goldBoxImg from "@/assets/boxes/gold-box.png";
import legendaryBoxImg from "@/assets/boxes/legendary-box.png";

export interface MysteryBox {
  name: string;
  tier: "bronze" | "silver" | "gold" | "legendary";
  cost: number | "FREE";
  costLabel: string;
  topReward: string;
  available: boolean;
  lockReason?: string;
  freeProgress?: number;
}

const tierConfig = {
  bronze: {
    img: bronzeBoxImg,
    glow: "hsl(25 50% 45%)",
    border: "border-bronze/25",
    accent: "text-bronze",
    btnBg: "bg-bronze/15 hover:bg-bronze/25 border-bronze/30 text-bronze",
  },
  silver: {
    img: silverBoxImg,
    glow: "hsl(220 8% 65%)",
    border: "border-silver/25",
    accent: "text-silver",
    btnBg: "bg-silver/15 hover:bg-silver/25 border-silver/30 text-silver",
  },
  gold: {
    img: goldBoxImg,
    glow: "hsl(41 60% 53%)",
    border: "border-gold/25",
    accent: "text-gold",
    btnBg: "bg-gold/15 hover:bg-gold/25 border-gold/30 text-gold",
  },
  legendary: {
    img: legendaryBoxImg,
    glow: "hsl(260 60% 55%)",
    border: "border-epic/25",
    accent: "text-epic",
    btnBg: "bg-epic/15 hover:bg-epic/25 border-epic/30 text-epic",
  },
};

const rewardIcons = [
  { Icon: Zap, label: "REAL Points" },
  { Icon: DollarSign, label: "USDC" },
];

const TICKET_PRICE = 250;

function TicketBuySection() {
  const [qty, setQty] = useState(1);
  const totalCost = qty * TICKET_PRICE;

  return (
    <div className="rounded-lg border border-epic/15 bg-epic/[0.03] p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-3 h-3 text-epic" />
          <span className="font-display text-[10px] text-epic">BUY DRAW TICKETS</span>
        </div>
        <span className="text-[9px] text-muted-foreground">1 Ticket = {TICKET_PRICE} RP</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <motion.button
            className="w-7 h-7 rounded-md border border-border/50 bg-secondary/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty(Math.max(1, qty - 1))}
          >
            <Minus className="w-3 h-3" />
          </motion.button>
          <span className="font-display text-base w-8 text-center">{qty}</span>
          <motion.button
            className="w-7 h-7 rounded-md border border-border/50 bg-secondary/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty(qty + 1)}
          >
            <Plus className="w-3 h-3" />
          </motion.button>
        </div>
        <span className="text-[10px] text-muted-foreground">{totalCost.toLocaleString()} RP</span>
      </div>

      <motion.button
        className="w-full py-2 rounded-lg font-display text-[10px] border border-epic/25 bg-epic/10 text-epic hover:bg-epic/15 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Buy {qty} Ticket{qty > 1 ? "s" : ""}
      </motion.button>
    </div>
  );
}

export default function MysteryBoxCard({ box }: { box: MysteryBox }) {
  const cfg = tierConfig[box.tier];

  const button = box.available ? (
    <motion.button
      className={`w-full py-3 rounded-xl font-display text-sm border transition-all ${
        box.cost === "FREE"
          ? "bg-primary/20 hover:bg-primary/30 border-primary/40 text-primary"
          : cfg.btnBg
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {box.cost === "FREE" ? (
        <span className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Open Free Box</span>
      ) : (
        <span className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Open — {box.cost.toLocaleString()} RP</span>
      )}
    </motion.button>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          disabled
          className="w-full py-3 rounded-xl font-display text-sm border border-border/40 bg-secondary/30 text-muted-foreground cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" /> Locked
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs max-w-[200px]">
        {box.lockReason || "Complete requirements to unlock"}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <motion.div
      className={`group relative flex-shrink-0 w-[260px] rounded-2xl border bg-card overflow-hidden ${cfg.border}`}
      whileHover={{ y: -6, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity"
        style={{ backgroundColor: cfg.glow.replace(")", " / 0.15)") }}
      />
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-5 space-y-4">
        <div className="flex justify-center py-2">
          <motion.img
            src={cfg.img}
            alt={box.name}
            className="w-28 h-28 object-contain drop-shadow-lg"
            animate={box.available ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className={`font-display text-base ${cfg.accent}`}>{box.name}</h3>
          <p className="text-xs text-muted-foreground">{box.costLabel}</p>
          <p className="text-[10px] text-muted-foreground/80">Top reward: <span className="text-foreground/70 font-medium">{box.topReward}</span></p>
        </div>

        {box.freeProgress !== undefined && box.freeProgress < 100 && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Free unlock</span>
              <span>{box.freeProgress}%</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/60 transition-all"
                style={{ width: `${box.freeProgress}%` }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.15)] to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        )}

        {/* Reward types — REAL Points & USDC only */}
        <div className="flex items-center justify-center gap-4">
          {rewardIcons.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Icon className="w-3 h-3" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {button}

        {/* Buy Tickets — premium boxes only */}
        {box.cost !== "FREE" && box.available && <TicketBuySection />}
      </div>
    </motion.div>
  );
}
