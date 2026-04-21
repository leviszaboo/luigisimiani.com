"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUI } from "@/app/context/UIContext";

const SLIDE_DURATION = 6000;
const FADE_DURATION = 2;

interface HeroImage {
  url: string;
}

interface HeroSlideshowProps {
  images: HeroImage[];
  heroTitle?: string;
}

export default function HeroSlideshow({ images, heroTitle }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMenuVisible } = useUI();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [nextSlide, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.section
          className="relative h-screen w-full overflow-hidden select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Slides - crossfade mode allows overlap */}
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1.10, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: FADE_DURATION, ease: "easeInOut" },
                scale: { duration: SLIDE_DURATION / 1000 + FADE_DURATION, ease: [0.05, 0.2, 0.6, 0.92] }
              }}
            >
              <Image
                src={images[currentIndex].url}
                alt=""
                fill
                priority={currentIndex === 0}
                className="object-cover pointer-events-none"
                sizes="100vw"
                draggable={false}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </motion.div>
          </AnimatePresence>

          {/* Hero title */}
          {heroTitle && (
            <motion.h1
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-3xl md:text-5xl lg:text-6xl text-white text-center font-light tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {heroTitle}
            </motion.h1>
          )}

          {/* Slide indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest text-white/70">
              Scroll
            </span>
            <motion.div
              className="w-px h-8 bg-white/50"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
