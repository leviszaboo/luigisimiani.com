"use client";

import { motion } from "framer-motion";
import { backdropAnimation } from "@/lib/animations";
import { useUI } from "@/app/context/UIContext";

export default function Backdrop() {
  const { toggleMenu } = useUI();

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-[50] cursor-pointer"
      {...backdropAnimation}
      onClick={toggleMenu}
    />
  );
}
