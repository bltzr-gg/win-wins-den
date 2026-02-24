import { Link, Outlet, useLocation } from "react-router-dom";
import { Trophy, Target, Award, Users, Swords } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Hub", path: "/hub", icon: Swords },
  { label: "Tasks", path: "/tasks", icon: Target },
  { label: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { label: "Badges", path: "/badges", icon: Award },
  { label: "Referrals", path: "/referrals", icon: Users },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-hub mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            <Link to="/hub" className="flex items-center gap-2">
              <span className="font-display text-xl tracking-wider text-primary">REALBET</span>
            </Link>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              Season 1
            </span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">degen_whale</span>
            <span className="text-xs px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 font-semibold">
              Gold Tier
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
              D
            </div>
          </div>
        </div>
      </nav>

      {/* Page content with transitions */}
      <main className="max-w-hub mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
