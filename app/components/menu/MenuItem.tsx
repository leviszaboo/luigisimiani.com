"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MenuItemProps {
  href: string;
  label: string;
  toggleMenu: () => void;
  delay?: number;
  className?: string;
}

export default function MenuItem({ href, label, toggleMenu, delay = 0, className = "" }: MenuItemProps) {
  return (
    <motion.li
      className={className}
      exit={{
        scale: 0.6,
        originX: 0.37,
        opacity: 0,
        transition: { duration: 0.5, delay: delay }
      }}
    >
      <Link
        href={href}
        onClick={toggleMenu}
        className="menu-link relative font-semibold inline-block py-4 no-underline text-left z-[120] max-sm:py-3 tracking-wider max-sm:text-[35px]"
      >
        {label}
      </Link>
    </motion.li>
  );
}
