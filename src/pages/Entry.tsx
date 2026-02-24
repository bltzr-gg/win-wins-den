import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";

const Entry = () => {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.trim()) {
      setSubmitted(true);
      setTimeout(() => navigate("/hub"), 2500);
    }
  };

  const handleSkip = () => navigate("/hub");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden grain">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md flex flex-col items-center text-center gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 mx-auto animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Welcome to the
          </h1>
          <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mt-1">
            <span className="text-gradient-primary">RealBet</span> VIP Hub
          </h1>
          <p className="text-muted-foreground mt-3 font-display">Your code. Your crew. Your rewards.</p>
        </motion.div>

        {/* Input */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input"
              className="w-full space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div>
                <p className="text-sm text-muted-foreground mb-3">Got a referral code? Enter it here</p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ENTER REFERRAL CODE"
                  className="w-full h-14 px-6 bg-secondary border border-border rounded-xl text-foreground text-center font-display font-semibold text-lg tracking-[0.2em] placeholder:text-muted-foreground/50 placeholder:tracking-[0.15em] placeholder:font-normal placeholder:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  maxLength={20}
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-display font-semibold flex items-center justify-center gap-2 glow-primary transition-all hover:brightness-110 active:scale-[0.98]"
                whileTap={{ scale: 0.98 }}
                disabled={!code.trim()}
                style={{ opacity: code.trim() ? 1 : 0.5 }}
              >
                Activate Code <ArrowRight className="w-5 h-5" />
              </motion.button>
              <button
                onClick={handleSkip}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Skip for now →
              </button>
              <p className="text-[11px] text-muted-foreground">You can always add a code later from your Profile</p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="w-full glass-card p-8 space-y-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Gift className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-gradient-primary">
                Code Activated!
              </h3>
              <p className="text-sm text-muted-foreground">You and your referrer each earn:</p>
              <p className="text-4xl font-display font-bold text-primary">200</p>
              <p className="text-xs text-muted-foreground">REAL Points</p>
              <motion.button
                onClick={() => navigate("/hub")}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-display font-semibold flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Enter the Hub <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Entry;
