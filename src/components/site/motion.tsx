import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "down" | "left" | "right";
};

export function Reveal({ children, className = "", delay = 0, dir = "up" }: RevealProps) {
  const reduce = useReducedMotion();

  const offset =
    dir === "up"
      ? { y: 24, x: 0 }
      : dir === "down"
        ? { y: -24, x: 0 }
        : dir === "left"
          ? { x: -28, y: 0 }
          : { x: 28, y: 0 };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
