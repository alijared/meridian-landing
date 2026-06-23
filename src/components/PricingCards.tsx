import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  figure: string;
  period?: string;
  description: string;
  features: string[];
  tone: "neutral" | "accent";
}

const PLANS: Plan[] = [
  {
    name: "Free",
    figure: "$0",
    description: "Learn, discover, and experiment. Full access to the social network, strategy feed, and paper trading.",
    features: [
      "Full access to feed, leaderboards, and groups",
      "Discover, follow, and copy strategies",
      "1 paper trading portfolio",
      "Basic performance tracking",
      "Join and create investing groups",
    ],
    tone: "neutral",
  },
  {
    name: "Pro",
    figure: "$20",
    period: "/mo",
    description: "Deploy capital, run multiple experiments, and automate your investing workflow. Everything you need to invest seriously.",
    features: [
      "Everything in Free",
      "Unlimited paper trading portfolios",
      "Advanced strategy testing and comparison",
      "Deeper analytics — risk, drawdown, attribution",
      "Strategy versioning and iteration tools",
      "Live trading",
    ],
    tone: "accent",
  },
];

export default function PricingCards() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14 } },
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
      className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
    >
      {PLANS.map((plan) => (
        <motion.div
          key={plan.name}
          variants={item}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className={`glass rounded-2xl p-8 ${
            plan.tone === "accent"
              ? "border-accent/30 bg-accent/[0.06]"
              : ""
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-2">
            {plan.name}
          </p>
          <p className="mt-3 flex items-baseline gap-1">
            <span
              className={`font-mono text-5xl font-semibold tracking-tight ${
                plan.tone === "accent" ? "text-accent" : "text-ink"
              }`}
            >
              {plan.figure}
            </span>
            {plan.period && (
              <span className="text-base font-medium text-ink-3">{plan.period}</span>
            )}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            {plan.description}
          </p>

          <div className="mt-6 border-t border-white/5 pt-6">
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gain" strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
