import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Gift, Zap, Wallet, ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: Wallet, title: "Connect EVM Wallet", desc: "MetaMask, WalletConnect, or any EVM wallet" },
  { icon: Shield, title: "Analyze On-Chain Activity", desc: "We detect platforms: Shuffle, Rollbit, Stake, etc." },
  { icon: Gift, title: "See Your Rewards", desc: "Free Play + REAL Points based on your history" },
  { icon: Zap, title: "Create & Claim", desc: "Link your RealBet account to claim rewards" },
];

const SwitchBonus = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link to="/profile" className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Switch Bonus</h1>
          <p className="text-sm text-muted-foreground">See what you qualify for before creating an account.</p>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="glass-card p-6 lg:p-8 text-center space-y-4 border-accent/20 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gradient-accent">
            Up to 5,000
          </h2>
          <p className="text-sm text-muted-foreground">REAL Points Switch Bonus</p>
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
            Coming from Shuffle, Stake, Rollbit, or another platform? Connect your wallet to discover what you're eligible for.
          </p>
        </div>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm">How it works</h3>
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="glass-card-hover p-4 flex items-center gap-4"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              i === 0 && walletConnected
                ? "bg-streak/15 border border-streak/30"
                : "bg-accent/15"
            }`}>
              {i === 0 && walletConnected ? (
                <Check className="w-5 h-5 text-streak" />
              ) : (
                <step.icon className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
            <span className="text-xs font-display font-bold text-muted-foreground">{i + 1}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => setWalletConnected(true)}
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-accent hover:brightness-110 transition-all"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        {walletConnected ? (
          <>Analyzing... <Zap className="w-4 h-4" /></>
        ) : (
          <>Connect Wallet <ArrowRight className="w-4 h-4" /></>
        )}
      </motion.button>

      {/* Supported */}
      <motion.div className="text-center space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <p className="text-xs text-muted-foreground">Supported platforms</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {["Stake", "Rollbit", "Shuffle", "BC.Game", "Roobet", "Duelbits"].map((p) => (
            <span key={p} className="px-3 py-1.5 rounded-full bg-secondary text-xs text-secondary-foreground">{p}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SwitchBonus;
