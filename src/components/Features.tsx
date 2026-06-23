import { motion, useReducedMotion, type Variants } from "framer-motion";
import { UserPlus, Users, Share2, Trophy, Compass, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: UserPlus,
    title: "Follow Investors",
    body: "Follow strategy creators and top performers. See their new strategies, returns, and activity in your feed.",
  },
  {
    icon: Users,
    title: "Investing Communities",
    body: "Join public or private investing groups. Share strategies, discuss markets, and collaborate with like-minded investors.",
  },
  {
    icon: Share2,
    title: "Strategies as Social Objects",
    body: "Strategies are shared, discussed, and remixed like content. Anyone can view a strategy's full history and copy it instantly.",
  },
  {
    icon: Trophy,
    title: "Live Leaderboards",
    body: "Public leaderboards ranked by real returns, risk-adjusted performance, drawdown, and consistency. No self-reported results.",
  },
  {
    icon: Compass,
    title: "Strategy Discovery",
    body: "A personalized feed of strategies matched to your goals and risk profile, powered by community adoption and performance data.",
  },
  {
    icon: Zap,
    title: "One-Click Execution",
    body: "Copy any strategy and start investing instantly. Meridian handles execution so you can go from discovery to deployment in seconds.",
  },
];

export default function Features() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
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
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
