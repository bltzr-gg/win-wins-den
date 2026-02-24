import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Copy, Share2, Users, Gift, Check, Star, ChevronRight,
  Zap, Shield, Settings, Wallet, Award
} from "lucide-react";

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const code = "REALBET-DEGEN";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pinnedBadges = [
    { name: "High Roller", rarity: "Epic" },
    { name: "OG Player", rarity: "Legendary" },
  ];

  const menuItems = [
    { label: "Referrals", icon: Users, path: "/profile/referrals", desc: "7 friends joined" },
    { label: "Wager with Points", icon: Zap, path: "/profile/wager", desc: "Risk it for the biscuit" },
    { label: "Switch Bonus", icon: Shield, path: "/profile/switch", desc: "Check your eligibility" },
    { label: "Settings", icon: Settings, path: "/profile/settings", desc: "Notifications & preferences" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        className="glass-card p-6 lg:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 flex items-center justify-center">
            <span className="text-3xl font-display font-bold text-primary">R</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-display font-bold">RealBettor</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold border border-accent/30">
                Gold Tier
              </span>
              <span className="text-xs text-muted-foreground">Regular ⭐</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Member since Jan 2026</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">REAL Points</p>
            <p className="text-2xl font-display font-bold text-gradient-accent">12,450</p>
          </div>
        </div>

        {/* Badge Showcase */}
        {pinnedBadges.length > 0 && (
          <div className="mt-5 pt-5 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-2">Badge Showcase</p>
            <div className="flex gap-2">
              {pinnedBadges.map((b) => (
                <span
                  key={b.name}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border ${
                    b.rarity === "Legendary"
                      ? "bg-accent/15 text-accent border-accent/30"
                      : "bg-epic/15 text-epic border-epic/30"
                  }`}
                >
                  <Star className="w-3 h-3 inline mr-1" />
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Referral Code Quick Card */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Gift className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-display font-semibold">Your Referral Code</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-11 rounded-xl bg-secondary border border-border px-4 flex items-center">
            <span className="font-display font-bold tracking-[0.12em] text-gradient-primary">{code}</span>
          </div>
          <motion.button
            onClick={handleCopy}
            className="h-11 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:brightness-110 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </motion.button>
        </div>
        <div className="flex gap-2 mt-3">
          {["X / Twitter", "Telegram", "WhatsApp"].map((platform) => (
            <button
              key={platform}
              className="flex-1 py-2 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3 h-3" /> {platform}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Link
              to={item.path}
              className="glass-card-hover p-4 flex items-center gap-4 block"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
