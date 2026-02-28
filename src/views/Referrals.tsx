"use client";

import { Copy, Users, Gift, Clock, Check } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Total Referrals", value: "23", icon: Users },
  { label: "Active", value: "18", icon: Check },
  { label: "Earned", value: "4,600 pts", icon: Gift },
  { label: "Pending", value: "1,200 pts", icon: Clock },
];

const milestones = [
  { target: 5, reward: "500 pts + Bronze Badge", reached: true },
  { target: 15, reward: "2,000 pts + Silver Badge", reached: true },
  { target: 50, reward: "10,000 pts + Gold Badge", reached: false, current: 23 },
  { target: 100, reward: "50,000 pts + Diamond Badge + 3x Multiplier", reached: false, current: 23 },
];

export default function Referrals() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://realbet.io/ref/degen_whale");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">INVITE & EARN</h1>
        <p className="text-sm text-muted-foreground mt-1">Invite friends and earn together</p>
      </div>

      <div className="card-surface card-glow-red p-5 space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">Your Referral Link</h2>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-4 py-3 rounded-lg bg-secondary text-sm text-foreground font-mono border border-border truncate">
            https://realbet.io/ref/degen_whale
          </code>
          <button
            onClick={handleCopy}
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4 text-center space-y-2">
            <s.icon className="w-5 h-5 text-muted-foreground mx-auto" />
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className="font-display text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-wider text-muted-foreground">MILESTONE TIERS</h2>
        <div className="space-y-2">
          {milestones.map((m) => (
            <div key={m.target} className="card-surface p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display text-sm flex-shrink-0 ${
                m.reached ? "bg-multiplier/10 text-multiplier border border-multiplier/20" : "bg-secondary text-muted-foreground border border-border"
              }`}>
                {m.target}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{m.target} Referrals</p>
                <p className="text-[10px] text-muted-foreground">{m.reward}</p>
              </div>
              {m.reached ? (
                <span className="text-[10px] text-multiplier font-semibold">Claimed ✓</span>
              ) : (
                <div className="text-right">
                  <div className="w-16 h-1.5 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${((m.current || 0) / m.target) * 100}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1">{m.current}/{m.target}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
