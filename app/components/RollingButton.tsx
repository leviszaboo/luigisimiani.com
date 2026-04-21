"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RollingButtonProps {
  text: string;
  handleClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function RollingButton({ text, handleClick, className, type, disabled }: RollingButtonProps) {
  const [buttonText, setButtonText] = useState(text);
  const [animationStarted, setAnimationStarted] = useState(false);

  const chars = "<>/?;\\[{}]+_ABEGHPTYWOERSQ";

  function handleMouseEnter() {
    if (animationStarted) return;
    setAnimationStarted(true);
    let iterations = 0;

    const interval = setInterval(() => {
      setButtonText(
        text
        .split("")
        .map((letter, index) => {
          if (index + 1 < iterations) {
          return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iterations > text.length + 1) {
        clearInterval(interval);
        setButtonText(text);
        setAnimationStarted(false);
    }
      iterations += 1/2;
    }, 50);
  }

  return (
    <button
      className={cn(
        "retro bg-white text-black px-4 py-2 text-[10px] tracking-wider hover:bg-white/70 active:translate-y-0.5 transition-all duration-200 hover:cursor-pointer",
        className
      )}
      onClick={handleClick || undefined}
      onMouseEnter={handleMouseEnter}
      type={type || "button"}
      disabled={disabled || false}
    >
      {buttonText}
    </button>
  )
}
