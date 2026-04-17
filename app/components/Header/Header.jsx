"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { headerAnimation } from "@/app/lib/animations";
import { cn } from "@/app/lib/cn";
import { usePathname } from "next/navigation";
import { useMenuStore } from "@/app/context/UIContext";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "../Menu/MenuButton/MenuButton";

export default function Header() {
  const [activeLink, setActiveLink] = useState(null);
  const currentPathname = usePathname();
  const { isMenuVisible } = useMenuStore();

  useEffect(() => {
    setActiveLink(currentPathname);
  }, [currentPathname]);

  const regex = /^\/gallery.*$/;

  return (
    <>
      <MenuButton />
      <motion.header
        className="fixed h-22 w-screen z-[10000] px-4 md:px-8"
        {...headerAnimation}
      >
        {/* Padding sits on the outer element, inner max-w-7xl matches the
          exact pattern used by /gallery/[id] page so the logo/nav align
          pixel-perfect with Back / category / grid edges. */}
        <div className="max-w-7xl mx-auto h-full flex items-center">
          {/* Logo - hidden on mobile when menu is open */}
          <div className={cn(
            "flex items-center justify-center mr-auto max-md:mr-4 max-md:ml-auto transition-opacity duration-300",
            isMenuVisible && "max-md:opacity-0 max-md:pointer-events-none"
          )}>
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Luigi Simiani"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="gap-4 ml-auto flex items-center justify-center max-md:hidden">
          <h2>
            <Link
              href="/gallery"
              className={cn(
                "text-white font-semibold py-4 no-underline hover:underline hover:underline-offset-4",
                regex.test(activeLink) && "underline underline-offset-4"
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
        </div>
      </motion.header>
    </>
  );
}
