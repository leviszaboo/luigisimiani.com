"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import { useUI } from "@/app/context/UIContext";
import { homeFlowerContainerProps, type FlowerConfig } from "@/lib/animations";

interface FlowerProps {
  config: FlowerConfig;
}

function Flower({ config }: FlowerProps) {
  const { className, imageSrc, floatDelay, ...motionProps } = config;
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-animated values for smooth snap-back
  const springX = useSpring(x, { stiffness: 30, damping: 12, mass: 1.2 });
  const springY = useSpring(y, { stiffness: 30, damping: 12, mass: 1.2 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Float in place briefly, then drift back to original position
    setTimeout(() => {
      x.set(0);
      y.set(0);
    }, 2500);
  };

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ x: springX, y: springY }}
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        x.set(info.offset.x);
        y.set(info.offset.y);
      }}
      whileDrag={{ scale: 1.1 }}
    >
      {/* Floating animation wrapper - pauses while dragging */}
      <motion.img
        src={imageSrc}
        alt=""
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
        animate={isDragging ? {} : {
          y: [0, -12, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      />
    </motion.div>
  );
}

export default function HomeFlowers() {
  const { isMenuVisible } = useUI();

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <>
          <Flower config={homeFlowerContainerProps.flower1} />
          <Flower config={homeFlowerContainerProps.flower2} />
          <Flower config={homeFlowerContainerProps.flower3} />
          <Flower config={homeFlowerContainerProps.flower4} />
        </>
      )}
    </AnimatePresence>
  );
}
