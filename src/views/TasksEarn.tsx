"use client";

import { ExternalLink, MessageCircle, Share2, Dices, Trophy, Gift, Users, Check, ArrowRight } from "lucide-react";

const dailyTasks = [
  { title: "Follow @RealBet on X", points: 50, status: "done", icon: ExternalLink },
  { title: "Join Discord Server", points: 100, status: "done", icon: MessageCircle },
  { title: "Retweet Daily Post", points: 30, status: "go", icon: Share2 },
  { title: "Quote Tweet with #RealBet", points: 75, status: "claim", icon: Share2 },
  { title: "Place 3 Bets", points: 100, status: "go", icon: Dices, progress: "1/3" },
  { title: "Place a Sports Bet", points: 50, status: "go", icon: Trophy },
  { title: "Open a Reward Chest", points: 25, status: "go", icon: Gift },
  { title: "Refer a Friend", points: 200, status: "go", icon: Users },
];

const weeklyQuests = [
  { title: "Win 10 Games", points: 500, current: 6, total: 10 },
  { title: "Wager 5,000 Points", points: 750, current: 2100, total: 5000 },
  { title: "Complete All Daily Tasks (5 days)", points: 1000, current: 3, total: 5 },
];

export default function TasksEarn() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">TASKS & EARN</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete tasks to earn REAL Points</p>
      </div>

      {/* Daily Tasks */}
      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">DAILY TASKS</h2>
        <div className="space-y-2">
          {dailyTasks.map((task) => (
            <div key={task.title} className="card-surface p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <task.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                {task.progress && <span className="text-[10px] text-muted-foreground">{task.progress}</span>}
              </div>
              <span className="text-xs text-gold font-semibold">+{task.points}</span>
              {task.status === "done" && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-multiplier/10 text-multiplier text-[10px] font-semibold">
                  <Check className="w-3 h-3" /> Done
                </div>
              )}
              {task.status === "go" && (
                <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-1">
                  Go <ArrowRight className="w-3 h-3" />
                </button>
              )}
              {task.status === "claim" && (
                <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground text-[10px] font-semibold glow-crimson hover:brightness-110 transition-all">
                  Claim
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Quests */}
      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">WEEKLY BONUS QUESTS</h2>
        <div className="space-y-2">
          {weeklyQuests.map((quest) => {
            const pct = Math.round((quest.current / quest.total) * 100);
            return (
              <div key={quest.title} className="card-surface p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{quest.title}</p>
                  <span className="text-xs text-gold font-semibold">+{quest.points}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-crimson-deep to-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground">{quest.current} / {quest.total} ({pct}%)</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
