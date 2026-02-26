import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Wallet,
  Plus,
  X,
  Loader2,
  Sparkles,
  Check,
  Share2,
  Copy,
  ArrowRight,
  Zap,
} from "lucide-react";

const PLATFORMS = [
  { name: "Stake", color: "hsl(220 70% 55%)" },
  { name: "Rollbit", color: "hsl(41 60% 53%)" },
  { name: "Shuffle", color: "hsl(260 60% 55%)" },
  { name: "HyperLiquid", color: "hsl(180 70% 50%)" },
  { name: "Pump.fun", color: "hsl(142 60% 45%)" },
  { name: "MetaWin", color: "hsl(0 84% 40%)" },
  { name: "Jupiter", color: "hsl(25 80% 55%)" },
  { name: "Polymarket", color: "hsl(200 70% 50%)" },
  { name: "dYdX", color: "hsl(270 50% 55%)" },
  { name: "GMX", color: "hsl(210 80% 55%)" },
  { name: "Aave", color: "hsl(280 60% 60%)" },
  { name: "Uniswap", color: "hsl(330 70% 55%)" },
];

const CHAINS = [
  "Ethereum",
  "Solana",
  "Arbitrum",
  "Base",
  "Polygon",
  "BSC",
  "Avalanche",
  "Optimism",
];

const SCAN_ITEMS = [
  ...PLATFORMS.map((p) => ({ name: p.name, color: p.color })),
  ...CHAINS.map((c) => ({ name: c, color: "hsl(240 3% 55%)" })),
];

type Step = "connect" | "analyzing" | "complete" | "claimed";

export default function SwitchBonus() {
  const [step, setStep] = useState<Step>("connect");
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [wallets, setWallets] = useState<string[]>([""]);
  const [analyzingIndex, setAnalyzingIndex] = useState(0);

  const resultData = {
    name: twitterHandle || "DegenKing",
    handle: twitterHandle || "@degenking",
    totalVolume: 124300,
    score: 8420,
    tier: "Gold Migrator",
    platforms: ["Stake", "Rollbit", "HyperLiquid", "Base"],
  };

  const addWallet = () => {
    if (wallets.length < 10) setWallets([...wallets, ""]);
  };

  const removeWallet = (index: number) => {
    if (wallets.length > 1) setWallets(wallets.filter((_, i) => i !== index));
  };

  const updateWallet = (index: number, value: string) => {
    const updated = [...wallets];
    updated[index] = value;
    setWallets(updated);
  };

  const connectTwitter = () => {
    setTwitterConnected(true);
    setTwitterHandle("@degenking");
  };

  const canGenerate =
    twitterConnected && wallets.some((w) => w.trim().length > 0);

  const handleGenerate = () => {
    setAnalyzingIndex(0);
    setStep("analyzing");
  };

  useEffect(() => {
    if (step !== "analyzing") return;
    if (analyzingIndex >= SCAN_ITEMS.length) {
      const timer = setTimeout(() => setStep("complete"), 1200);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setAnalyzingIndex((i) => i + 1),
      200 + Math.random() * 100
    );
    return () => clearTimeout(timer);
  }, [step, analyzingIndex]);

  const handleClaim = () => setStep("claimed");

  const scrollToConnect = () => {
    document
      .getElementById("switch-connect")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-10">
      {/* ─── HERO HEADER ─── */}
      <section className="relative overflow-hidden rounded-2xl border border-border">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-crimson-deep/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 rounded-full blur-[120px]" />

        <div className="relative px-8 py-14 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] font-display tracking-[0.2em] text-primary/70 mb-3">
              MIGRATION SCORE GENERATOR
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              SWITCH BONUS —{" "}
              <span className="text-gradient-crimson">
                SHOW US WHERE YOU PLAYED
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Connect your Twitter and wallets. Generate your migration score.
            <br />
            Earn bonus points for switching to RealBet.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={scrollToConnect}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all"
          >
            <Zap className="w-4 h-4" />
            GENERATE MY SCORE
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ─── STEP INDICATORS ─── */}
      <div className="flex items-center justify-center gap-4" id="switch-connect">
        {(["connect", "analyzing", "complete"] as const).map((s, i) => {
          const order = ["connect", "analyzing", "complete", "claimed"];
          const currentIdx = order.indexOf(step);
          const thisIdx = order.indexOf(s);
          const isComplete = thisIdx < currentIdx;
          const isCurrent = step === s || (s === "complete" && step === "claimed");
          const labels = ["Connect", "Analyze", "Claim"];
          return (
            <div key={s} className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isComplete
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : isCurrent
                      ? "bg-primary/15 text-primary border border-primary/30 animate-glow-pulse"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {isComplete ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    isCurrent || isComplete
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {labels[i]}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`w-16 h-px transition-colors duration-500 ${
                    isComplete ? "bg-primary/50" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ─── STEP CONTENT ─── */}
      <AnimatePresence mode="wait">
        {/* ───── CONNECT STEP ───── */}
        {step === "connect" && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Twitter */}
            {!twitterConnected ? (
              <div className="card-surface card-glow-red edge-highlight p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Twitter className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl">CONNECT YOUR TWITTER</h2>
                  <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                    We use your Twitter to personalize your migration card.
                  </p>
                </div>
                <button
                  onClick={connectTwitter}
                  className="w-full max-w-xs mx-auto py-3.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  CONNECT TWITTER
                </button>
              </div>
            ) : (
              <>
                {/* Twitter confirmed */}
                <div className="card-surface p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-multiplier/10 text-multiplier border border-multiplier/20 flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Twitter Connected</p>
                      <p className="text-[11px] text-muted-foreground">
                        {twitterHandle}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-multiplier/10 text-multiplier flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Wallets Section */}
                <div className="card-surface edge-highlight p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-base">
                        CONNECT WALLETS (UP TO 10)
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Add wallets used on trading platforms and casinos to
                        calculate your migration score.
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium tabular-nums">
                      {wallets.length}/10
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {wallets.map((wallet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-2"
                      >
                        <div className="flex-1 relative group">
                          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary/60" />
                          <input
                            type="text"
                            value={wallet}
                            onChange={(e) => updateWallet(i, e.target.value)}
                            placeholder={`Wallet ${i + 1} — EVM, SOL, etc.`}
                            className="w-full pl-10 pr-3 py-3 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/20 transition-all"
                          />
                          {wallet.trim() && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-multiplier/60" />
                          )}
                        </div>
                        {wallets.length > 1 && (
                          <button
                            onClick={() => removeWallet(i)}
                            className="w-11 h-11 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/20 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {wallets.length < 10 && (
                    <button
                      onClick={addWallet}
                      className="w-full py-2.5 rounded-lg border border-dashed border-border hover:border-primary/20 text-muted-foreground hover:text-foreground text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ADD ANOTHER WALLET
                    </button>
                  )}

                  {/* Connected wallets summary */}
                  {wallets.filter((w) => w.trim()).length > 0 && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-display">
                        Connected Wallets
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {wallets
                          .filter((w) => w.trim())
                          .map((w, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md text-[11px] bg-secondary border border-border text-muted-foreground font-mono"
                            >
                              {w.slice(0, 6)}…{w.slice(-4) || ""}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-base glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <Sparkles className="w-5 h-5" />
                  GENERATE SCORE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* ───── ANALYZING STEP ───── */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card-surface card-glow-red metallic-sheen edge-highlight p-10 text-center space-y-8">
              {/* Pulsing loader */}
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-card border border-primary/20 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl">
                  {analyzingIndex >= SCAN_ITEMS.length
                    ? "SCORE CALCULATION COMPLETE"
                    : "ANALYZING ON-CHAIN & PLATFORM ACTIVITY"}
                </h2>
                <p className="text-xs text-muted-foreground mt-2">
                  {analyzingIndex >= SCAN_ITEMS.length
                    ? "Preparing your Switch Bonus Card..."
                    : "Scanning platforms and chains..."}
                </p>
              </div>

              {/* Protocol pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {SCAN_ITEMS.map((item, i) => {
                  const isScanned = i < analyzingIndex;
                  const isActive = i === analyzingIndex;
                  return (
                    <motion.span
                      key={item.name}
                      initial={{ opacity: 0.15, scale: 0.85 }}
                      animate={
                        isScanned
                          ? { opacity: 1, scale: 1 }
                          : isActive
                          ? {
                              opacity: [0.3, 1, 0.8],
                              scale: [0.9, 1.12, 1],
                              boxShadow: [
                                "0 0 0px transparent",
                                `0 0 16px ${item.color.replace(")", " / 0.4)")}`,
                                `0 0 8px ${item.color.replace(")", " / 0.2)")}`,
                              ],
                            }
                          : { opacity: 0.12, scale: 0.85 }
                      }
                      transition={{ duration: 0.25 }}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
                        isScanned
                          ? "border-primary/15 bg-primary/5"
                          : isActive
                          ? "border-primary/40 bg-primary/10"
                          : "border-border/50 bg-secondary/20"
                      }`}
                      style={{
                        color: isScanned || isActive ? item.color : undefined,
                      }}
                    >
                      {item.name}
                    </motion.span>
                  );
                })}
              </div>

              {/* Progress */}
              <div className="w-full max-w-sm mx-auto space-y-2">
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-crimson-deep to-primary"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${Math.min(
                        100,
                        (analyzingIndex / SCAN_ITEMS.length) * 100
                      )}%`,
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground tabular-nums">
                  {analyzingIndex >= SCAN_ITEMS.length
                    ? "Complete"
                    : `Analyzing wallet activity... ${analyzingIndex}/${SCAN_ITEMS.length}`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ───── COMPLETE — FINAL CARD ───── */}
        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Card */}
            <div className="card-surface card-glow-red metallic-sheen edge-highlight p-8 space-y-6 relative">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/8 to-transparent rounded-bl-[60px]" />

              <div className="text-center">
                <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] font-display">
                  Switch Bonus Card
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-start gap-5">
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary/20 via-secondary to-crimson-deep/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎰</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="font-display text-xl">
                    {resultData.name.replace("@", "").toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {resultData.handle}
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Total External Volume
                    </span>
                  </div>
                  <p className="font-display text-3xl text-gradient-gold">
                    ${resultData.totalVolume.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-display mb-2.5">
                  Platforms Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {resultData.platforms.map((p) => {
                    const platform = PLATFORMS.find((pl) => pl.name === p);
                    return (
                      <span
                        key={p}
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-secondary/40"
                        style={{ color: platform?.color }}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Score + Tier */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-secondary/30 border border-border text-center space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Switch Score
                  </p>
                  <p className="font-display text-3xl text-primary">
                    {resultData.score.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Points</p>
                </div>
                <div className="p-5 rounded-xl bg-secondary/30 border border-border text-center space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Switch Tier
                  </p>
                  <p className="font-display text-xl text-gradient-gold mt-1">
                    {resultData.tier}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClaim}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                CLAIM SWITCH BONUS
              </button>
              <button className="px-6 py-4 rounded-xl bg-secondary border border-border font-display text-xs hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                SHARE CARD
              </button>
            </div>
          </motion.div>
        )}

        {/* ───── CLAIMED STEP ───── */}
        {step === "claimed" && (
          <motion.div
            key="claimed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Success */}
            <div className="card-surface card-glow-red edge-highlight p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-multiplier/10 border border-multiplier/20 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-multiplier" />
              </div>
              <div>
                <h2 className="font-display text-2xl">YOU'VE EARNED</h2>
                <p className="font-display text-4xl text-gradient-gold mt-2">
                  {resultData.score.toLocaleString()} SWITCH BONUS POINTS
                </p>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Invite friends and earn bonus migration rewards. Every friend
                who completes the Switch Bonus earns you extra points.
              </p>
            </div>

            {/* Referral */}
            <div className="card-surface p-6 space-y-4">
              <h3 className="font-display text-base">REFER FRIENDS</h3>
              <p className="text-[11px] text-muted-foreground">
                Share your referral link and earn bonus migration rewards.
              </p>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-sm text-muted-foreground font-mono truncate">
                  https://realbet.gg/ref/degenking
                </div>
                <button className="px-4 py-3 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors flex items-center gap-2 text-xs font-medium">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="flex gap-3">
              <button className="flex-1 py-3.5 rounded-xl bg-secondary border border-border font-display text-xs hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                SHARE MIGRATION CARD
              </button>
              <button className="flex-1 py-3.5 rounded-xl bg-secondary border border-border font-display text-xs hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                <Twitter className="w-4 h-4" />
                SHARE ON TWITTER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
