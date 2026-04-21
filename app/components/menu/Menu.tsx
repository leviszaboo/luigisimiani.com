"use client";

import { useUI } from "@/app/context/UIContext";
import { motion, AnimatePresence } from "framer-motion";
import { menuAnimation } from "@/lib/animations";

import MenuItem from "./MenuItem";
import Divider from "./Divider";
import MenuFlowers from "./MenuFlowers";
import Backdrop from "./Backdrop";

export default function Menu() {
  const { isMenuVisible, toggleMenu } = useUI();

  return (
    <AnimatePresence>
      {isMenuVisible && (
        <>
          <Backdrop />
          <motion.ul
            className="fixed flex flex-col justify-center list-none m-0 w-fit h-fit top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 text-[2.65rem] z-[100] max-sm:text-[35px]"
            {...menuAnimation}
          >
            <MenuItem
              className="menu-item-home"
              href="/"
              label="Home"
              toggleMenu={toggleMenu}
              delay={0.35}
            />
            <MenuItem
              className="menu-item-work"
              href="/gallery"
              label="Work"
              toggleMenu={toggleMenu}
              delay={0.3}
            />
            <MenuItem
              className="menu-item-info"
              href="/about-me"
              label="About me"
              toggleMenu={toggleMenu}
              delay={0.3}
            />
            <MenuItem
              className="menu-item-contact"
              href="/contact"
              label="Contact"
              toggleMenu={toggleMenu}
              delay={0.5}
            />
          </motion.ul>
          <MenuFlowers />
          <Divider />
        </>
      )}
    </AnimatePresence>
  );
}
