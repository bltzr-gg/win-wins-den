import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Wallet, Plus, X, Loader2, Sparkles, Check, Share2, Copy } from "lucide-react";

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

const CHAINS = ["Ethereum", "Solana", "Arbitrum", "Base", "Polygon", "BSC", "Avalanche", "Optimism"];

type Step = "connect" | "analyzing" | "complete";

export default function SwitchBonus() {
  const [step, setStep] = useState<Step>("connect");
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [wallets, setWallets] = useState<string[]>([""]);
  const [analyzingIndex, setAnalyzingIndex] = useState(0);
  const [claimed, setClaimed] = useState(false);

  // Mock result data
  const resultData = {
    name: twitterHandle || "DegenKing",
    handle: twitterHandle || "@degenking",
    totalVolume: 847293,
    score: 91,
    platforms: ["Stake", "Rollbit", "HyperLiquid", "Pump.fun", "Jupiter", "MetaWin"],
    points: 4850,
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

  const canGenerate = wallets.some((w) => w.trim().length > 0);

  const handleGenerate = () => {
    setStep("analyzing");
  };

  // Analyzing animation
  useEffect(() => {
    if (step !== "analyzing") return;
    const allItems = [...PLATFORMS.map((p) => p.name), ...CHAINS];
    if (analyzingIndex >= allItems.length) {
      const timer = setTimeout(() => setStep("complete"), 800);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setAnalyzingIndex((i) => i + 1), 250);
    return () => clearTimeout(timer);
  }, [step, analyzingIndex]);

  const handleClaim = () => setClaimed(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">SWITCH BONUS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your accounts, generate your degen score & claim your bonus
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-3">
        {(["connect", "analyzing", "complete"] as Step[]).map((s, i) => {
          const stepOrder = ["connect", "analyzing", "complete"];
          const currentIdx = stepOrder.indexOf(step);
          const thisIdx = stepOrder.indexOf(s);
          const isComplete = thisIdx < currentIdx;
          const isCurrent = step === s;
          return (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                  isCurrent || isComplete
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline font-medium ${
                isCurrent ? "text-foreground" : "text-muted-foreground"
              }`}>
                {s === "connect" ? "Connect" : s === "analyzing" ? "Analyze" : "Claim"}
              </span>
              {i < 2 && <div className={`w-12 h-px ${isComplete ? "bg-primary" : "bg-border"}`} />}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Connect */}
        {step === "connect" && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {!twitterConnected ? (
              /* Twitter Connection CTA */
              <div className="card-surface p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Twitter className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-lg">CONNECT YOUR TWITTER</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Link your Twitter account to generate your personalized Degen Card
                  </p>
                </div>
                <button
                  onClick={connectTwitter}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  CONNECT TWITTER
                </button>
              </div>
            ) : (
              /* Wallets UI after Twitter connected */
              <>
                {/* Connected Twitter confirmation */}
                <div className="card-surface p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-multiplier/10 text-multiplier border border-multiplier/20 flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Twitter Connected</p>
                      <p className="text-[10px] text-muted-foreground">{twitterHandle}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-multiplier/10 text-multiplier flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Wallets */}
                <div className="card-surface p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Connect Casino & Trading Wallets</p>
                      <p className="text-[10px] text-muted-foreground">
                        Add up to 10 wallets to maximize your Degen Score · {wallets.length}/10
                      </p>
                    </div>
                    {wallets.length < 10 && (
                      <button
                        onClick={addWallet}
                        className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {wallets.map((wallet, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="flex-1 relative">
                          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={wallet}
                            onChange={(e) => updateWallet(i, e.target.value)}
                            placeholder={`Wallet address ${i + 1} (EVM, SOL, etc.)`}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                          />
                        </div>
                        {wallets.length > 1 && (
                          <button
                            onClick={() => removeWallet(i)}
                            className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  GENERATE SCORE
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 2: Analyzing */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-surface card-glow-red metallic-sheen edge-highlight p-8 text-center space-y-6"
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
            <div>
              <h2 className="font-display text-xl">ANALYZING YOUR ACTIVITY</h2>
              <p className="text-xs text-muted-foreground mt-1">Scanning transactions across all chains & protocols</p>
            </div>

            {/* Animated protocol/chain list */}
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {[...PLATFORMS, ...CHAINS.map((c) => ({ name: c, color: "hsl(var(--muted-foreground))" }))].map(
                (item, i) => (
                  <motion.span
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={
                      i < analyzingIndex
                        ? { opacity: 1, scale: 1 }
                        : i === analyzingIndex
                        ? { opacity: [0, 1, 0.6], scale: [0.7, 1.1, 1] }
                        : { opacity: 0.15, scale: 0.9 }
                    }
                    transition={{ duration: 0.25 }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                      i < analyzingIndex
                        ? "border-primary/20 bg-primary/5"
                        : i === analyzingIndex
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-secondary/30"
                    }`}
                    style={{ color: typeof item === "object" && "color" in item ? item.color : undefined }}
                  >
                    {typeof item === "object" ? item.name : item}
                  </motion.span>
                )
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-crimson-deep to-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${Math.min(
                      100,
                      (analyzingIndex / (PLATFORMS.length + CHAINS.length)) * 100
                    )}%`,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                {analyzingIndex} / {PLATFORMS.length + CHAINS.length} protocols scanned
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Complete */}
        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            {/* Final Score Card */}
            <div className="card-surface card-glow-red metallic-sheen edge-highlight p-6 space-y-5">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-display">
                  Your Degen Card
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎰</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-display text-lg">{resultData.name.replace("@", "").toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{resultData.handle}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-display text-3xl text-gradient-gold">
                      ${resultData.totalVolume.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground">total volume</span>
                  </div>
                </div>
              </div>

              {/* Platform pills */}
              <div className="flex flex-wrap gap-1.5">
                {resultData.platforms.map((p) => {
                  const platform = PLATFORMS.find((pl) => pl.name === p);
                  return (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-border bg-secondary/50"
                      style={{ color: platform?.color }}
                    >
                      {p}
                    </span>
                  );
                })}
              </div>

              {/* Score + Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <p className="text-[10px] text-muted-foreground">Degen Score</p>
                  <p className="font-display text-2xl text-primary">{resultData.score}</p>
                  <p className="text-[10px] text-muted-foreground">/100</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <p className="text-[10px] text-muted-foreground">Platforms</p>
                  <p className="font-display text-2xl">{resultData.platforms.length}</p>
                  <p className="text-[10px] text-muted-foreground">detected</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <p className="text-[10px] text-muted-foreground">Wallets</p>
                  <p className="font-display text-2xl">{wallets.filter((w) => w.trim()).length}</p>
                  <p className="text-[10px] text-muted-foreground">scanned</p>
                </div>
              </div>

              {/* Points reward */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-xs text-muted-foreground">Your Reward</p>
                <p className="font-display text-3xl text-gradient-gold mt-1">
                  {resultData.points.toLocaleString()} REAL Points
                </p>
              </div>
            </div>

            {/* Action buttons */}
            {!claimed ? (
              <button
                onClick={handleClaim}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm glow-crimson hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                CLAIM {resultData.points.toLocaleString()} POINTS
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-xl bg-multiplier/5 border border-multiplier/20 text-center">
                  <Check className="w-6 h-6 text-multiplier mx-auto mb-1" />
                  <p className="font-display text-sm text-multiplier">POINTS CLAIMED!</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {resultData.points.toLocaleString()} REAL Points added to your account
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-lg bg-secondary border border-border font-display text-xs hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-3.5 h-3.5" />
                    SHARE CARD
                  </button>
                  <button className="flex-1 py-3 rounded-lg bg-secondary border border-border font-display text-xs hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                    <Copy className="w-3.5 h-3.5" />
                    REFER FRIENDS
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
