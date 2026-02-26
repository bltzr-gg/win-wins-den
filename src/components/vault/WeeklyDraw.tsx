import { useState, useEffect } from "react";
import { Trophy, Users, Ticket, Clock } from "lucide-react";
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

        </div>
      </div>
    </div>
  );
}
