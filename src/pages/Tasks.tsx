import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Flame, Twitter, Gamepad2, Target, Star, ChevronDown, ChevronUp } from "lucide-react";

interface Task {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  icon: React.ElementType;
  type: "daily" | "weekly" | "special";
  progress?: { current: number; total: number };
  endsIn?: string;
}

const allTasks: Task[] = [
  { id: "1", title: "Place 3 bets today", points: 50, completed: true, icon: Target, type: "daily" },
  { id: "2", title: "Try a new game", points: 30, completed: false, icon: Gamepad2, type: "daily" },
  { id: "3", title: "Share on Twitter/X", points: 25, completed: false, icon: Twitter, type: "daily" },
  { id: "4", title: "Win 10 bets this week", points: 200, completed: false, icon: Star, type: "weekly", progress: { current: 4, total: 10 } },
  { id: "5", title: "7-day login streak", points: 300, completed: false, icon: Flame, type: "weekly", progress: { current: 4, total: 7 } },
  { id: "6", title: "Play Crash Royale Launch", points: 500, completed: false, icon: Gamepad2, type: "special", endsIn: "2d 14h" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(allTasks);
  const [expandedSection, setExpandedSection] = useState<string | null>("daily");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id && !t.completed ? { ...t, completed: true } : t))
    );
  };

  const sections = [
    { key: "daily", label: "Daily Tasks", icon: Clock, tasks: tasks.filter((t) => t.type === "daily") },
    { key: "weekly", label: "Weekly Challenges", icon: Target, tasks: tasks.filter((t) => t.type === "weekly") },
    { key: "special", label: "Limited Events", icon: Star, tasks: tasks.filter((t) => t.type === "special") },
  ];

  return (
    <div className="px-4 pt-6 space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Tasks & Earn</h1>
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
          <p className="text-xs text-muted-foreground">Available today</p>
          <p className="text-lg font-display font-bold text-primary">105 pts</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-lg font-display font-bold">
            {tasks.filter((t) => t.completed).length}/{tasks.length}
          </p>
        </div>
      </motion.div>

      {/* Task Sections */}
      {sections.map((section, si) => (
        <motion.div
          key={section.key}
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + si * 0.08 }}
        >
          <button
            onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <section.icon className="w-4 h-4 text-muted-foreground" />
              <span className="font-display font-semibold text-sm">{section.label}</span>
              <span className="text-xs text-muted-foreground">({section.tasks.length})</span>
            </div>
            {expandedSection === section.key ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === section.key && (
            <div className="space-y-2">
              {section.tasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  className={`glass-card p-4 flex items-center gap-3 transition-all ${
                    task.completed ? "opacity-60" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: task.completed ? 0.6 : 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.button
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      task.completed
                        ? "bg-primary/20 border-primary/40"
                        : "bg-secondary border-border hover:border-primary/50"
                    } border`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.completed ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    {task.progress && (
                      <div className="mt-1.5">
                        <div className="w-full h-1.5 rounded-full bg-muted">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {task.progress.current}/{task.progress.total}
                        </p>
                      </div>
                    )}
                    {task.endsIn && (
                      <p className="text-[10px] text-streak font-medium mt-0.5">⏳ Ends in {task.endsIn}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-display font-bold text-primary">+{task.points}</p>
                    <p className="text-[9px] text-muted-foreground">pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Tasks;
