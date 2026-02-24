import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Users, Gift, Check } from "lucide-react";

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const code = "REALBET-VIP42";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Friends Joined", value: "7" },
    { label: "Points Earned", value: "3,500" },
    { label: "Active Referrals", value: "5" },
  ];

  return (
    <div className="px-4 pt-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Referrals</h1>
        <p className="text-sm text-muted-foreground">Invite friends. Earn together.</p>
      </motion.div>

      {/* Code Card */}
      <motion.div
        className="glass-card p-6 text-center space-y-4 border-primary/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
          <Gift className="w-7 h-7 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Your Invite Code</p>
          <p className="text-2xl font-display font-bold tracking-[0.15em] text-gradient-primary">
            {code}
          </p>
        </div>
        <motion.button
          onClick={handleCopy}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-primary hover:brightness-110 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          {copied ? (
            <><Check className="w-4 h-4" /> Copied!</>
          ) : (
            <><Copy className="w-4 h-4" /> Copy Code</>
          )}
        </motion.button>

        {/* Share buttons */}
        <div className="flex justify-center gap-3 pt-1">
          {["Twitter/X", "Telegram", "Share"].map((platform) => (
            <button
              key={platform}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> {platform}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Reward Breakdown */}
      <motion.div
        className="glass-card p-4 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-display font-semibold text-sm">Reward Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 glass-card p-3 text-center">
            <p className="text-lg font-display font-bold text-primary">500</p>
            <p className="text-[10px] text-muted-foreground">You earn per friend</p>
          </div>
          <div className="flex-1 glass-card p-3 text-center">
            <p className="text-lg font-display font-bold text-accent">500</p>
            <p className="text-[10px] text-muted-foreground">They earn on signup</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <p className="text-lg font-display font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Referrals */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-display font-semibold text-sm">Recent Friends</h3>
        {["CryptoFan", "LuckyDice", "NovaBet"].map((name, i) => (
          <div key={name} className="glass-card p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-[10px] text-muted-foreground">{i + 1} day{i > 0 ? "s" : ""} ago</p>
            </div>
            <span className="text-xs text-primary font-display font-semibold">+500 pts</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Referrals;
