"use client";

import { motion } from "framer-motion";
import { dividerAnimation } from "@/lib/animations";

export default function Divider() {
  return (
    <motion.div
      className="divider"
      {...dividerAnimation}
    />
  );
}
