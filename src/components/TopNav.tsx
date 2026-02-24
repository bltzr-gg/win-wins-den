import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const navItems = [
  { path: "/hub", label: "Hub" },
  { path: "/tasks", label: "Tasks" },
  { path: "/leaderboard", label: "Leaderboard" },
  { path: "/badges", label: "Badges" },
  { path: "/referrals", label: "Referrals" },
];

const TopNav = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="max-w-hub mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/hub" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:glow-primary-sm transition-all">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-gradient-primary">RealBet</span>
            <span className="text-muted-foreground text-sm font-medium ml-1.5">VIP</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="topnav-indicator"
                    className="absolute inset-0 bg-secondary rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-display font-semibold text-foreground">
            12,450 <span className="text-primary">PTS</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 flex items-center justify-center">
            <span className="text-sm font-display font-bold text-primary">R</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
