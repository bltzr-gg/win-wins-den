import { useState, useEffect } from "react";
import {
  Wallet, ChevronRight, Flame, Trophy, Star, Gift, Target,
  Copy, Check, Lock, Zap, ArrowRight, Crown, Shield,
  Box, Sparkles, Users, ExternalLink, TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

/* ═══════════════════════════════════════════════
   1. CAMPAIGN BANNER — Full Width Hero
   ═══════════════════════════════════════════════ */
function CampaignBanner() {
  const [walletState, setWalletState] = useState<"disconnected" | "eligible" | "claimed">("disconnected");

  return (
    <motion.section
      className="card-surface card-glow-red edge-highlight relative overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}
          <div className="space-y-3 max-w-lg">
            <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/12 text-primary border border-primary/20 uppercase tracking-wider">
              Limited Time
            </span>
            <h2 className="font-display text-2xl lg:text-3xl leading-tight">
              Switch Bonus<span className="text-primary"> Is Live</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect your wallet to reveal your eligible bonus from Stake, Rollbit, or Shuffle.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <motion.button
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  walletState === "disconnected"
                    ? "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground glow-crimson hover:brightness-110"
                    : walletState === "eligible"
                    ? "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground glow-crimson hover:brightness-110"
                    : "bg-multiplier/15 text-multiplier border border-multiplier/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={walletState === "disconnected" ? { boxShadow: ["0 0 15px hsl(0 84% 40% / 0.15)", "0 0 25px hsl(0 84% 40% / 0.3)", "0 0 15px hsl(0 84% 40% / 0.15)"] } : {}}
                transition={walletState === "disconnected" ? { duration: 2, repeat: Infinity } : {}}
                onClick={() => setWalletState(walletState === "disconnected" ? "eligible" : "claimed")}
              >
                <Wallet className="w-4 h-4" />
                {walletState === "disconnected" && "Check Eligibility"}
                {walletState === "eligible" && "Claim Bonus"}
                {walletState === "claimed" && <><Check className="w-4 h-4" /> Claimed</>}
              </motion.button>
              <Link to="/switch" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                How It Works <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right — Reward Preview */}
          <div className="flex items-center gap-3">
            <div className="text-center p-5 rounded-xl bg-secondary/40 border border-border">
              <p className="text-[10px] text-muted-foreground mb-1.5">Rewards up to</p>
              <p className="font-display text-3xl text-gradient-gold">$500</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Free Play</p>
            </div>
            <div className="space-y-2.5">
              <div className="px-4 py-2.5 rounded-lg bg-secondary/40 border border-border text-center">
                <p className="font-display text-base">5,000</p>
                <p className="text-[9px] text-muted-foreground">REAL Points</p>
              </div>
              <div className="px-4 py-2.5 rounded-lg bg-secondary/40 border border-border text-center">
                <p className="font-display text-base">+1</p>
                <p className="text-[9px] text-muted-foreground">Reward Chest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   2. PLAYER STATUS CARD (8 cols)
   ═══════════════════════════════════════════════ */
function PlayerStatusCard() {
  const pointsToNext = 300;
  const progressPct = 72;

  return (
    <motion.div
      className="card-surface card-glow-red metallic-sheen edge-highlight p-6 lg:p-7 h-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between gap-5">
        {/* Player identity */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary border border-primary/20 flex items-center justify-center text-lg font-bold">
              D
            </div>
            <div>
              <h2 className="font-display text-xl tracking-wide">DEGEN_WHALE</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gold/12 text-gold border border-gold/20">
                  Gold
                </span>
                <span className="text-[10px] text-muted-foreground">Season 1</span>
                <span className="text-muted-foreground/30">|</span>
                <span className="text-[10px] text-multiplier flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 4-Day Streak
                  <span className="px-1.5 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 text-[9px] font-semibold glow-multiplier">
                    1.3x
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gold">
            <Crown className="w-3.5 h-3.5" />
            <span>NFT 1.1x</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-end gap-8">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">REAL Points</p>
            <p className="font-display text-4xl text-foreground leading-none">
              <AnimatedNumber value={12450} />
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rank</p>
            <p className="font-display text-4xl text-gold leading-none">#42</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Season Ends</p>
            <p className="font-display text-4xl text-muted-foreground leading-none">23d</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">+{pointsToNext} pts to pass #41</span>
            <span className="text-muted-foreground">Top 100 cutoff: 10,200</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/leaderboard"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm glow-crimson hover:brightness-110 transition-all"
        >
          Climb Leaderboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   2b. REFERRAL POWER CARD (4 cols)
   ═══════════════════════════════════════════════ */
function ReferralPowerCard() {
  const [copied, setCopied] = useState(false);
  const code = "DEGEN-WHALE-42";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://realbet.io/ref/${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="card-surface metallic-sheen edge-highlight p-6 lg:p-7 h-full border-gold/10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gold" />
          <h3 className="font-display text-sm tracking-wider">Invite & Earn</h3>
        </div>

        {/* Code */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2.5 rounded-lg bg-secondary text-sm text-gold font-mono border border-gold/15 truncate text-center font-semibold tracking-wider">
              {code}
            </code>
            <motion.button
              onClick={handleCopy}
              className="p-2.5 rounded-lg bg-secondary border border-gold/15 hover:border-gold/30 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="w-4 h-4 text-multiplier" />
                  </motion.div>
                ) : (
                  <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy className="w-4 h-4 text-gold" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Joined", value: "8" },
            { label: "Qualified", value: "5" },
            { label: "Chests", value: "3" },
          ].map((s) => (
            <div key={s.label} className="text-center p-2 rounded-lg bg-secondary/40 border border-border">
              <p className="font-display text-base text-gold"><AnimatedNumber value={parseInt(s.value)} duration={800} /></p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground text-center">
          You've earned <span className="text-gold font-semibold">3 chests</span> from referrals.
        </p>

        <Link
          to="/referrals"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold/10 text-gold border border-gold/20 font-semibold text-sm hover:bg-gold/15 transition-all"
        >
          View Referrals <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   3. BADGES STRIP
   ═══════════════════════════════════════════════ */
const badges = [
  { name: "First Blood", emoji: "⚔️", rarity: "Common", earned: true, desc: "Place your first wager" },
  { name: "Slots Master", emoji: "🎰", rarity: "Epic", earned: true, desc: "Play 100 slots rounds" },
  { name: "High Roller", emoji: "💎", rarity: "Legendary", earned: true, desc: "Wager 10k+ points" },
  { name: "Lucky 7", emoji: "🍀", rarity: "Rare", earned: true, desc: "Win 7 bets in a row" },
  { name: "Streak King", emoji: "🔥", rarity: "Epic", earned: true, desc: "30-day streak" },
  { name: "Diamond Hands", emoji: "💠", rarity: "Legendary", earned: false, desc: "Hold 50k points" },
  { name: "Chest Hunter", emoji: "🎁", rarity: "Rare", earned: false, desc: "Open 25 chests" },
  { name: "OG Player", emoji: "👑", rarity: "Legendary", earned: true, desc: "Season 1 member" },
];

const rarityBorder: Record<string, string> = {
  Common: "border-common/25",
  Rare: "border-rare/35",
  Epic: "border-epic/35",
  Legendary: "border-gold/35",
};

const rarityGlowClass: Record<string, string> = {
  Common: "",
  Rare: "hover:glow-rare",
  Epic: "hover:glow-epic",
  Legendary: "hover:glow-gold",
};

function BadgeStrip() {
  return (
    <motion.section
      className="card-surface p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-sm tracking-wider">Originals Collection</h3>
          <span className="text-[10px] text-muted-foreground">12 / 80 collected</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rare/10 text-rare border border-rare/20 font-semibold">
            Competitor
          </span>
        </div>
        <Link to="/badges" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View Collection <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {badges.map((b, i) => (
          <motion.div
            key={b.name}
            className={`group relative flex-shrink-0 w-[100px] p-3 rounded-xl border bg-secondary/20 text-center space-y-1.5 transition-all duration-200 hover:-translate-y-1 cursor-default ${
              b.earned ? rarityBorder[b.rarity] : "border-border/40 opacity-35"
            } ${b.earned ? rarityGlowClass[b.rarity] : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: b.earned ? 1 : 0.35, y: 0 }}
            transition={{ delay: 0.25 + i * 0.03 }}
          >
            <div className="text-2xl">{b.emoji}</div>
            <p className="text-[10px] font-semibold truncate">{b.name}</p>
            <p className={`text-[9px] ${
              b.rarity === "Legendary" ? "text-gold" : b.rarity === "Epic" ? "text-epic" : b.rarity === "Rare" ? "text-rare" : "text-common"
            }`}>
              {b.rarity}
            </p>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-card border border-border text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
              {b.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   4. CORE LOOP ROW (3 equal cards)
   ═══════════════════════════════════════════════ */
function CoreLoopRow() {
  const streakDays = [1, 2, 3, 4, 5, 6, 7];
  const currentDay = 4;

  const steps = [
    { label: "Enter Code", done: true, reward: "+50 pts" },
    { label: "Connect Wallet", done: true, reward: "+100 pts" },
    { label: "Link Account", done: false, current: true, reward: "+200 pts" },
    { label: "Place First Bet", done: false, reward: "+500 pts" },
    { label: "Open Chest", done: false, reward: "+1 Chest" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* A) Daily Mystery Box */}
      <motion.div
        className="card-surface card-glow-red metallic-sheen edge-highlight p-5 flex flex-col justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">Daily Mystery Box</h3>
          <Gift className="w-4 h-4 text-primary" />
        </div>
        <p className="text-[10px] text-muted-foreground">1 free box available</p>
        <div className="flex items-center gap-1.5">
          {streakDays.map((d) => (
            <motion.div
              key={d}
              className={`flex-1 h-2.5 rounded-full ${d <= currentDay ? "bg-primary" : "bg-secondary"}`}
              initial={d === currentDay ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + d * 0.05 }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground flex items-center gap-1">
            <Flame className="w-3 h-3 text-multiplier" /> D{currentDay}/D7
          </span>
          <span className="px-2 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 font-semibold glow-multiplier">
            1.3x
          </span>
        </div>
        <motion.button
          className="w-full py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Box className="w-4 h-4" />
          Open Daily Box
        </motion.button>
      </motion.div>

      {/* B) Reward Chest */}
      <motion.div
        className="card-surface metallic-sheen edge-highlight p-5 flex flex-col justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">Reward Chest</h3>
          <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground">Cost: 200–300 REAL Points</p>
          <p className="text-[10px] text-muted-foreground">You can open <span className="text-gold font-semibold">4 chests</span> now</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["🎟️", "💰", "🔥", "💎"].map((e, i) => (
              <div key={i} className="w-9 h-9 rounded-lg bg-secondary/40 border border-border flex items-center justify-center text-base">
                {e}
              </div>
            ))}
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
            Limited Stock
          </span>
        </div>
        <motion.button
          className="w-full py-3 rounded-lg bg-gold/10 text-gold border border-gold/20 font-display text-sm glow-gold hover:bg-gold/15 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Box className="w-4 h-4" />
          Open a Chest
        </motion.button>
      </motion.div>

      {/* C) Your Path */}
      <motion.div
        className="card-surface metallic-sheen edge-highlight p-5 flex flex-col justify-between gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">Your Path</h3>
          <Target className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-1.5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                step.done
                  ? "bg-multiplier/15 text-multiplier border border-multiplier/25"
                  : step.current
                  ? "bg-primary/10 text-primary border border-primary/30 animate-glow-pulse"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}>
                {step.done ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <p className={`flex-1 text-xs ${step.done ? "text-muted-foreground line-through" : step.current ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {step.label}
              </p>
              <span className="text-[10px] text-muted-foreground">{step.reward}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. TODAY'S TASKS (4-card grid)
   ═══════════════════════════════════════════════ */
const previewTasks = [
  { title: "Place 3 Sports Bets", reward: 150, progress: 66, current: "2/3" },
  { title: "Try a RealBet Original", reward: 100, progress: 0, current: "0/1" },
  { title: "Share a bet slip on X", reward: 75, progress: 0, current: "0/1" },
  { title: "Refer a Friend", reward: 200, progress: 0, current: "0/1" },
];

function TasksPreview() {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider">Today's Tasks</h3>
        <Link to="/tasks" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View All Tasks <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {previewTasks.map((t, i) => (
          <motion.div
            key={t.title}
            className="card-surface p-4 space-y-3 hover:border-primary/15 transition-all"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            <p className="text-xs font-medium leading-snug min-h-[32px]">{t.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gold font-semibold">+{t.reward}</span>
              <span className="text-[10px] text-muted-foreground">{t.current}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${t.progress}%` }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
              />
            </div>
            <button className="w-full py-1.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold border border-primary/15 hover:bg-primary/15 transition-colors">
              Go
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   6. LEADERBOARD PREVIEW
   ═══════════════════════════════════════════════ */
const topPlayers = [
  { rank: 1, name: "cryptoking_99", points: "89,240" },
  { rank: 2, name: "moon_degen", points: "76,100" },
  { rank: 3, name: "whale_hunter", points: "61,500" },
];

function LeaderboardPreview() {
  return (
    <motion.section
      className="card-surface metallic-sheen p-5 space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gold" /> Leaderboard
        </h3>
        <Link to="/leaderboard" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View Full Leaderboard <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 pt-2 pb-1">
        {[topPlayers[1], topPlayers[0], topPlayers[2]].map((p, i) => {
          const heights = ["h-16", "h-24", "h-12"];
          const medals = ["🥈", "🥇", "🥉"];
          const glows = ["", "glow-gold", ""];
          return (
            <div key={p.rank} className="flex flex-col items-center gap-1.5 flex-1 max-w-[140px]">
              <span className="text-xl">{medals[i]}</span>
              <p className="text-[10px] text-muted-foreground truncate max-w-full">{p.name}</p>
              <div className={`w-full ${heights[i]} rounded-t-lg bg-gradient-to-t from-secondary to-secondary/30 border border-border border-b-0 flex items-center justify-center ${glows[i]}`}>
                <span className="text-[10px] font-display text-gold">{p.points}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Your rank */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/15">
        <span className="font-display text-sm text-primary">#42</span>
        <div className="flex-1">
          <p className="text-xs font-semibold">YOU — degen_whale</p>
          <p className="text-[10px] text-muted-foreground">You are <span className="text-gold font-semibold">2,400 pts</span> away from Top 25.</p>
        </div>
        <span className="font-display text-sm text-foreground">12,450</span>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   DASHBOARD PAGE — ASSEMBLED
   ═══════════════════════════════════════════════ */
export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* 1. Campaign Banner */}
      <CampaignBanner />

      {/* 2. Top Power Row: 8-col Status + 4-col Referral */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <PlayerStatusCard />
        </div>
        <div className="lg:col-span-4">
          <ReferralPowerCard />
        </div>
      </div>

      {/* 3. Badges Strip */}
      <BadgeStrip />

      {/* 4. Core Loop Row */}
      <CoreLoopRow />

      {/* 5. Today's Tasks */}
      <TasksPreview />

      {/* 6. Leaderboard Preview */}
      <LeaderboardPreview />
    </div>
  );
}
