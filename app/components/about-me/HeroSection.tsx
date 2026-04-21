"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="h-screen relative flex items-center justify-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-6xl uppercase text-center font-semibold"
      >
        About <span className="text-[#ffdba5]">Me</span>
      </motion.h1>
    </section>
  );
}
