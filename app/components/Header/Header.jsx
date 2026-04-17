"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { headerAnimation } from "@/app/lib/animations";
import { cn } from "@/app/lib/cn";
import { usePathname } from "next/navigation";
import { useMenuStore } from "@/app/context/UIContext";
import Link from "next/link";
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
        className="fixed h-22 w-screen z-[10000] flex"
        {...headerAnimation}
      >
        {/* Logo - hidden on mobile when menu is open */}
        <div className={cn(
          "flex items-center justify-center mr-auto ml-8 max-md:mr-4 max-md:ml-auto transition-opacity duration-300",
          isMenuVisible && "max-md:opacity-0 max-md:pointer-events-none"
        )}>
          <Link href="/" className="block">
            {/* Plain <img>: vinext routes next/image through a 302 redirect
              (no local optimization) which renders as a broken icon on
              first paint. Logo is 22KB — no optimization needed. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Luigi Simiani"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mr-8 gap-4 ml-auto flex items-center justify-center max-md:hidden">
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
      </motion.header>
    </>
  );
}
