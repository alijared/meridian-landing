import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Hero content with sequential fade-in on load (stagger ~150ms per element).
 * The animated background lives in the .astro markup behind this island;
 * this component owns the foreground text, CTAs, and the CSS product mock.
 */
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
        Build strategies.{" "}
        <span className="text-gradient-gold">Follow the best.</span> Execute
        automatically.
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg"
      >
        Meridian is the first platform to combine a strategy builder, a ranked
        strategy marketplace, and live execution — all in one place.
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
          href="#how-it-works"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-rule-strong bg-paper/40 px-7 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-rule-strong hover:bg-paper-2 sm:w-auto"
        >
          See how it works
        </a>
      </motion.div>

      {/* Product UI glimpse — pure CSS/HTML, no image. */}
      <motion.div
        variants={item}
        className="relative mt-16 w-full max-w-3xl"
      >
        <ProductMock />
      </motion.div>
    </motion.div>
  );
}

/**
 * A leaderboard + strategy-insight card styled to look like the real Meridian
 * product surface. Static, decorative — not real data.
 *
 * Left: strategies ranked by 30d return (all positive — it's a "best
 * performers" board). Right: an insight panel for the currently-selected
 * (highlighted) strategy — followers, capital, total profit, avg trade, etc.
 */
function ProductMock() {
  const rows = [
    { rank: 1, name: "Adaptive Momentum", author: "Naomi Okafor", ret: "+47.2%", risk: "med", followers: "3.1k", selected: true },
    { rank: 2, name: "Volatility Harvest", author: "Daniel Reyes", ret: "+34.6%", risk: "high", followers: "2.4k", selected: false },
    { rank: 3, name: "Sector Rotation", author: "Priya Anand", ret: "+21.8%", risk: "med", followers: "1.7k", selected: false },
    { rank: 4, name: "Iron Butterfly · SPY", author: "Marcus Lindqvist", ret: "+12.4%", risk: "low", followers: "1.1k", selected: false },
    { rank: 5, name: "Covered Call · QQQ", author: "Hannah Cole", ret: "+8.3%", risk: "low", followers: "920", selected: false },
  ];

  const riskColor: Record<string, string> = {
    low: "text-gain bg-gain-soft",
    med: "text-warn bg-warn-soft",
    high: "text-loss bg-loss-soft",
  };

  const selected = rows.find((r) => r.selected) ?? rows[0];

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
          Live leaderboard · 30d
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-gain-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gain">
          <span className="h-1.5 w-1.5 rounded-full bg-gain" />
          Live
        </span>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1.7fr_1fr]">
        {/* leaderboard */}
        <div>
          {/* column headers */}
          <div className="flex items-center gap-3 border-b border-white/5 px-5 py-2 text-[10px] font-medium uppercase tracking-wide text-ink-3">
            <span className="w-4">#</span>
            <span className="flex-1">Strategy</span>
            <span className="hidden w-12 text-right sm:inline">Risk</span>
            <span className="w-14 text-right">30d</span>
          </div>

          <div className="divide-y divide-white/5">
            {rows.map((r) => (
              <div
                key={r.rank}
                className={`flex items-center gap-3 px-5 py-3 ${
                  r.selected ? "bg-accent/[0.07]" : ""
                }`}
              >
                <span
                  className={`w-4 font-mono text-xs ${r.selected ? "text-accent" : "text-ink-3"}`}
                >
                  {r.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{r.name}</p>
                  <p className="truncate text-xs text-ink-3">
                    by {r.author} · {r.followers} following
                  </p>
                </div>
                <span
                  className={`hidden w-12 justify-end sm:flex`}
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${riskColor[r.risk]}`}
                  >
                    {r.risk}
                  </span>
                </span>
                <span className="w-14 text-right font-mono text-sm font-medium text-gain">
                  {r.ret}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* strategy insight panel — for the selected strategy */}
        <div className="hidden flex-col border-l border-white/5 p-5 sm:flex">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {selected.name}
              </p>
              <p className="truncate text-xs text-ink-3">by {selected.author}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${riskColor[selected.risk]}`}
            >
              {selected.risk} risk
            </span>
          </div>

          <p className="mt-3 font-mono text-2xl font-semibold text-gain">
            {selected.ret}
            <span className="ml-1 align-middle text-[10px] font-medium uppercase tracking-wide text-ink-3">
              30d
            </span>
          </p>

          {/* equity curve for this strategy */}
          <svg
            viewBox="0 0 200 64"
            className="mt-3 h-16 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(95,181,133,0.35)" />
                <stop offset="100%" stopColor="rgba(95,181,133,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 52 L20 48 L40 50 L60 40 L80 42 L100 30 L120 34 L140 20 L160 24 L180 12 L200 6 L200 64 L0 64 Z"
              fill="url(#spark)"
            />
            <path
              d="M0 52 L20 48 L40 50 L60 40 L80 42 L100 30 L120 34 L140 20 L160 24 L180 12 L200 6"
              fill="none"
              stroke="#5fb585"
              strokeWidth="1.5"
            />
          </svg>

          {/* strategy stats */}
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
            <Stat label="Followers" value={selected.followers} />
            <Stat label="Total profit" value="$1.2M" />
            <Stat label="Avg trade" value="$3,400" />
            <Stat label="30d volume" value="$8.6M" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-ink-3">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
