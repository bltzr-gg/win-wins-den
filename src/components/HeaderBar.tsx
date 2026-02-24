import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderBar = () => {
  return (
    <div className="border-b border-border/30 bg-background/60 backdrop-blur-md">
      <div className="max-w-hub mx-auto flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: User */}
        <Link to="/profile" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 flex items-center justify-center">
            <span className="text-sm font-display font-bold text-primary">R</span>
          </div>
          <span className="text-sm font-medium group-hover:text-foreground transition-colors">
            RealBettor
          </span>
        </Link>

        {/* Right: Points + Bell */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 rounded-xl bg-secondary border border-border/50 flex items-center gap-2">
            <span className="text-lg font-display font-bold">12,450</span>
            <span className="text-xs font-display font-semibold text-primary">PTS</span>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
