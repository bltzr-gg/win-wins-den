import { useState } from "react";
import {
  Wallet, ChevronRight, Flame, Trophy, Star, Gift, Target,
  Copy, Check, Lock, Zap, ArrowRight, Crown, Shield, Swords,
  Box, Sparkles, Users, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── 1. CAMPAIGN BANNER ─── */
function CampaignBanner() {
  const [walletState] = useState<"disconnected" | "eligible" | "claimed">("disconnected");

  return (
    <section className="card-surface card-glow-red metallic-sheen edge-highlight p-6 lg:p-8">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">
                Limited Time
              </span>
            </div>
            <h2 className="font-display text-2xl lg:text-3xl">
              SWITCH BONUS<span className="text-primary"> IS LIVE</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Connect your wallet to reveal your eligible bonus from Stake, Rollbit, or Shuffle.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm glow-crimson hover:brightness-110 transition-all flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                {walletState === "disconnected" ? "Check Eligibility" : walletState === "eligible" ? "Claim Bonus" : "Claimed ✅"}
              </button>
              <Link to="/switch" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                How It Works <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border">
              <p className="text-[10px] text-muted-foreground mb-1">Rewards up to</p>
              <p className="font-display text-2xl text-gold">$500</p>
              <p className="text-[10px] text-muted-foreground">Free Play</p>
            </div>
            <div className="space-y-2">
              <div className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-center">
                <p className="font-display text-sm text-foreground">5,000</p>
                <p className="text-[10px] text-muted-foreground">REAL Points</p>
              </div>
              <div className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-center">
                <p className="font-display text-sm text-foreground">+1</p>
                <p className="text-[10px] text-muted-foreground">Reward Chest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. PLAYER STATUS CARD ─── */
function PlayerStatusCard() {
  return (
    <section className="card-surface card-glow-red metallic-sheen edge-highlight p-6 lg:p-8">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: player info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold">
                D
              </div>
              <div>
                <h2 className="font-display text-xl">DEGEN_WHALE</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">
                    Gold
                  </span>
                  <span className="text-xs text-muted-foreground">Season 1</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-xs text-multiplier flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    4-Day Streak
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 glow-multiplier">
                      (1.3x)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">REAL Points</p>
                <p className="font-display text-3xl text-foreground">12,450</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Rank</p>
                <p className="font-display text-3xl text-gold">#42</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Season Ends</p>
                <p className="font-display text-3xl text-muted-foreground">23d</p>
              </div>
            </div>
          </div>

          {/* Right: progress + CTA */}
          <div className="space-y-3 lg:text-right">
            <p className="text-xs text-muted-foreground">+300 pts to pass #41</p>
            <p className="text-[10px] text-muted-foreground">Top 100 cutoff: 10,200</p>
            <div className="flex items-center gap-2 text-xs text-gold">
              <Crown className="w-3 h-3" />
              <span>NFT Multiplier active</span>
              <span className="px-1.5 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 font-semibold">1.1x</span>
            </div>
            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm glow-crimson hover:brightness-110 transition-all mt-2"
            >
              Climb Leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. BADGE STRIP ─── */
const badges = [
  { name: "First Blood", emoji: "⚔️", rarity: "Common", earned: true },
  { name: "Slots Master", emoji: "🎰", rarity: "Epic", earned: true },
  { name: "High Roller", emoji: "💎", rarity: "Legendary", earned: true },
  { name: "Lucky 7", emoji: "🍀", rarity: "Rare", earned: true },
  { name: "Streak King", emoji: "🔥", rarity: "Epic", earned: true },
  { name: "Diamond Hands", emoji: "💠", rarity: "Legendary", earned: false },
];

const rarityGlow: Record<string, string> = {
  Common: "border-common/30",
  Rare: "border-rare/40 glow-rare",
  Epic: "border-epic/40 glow-epic",
  Legendary: "border-gold/40 glow-gold",
};

function BadgeStrip() {
  return (
    <section className="card-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h3 className="font-display text-sm tracking-wider">🧿 ORIGINALS COLLECTION</h3>
          <p className="text-[10px] text-muted-foreground">12 / 80 collected</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-rare/10 text-rare border border-rare/20 font-semibold">
            Competitor
          </span>
          <Link to="/badges" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View Collection <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {badges.map((b) => (
          <div
            key={b.name}
            className={`flex-shrink-0 w-24 p-3 rounded-xl border bg-secondary/30 text-center space-y-1.5 transition-all hover:-translate-y-0.5 ${
              b.earned ? rarityGlow[b.rarity] : "border-border opacity-40"
            }`}
          >
            <div className="text-2xl">{b.emoji}</div>
            <p className="text-[10px] font-semibold truncate">{b.name}</p>
            <p className={`text-[9px] ${b.rarity === "Legendary" ? "text-gold" : b.rarity === "Epic" ? "text-epic" : b.rarity === "Rare" ? "text-rare" : "text-common"}`}>
              {b.rarity}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 4. CORE LOOP ROW ─── */
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
      {/* Daily Mystery Box */}
      <div className="card-surface card-glow-red metallic-sheen edge-highlight p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">DAILY MYSTERY BOX</h3>
          <Gift className="w-4 h-4 text-primary" />
        </div>
        <p className="text-[10px] text-muted-foreground">1 free box available</p>
        <div className="flex items-center gap-1.5">
          {streakDays.map((d) => (
            <div
              key={d}
              className={`flex-1 h-2 rounded-full ${
                d <= currentDay ? "bg-primary" : "bg-secondary"
              }`}
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
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <Box className="w-4 h-4" />
          Open Daily Box
        </button>
      </div>

      {/* Reward Chest */}
      <div className="card-surface metallic-sheen edge-highlight p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">REWARD CHEST</h3>
          <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <p className="text-[10px] text-muted-foreground">
          Cost: 200–300 REAL Points<br />
          You can open 4 chests now
        </p>
        <div className="flex gap-2 justify-center py-2">
          {["🎟️", "💰", "🔥", "💎"].map((e, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-lg">
              {e}
            </div>
          ))}
        </div>
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-gold/20 to-gold-shine/10 text-gold border border-gold/20 font-display text-sm glow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <Box className="w-4 h-4" />
          Open a Chest
        </button>
        <p className="text-center text-[10px] text-muted-foreground">
          View Rewards →
        </p>
      </div>

      {/* Your Path */}
      <div className="card-surface metallic-sheen edge-highlight p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm tracking-wider">YOUR PATH</h3>
          <Target className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                step.done
                  ? "bg-primary/20 text-primary"
                  : step.current
                  ? "bg-primary/10 text-primary border border-primary/30 animate-glow-pulse"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {step.done ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-medium ${step.done ? "text-muted-foreground line-through" : step.current ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground">{step.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 5. TASKS PREVIEW ─── */
const previewTasks = [
  { title: "Follow @RealBet on X", reward: 50, progress: 100, done: true },
  { title: "Place 3 Sports Bets", reward: 150, progress: 66, done: false },
  { title: "Join Discord Server", reward: 75, progress: 0, done: false },
  { title: "Refer a Friend", reward: 200, progress: 0, done: false },
];

function TasksPreview() {
  return (
    <section className="card-surface metallic-sheen p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider">🎯 TODAY'S TASKS</h3>
        <Link to="/tasks" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View All Tasks <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {previewTasks.map((t) => (
          <div key={t.title} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              t.done ? "bg-multiplier/20 text-multiplier" : "bg-secondary text-muted-foreground"
            }`}>
              {t.done ? <Check className="w-3 h-3" /> : <Target className="w-3 h-3" />}
            </div>
            <p className={`flex-1 text-xs ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {t.title}
            </p>
            <span className="text-[10px] text-gold font-semibold">+{t.reward}</span>
            {!t.done && (
              <button className="px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20 hover:bg-primary/20 transition-colors">
                Go
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 6. LEADERBOARD PREVIEW ─── */
const topPlayers = [
  { rank: 1, name: "cryptoking_99", points: "89,240", tier: "Diamond" },
  { rank: 2, name: "moon_degen", points: "76,100", tier: "Diamond" },
  { rank: 3, name: "whale_hunter", points: "61,500", tier: "Platinum" },
];

function LeaderboardPreview() {
  return (
    <section className="card-surface metallic-sheen p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gold" /> LEADERBOARD
        </h3>
        <Link to="/leaderboard" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View Full Leaderboard <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 pt-4">
        {[topPlayers[1], topPlayers[0], topPlayers[2]].map((p, i) => {
          const heights = ["h-20", "h-28", "h-16"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <div key={p.rank} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{medals[i]}</span>
              <p className="text-[10px] text-muted-foreground truncate max-w-[80px]">{p.name}</p>
              <div className={`w-20 ${heights[i]} rounded-t-lg bg-gradient-to-t from-secondary to-secondary/50 border border-border border-b-0 flex items-center justify-center`}>
                <span className="text-xs font-display text-gold">{p.points}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Your rank */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <span className="font-display text-sm text-primary">#42</span>
        <div className="flex-1">
          <p className="text-xs font-semibold">YOU — degen_whale</p>
          <p className="text-[10px] text-muted-foreground">+300 pts to pass #41</p>
        </div>
        <span className="font-display text-sm text-foreground">12,450</span>
      </div>
    </section>
  );
}

/* ─── 7. REFERRALS MINI CARD ─── */
function ReferralsMini() {
  const [copied, setCopied] = useState(false);
  const code = "DEGEN-WHALE-42";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://realbet.io/ref/${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="card-surface metallic-sheen p-5 space-y-4">
      <h3 className="font-display text-sm tracking-wider">Invite & Earn</h3>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 rounded-lg bg-secondary text-xs text-foreground font-mono border border-border">
          {code}
        </code>
        <button onClick={handleCopy} className="p-2 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors">
          {copied ? <Check className="w-4 h-4 text-multiplier" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-secondary/50 border border-border">
          <p className="font-display text-sm">8</p>
          <p className="text-[9px] text-muted-foreground">Joined</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50 border border-border">
          <p className="font-display text-sm">5</p>
          <p className="text-[9px] text-muted-foreground">Qualified</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50 border border-border">
          <p className="font-display text-sm">3</p>
          <p className="text-[9px] text-muted-foreground">Chests</p>
        </div>
      </div>
      <Link to="/referrals" className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
        View Referrals
      </Link>
    </section>
  );
}

/* ─── DASHBOARD PAGE ─── */
export default function Dashboard() {
  return (
    <div className="space-y-5">
      <CampaignBanner />
      <PlayerStatusCard />
      <BadgeStrip />
      <CoreLoopRow />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TasksPreview />
        <LeaderboardPreview />
      </div>
      <ReferralsMini />
    </div>
  );
}
