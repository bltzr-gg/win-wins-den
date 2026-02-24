import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, ChevronRight, Trophy, Award, Gift, Timer,
  Sparkles, Star, Lock, Gem, Box, Zap, Users
} from "lucide-react";

const STREAK_DAYS = 7;

const Hub = () => {
  const navigate = useNavigate();
  const [streakDay] = useState(4);
  const [boxOpened, setBoxOpened] = useState(false);
  const [boxReward, setBoxReward] = useState<number | null>(null);
  const [openingChest, setOpeningChest] = useState<string | null>(null);
  const [chestReward, setChestReward] = useState<{ tier: string; reward: string } | null>(null);
  const points = 12450;

  const handleOpenBox = () => {
    if (!boxOpened) {
      setBoxOpened(true);
      const rewards = [10, 15, 25, 35, 50];
      setBoxReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }
  };

  const handleOpenChest = (tier: string) => {
    setOpeningChest(tier);
    setTimeout(() => {
      const rewards: Record<string, string[]> = {
        Bronze: ["25 REAL Points", "50 REAL Points", "$2 Free Play"],
        Silver: ["100 REAL Points", "150 REAL Points", "$5 Free Play"],
        Gold: ["250 REAL Points", "$10 Free Play", "$25 Free Play"],
        Diamond: ["500 REAL Points", "$50 Free Play", "$100 Free Play"],
      };
      const pool = rewards[tier] || rewards.Bronze;
      setChestReward({ tier, reward: pool[Math.floor(Math.random() * pool.length)] });
      setOpeningChest(null);
    }, 1500);
  };

  const chestTiers = [
    { name: "Bronze", cost: 100, stars: 1, color: "from-primary/10 to-primary/5 border-primary/20" },
    { name: "Silver", cost: 300, stars: 2, color: "from-muted-foreground/10 to-muted-foreground/5 border-muted-foreground/20" },
    { name: "Gold", cost: 500, stars: 3, color: "from-accent/15 to-accent/5 border-accent/30" },
    { name: "Diamond", cost: 1000, stars: 4, color: "from-rare/15 to-rare/5 border-rare/30", limited: true },
  ];

  const activityFeed = [
    "CryptoKing just pulled $100 Free Play from a Gold Chest!",
    "0xWhale opened 5 Bronze Chests in a row 🔥",
    "LuckyDice unlocked the Streak Lord badge!",
    "DegenerateApe hit #3 on the leaderboard!",
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* ═══ SECTION A: DAILY CHECK-IN ═══ */}
      <motion.section
        className="glass-card p-6 lg:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 left-0 w-48 h-48 bg-streak/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-lg">Daily Mystery Box</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-streak/15 text-streak font-semibold border border-streak/30">FREE</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-streak" />
              <span className="font-display font-semibold text-sm text-streak">{streakDay}-Day</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-streak/15 text-streak font-semibold border border-streak/30 glow-green">
                {streakDay >= 7 ? "1.5x" : `${(1 + streakDay * 0.07).toFixed(1)}x`}
              </span>
            </div>
          </div>

          {/* Streak tracker */}
          <div className="flex items-center gap-1.5 mb-5">
            {Array.from({ length: STREAK_DAYS }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  className={`w-full h-2.5 rounded-full ${
                    i < streakDay
                      ? "bg-gradient-to-r from-streak to-accent"
                      : i === streakDay
                      ? "bg-muted border border-streak/40"
                      : "bg-muted"
                  }`}
                  initial={i === streakDay - 1 ? { scale: 0 } : {}}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                />
                <span className="text-[9px] text-muted-foreground">D{i + 1}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-2.5 px-2 rounded-full bg-accent/20 border border-accent/30 flex items-center">
                <span className="text-[8px] font-bold text-accent">14d</span>
              </div>
              <span className="text-[9px] text-accent">2x</span>
            </div>
          </div>

          {/* Mystery Box Button */}
          <AnimatePresence mode="wait">
            {!boxOpened ? (
              <motion.button
                key="closed"
                onClick={handleOpenBox}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 border border-primary/30 font-display font-bold text-base flex items-center justify-center gap-3 hover:brightness-125 transition-all group"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                <Gift className="w-5 h-5 text-primary group-hover:animate-bounce" />
                <span className="text-gradient-primary">TAP TO OPEN MYSTERY BOX</span>
              </motion.button>
            ) : (
              <motion.div
                key="opened"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent/15 to-primary/10 border border-accent/30 flex items-center justify-center gap-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-display font-bold text-xl text-gradient-accent">
                  +{boxReward} REAL Points!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ═══ SECTION B: QUICK ACTION CARDS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            title: "Today's Tasks",
            sub: "3/5 completed",
            icon: Zap,
            color: "text-primary",
            glow: "border-primary/20 hover:border-primary/40",
            path: "/tasks",
            progress: 60,
          },
          {
            title: "Reward Chests",
            sub: "You can afford 2 Bronze",
            icon: Box,
            color: "text-accent",
            glow: "border-accent/20 hover:border-accent/40",
            path: "#chests",
          },
          {
            title: "Leaderboard",
            sub: "You're #47",
            icon: Trophy,
            color: "text-accent",
            glow: "border-accent/20 hover:border-accent/40",
            path: "/leaderboard",
            detail: "#46 — CryptoDegen99",
          },
          {
            title: "Badges",
            sub: "12/80 collected",
            icon: Award,
            color: "text-epic",
            glow: "border-epic/20 hover:border-epic/40",
            path: "/badges",
          },
        ].map((card, i) => (
          <motion.button
            key={card.title}
            onClick={() => card.path.startsWith("/") && navigate(card.path)}
            className={`glass-card-hover p-4 lg:p-5 text-left space-y-3 ${card.glow}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <div className="flex items-center justify-between">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
              {card.detail && (
                <p className="text-[10px] text-muted-foreground mt-0.5">{card.detail}</p>
              )}
            </div>
            {card.progress && (
              <div className="w-full h-1.5 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* ═══ SECTION C: REWARD CHESTS ═══ */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <Gem className="w-5 h-5 text-accent" /> Reward Chests
          </h2>
          <p className="text-xs text-muted-foreground">Spend REAL Points for rewards</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {chestTiers.map((chest, i) => {
            const canAfford = points >= chest.cost;
            return (
              <motion.div
                key={chest.name}
                className={`glass-card-hover p-4 lg:p-5 text-center space-y-3 relative ${
                  !canAfford ? "opacity-50" : ""
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: canAfford ? 1 : 0.5, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.06 }}
              >
                {chest.limited && (
                  <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                    Limited
                  </span>
                )}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-b ${chest.color} border flex items-center justify-center mx-auto`}>
                  <Box className={`w-7 h-7 ${
                    chest.name === "Gold" || chest.name === "Diamond"
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-display font-semibold">{chest.name}</p>
                  <p className="text-xs text-muted-foreground">{chest.cost} pts</p>
                </div>
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: chest.stars }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 text-accent fill-accent" />
                  ))}
                </div>
                <button
                  onClick={() => canAfford && handleOpenChest(chest.name)}
                  disabled={!canAfford || openingChest === chest.name}
                  className={`w-full py-2 rounded-lg text-xs font-display font-semibold transition-all ${
                    canAfford
                      ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {openingChest === chest.name ? "Opening..." : "Open"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Chest reward reveal */}
        <AnimatePresence>
          {chestReward && (
            <motion.div
              className="glass-card p-6 text-center border-accent/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-xs text-muted-foreground">{chestReward.tier} Chest</p>
              <p className="text-2xl font-display font-bold text-gradient-accent mt-1">{chestReward.reward}</p>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => setChestReward(null)}
                  className="px-4 py-2 rounded-lg bg-secondary text-xs font-medium"
                >
                  Close
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary/15 text-primary text-xs font-semibold border border-primary/30">
                  Share on X
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ═══ SECTION D: ACTIVITY FEED ═══ */}
      <motion.section
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-display font-semibold text-muted-foreground">Live Activity</h3>
        </div>
        <div className="space-y-2">
          {activityFeed.map((msg, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-streak flex-shrink-0 animate-pulse" />
              <p className="text-xs text-muted-foreground">{msg}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Hub;
