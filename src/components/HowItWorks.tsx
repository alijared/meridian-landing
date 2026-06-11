import { motion, useReducedMotion, type Variants } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Pick or build a strategy",
    body: "Browse the marketplace or define your own rules using our visual strategy builder.",
  },
  {
    n: "02",
    title: "Allocate capital",
    body: "Decide how much to put behind any strategy. Paper trade first, go live when you're ready.",
  },
  {
    n: "03",
    title: "Earn automatically",
    body: "Meridian executes trades on your behalf. You only pay a fee when you profit.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
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

      <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={item} className="relative flex gap-5 md:flex-col md:gap-0">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-sm font-semibold text-accent shadow-[0_0_0_6px_rgba(10,13,18,1)]">
              {s.n}
            </div>
            <div className="md:mt-6">
              <h3 className="font-serif text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
