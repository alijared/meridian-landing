import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
    >
      <motion.div variants={item}>
        <span className="inline-flex items-center gap-2 rounded-full border border-rule-strong bg-paper/60 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-2 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Now in closed beta
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        The social network for{" "}
        <span className="text-gradient-gold">investing strategies</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg"
      >
        Start with strategies already tested, ranked, and validated by the
        community. Follow top investors, join investing communities, and invest
        alongside strategies you trust.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#waitlist"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 text-sm font-semibold text-on-accent shadow-[0_8px_30px_rgba(201,168,106,0.25)] transition-all hover:bg-accent-2 hover:shadow-[0_8px_40px_rgba(201,168,106,0.4)] sm:w-auto"
        >
          Join the waitlist
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#features"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-rule-strong bg-paper/40 px-7 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-rule-strong hover:bg-paper-2 sm:w-auto"
        >
          Explore the network
        </a>
      </motion.div>

      <motion.div
        variants={item}
        className="relative mt-16 w-full max-w-3xl"
      >
        <ProductMock />
      </motion.div>
    </motion.div>
  );
}

const FEED_CARDS = [
  {
    initials: "NO",
    color: "bg-accent/20 text-accent",
    creator: "Naomi Okafor",
    followers: "3.1k",
    strategy: "Adaptive Momentum",
    ret: "+47.2%",
    risk: "med",
    sparkPath: "M0 28 L12 24 L24 26 L36 18 L48 20 L60 12 L72 14 L84 6 L96 8 L108 2 L120 0",
    fillPath: "M0 28 L12 24 L24 26 L36 18 L48 20 L60 12 L72 14 L84 6 L96 8 L108 2 L120 0 L120 32 L0 32 Z",
  },
  {
    initials: "DR",
    color: "bg-signal/20 text-signal",
    creator: "Daniel Reyes",
    followers: "2.4k",
    strategy: "Volatility Harvest",
    ret: "+34.6%",
    risk: "high",
    sparkPath: "M0 20 L12 22 L24 16 L36 18 L48 10 L60 14 L72 8 L84 12 L96 4 L108 6 L120 2",
    fillPath: "M0 20 L12 22 L24 16 L36 18 L48 10 L60 14 L72 8 L84 12 L96 4 L108 6 L120 2 L120 32 L0 32 Z",
  },
  {
    initials: "PA",
    color: "bg-gain/20 text-gain",
    creator: "Priya Anand",
    followers: "1.7k",
    strategy: "Sector Rotation",
    ret: "+21.8%",
    risk: "med",
    sparkPath: "M0 24 L12 26 L24 20 L36 22 L48 14 L60 18 L72 10 L84 14 L96 8 L108 10 L120 4",
    fillPath: "M0 24 L12 26 L24 20 L36 22 L48 14 L60 18 L72 10 L84 14 L96 8 L108 10 L120 4 L120 32 L0 32 Z",
  },
];

const TRENDING = [
  { rank: 1, name: "Adaptive Momentum", creator: "Naomi Okafor", ret: "+47.2%" },
  { rank: 2, name: "Volatility Harvest", creator: "Daniel Reyes", ret: "+34.6%" },
  { rank: 3, name: "Sector Rotation", creator: "Priya Anand", ret: "+21.8%" },
  { rank: 4, name: "Iron Butterfly · SPY", creator: "Marcus Lindqvist", ret: "+12.4%" },
  { rank: 5, name: "Covered Call · QQQ", creator: "Hannah Cole", ret: "+8.3%" },
];

const riskColor: Record<string, string> = {
  low: "text-gain bg-gain-soft",
  med: "text-warn bg-warn-soft",
  high: "text-loss bg-loss-soft",
};

function ProductMock() {
  return (
    <div className="glass overflow-hidden rounded-2xl text-left">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-loss/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gain/70" />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-ink-3">
          <svg viewBox="0 0 22 22" className="h-3.5 w-3.5 text-accent" aria-hidden="true">
            <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 11 L 21 11" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 6.5 Q 11 11 5 15.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
          Strategy feed
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-gain-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gain">
          <span className="h-1.5 w-1.5 rounded-full bg-gain" />
          Live
        </span>
      </div>

      {/* feed tabs */}
      <div className="flex items-center gap-0 border-b border-white/5 px-5">
        <button className="border-b-2 border-accent px-4 py-2.5 text-xs font-semibold text-accent">
          Trending
        </button>
        <button className="border-b-2 border-transparent px-4 py-2.5 text-xs font-medium text-ink-3">
          Top Performers
        </button>
        <button className="border-b-2 border-transparent px-4 py-2.5 text-xs font-medium text-ink-3">
          Following
        </button>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1.6fr_1fr]">
        {/* strategy feed cards */}
        <div className="divide-y divide-white/5">
          {FEED_CARDS.map((card) => (
            <div key={card.creator} className="px-5 py-4">
              <div className="flex items-start gap-3">
                {/* avatar */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${card.color}`}>
                  {card.initials}
                </div>
                <div className="min-w-0 flex-1">
                  {/* creator line */}
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ink">{card.creator}</span>
                    <span className="text-[10px] text-ink-3">·</span>
                    <span className="text-[10px] text-ink-3">{card.followers} followers</span>
                  </div>
                  {/* strategy name + performance */}
                  <div className="mt-1 flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{card.strategy}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${riskColor[card.risk]}`}>
                      {card.risk}
                    </span>
                  </div>
                  {/* sparkline + stats row */}
                  <div className="mt-2.5 flex items-end justify-between gap-3">
                    <svg viewBox="0 0 120 32" className="h-8 w-24 shrink-0" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`spark-${card.initials}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(95,181,133,0.3)" />
                          <stop offset="100%" stopColor="rgba(95,181,133,0)" />
                        </linearGradient>
                      </defs>
                      <path d={card.fillPath} fill={`url(#spark-${card.initials})`} />
                      <path d={card.sparkPath} fill="none" stroke="#5fb585" strokeWidth="1.5" />
                    </svg>
                    <span className="font-mono text-base font-semibold text-gain">{card.ret}</span>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md border border-rule-strong px-2.5 py-1 text-[10px] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink">
                        Follow
                      </button>
                      <button className="rounded-md bg-accent px-2.5 py-1 text-[10px] font-semibold text-on-accent transition-colors hover:bg-accent-2">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* trending sidebar (desktop only) */}
        <div className="hidden flex-col border-l border-white/5 sm:flex">
          <div className="border-b border-white/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Trending this week</p>
          </div>
          <div className="divide-y divide-white/5">
            {TRENDING.map((t) => (
              <div key={t.rank} className="flex items-center gap-3 px-4 py-2.5">
                <span className="w-4 font-mono text-xs text-ink-3">{t.rank}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-ink">{t.name}</p>
                  <p className="truncate text-[10px] text-ink-3">by {t.creator}</p>
                </div>
                <span className="font-mono text-xs font-medium text-gain">{t.ret}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
