import { motion, useReducedMotion, type Variants } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Browse the feed, trending strategies, and leaderboards to find what's working.",
  },
  {
    n: "02",
    title: "Follow",
    body: "Follow creators and top performers. Their strategies and updates appear in your feed.",
  },
  {
    n: "03",
    title: "Copy",
    body: "Copy or customize any strategy instantly. Make it yours or run it as-is.",
  },
  {
    n: "04",
    title: "Execute",
    body: "Meridian trades automatically on your behalf. Paper trade first, go live when ready.",
  },
  {
    n: "05",
    title: "Earn & grow",
    body: "Track performance, build reputation, and gain followers as your strategies succeed.",
  },
];

export default function HowItWorks() {
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
      className="relative"
    >
      {/* connector line — horizontal on desktop, vertical on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-rule-strong to-transparent md:left-0 md:right-0 md:top-[27px] md:h-px md:w-auto md:bg-gradient-to-r md:from-transparent md:via-rule-strong md:to-transparent"
      />

      <div className="relative grid gap-10 md:grid-cols-5 md:gap-6">
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={item} className="relative flex gap-5 md:flex-col md:gap-0">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-sm font-semibold text-accent shadow-[0_0_0_6px_rgba(10,13,18,1)]">
              {s.n}
            </div>
            <div className="md:mt-5">
              <h3 className="font-serif text-lg font-semibold text-ink md:text-xl">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-ink-2">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
