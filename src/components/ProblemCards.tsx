import { motion, useReducedMotion, type Variants } from "framer-motion";

const PIECES = [
  {
    name: "Build a strategy",
    stat: "01",
    body: "Powerful tools exist to design and test trading strategies — but they stop at the chart. Nothing runs.",
  },
  {
    name: "See who's winning",
    stat: "02",
    body: "Communities surface ideas and track records — but you still have to place every trade yourself.",
  },
  {
    name: "Execute automatically",
    stat: "03",
    body: "Brokerages can run automated orders — with no marketplace of proven strategies to draw from.",
  },
];

export default function ProblemCards() {
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
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        className="grid gap-5 md:grid-cols-3"
      >
        {PIECES.map((c) => (
          <motion.div
            key={c.name}
            variants={item}
            className="glass-soft rounded-2xl p-7"
          >
            <span className="font-mono text-xs text-accent">{c.stat}</span>
            <h3 className="mt-3 font-serif text-lg font-semibold text-ink">
              {c.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 text-center font-serif text-2xl font-semibold text-ink sm:text-3xl"
      >
        Meridian is the first to{" "}
        <span className="text-gradient-gold">combine all three.</span>
      </motion.p>
    </div>
  );
}
