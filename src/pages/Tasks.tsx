import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Flame, Twitter, Gamepad2, Target, Star, Share2, Trophy, Users, Gem } from "lucide-react";

interface Task {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  icon: React.ElementType;
  progress?: { current: number; total: number };
  endsIn?: string;
  reward?: string;
}

const dailyTasks: Task[] = [
  { id: "d1", title: "Place 3 bets on any sport", points: 200, completed: true, icon: Target, progress: { current: 3, total: 3 } },
  { id: "d2", title: "Try a RealBet Original game", points: 150, completed: false, icon: Gamepad2 },
  { id: "d3", title: "Share a bet slip on X", points: 100, completed: false, icon: Share2 },
  { id: "d4", title: "Wager 100 REAL Points", points: 150, completed: false, icon: Gem },
  { id: "d5", title: "Refer a friend", points: 300, completed: false, icon: Users },
];

const weeklyTasks: Task[] = [
  { id: "w1", title: "Bet on 5 different sports", points: 1000, completed: false, icon: Trophy, progress: { current: 2, total: 5 } },
  { id: "w2", title: "Maintain a 7-day streak", points: 0, completed: false, icon: Flame, progress: { current: 4, total: 7 }, reward: "1 Free Gold Chest" },
  { id: "w3", title: "Open 10 Reward Chests", points: 0, completed: false, icon: Gem, progress: { current: 3, total: 10 }, reward: "1 Diamond Chest unlock" },
  { id: "w4", title: "Invite 3 friends who each place a bet", points: 2000, completed: false, icon: Users, progress: { current: 1, total: 3 } },
];

const specialTasks: Task[] = [
  { id: "s1", title: "UFC Fight Night: Bet on the main event", points: 500, completed: false, icon: Star, endsIn: "4h 23m", reward: "Odds Booster" },
  { id: "s2", title: "NFL Sunday: Place a parlay of 3+ legs", points: 0, completed: false, icon: Target, endsIn: "1d 6h", reward: "1 Free Chest" },
  { id: "s3", title: "New Original Game: Play within 48h", points: 500, completed: false, icon: Gamepad2, endsIn: "36h", reward: "Originals Badge" },
];

const Tasks = () => {
  const [tab, setTab] = useState<"daily" | "weekly" | "special">("daily");
  const [tasks, setTasks] = useState({ daily: dailyTasks, weekly: weeklyTasks, special: specialTasks });

  const currentTasks = tasks[tab];
  const completed = tasks.daily.filter((t) => t.completed).length;
  const todayPts = tasks.daily.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);
  const totalPts = tasks.daily.reduce((sum, t) => sum + t.points, 0);

  const toggleTask = (id: string) => {
    setTasks((prev) => ({
      ...prev,
      [tab]: prev[tab].map((t) => (t.id === id && !t.completed ? { ...t, completed: true } : t)),
    }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold">Tasks & Earn</h1>
        <p className="text-sm text-muted-foreground">Complete tasks. Stack points.</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="glass-card p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-xs text-muted-foreground">Points today</p>
          <p className="text-lg font-display font-bold">
            <span className="text-primary">{todayPts}</span>
            <span className="text-muted-foreground"> / {totalPts}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Daily tasks</p>
          <p className="text-lg font-display font-bold">
            {completed}/{tasks.daily.length}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        {(["daily", "weekly", "special"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-display font-semibold capitalize transition-all ${
              tab === t ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "daily" ? "Daily" : t === "weekly" ? "Weekly" : "Special"}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {currentTasks.map((task, i) => (
          <motion.div
            key={task.id}
            className={`glass-card-hover p-4 flex items-center gap-3 ${
              task.completed ? "opacity-60" : ""
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: task.completed ? 0.6 : 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <motion.button
              onClick={() => toggleTask(task.id)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all ${
                task.completed
                  ? "bg-primary/20 border-primary/40"
                  : "bg-secondary border-border hover:border-primary/50"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {task.completed && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-4 h-4 text-primary" />
                </motion.div>
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </p>
              {task.progress && !task.completed && (
                <div className="mt-1.5 max-w-[200px]">
                  <div className="w-full h-1.5 rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {task.progress.current}/{task.progress.total}
                  </p>
                </div>
              )}
              {task.endsIn && (
                <p className="text-[10px] text-primary font-medium mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Ends in {task.endsIn}
                </p>
              )}
              {task.reward && (
                <p className="text-[10px] text-accent font-medium mt-0.5">+ {task.reward}</p>
              )}
            </div>

            <div className="flex-shrink-0 text-right">
              {task.points > 0 && (
                <>
                  <p className="text-sm font-display font-bold text-primary">+{task.points}</p>
                  <p className="text-[9px] text-muted-foreground">pts</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state for special */}
      {currentTasks.length === 0 && (
        <div className="glass-card p-8 text-center">
          <Star className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No tasks available right now</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
