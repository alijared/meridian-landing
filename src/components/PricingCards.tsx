import { motion, useReducedMotion, type Variants } from "framer-motion";

const CARDS = [
  {
    figure: "0%",
    label: "when strategies lose",
    body: "No fee is ever charged on losses. If a strategy is down, you pay nothing.",
    tone: "neutral" as const,
  },
  {
    figure: "10%",
    label: "performance fee on realized profits",
    body: "A flat fee on realized profits only. No subscriptions, no monthly fees, no charge on the capital you deposit.",
    tone: "accent" as const,
  },
  {
    figure: "40%",
    label: "of the performance fee rewards the creator",
    body: "Of every performance fee, 40% goes to the strategy's creator and 60% to Meridian. Creators earn as their strategies attract capital and perform.",
    tone: "neutral" as const,
  },
];

export default function PricingCards() {
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
      className="grid gap-5 md:grid-cols-3"
    >
      {CARDS.map((c) => (
        <motion.div
          key={c.figure}
          variants={item}
          whileHover={reduce ? undefined : { scale: 1.03 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className={`glass rounded-2xl p-8 text-center ${
            c.tone === "accent"
              ? "border-accent/30 bg-accent/[0.06]"
              : ""
          }`}
        >
          <p
            className={`font-mono text-5xl font-semibold tracking-tight ${
              c.tone === "accent" ? "text-accent" : "text-ink"
            }`}
          >
            {c.figure}
          </p>
          <p className="mt-3 text-sm font-medium text-ink">{c.label}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-3">{c.body}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
