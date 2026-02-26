import { useState, useEffect } from "react";
import { Trophy, Users, Ticket, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

/* ─── Draw Details Modal ─── */
function DrawDetailsModal({ userTickets, onClose }: { userTickets: number; onClose: () => void }) {
  const totalSystemTickets = 3420;
  const winProb = totalSystemTickets > 0 ? ((userTickets / totalSystemTickets) * 100).toFixed(2) : "0.00";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.8)] backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 space-y-5 mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">DRAW DETAILS</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase">Total Tickets in Pool</p>
            <p className="font-display text-xl text-foreground">{totalSystemTickets.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-epic/20 bg-epic/5 p-4 text-center space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase">Your Tickets</p>
            <p className="font-display text-xl text-epic">{userTickets}</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase">Est. Win Probability</p>
            <p className="font-display text-xl text-multiplier">{winProb}%</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 text-center space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase">Winners Selected</p>
            <p className="font-display text-xl text-foreground">25</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>Winners are randomly selected, weighted by ticket count.</p>
          <p>Draw executes automatically at weekly reset.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WeeklyDraw() {
  const nextDraw = new Date();
  nextDraw.setDate(nextDraw.getDate() + ((7 - nextDraw.getDay()) % 7 || 7));
  nextDraw.setHours(20, 0, 0, 0);
  const countdown = useCountdown(nextDraw);

  const userTickets = 12;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="relative z-10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-sm tracking-wider text-muted-foreground">WEEKLY BONUS DRAW</h2>
              <p className="text-xs text-muted-foreground mt-1">Compete for this week's bonus pool.</p>
            </div>
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
                {countdown.d}D {countdown.h}H {countdown.m}M
              </p>
            </div>

            <div className="rounded-xl border border-epic/20 bg-epic/5 p-4 text-center space-y-1">
              <Ticket className="w-5 h-5 mx-auto text-epic" />
              <p className="text-[10px] text-muted-foreground uppercase">Your Tickets</p>
              <p className="font-display text-xl text-epic">{userTickets}</p>
              <p className="text-[10px] text-muted-foreground">entries</p>
            </div>
          </div>

          {/* View Draw Details */}
          <motion.button
            className="w-full py-2.5 rounded-xl font-display text-xs border border-border/30 bg-secondary/20 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDetails(true)}
          >
            View Draw Details
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <DrawDetailsModal userTickets={userTickets} onClose={() => setShowDetails(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
