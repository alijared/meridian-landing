import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Wrench, Users, Trophy, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: Wrench,
    title: "Strategy Builder",
    body: "Start from proven templates like Iron Butterfly or build your own rules from scratch. No code required.",
  },
  {
    icon: Users,
    title: "Follow Strategies",
    body: "Allocate capital to proven, automated strategies — you back the strategy, not the person. No subscriptions, no copying anyone's trades.",
  },
  {
    icon: Trophy,
    title: "Live Leaderboard",
    body: "See top earners and the strategies behind them, ranked by real performance — return, risk-adjusted return, drawdown, and consistency.",
  },
  {
    icon: Bot,
    title: "Auto-Execution",
    body: "Connect your brokerage and let Meridian execute your strategies automatically, 24/7.",
  },
];

export default function Features() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      className="grid gap-5 sm:grid-cols-2"
    >
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.title}
            variants={item}
            className="glass group rounded-2xl p-7 transition-colors hover:border-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-serif text-xl font-semibold text-ink">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.body}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
