import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Wallet,
  ChevronRight,
  Flame,
  Trophy,
  Star,
  Gift,
  Target,
  Copy,
  Check,
  Lock,
  Zap,
  ArrowRight,
  Crown,
  Shield,
  Box,
  Sparkles,
  Users,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  X,
  Swords,
  HelpCircle,
  BarChart3,
  DollarSign,
  Rocket,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import switchBonusBg from "@/assets/switch-bonus-bg.jpg";
import platformStake from "@/assets/platforms/stake.png";
import platformRollbit from "@/assets/platforms/rollbit.png";
import platformShuffle from "@/assets/platforms/shuffle.png";

import badgeFirstBlood from "@/assets/badges/first-blood.png";
import badgeSlotsMaster from "@/assets/badges/slots-master.png";
import badgeHighRoller from "@/assets/badges/high-roller.png";
import badgeLucky7 from "@/assets/badges/lucky-7.png";
import badgeStreakKing from "@/assets/badges/streak-king.png";
import badgeDiamondHands from "@/assets/badges/diamond-hands.png";
import badgeChestHunter from "@/assets/badges/chest-hunter.png";
import badgeOgPlayer from "@/assets/badges/og-player.png";

import bronzeBoxImg from "@/assets/boxes/bronze-box.png";
import silverBoxImg from "@/assets/boxes/silver-box.png";
import goldBoxImg from "@/assets/boxes/gold-box.png";
import legendaryBoxImg from "@/assets/boxes/legendary-box.png";

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

/* ─── Mock user state ─── */
const userState = {
  points: 12450,
  rank: 42,
  walletLinked: true,
  accountLinked: false,
  firstBetPlaced: false,
  arenaActivity: false,
  streak: 4,
  top100Cutoff: 10200,
  cutoffMovedToday: 150,
  ptsToPassNext: 300,
  nextRankUser: "#41",
  ptsToTop25: 1800,
};

const platforms = [
  { name: "Stake", logo: platformStake },
  { name: "Rollbit", logo: platformRollbit },
  { name: "Shuffle", logo: platformShuffle },
];

const badgeImages: Record<string, string> = {
  "First Blood": badgeFirstBlood,
  "Slots Master": badgeSlotsMaster,
  "High Roller": badgeHighRoller,
  "Lucky 7": badgeLucky7,
  "Streak King": badgeStreakKing,
  "Diamond Hands": badgeDiamondHands,
  "Chest Hunter": badgeChestHunter,
  "OG Player": badgeOgPlayer,
};

/* ═══════════════════════════════════════════════
   DISMISSIBLE BANNER
   ═══════════════════════════════════════════════ */
function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <motion.div
      className="relative rounded-xl border border-primary/15 bg-primary/5 px-5 py-3 flex items-center justify-between"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 uppercase tracking-wider"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Live
        </motion.span>
        <span className="text-sm font-medium">
          Switch Bonus is Live —{" "}
          <Link to="/switch" className="text-primary hover:underline">
            Check Eligibility
          </Link>
        </span>
      </div>
      <button onClick={() => setDismissed(true)} className="p-1 rounded hover:bg-secondary transition-colors">
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   1. GETTING STARTED (3 CTAs)
   ═══════════════════════════════════════════════ */
function GettingStarted() {
  const tiles = [
    {
      step: 1,
      title: "LINK REALBET ACCOUNT",
      sub: "Connect your gaming profile to start earning.",
      cta: "Link Account",
      href: "/profile",
      primary: !userState.accountLinked,
    },
    {
      step: 2,
      title: "WIN WELCOME PRIZES",
      sub: "Claim your free mystery box and bonus points.",
      cta: "Claim Prizes",
      href: "/vault",
      primary: false,
    },
    {
      step: 3,
      title: "CHECK SWITCH BONUS",
      sub: "See what you qualify for from other platforms.",
      cta: "Check Eligibility",
      href: "/switch",
      primary: false,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="font-display text-sm tracking-wider text-muted-foreground">GETTING STARTED</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.step}
            className="group relative rounded-2xl overflow-hidden border border-[hsl(0_30%_15%/0.2)] bg-[hsl(240_8%_6%)] min-h-[200px] flex flex-col justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_20%_8%)] via-[hsl(240_8%_6%)] to-[hsl(240_6%_5%)]" />
            <div
              className="absolute pointer-events-none opacity-[0.07]"
              style={{
                top: i === 0 ? "-20%" : i === 1 ? "30%" : "10%",
                left: i === 0 ? "-10%" : i === 1 ? "40%" : "60%",
                width: "180px",
                height: "180px",
                background: `radial-gradient(ellipse, hsl(0 80% 40% / 0.8), transparent 70%)`,
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px hsl(0 60% 30% / 0.06)" }}
            />
            <div className="relative z-10 p-6 flex flex-col justify-between h-full gap-4">
              <span className="font-display text-[64px] leading-none text-[hsl(0_50%_25%/0.2)]">{tile.step}</span>
              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-base tracking-wide">{tile.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{tile.sub}</p>
                </div>
                <Link
                  to={tile.href}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                    tile.primary
                      ? "bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground hover:brightness-110"
                      : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
                  }`}
                  style={tile.primary ? { boxShadow: "0 0 14px hsl(0 84% 40% / 0.12)" } : {}}
                >
                  {tile.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. PROFILE + REFERRAL COMBINED
   ═══════════════════════════════════════════════ */
function ProfileReferralPanel() {
  const [copied, setCopied] = useState(false);
  const code = "DEGEN-7X42";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Copied ✓", description: "Referral code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
      {/* Profile Card */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(41_40%_20%/0.3)] to-secondary border border-[hsl(41_30%_20%/0.2)] flex items-center justify-center text-xl font-bold">
              D
            </div>
            <div>
              <h2 className="font-display text-xl tracking-wide">DEGEN_WHALE</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gold/12 text-gold border border-gold/20">
                  Gold
                </span>
                <span className="text-[10px] text-muted-foreground">Season 1</span>
                <span className="text-[10px] text-multiplier flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {userState.streak}-Day Streak
                  <span className="px-1.5 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 text-[9px] font-semibold">
                    1.3x
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20">
            <Crown className="w-5 h-5 text-gold" />
            <span className="font-display text-lg text-gold">NFT 1.1x</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">REAL Points</p>
            <p className="font-display text-3xl leading-none">
              <AnimatedNumber value={userState.points} />
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rank</p>
            <p className="font-display text-3xl text-gold leading-none">#{userState.rank}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Season Ends</p>
            <p className="font-display text-3xl text-muted-foreground leading-none">23d</p>
          </div>
        </div>

        {/* Rank progress */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold"
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <motion.div
              className="absolute top-0 h-full w-12 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, hsl(41 70% 65% / 0.35), transparent)" }}
              animate={{ left: ["0%", "72%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] flex-wrap">
            <span className="text-muted-foreground">
              +{userState.ptsToPassNext} pts to pass {userState.nextRankUser}
            </span>
            <span className="text-gold font-semibold">{userState.ptsToTop25.toLocaleString()} pts to Top 25</span>
          </div>
        </div>
      </motion.div>

      {/* Referral Card */}
      <motion.div
        className="rounded-2xl border border-amber/15 bg-card p-6 flex flex-col justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber" />
            <h3 className="font-display text-sm tracking-wider">INVITE & EARN</h3>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl bg-secondary/50 border border-amber/10 hover:border-amber/20 transition-all group"
          >
            <span className="font-display text-xl tracking-widest text-foreground">{code}</span>
            {copied ? (
              <Check className="w-5 h-5 text-multiplier flex-shrink-0" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground group-hover:text-amber flex-shrink-0 transition-colors" />
            )}
          </button>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex-1 py-2 rounded-lg bg-secondary/50 border border-border/50 text-xs text-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              Share on X
            </a>
            <a
              href="#"
              className="flex-1 py-2 rounded-lg bg-secondary/50 border border-border/50 text-xs text-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              Share on TG
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
              <p className="font-display text-base">12</p>
              <p className="text-[9px] text-muted-foreground">Joined</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
              <p className="font-display text-base text-amber">7</p>
              <p className="text-[9px] text-muted-foreground">Qualified</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
              <p className="font-display text-base text-amber">3</p>
              <p className="text-[9px] text-muted-foreground">Bonus Chests</p>
            </div>
          </div>
        </div>

        <Link
          to="/referrals"
          className="w-full py-2.5 rounded-lg bg-amber/10 text-amber border border-amber/20 font-display text-xs hover:bg-amber/15 transition-all flex items-center justify-center gap-2"
        >
          View Referrals <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. SWITCH BONUS CARD (aggressive, high-trust)
   ═══════════════════════════════════════════════ */
function SwitchBonusCard() {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <img src={switchBonusBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_0%/0.7)] via-[hsl(0_0%_0%/0.4)] to-[hsl(0_0%_0%/0.7)]" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[hsl(0_80%_40%/0.25)] to-transparent" />

      <div className="relative z-10 px-6 py-6 border border-[hsl(0_40%_18%/0.2)] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <Swords className="w-4 h-4 text-primary" />
            <h3 className="font-display text-lg tracking-wide">
              SWITCH BONUS <span className="text-primary">(VAMPIRE ATTACK)</span>
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            Connect wallet to reveal your bonus from{" "}
            {platforms.map((p, i) => (
              <span key={p.name} className="inline-flex items-center gap-1 align-middle">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-4 h-4 rounded-sm object-cover inline-block grayscale opacity-60"
                />
                <span className="text-foreground/80 font-medium">{p.name}</span>
                {i < platforms.length - 1 && <span className="text-muted-foreground">, </span>}
              </span>
            ))}
            .
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            to="/switch"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-xs hover:brightness-110 transition-all flex items-center gap-2"
            style={{ boxShadow: "0 0 16px hsl(0 84% 40% / 0.12)" }}
          >
            <Wallet className="w-3.5 h-3.5" /> Check Eligibility
          </Link>
          <Link
            to="/switch"
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
          >
            How It Works
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   4. POINTS BREAKDOWN (lightweight)
   ═══════════════════════════════════════════════ */
function PointsBreakdown() {
  const items = [
    { label: "Wager Points", value: "6,200", icon: Zap },
    { label: "Tasks Points", value: "3,100", icon: Target },
    { label: "Chest/Box Rewards", value: "1,850", icon: Box },
    { label: "Referral Bonuses", value: "1,300", icon: Users },
    { label: "NFT Multiplier", value: "1.1x", icon: Crown, note: "" },
  ];

  return (
    <motion.div
      className="rounded-xl border border-border/50 bg-card p-5 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider text-muted-foreground">YOUR POINTS BREAKDOWN</h3>
        <Link
          to="/profile"
          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          View Details <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            <item.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="flex-1 text-xs text-muted-foreground">{item.label}</span>
            <span className="text-xs font-semibold text-foreground">{item.value}</span>
            {item.note && <span className="text-[9px] text-muted-foreground/70">({item.note})</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   5. REWARD CHESTS (merged Vault + Chests)
   ═══════════════════════════════════════════════ */
function RewardChests() {
  const streakDays = [1, 2, 3, 4, 5, 6, 7];
  const freeBoxAvailable = true;

  const chests = [
    { name: "Silver Chest", tier: "silver", cost: 500, label: "Improved odds", img: silverBoxImg, remaining: null },
    { name: "Gold Chest", tier: "gold", cost: 2000, label: "Best odds", img: goldBoxImg, remaining: null },
    {
      name: "Diamond Chest",
      tier: "diamond",
      cost: 5000,
      label: "Weekly limited",
      img: legendaryBoxImg,
      remaining: 87,
    },
  ];

  const tierStyles: Record<string, { text: string; border: string; btn: string }> = {
    silver: {
      text: "text-silver",
      border: "border-silver/20",
      btn: "bg-silver/10 hover:bg-silver/15 border-silver/20 text-silver",
    },
    gold: { text: "text-gold", border: "border-gold/20", btn: "bg-gold/10 hover:bg-gold/15 border-gold/20 text-gold" },
    diamond: {
      text: "text-epic",
      border: "border-epic/20",
      btn: "bg-epic/10 hover:bg-epic/15 border-epic/20 text-epic",
    },
  };

  return (
    <motion.div
      className="relative rounded-2xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute top-0 left-[15%] w-48 h-32 bg-[hsl(0_60%_30%/0.04)] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Box className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wider">REWARD CHESTS</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Open daily boxes for streak bonuses. Spend REAL Points on premium chests for higher rewards.
              </p>
            </div>
          </div>
          <Link
            to="/vault"
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Two sub-panels */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-5">
          {/* A) Daily Mystery Box */}
          <div className="rounded-xl border border-primary/15 bg-[hsl(0_20%_7%/0.5)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  className="inline-flex"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Flame className="w-4 h-4 text-primary" />
                </motion.span>
                <span className="font-display text-sm tracking-wider">DAILY MYSTERY BOX</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-multiplier/10 text-multiplier border border-multiplier/20 text-[10px] font-display">
                1.3x
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-primary font-semibold">{userState.streak}-Day Streak</span>
                <span className="text-muted-foreground">Day 5 → Free Chest</span>
              </div>

              <div className="flex items-center gap-1.5">
                {streakDays.map((d) => (
                  <motion.div
                    key={d}
                    className={`flex-1 h-3 rounded-full relative overflow-hidden ${d <= userState.streak ? "bg-primary" : "bg-secondary"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + d * 0.04 }}
                  >
                    {d === userState.streak && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <p className="text-[9px] text-muted-foreground/70 flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5" /> Miss a day → streak resets
              </p>
            </div>

            {freeBoxAvailable && (
              <motion.span
                className="block text-center text-[9px] px-2 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/20 font-semibold"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Free Daily Box Available
              </motion.span>
            )}

            <Link
              to="/vault"
              className="relative w-full py-3 rounded-xl font-display text-sm flex items-center justify-center gap-2 transition-all overflow-hidden bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20"
              style={{ boxShadow: freeBoxAvailable ? "0 0 20px hsl(0 84% 40% / 0.12)" : "none" }}
            >
              {freeBoxAvailable && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_84%_40%/0.08)] to-transparent pointer-events-none"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}
              <Box className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Open Daily Box</span>
            </Link>
          </div>

          {/* B) Premium Reward Chests */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-wider text-muted-foreground">PREMIUM REWARD CHESTS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {chests.map((chest) => {
                const s = tierStyles[chest.tier];
                return (
                  <div
                    key={chest.name}
                    className={`rounded-xl border ${s.border} bg-card p-4 space-y-3 transition-all hover:brightness-110 group`}
                  >
                    <div className="flex justify-center py-1">
                      <motion.img
                        src={chest.img}
                        alt={chest.name}
                        className="w-16 h-16 object-contain drop-shadow-lg"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="text-center">
                      <p className={`font-display text-xs ${s.text}`}>{chest.name}</p>
                      <p className="text-[10px] text-muted-foreground">{chest.cost.toLocaleString()} RP</p>
                      <p className="text-[9px] text-muted-foreground/70">{chest.label}</p>
                    </div>

                    {chest.remaining !== null && (
                      <p className="text-[9px] text-center text-primary font-semibold">
                        Limited: {chest.remaining}/100 remaining
                      </p>
                    )}

                    {/* Possible reward icons */}
                    <div className="flex items-center justify-center gap-2">
                      {[Rocket, Gift, Sparkles, Ticket].map((Icon, j) => (
                        <Icon key={j} className="w-3 h-3 text-muted-foreground/40" />
                      ))}
                    </div>

                    <button
                      className={`w-full py-2 rounded-lg font-display text-[10px] border transition-all ${s.btn}`}
                    >
                      Open — {chest.cost.toLocaleString()} RP
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Weekly Bonus Pool */}
            <div className="rounded-lg border border-border/40 bg-secondary/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Weekly Bonus Pool — funded by chest activity</span>
              </div>
              <span className="text-[10px] text-foreground font-semibold">Resets in 3d 14h</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   6. ARENA CARD
   ═══════════════════════════════════════════════ */
function ArenaCard() {
  return (
    <motion.div
      className="relative rounded-2xl border border-[hsl(30_60%_30%/0.2)] bg-card overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[hsl(30_60%_45%/0.03)] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 metallic-sheen pointer-events-none" />

      <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-[hsl(30_60%_50%/0.1)] border border-[hsl(30_60%_50%/0.2)] flex items-center justify-center flex-shrink-0">
          <Swords className="w-6 h-6 text-amber" />
        </div>

        <div className="flex-1 space-y-1.5">
          <h3 className="font-display text-lg tracking-wider">ARENA</h3>
          <p className="text-xs text-muted-foreground">
            Wager REAL Points for competitive outcomes. High risk. Higher rank acceleration.
          </p>
          <div className="flex items-center gap-4 mt-2 text-[10px]">
            <span className="text-muted-foreground">
              Win Rate: <span className="text-foreground font-semibold">62%</span>
            </span>
            <span className="text-muted-foreground">
              Arena Multi: <span className="text-amber font-semibold">1.5x</span>
            </span>
            <span className="text-muted-foreground">
              7d Net: <span className="text-multiplier font-semibold">+4,250</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/arena"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(30_60%_35%)] to-[hsl(30_70%_45%)] text-white font-display text-xs tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
          >
            Enter Arena <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/arena" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            View Stats
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   7. BADGES PREVIEW (collectible feel)
   ═══════════════════════════════════════════════ */
const badges = [
  { name: "First Blood", rarity: "Common", earned: true },
  { name: "Slots Master", rarity: "Epic", earned: true },
  { name: "High Roller", rarity: "Legendary", earned: true },
  { name: "Lucky 7", rarity: "Rare", earned: false },
  { name: "Streak King", rarity: "Epic", earned: false },
  { name: "OG Player", rarity: "Legendary", earned: false },
];

const rarityBorder: Record<string, string> = {
  Common: "border-common/30",
  Rare: "border-rare/40",
  Epic: "border-epic/40",
  Legendary: "border-gold/40",
};

const rarityGlow: Record<string, string> = {
  Epic: "0 0 16px hsl(260 60% 55% / 0.15)",
  Legendary: "0 0 20px hsl(41 60% 53% / 0.15)",
};

function BadgesPreview() {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
    >
      <div className="absolute inset-0 bg-[hsl(260_20%_6%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[hsl(260_50%_30%/0.04)] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 p-6 border border-[hsl(260_20%_20%/0.15)] rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-base tracking-wider">BADGES</h3>
            <span className="text-xs text-muted-foreground">12 / 80 collected</span>
          </div>
          <Link
            to="/collection"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View Full Collection <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="px-2 py-0.5 rounded-full bg-rare/10 text-rare border border-rare/20 font-semibold">
            Competitor
          </span>
          <span className="text-muted-foreground">
            Next tier: <span className="text-foreground font-semibold">3 badges away</span>
          </span>
        </div>

        {/* Badge cards - larger, collectible */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.name}
              className={`group rounded-2xl border bg-[hsl(260_10%_8%/0.5)] p-3 text-center space-y-2 transition-all duration-200 cursor-default ${
                b.earned ? rarityBorder[b.rarity] : "border-border/30 opacity-40"
              }`}
              style={b.earned && rarityGlow[b.rarity] ? { boxShadow: rarityGlow[b.rarity] } : {}}
              whileHover={b.earned ? { y: -4, scale: 1.05 } : {}}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: b.earned ? 1 : 0.4, y: 0 }}
              transition={{ delay: 0.3 + i * 0.03 }}
            >
              <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                {b.earned ? (
                  <img src={badgeImages[b.name]} alt={b.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <p className="text-[11px] font-semibold truncate">{b.name}</p>
              <p
                className={`text-[9px] ${
                  b.rarity === "Legendary"
                    ? "text-gold"
                    : b.rarity === "Epic"
                      ? "text-epic"
                      : b.rarity === "Rare"
                        ? "text-rare"
                        : "text-common"
                }`}
              >
                {b.rarity}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   8. TASKS PREVIEW
   ═══════════════════════════════════════════════ */
const previewTasks = [
  { title: "Place 3 Sports Bets", reward: 150, progress: 66, current: "2/3" },
  { title: "Try a RealBet Original", reward: 100, progress: 0, current: "0/1" },
  { title: "Share a bet slip on X", reward: 75, progress: 0, current: "0/1" },
];

function TasksPreview() {
  return (
    <motion.div
      className="rounded-xl border border-border/50 bg-card p-5 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider text-muted-foreground">TODAY'S TASKS</h3>
        <Link
          to="/tasks"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          Go to Tasks <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-2">
        {previewTasks.map((t) => (
          <div
            key={t.title}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            <div className="flex-1">
              <p className="text-xs font-medium">{t.title}</p>
              <div className="w-full h-1 rounded-full bg-secondary mt-1.5">
                <motion.div
                  className="h-full rounded-full bg-primary/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${t.progress}%` }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">{t.current}</span>
            <span className="text-[10px] text-gold font-semibold">+{t.reward}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground italic">Weekly Challenges also available in Tasks</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   9. HOW IT WORKS
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const bullets = [
    { icon: Target, text: "Earn points by wagering, completing tasks, and referring friends." },
    { icon: Box, text: "Open chests to win rewards, boosters, and badge drops." },
    { icon: Trophy, text: "Climb the Season 1 leaderboard to unlock the reward pool." },
  ];

  return (
    <motion.div
      className="rounded-xl border border-border/40 bg-card p-5 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.33 }}
    >
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-display text-sm tracking-wider text-muted-foreground">HOW IT WORKS</h3>
      </div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-3 py-1">
            <b.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
      <Link
        to="#"
        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
      >
        Read Full FAQ <ExternalLink className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   LEADERBOARD RAIL (right sidebar)
   ═══════════════════════════════════════════════ */
const topPlayers = [
  { rank: 1, name: "cryptoking_99", points: "89,240" },
  { rank: 2, name: "moon_degen", points: "76,100" },
  { rank: 3, name: "whale_hunter", points: "61,500" },
  { rank: 4, name: "bet_maxi", points: "54,300" },
  { rank: 5, name: "degen_alpha", points: "48,900" },
  { rank: 6, name: "realbet_og", points: "41,200" },
  { rank: 7, name: "lucky_strike", points: "38,750" },
  { rank: 8, name: "chain_smoker", points: "35,100" },
  { rank: 9, name: "risk_taker_x", points: "31,400" },
  { rank: 10, name: "moon_shot_22", points: "28,600" },
  { rank: 11, name: "flip_king", points: "26,300" },
  { rank: 12, name: "sigma_grind", points: "24,100" },
  { rank: 13, name: "onchain_ape", points: "22,800" },
  { rank: 14, name: "wagmi_lord", points: "20,500" },
  { rank: 15, name: "nft_degen_x", points: "18,900" },
];

function LeaderboardRail() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[calc(100vh-6rem)]">
      <div className="absolute inset-0 bg-[hsl(240_6%_5%)]" />

      <motion.div
        className="relative z-10 p-4 space-y-3 border border-border/30 rounded-2xl h-full flex flex-col"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        {/* Season 1 header */}
        <div className="text-center py-2">
          <h3 className="font-display text-2xl text-primary tracking-wider">SEASON 1</h3>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Season ends in</p>
          <p className="font-display text-lg text-foreground">23 DAYS</p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-display text-xs tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-muted-foreground" /> Leaderboard
          </h3>
          <Link
            to="/leaderboard"
            className="text-[9px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Full <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* NFT Multiplier chip */}
        <div className="px-2.5 py-1.5 rounded-lg bg-gold/5 border border-gold/10 text-[9px] text-muted-foreground flex items-center gap-1.5">
          <Crown className="w-3 h-3 text-gold" />
          <span>
            NFT Multiplier: <span className="text-gold font-semibold">2.0x</span> ()
          </span>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-2 pt-1 pb-2">
          {[topPlayers[1], topPlayers[0], topPlayers[2]].map((p, i) => {
            const heights = ["h-10", "h-16", "h-8"];
            const colors = ["text-silver", "text-gold", "text-bronze"];
            return (
              <div key={p.rank} className="flex flex-col items-center gap-1 flex-1">
                <span className={`font-display text-sm ${colors[i]}`}>#{p.rank}</span>
                <p className="text-[8px] text-muted-foreground truncate max-w-full">{p.name}</p>
                <div
                  className={`w-full ${heights[i]} rounded-t-md bg-gradient-to-t from-secondary to-secondary/30 border border-border border-b-0 flex items-center justify-center`}
                >
                  <span className="text-[8px] font-display text-muted-foreground">{p.points}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll list */}
        <div className="flex-1 space-y-0.5 overflow-y-auto scrollbar-none">
          {topPlayers.slice(3).map((p) => (
            <div
              key={p.rank}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <span className="font-display text-[9px] text-muted-foreground w-5 text-right">#{p.rank}</span>
              <p className="flex-1 text-[10px] truncate">{p.name}</p>
              <span className="text-[9px] text-muted-foreground font-display">{p.points}</span>
            </div>
          ))}
        </div>

        {/* Pinned user rank */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/10">
          <span className="font-display text-xs text-primary">#{userState.rank}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold truncate">YOU (degen_whale)</p>
          </div>
          <span className="font-display text-xs text-foreground">{userState.points.toLocaleString()}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DASHBOARD — 2-column layout
   ═══════════════════════════════════════════════ */
export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Switch Bonus card below handles this */}

      {/* 2-column: Main (70%) + Leaderboard Rail (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* LEFT — Main funnel content */}
        <div className="space-y-6 min-w-0">
          {/* 1. Switch Bonus (Vampire Attack) — top priority */}
          <SwitchBonusCard />

          {/* 2. Getting Started */}
          <GettingStarted />

          {/* 3. Profile + Referrals */}
          <ProfileReferralPanel />

          {/* 4. Badges — right under profile */}
          <BadgesPreview />

          {/* 5. Points Breakdown */}
          <PointsBreakdown />

          {/* 6. Reward Chests */}
          <RewardChests />

          {/* 7. Arena */}
          <ArenaCard />

          {/* 8. Tasks */}
          <TasksPreview />

          {/* 9. How It Works */}
          <HowItWorks />
        </div>

        {/* RIGHT — Leaderboard Rail (sticky) */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <LeaderboardRail />
          </div>
        </div>
      </div>

      {/* Mobile leaderboard */}
      <div className="lg:hidden">
        <LeaderboardRail />
      </div>
    </div>
  );
}
