import { useState, useEffect } from "react";
import { Trophy, Users, Ticket, Clock, Gift } from "lucide-react";
import { motion } from "framer-motion";

function useCountdown(targetDate: Date) {
  const [remaining, setRemaining] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setRemaining({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return remaining;
}

const ticketRules = [
  { action: "Open Silver Mystery Box", tickets: "+1 Ticket" },
  { action: "Open Gold Mystery Box", tickets: "+3 Tickets" },
  { action: "Open Legendary Mystery Box", tickets: "+10 Tickets" },
  { action: "Weekly Arena Top 10", tickets: "+5 Tickets" },
];

export default function WeeklyDraw() {
  const nextDraw = new Date();
  nextDraw.setDate(nextDraw.getDate() + ((7 - nextDraw.getDay()) % 7 || 7));
  nextDraw.setHours(20, 0, 0, 0);
  const countdown = useCountdown(nextDraw);
  const userTickets = 12;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--epic)/0.03)] to-transparent pointer-events-none" />
        <div className="relative z-10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm tracking-wider text-muted-foreground">WEEKLY BONUS DRAW</h2>
            <div className="flex items-center gap-1.5 text-xs text-epic">
              <Trophy className="w-4 h-4" />
              <span className="font-display">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
              <Trophy className="w-5 h-5 mx-auto text-gold" />
              <p className="text-[10px] text-muted-foreground uppercase">Prize Pool</p>
              <p className="font-display text-xl text-gold">2,500</p>
              <p className="text-[10px] text-muted-foreground">USDC</p>
            </div>

            <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
              <Users className="w-5 h-5 mx-auto text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground uppercase">Winners</p>
              <p className="font-display text-xl text-foreground">25</p>
              <p className="text-[10px] text-muted-foreground">selected</p>
            </div>

            <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
              <Clock className="w-5 h-5 mx-auto text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground uppercase">Draws In</p>
              <p className="font-display text-lg text-foreground">
                {countdown.d}d {countdown.h}h {countdown.m}m
              </p>
              <p className="text-[10px] text-muted-foreground">{countdown.s}s</p>
            </div>

            <div className="rounded-xl border border-epic/20 bg-epic/5 p-4 text-center space-y-1">
              <Ticket className="w-5 h-5 mx-auto text-epic" />
              <p className="text-[10px] text-muted-foreground uppercase">Your Tickets</p>
              <p className="font-display text-xl text-epic">{userTickets}</p>
              <p className="text-[10px] text-muted-foreground">entries</p>
            </div>
          </div>

          <motion.button
            className="w-full py-3 rounded-xl font-display text-sm border border-epic/30 bg-epic/10 text-epic hover:bg-epic/15 transition-all"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            View Draw Details
          </motion.button>
        </div>
      </div>

      {/* How to earn tickets */}
      <div className="rounded-xl border border-border/40 bg-card/60 p-5 space-y-3">
        <h3 className="font-display text-xs tracking-wider text-muted-foreground">HOW TO EARN TICKETS</h3>
        <div className="space-y-2">
          {ticketRules.map((rule) => (
            <div key={rule.action} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{rule.action}</span>
              </div>
              <span className="text-xs font-semibold text-epic">{rule.tickets}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-border/30 space-y-1">
          <p className="text-[10px] text-muted-foreground">Tickets cannot be purchased.</p>
          <p className="text-[10px] text-muted-foreground">Tickets reset weekly.</p>
        </div>
      </div>
    </div>
  );
}
