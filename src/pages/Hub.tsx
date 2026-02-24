import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, ChevronRight, Trophy, Award, Gift, Zap, Timer, Crown,
  Check, Lock, Copy, Share2, Users, Shield, ArrowRight, Sparkles,
  Star, ChevronDown, Gem, TrendingUp, Wallet, Link as LinkIcon,
  Target, UserPlus, Unlock
} from "lucide-react";

const STREAK_DAYS = 7;

/* ── Path Steps ── */
const pathSteps = [
  { id: 1, title: "Connect Wallet", desc: "Link your Web3 wallet to begin", reward: 100, icon: Wallet, done: true },
  { id: 2, title: "Link RealBet Account", desc: "Connect your casino account", reward: 200, icon: LinkIcon, done: true },
  { id: 3, title: "Place 3 Bets", desc: "Wager on any game to qualify", reward: 300, icon: Target, done: false, progress: { current: 1, total: 3 } },
  { id: 4, title: "Invite 1 Friend", desc: "Share your code, earn together", reward: 500, icon: UserPlus, done: false },
  { id: 5, title: "Unlock Multiplier", desc: "Activate your season multiplier", reward: 1000, icon: Unlock, done: false },
];

/* ── Leaderboard top 5 ── */
const leaderboardTop = [
  { rank: 1, name: "CryptoKing", points: 98500, tier: "Diamond" },
  { rank: 2, name: "0xWhale", points: 87200, tier: "Diamond" },
  { rank: 3, name: "DegenerateApe", points: 76300, tier: "Platinum" },
];

/* ── Badges sample ── */
const sampleBadges = [
  { name: "First Bet", rarity: "Common", earned: true },
  { name: "Lucky 7", rarity: "Rare", earned: true },
  { name: "High Roller", rarity: "Epic", earned: true },
  { name: "OG Player", rarity: "Legendary", earned: true },
  { name: "Streak Lord", rarity: "Epic", earned: false },
  { name: "Whale Alert", rarity: "Legendary", earned: false },
];

const rarityColor: Record<string, string> = {
  Common: "text-muted-foreground border-muted-foreground/30",
  Rare: "text-rare border-rare/40",
  Epic: "text-epic border-epic/40",
  Legendary: "text-accent border-accent/40",
};

const rarityBg: Record<string, string> = {
  Common: "from-muted-foreground/10",
  Rare: "from-rare/15",
  Epic: "from-epic/15",
  Legendary: "from-accent/15",
};

const Hub = () => {
  const [streakDay, setStreakDay] = useState(4);
  const [boxOpened, setBoxOpened] = useState(false);
  const [boxReward, setBoxReward] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(3);
  const [copied, setCopied] = useState(false);
  const points = 12450;
  const rank = 42;
  const code = "REALBET-VIP42";

  const handleOpenBox = () => {
    if (!boxOpened) {
      setBoxOpened(true);
      const rewards = [25, 50, 75, 100, 250, 500];
      setBoxReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = pathSteps.find((s) => !s.done);
  const completedSteps = pathSteps.filter((s) => s.done).length;

  return (
    <div className="space-y-8 pb-12">
      {/* ════════════════ SECTION 1: HERO STATUS ════════════════ */}
      <motion.section
        className="glass-card p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-primary">
              Season 1 is Live
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Player card left */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 flex items-center justify-center animate-pulse-glow">
                <span className="text-3xl font-display font-bold text-primary">R</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">RealBettor</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold border border-accent/30">
                    Gold Tier
                  </span>
                  <span className="text-xs text-muted-foreground">Rank #{rank}</span>
                </div>
              </div>
            </div>

            {/* Points center */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">REAL Points</p>
              <p className="text-5xl font-display font-bold text-gradient-accent">
                {points.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">≈ ${(points / 20).toFixed(0)} value</p>
            </div>

            {/* Season info right */}
            <div className="space-y-3 text-right">
              <div className="flex items-center gap-2 justify-end">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">23 days remaining</span>
              </div>
              <p className="text-xs text-muted-foreground">Top 100 cutoff: #100</p>
              {/* Progress to next rank */}
              <div>
                <p className="text-xs text-accent font-semibold mb-1">300 pts to pass #41</p>
                <div className="w-48 h-2 rounded-full bg-muted ml-auto">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            className="mt-6 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center gap-2 glow-primary hover:brightness-110 transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-4 h-4" /> Climb Leaderboard
          </motion.button>
        </div>
      </motion.section>

      {/* ════════════════ SECTION 2: DAILY DROP ════════════════ */}
      <motion.section
        className="glass-card p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute top-0 left-0 w-48 h-48 bg-streak/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🎲</span>
            <h2 className="font-display font-bold text-lg">Daily Drop</h2>
            <div className="ml-auto flex items-center gap-2">
              <Flame className="w-4 h-4 text-streak" />
              <span className="font-display font-semibold text-sm text-streak">{streakDay}-Day Streak</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-streak/15 text-streak font-semibold border border-streak/30 glow-green">
                {streakDay >= 7 ? "1.5x" : `${(1 + streakDay * 0.07).toFixed(1)}x`} multiplier
              </span>
            </div>
          </div>

          {/* Streak progress */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: STREAK_DAYS }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className={`w-full h-3 rounded-full ${
                    i < streakDay
                      ? "bg-gradient-to-r from-streak to-accent"
                      : i === streakDay
                      ? "bg-muted border border-streak/40"
                      : "bg-muted"
                  }`}
                  initial={i === streakDay - 1 ? { scale: 0 } : {}}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                />
                <span className="text-[10px] text-muted-foreground">D{i + 1}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div className="h-3 px-3 rounded-full bg-accent/20 border border-accent/30 flex items-center">
                <span className="text-[9px] font-bold text-accent">14d</span>
              </div>
              <span className="text-[10px] text-accent">2x</span>
            </div>
          </div>

          {/* Mystery Box */}
          <AnimatePresence mode="wait">
            {!boxOpened ? (
              <motion.button
                key="box-closed"
                onClick={handleOpenBox}
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 border border-primary/30 font-display font-bold text-lg flex items-center justify-center gap-3 hover:brightness-125 transition-all group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Gift className="w-6 h-6 text-primary group-hover:animate-bounce" />
                <span className="text-gradient-primary">TAP TO OPEN MYSTERY BOX</span>
              </motion.button>
            ) : (
              <motion.div
                key="box-opened"
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-accent/15 to-primary/10 border border-accent/30 flex items-center justify-center gap-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <Sparkles className="w-6 h-6 text-accent" />
                </motion.div>
                <span className="font-display font-bold text-2xl text-gradient-accent">
                  +{boxReward} REAL Points!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ════════════════ SECTION 3: YOUR PATH ════════════════ */}
      <motion.section
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🛤</span>
          <h2 className="font-display font-bold text-lg">Your Path to Airdrop</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {nextStep ? (
            <span>You are <span className="text-primary font-semibold">1 action</span> away from your next reward</span>
          ) : (
            <span className="text-streak">All steps completed!</span>
          )}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-muted mb-8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-streak to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(completedSteps / pathSteps.length) * 100}%` }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </div>

        <div className="space-y-3">
          {pathSteps.map((step, i) => (
            <motion.div
              key={step.id}
              className={`glass-card p-4 cursor-pointer transition-all ${
                step.done ? "border-streak/20 opacity-70" : expandedStep === step.id ? "border-primary/30" : ""
              }`}
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: step.done ? 0.7 : 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  step.done
                    ? "bg-streak/15 border border-streak/30"
                    : "bg-secondary border border-border"
                }`}>
                  {step.done ? (
                    <Check className="w-5 h-5 text-streak" />
                  ) : (
                    <step.icon className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${step.done ? "line-through text-muted-foreground" : ""}`}>
                    Step {step.id} — {step.title}
                  </p>
                  {expandedStep === step.id && !step.done && (
                    <motion.p
                      className="text-xs text-muted-foreground mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {step.desc}
                    </motion.p>
                  )}
                  {step.progress && !step.done && (
                    <div className="mt-2 w-40">
                      <div className="w-full h-1.5 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(step.progress.current / step.progress.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {step.progress.current}/{step.progress.total}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-bold text-accent">+{step.reward}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedStep === step.id ? "rotate-180" : ""
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ════════════════ SECTION 4: LEADERBOARD PREVIEW ════════════════ */}
      <motion.section
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent" /> Leaderboard
          </h2>
          <a href="/leaderboard" className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View Full Leaderboard <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-6">
          {[1, 0, 2].map((idx, vi) => {
            const p = leaderboardTop[idx];
            const heights = ["h-24", "h-32", "h-20"];
            const medals = ["🥈", "🥇", "🥉"];
            return (
              <motion.div
                key={p.rank}
                className="flex-1 max-w-[180px] flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + vi * 0.1 }}
              >
                <span className="text-2xl mb-2">{medals[vi]}</span>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 border-2 border-accent/30 flex items-center justify-center mb-2 glow-gold">
                  <span className="font-display font-bold">{p.name[0]}</span>
                </div>
                <p className="text-sm font-semibold truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.points.toLocaleString()} pts</p>
                <div className={`w-full ${heights[vi]} mt-2 rounded-t-xl bg-gradient-to-t from-accent/10 to-accent/5 border border-b-0 border-accent/20`} />
              </motion.div>
            );
          })}
        </div>

        {/* Your rank */}
        <div className="glass-card p-4 flex items-center gap-4 border-primary/20 glow-primary-sm">
          <span className="text-lg font-display font-bold text-primary">#{rank}</span>
          <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <span className="font-bold text-primary text-sm">R</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">RealBettor <span className="text-primary text-xs">(You)</span></p>
            <p className="text-xs text-muted-foreground">{points.toLocaleString()} pts</p>
          </div>
          <p className="text-sm text-accent font-display font-semibold">+300 pts to pass #41</p>
        </div>
      </motion.section>

      {/* ════════════════ SECTION 5: BADGE COLLECTION ════════════════ */}
      <motion.section
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <span className="text-xl">🧿</span> Originals Collection
          </h2>
          <a href="/badges" className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          <span className="text-primary font-semibold">12</span> / 30 collected
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {sampleBadges.map((badge, i) => (
            <motion.div
              key={badge.name}
              className={`glass-card p-3 flex flex-col items-center text-center gap-2 ${
                !badge.earned ? "opacity-40" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: badge.earned ? 1 : 0.4, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={badge.earned ? { y: -4, scale: 1.02 } : {}}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${rarityBg[badge.rarity]} to-transparent border ${rarityColor[badge.rarity].split(" ")[1]} flex items-center justify-center`}>
                {badge.earned ? (
                  <Star className={`w-6 h-6 ${rarityColor[badge.rarity].split(" ")[0]}`} />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground/50" />
                )}
              </div>
              <p className="text-[11px] font-display font-semibold">{badge.name}</p>
              <span className={`text-[9px] font-semibold ${rarityColor[badge.rarity].split(" ")[0]}`}>
                {badge.rarity}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ════════════════ SECTIONS 6 & 7: REFERRALS + SWITCH ════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referrals */}
        <motion.section
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Referrals
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Your Invite Code</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-12 rounded-xl bg-secondary border border-border px-4 flex items-center">
                  <span className="font-display font-bold tracking-[0.12em] text-gradient-primary text-lg">
                    {code}
                  </span>
                </div>
                <motion.button
                  onClick={handleCopy}
                  className="h-12 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:brightness-110 transition-all"
                  whileTap={{ scale: 0.97 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Friends Joined", value: "7" },
                { label: "Points Earned", value: "3,500" },
                { label: "Active", value: "5" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-3 text-center">
                  <p className="text-lg font-display font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {["Twitter/X", "Telegram", "Share"].map((platform) => (
                <button
                  key={platform}
                  className="flex-1 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> {platform}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground italic text-center">
              Each active friend boosts your multiplier.
            </p>
          </div>
        </motion.section>

        {/* Switch Bonus */}
        <motion.section
          className="glass-card p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-xl">⚔</span> Switch Bonus
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              See what you're eligible for before creating an account.
            </p>

            <div className="glass-card p-6 text-center mb-6 border-accent/20">
              <p className="text-xs text-muted-foreground mb-1">Potential Reward</p>
              <p className="text-3xl font-display font-bold text-gradient-accent">Up to 5,000</p>
              <p className="text-xs text-muted-foreground">REAL Points</p>
            </div>

            <motion.button
              className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-accent hover:brightness-110 transition-all"
              whileTap={{ scale: 0.98 }}
            >
              <Shield className="w-4 h-4" /> Check Eligibility
            </motion.button>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["Stake", "Rollbit", "BC.Game", "Roobet"].map((p) => (
                <span key={p} className="px-3 py-1 rounded-full bg-secondary text-[10px] text-secondary-foreground">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Hub;
