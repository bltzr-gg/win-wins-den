import { motion } from "framer-motion";
import { ArrowRight, Shield, Gift, Zap } from "lucide-react";

const steps = [
  { icon: Shield, title: "Verify Account", desc: "Prove you were active on another platform" },
  { icon: Gift, title: "Claim Bonus", desc: "Receive your switch bonus in REAL Points" },
  { icon: Zap, title: "Start Playing", desc: "Use your bonus on any game" },
];

const SwitchBonus = () => {
  return (
    <div className="px-4 pt-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Switch Bonus</h1>
        <p className="text-sm text-muted-foreground">Coming from another platform? We've got you.</p>
      </motion.div>

      {/* Hero card */}
      <motion.div
        className="glass-card p-6 text-center space-y-4 border-accent/20 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-gradient-accent">
            Up to 5,000
          </h2>
          <p className="text-sm text-muted-foreground">REAL Points Switch Bonus</p>
          <p className="text-xs text-muted-foreground mt-2">
            Switch from any competitor and get rewarded for making the move
          </p>
        </div>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm">How it works</h3>
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="glass-card p-4 flex items-center gap-4"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
              <step.icon className="w-5 h-5 text-accent" />
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
        className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-accent hover:brightness-110 transition-all"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Switch Process <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Supported platforms */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xs text-muted-foreground">Supported platforms</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {["Stake", "Rollbit", "BC.Game", "Roobet", "Duelbits"].map((p) => (
            <span key={p} className="px-3 py-1.5 rounded-full bg-secondary text-xs text-secondary-foreground">
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SwitchBonus;
