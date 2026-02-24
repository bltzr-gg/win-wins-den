import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Clock, Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Wager {
  id: string;
  event: string;
  options: string[];
  odds: number[];
  payout: number;
  status: "open" | "pending" | "won" | "lost";
  selectedOption?: number;
  closesIn?: string;
}

const openWagers: Wager[] = [
  { id: "1", event: "BTC above $100k by March?", options: ["Yes", "No"], odds: [1.8, 2.1], payout: 0, status: "open", closesIn: "6h" },
  { id: "2", event: "ETH flips SOL in 24h volume?", options: ["Yes", "No"], odds: [3.2, 1.3], payout: 0, status: "open", closesIn: "12h" },
  { id: "3", event: "Crash game > 100x today?", options: ["Yes", "No"], odds: [5.0, 1.1], payout: 0, status: "open", closesIn: "3h" },
  { id: "4", event: "UFC main event: Fighter A wins?", options: ["Yes", "No"], odds: [2.2, 1.7], payout: 0, status: "open", closesIn: "2d" },
];

const pastWagers: Wager[] = [
  { id: "p1", event: "BTC hits $95k?", options: ["Yes", "No"], odds: [1.5, 2.5], payout: 750, status: "won", selectedOption: 0 },
  { id: "p2", event: "SOL above $200?", options: ["Yes", "No"], odds: [2.0, 1.8], payout: 0, status: "lost", selectedOption: 0 },
  { id: "p3", event: "DOGE pump this week?", options: ["Yes", "No"], odds: [2.2, 1.7], payout: 1100, status: "won", selectedOption: 0 },
];

const WagerPage = () => {
  const [selectedWager, setSelectedWager] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [activeTab, setActiveTab] = useState<"open" | "active" | "history">("open");

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link to="/profile" className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Wager Points</h1>
          <p className="text-sm text-muted-foreground">Risk it for the biscuit. Use REAL Points.</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        {(["open", "active", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-display font-semibold capitalize transition-all ${
              activeTab === tab ? "bg-card text-foreground" : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "open" && (
        <div className="space-y-3">
          {openWagers.map((w, i) => (
            <motion.div
              key={w.id}
              className="glass-card-hover p-4 space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{w.event}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Closes in {w.closesIn}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {w.options.map((opt, oi) => (
                  <motion.button
                    key={opt}
                    onClick={() => setSelectedWager(selectedWager === `${w.id}-${oi}` ? null : `${w.id}-${oi}`)}
                    className={`py-3 rounded-lg text-center text-sm font-display font-semibold border transition-all ${
                      selectedWager === `${w.id}-${oi}`
                        ? "bg-primary/15 border-primary/50 text-primary"
                        : "bg-secondary border-border hover:border-primary/30"
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {opt}
                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                      {w.odds[oi]}x
                    </span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {selectedWager?.startsWith(w.id) && (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(Number(e.target.value))}
                      className="flex-1 h-10 px-3 bg-secondary border border-border rounded-lg text-sm font-display focus:outline-none focus:border-primary/50"
                      placeholder="Amount"
                    />
                    <motion.button
                      className="h-10 px-5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm glow-primary-sm hover:brightness-110 transition-all"
                      whileTap={{ scale: 0.97 }}
                    >
                      Wager
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-2">
          {pastWagers.map((w, i) => (
            <motion.div
              key={w.id}
              className="glass-card p-3 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                w.status === "won" ? "bg-streak/20" : "bg-destructive/20"
              }`}>
                {w.status === "won" ? <Check className="w-4 h-4 text-streak" /> : <X className="w-4 h-4 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{w.event}</p>
                <p className="text-[10px] text-muted-foreground">{w.status === "won" ? "Won" : "Lost"}</p>
              </div>
              <span className={`text-sm font-display font-bold ${w.status === "won" ? "text-streak" : "text-destructive"}`}>
                {w.status === "won" ? `+${w.payout}` : "-100"}
              </span>
            </motion.div>
          ))}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Record: <span className="text-streak font-semibold">2W</span> - <span className="text-destructive font-semibold">1L</span>
            </p>
          </div>
        </div>
      )}

      {activeTab === "active" && (
        <div className="glass-card p-6 text-center">
          <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No active wagers</p>
          <p className="text-xs text-muted-foreground">Pick an event to get started</p>
        </div>
      )}
    </div>
  );
};

export default WagerPage;
