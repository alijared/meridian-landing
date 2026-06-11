import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** stagger delay in seconds */
  delay?: number;
  /** vertical travel distance in px */
  y?: number;
  className?: string;
  /** render as a different element if needed */
  as?: "div" | "section" | "li" | "span";
}

/**
 * Fade + slide-up on scroll into view. Used across sections for a consistent,
 * tasteful reveal. Honors prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
