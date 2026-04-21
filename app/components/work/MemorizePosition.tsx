"use client"

import { useState, useEffect, type ReactNode } from "react";
import { useUI } from "@/app/context/UIContext";

interface MemorizePositionProps {
  children: ReactNode;
}

export default function MemorizePosition({ children }: MemorizePositionProps) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const { isMenuVisible } = useUI()

    useEffect(() => {
      if (isMenuVisible) {
        setScrollPosition(window.scrollY);
      } else {
        window.scrollTo(0, scrollPosition);
      }
    }, [isMenuVisible, scrollPosition]);

    return(
      <>
        {children}
      </>
    )
  }
