"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { headerAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useUI } from "@/app/context/UIContext";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "../menu/MenuButton";

export default function Header() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const currentPathname = usePathname();
  const { isMenuVisible } = useUI();

  useEffect(() => {
    setActiveLink(currentPathname);
  }, [currentPathname]);

  const regex = /^\/gallery.*$/;

  return (
    <>
      <MenuButton />
      <motion.header
        className="fixed h-22 w-screen z-[10000] flex"
        {...headerAnimation}
      >
        {/* Logo - hidden on mobile when menu is open */}
        <div className={cn(
          "logo-wrapper flex items-center justify-center mr-auto ml-8 transition-opacity duration-300",
          isMenuVisible && "menu-open-logo-hide"
        )}>
          <Link href="/" className="block cursor-pointer">
            <Image
              src="/logo.png"
              alt="Luigi Simiani"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="header-nav mr-8 gap-4 ml-auto flex items-center justify-center">
          <h2>
            <Link
              href="/gallery"
              className={cn(
                "text-white font-semibold py-4 no-underline hover:underline hover:underline-offset-4",
                activeLink && regex.test(activeLink) && "underline underline-offset-4"
              )}
            >
              WORK
            </Link>
          </h2>
          <h2>
            <Link
              href="/about-me"
              className={cn(
                "text-white font-semibold py-4 no-underline hover:underline hover:underline-offset-4",
                activeLink === "/about-me" && "underline underline-offset-4"
              )}
            >
              ABOUT
            </Link>
          </h2>
          <h2>
            <Link
              href="/contact"
              className={cn(
                "text-white font-semibold py-4 no-underline hover:underline hover:underline-offset-4",
                activeLink === "/contact" && "underline underline-offset-4"
              )}
            >
              CONTACT
            </Link>
          </h2>
        </nav>
      </motion.header>
    </>
  );
}
