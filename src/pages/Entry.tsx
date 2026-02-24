import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Entry = () => {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.trim()) {
      setSubmitted(true);
      setTimeout(() => navigate("/hub"), 2000);
    }
  };

  const handleSkip = () => navigate("/hub");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm flex flex-col items-center text-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo / Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 mx-auto animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">
            <span className="text-gradient-primary">RealBet</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-1">VIP Hub</p>
        </motion.div>

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-display font-semibold mb-2">
            Welcome to the inner circle
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your invite code to unlock bonus rewards for you and your friend.
          </p>
        </motion.div>

        {/* Input */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input"
              className="w-full space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ENTER INVITE CODE"
                  className="w-full h-14 px-5 bg-secondary border border-border rounded-xl text-foreground text-center font-display font-semibold tracking-[0.2em] placeholder:text-muted-foreground/50 placeholder:tracking-[0.15em] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  maxLength={12}
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-primary transition-all hover:brightness-110 active:scale-[0.98]"
                whileTap={{ scale: 0.98 }}
                disabled={!code.trim()}
                style={{ opacity: code.trim() ? 1 : 0.5 }}
              >
                Unlock Rewards <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button
                onClick={handleSkip}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors mt-2"
              >
                Skip for now →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="w-full glass-card p-6 space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Gift className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-lg font-display font-semibold text-gradient-primary">
                Code Activated!
              </h3>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">You get</p>
                  <p className="text-xl font-display font-bold text-primary">500</p>
                  <p className="text-muted-foreground text-xs">REAL Points</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-muted-foreground">Friend gets</p>
                  <p className="text-xl font-display font-bold text-accent">500</p>
                  <p className="text-muted-foreground text-xs">REAL Points</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Entry;
