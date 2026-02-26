import { Package, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HistoryEntry {
  date: string;
  boxType: string;
  reward: string;
  ticketsEarned: string;
  value: string;
}

const demoHistory: HistoryEntry[] = [
  { date: "Feb 23, 2026", boxType: "Silver", reward: "450 REAL Points", ticketsEarned: "+1", value: "450 RP" },
  { date: "Feb 22, 2026", boxType: "Bronze", reward: "120 REAL Points", ticketsEarned: "—", value: "120 RP" },
  { date: "Feb 21, 2026", boxType: "Bronze", reward: "85 REAL Points", ticketsEarned: "—", value: "85 RP" },
  { date: "Feb 20, 2026", boxType: "Silver", reward: "5 USDC", ticketsEarned: "+1", value: "$5.00" },
];

const tierColor: Record<string, string> = {
  Bronze: "text-bronze",
  Silver: "text-silver",
  Gold: "text-gold",
  Legendary: "text-epic",
};

export default function BoxHistory() {
  const history = demoHistory;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-sm tracking-wider text-muted-foreground">MYSTERY BOX HISTORY</h2>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/50 p-10 text-center space-y-4">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/30" />
          <p className="font-display text-sm text-muted-foreground">You haven't opened any Mystery Boxes yet.</p>
          <motion.button
            className="px-6 py-2.5 rounded-xl font-display text-sm border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Open Your First Box</span>
          </motion.button>
        </div>
      ) : (
        <div className="rounded-xl border border-border/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-secondary/20">
                <th className="text-left p-3 text-[10px] font-display text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left p-3 text-[10px] font-display text-muted-foreground uppercase tracking-wider">Box Type</th>
                <th className="text-left p-3 text-[10px] font-display text-muted-foreground uppercase tracking-wider">Reward</th>
                <th className="text-center p-3 text-[10px] font-display text-muted-foreground uppercase tracking-wider">Tickets Earned</th>
                <th className="text-right p-3 text-[10px] font-display text-muted-foreground uppercase tracking-wider">REAL Points Value</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-border/20 last:border-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <td className="p-3 text-xs text-muted-foreground">{entry.date}</td>
                  <td className={`p-3 text-xs font-display ${tierColor[entry.boxType] || "text-foreground"}`}>{entry.boxType}</td>
                  <td className="p-3 text-xs text-foreground/80">{entry.reward}</td>
                  <td className="p-3 text-xs text-epic text-center font-medium">{entry.ticketsEarned}</td>
                  <td className="p-3 text-xs text-foreground/70 text-right font-medium">{entry.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
