import { motion } from "framer-motion";
import { Rocket, Clock, Wallet, Shield, Users, Calendar, Mail, Crown, TrendingUp, Check } from "lucide-react";

/* ─── Countdown ─── */
function CountdownPlaceholder() {
  const units = [
    { label: "Days", value: "—" },
    { label: "Hours", value: "—" },
    { label: "Minutes", value: "—" },
    { label: "Seconds", value: "—" },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-secondary/60 border border-border/60 flex items-center justify-center">
              <span className="font-display text-2xl text-foreground/60">{u.value}</span>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1.5">{u.label}</p>
          </div>
          {i < units.length - 1 && <span className="font-display text-xl text-muted-foreground/40 mb-5">:</span>}
        </div>
      ))}
    </div>
  );
}

/* ─── Sale Eligibility ─── */
function SaleEligibility() {
  const items = [
    { label: "Season 1 Participant", value: "Active", icon: Check, color: "text-multiplier" },
    { label: "Current Tier", value: "Gold", icon: Crown, color: "text-gold" },
    { label: "Projected Allocation Tier", value: "Tier 2", icon: TrendingUp, color: "text-amber" },
  ];

  return (
    <motion.div
      className="rounded-2xl border border-gold/20 bg-card p-6 space-y-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-gold" />
        <h3 className="font-display text-sm tracking-wider">YOUR SALE ELIGIBILITY</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-secondary/30 border border-border/50 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
            </div>
            <p className={`font-display text-lg ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground">Final allocation based on Season 1 leaderboard rank.</p>
    </motion.div>
  );
}

/* ─── Info Block ─── */
function InfoBlock({ icon: Icon, title, description, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-border bg-card p-6 space-y-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="w-10 h-10 rounded-xl bg-secondary/60 border border-border/60 flex items-center justify-center">
        <Icon className="w-5 h-5 text-foreground/70" />
      </div>
      <h3 className="font-display text-sm tracking-wider text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ═══════════ PUBLIC SALE PAGE ═══════════ */
export default function PublicSale() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_20%_8%)] via-background to-[hsl(240_10%_6%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[hsl(0_60%_25%/0.06)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[hsl(260_40%_25%/0.04)] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 metallic-sheen pointer-events-none" />

        <div className="relative z-10 px-8 py-16 lg:py-24 text-center border border-border/30 rounded-2xl space-y-8">
          {/* Coming Soon badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Coming Soon</span>
          </motion.div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl tracking-wide leading-tight text-foreground">
              COMMUNITY TOKEN<br />
              <span className="text-primary">PUBLIC SALE</span>
            </h1>
            <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
              Details coming soon. Prepare your wallet.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-3">
            <p className="text-[10px] text-foreground/50 uppercase tracking-wider">TGE: Coming Soon</p>
            <CountdownPlaceholder />
          </div>

          {/* Waitlist CTA */}
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-display text-sm tracking-wider hover:brightness-110 transition-all"
            style={{ boxShadow: "0 0 30px hsl(0 84% 40% / 0.2)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4" />
            Join Waitlist
          </motion.button>

          <p className="text-[10px] text-foreground/40">No commitments. Be the first to know.</p>
        </div>
      </motion.div>

      {/* Sale Eligibility */}
      <SaleEligibility />

      {/* 3 Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoBlock
          icon={Rocket}
          title="WHAT IS THE PUBLIC SALE?"
          description="The RealBet Community Token Public Sale is your opportunity to participate in the platform's growth. Token holders gain access to exclusive ecosystem benefits and governance participation."
          delay={0.1}
        />
        <InfoBlock
          icon={Wallet}
          title="HOW TO PARTICIPATE"
          description="Connect your wallet, verify eligibility, and commit your allocation during the sale window. Early supporters and active VIP Hub members may receive priority access."
          delay={0.15}
        />
        <InfoBlock
          icon={Calendar}
          title="TIMELINE"
          description="Token Sale → TGE → Exchange Listing. Exact dates will be announced through official channels. Follow RealBet on X and join Discord for the latest updates."
          delay={0.2}
        />
      </div>

      {/* Trust strip */}
      <motion.div
        className="rounded-xl border border-border/40 bg-card p-5 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center gap-2 text-[10px] text-foreground/60">
          <Shield className="w-3.5 h-3.5" />
          <span>Secure & Transparent</span>
        </div>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2 text-[10px] text-foreground/60">
          <Users className="w-3.5 h-3.5" />
          <span>Community-First Allocation</span>
        </div>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2 text-[10px] text-foreground/60">
          <Clock className="w-3.5 h-3.5" />
          <span>Fair Launch Mechanics</span>
        </div>
      </motion.div>
    </div>
  );
}
