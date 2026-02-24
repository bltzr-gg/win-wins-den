import { useState } from "react";
import { Wallet, Search, Gift, Check, ArrowRight, Loader2 } from "lucide-react";

const steps = [
  { title: "Connect Wallet", description: "Link your wallet to verify on-chain activity", icon: Wallet },
  { title: "Analyze Activity", description: "We scan your history across chains", icon: Search },
  { title: "See Your Bonus", description: "Based on your degen score", icon: Gift },
  { title: "Claim Bonus", description: "Credits added to your account", icon: Check },
];

export default function SwitchBonus() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bonusAmount, setBonusAmount] = useState<number | null>(null);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep(1);
      setLoading(false);
      setTimeout(() => {
        setCurrentStep(2);
        setBonusAmount(2450);
      }, 2000);
    }, 1500);
  };

  const handleClaim = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep(3);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">SWITCH BONUS</h1>
        <p className="text-sm text-muted-foreground mt-1">Switch from other platforms and get rewarded</p>
      </div>

      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              i <= currentStep
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-secondary text-muted-foreground border border-border"
            }`}>
              <step.icon className="w-4 h-4" />
            </div>
            <span className={`text-xs hidden sm:inline ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
              {step.title}
            </span>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px ${i < currentStep ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {currentStep === 0 && (
        <div className="card-surface card-glow-red metallic-sheen edge-highlight p-8 text-center space-y-4">
          <h2 className="font-display text-xl">CONNECT YOUR WALLET</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We'll analyze your on-chain activity across major platforms to calculate your personalized switch bonus.
          </p>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm glow-crimson hover:brightness-110 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      )}

      {currentStep === 1 && (
        <div className="card-surface p-8 text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <h2 className="font-display text-xl">ANALYZING YOUR ACTIVITY...</h2>
          <p className="text-sm text-muted-foreground">Scanning transactions across Ethereum, Polygon, Arbitrum...</p>
        </div>
      )}

      {currentStep === 2 && bonusAmount && (
        <div className="card-surface card-glow-red metallic-sheen edge-highlight p-8 text-center space-y-5">
          <h2 className="font-display text-xl">YOUR SWITCH BONUS</h2>
          <p className="font-display text-5xl text-gradient-gold">{bonusAmount.toLocaleString()} REAL Points</p>
          <div className="flex justify-center gap-4">
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Txns Found</p>
              <p className="font-display text-lg">1,247</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Platforms</p>
              <p className="font-display text-lg">6</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Degen Score</p>
              <p className="font-display text-lg text-gold">87/100</p>
            </div>
          </div>
          <button
            onClick={handleClaim}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm glow-crimson hover:brightness-110 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
            {loading ? "Claiming..." : "Claim Bonus"}
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="card-surface p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-multiplier/10 text-multiplier flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-display text-xl">BONUS CLAIMED!</h2>
          <p className="text-sm text-muted-foreground">
            {bonusAmount?.toLocaleString()} REAL Points have been added to your account.
          </p>
          <p className="text-xs text-muted-foreground">Welcome to RealBet — let the games begin!</p>
        </div>
      )}
    </div>
  );
}
