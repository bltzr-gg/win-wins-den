import { useState } from "react";
import { X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-gradient-to-r from-accent/15 via-accent/10 to-primary/10 border-b border-accent/20"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
      >
        <div className="max-w-hub mx-auto flex items-center justify-between px-4 py-2.5 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <p className="text-sm text-foreground truncate">
              <span className="font-display font-semibold">Switch Bonus</span>
              <span className="text-muted-foreground hidden sm:inline"> — Switch from Shuffle, Stake, or Rollbit → Get rewarded.</span>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/profile/switch"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-display font-semibold hover:brightness-110 transition-all"
            >
              Check Eligibility <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoBanner;
