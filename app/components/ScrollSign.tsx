"use client";

import { motion } from "framer-motion";

interface ScrollSignProps {
  delay1?: number;
  delay2?: number;
}

export default function ScrollSign({ delay1 = 0, delay2 = 0.1 }: ScrollSignProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        className="text-xs uppercase tracking-widest text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay1, duration: 0.5 }}
      >
        Scroll
      </motion.span>
      <motion.div
        className="w-px h-8 bg-white/50"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{
          delay: delay2,
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
