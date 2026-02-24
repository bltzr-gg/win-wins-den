import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Users, Gift, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const code = "REALBET-DEGEN";

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

  const friends = [
    { name: "CryptoFan", active: true, pts: 500, daysAgo: 1 },
    { name: "LuckyDice", active: true, pts: 500, daysAgo: 2 },
    { name: "NovaBet", active: true, pts: 500, daysAgo: 3 },
    { name: "DegenerateMax", active: false, pts: 500, daysAgo: 5 },
    { name: "MoonShot", active: true, pts: 500, daysAgo: 7 },
    { name: "WagerPro", active: true, pts: 500, daysAgo: 10 },
    { name: "BetLord", active: false, pts: 500, daysAgo: 14 },
  ];

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Link to="/profile" className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Referrals</h1>
          <p className="text-sm text-muted-foreground">Invite friends. Earn together.</p>
        </div>
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
          <p className="text-2xl font-display font-bold tracking-[0.15em] text-gradient-primary">{code}</p>
        </div>
        <motion.button
          onClick={handleCopy}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 glow-primary hover:brightness-110 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
        </motion.button>
        <div className="flex justify-center gap-3 pt-1">
          {["X / Twitter", "Telegram", "WhatsApp", "Copy Link"].map((platform) => (
            <button
              key={platform}
              className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> {platform}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Reward Breakdown */}
      <motion.div className="glass-card p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-semibold text-sm">Reward Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 glass-card p-3 text-center">
            <p className="text-lg font-display font-bold text-primary">200</p>
            <p className="text-[10px] text-muted-foreground">You earn per friend</p>
          </div>
          <div className="flex-1 glass-card p-3 text-center">
            <p className="text-lg font-display font-bold text-accent">200</p>
            <p className="text-[10px] text-muted-foreground">They earn on signup</p>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground italic text-center">Each active friend boosts your multiplier.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} className="glass-card p-3 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
            <p className="text-lg font-display font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Friends List */}
      <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="font-display font-semibold text-sm">Referred Friends</h3>
        {friends.map((friend) => (
          <div key={friend.name} className="glass-card p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold">{friend.name[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{friend.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {friend.daysAgo} day{friend.daysAgo > 1 ? "s" : ""} ago · {friend.active ? (
                  <span className="text-streak">Active</span>
                ) : (
                  <span className="text-muted-foreground">Inactive</span>
                )}
              </p>
            </div>
            <span className="text-xs text-primary font-display font-semibold">+{friend.pts} pts</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Referrals;
