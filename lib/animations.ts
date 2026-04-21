/**
 * Centralized Framer Motion animation configurations
 * Consolidates all animation variants for consistent motion design
 */

import type { HTMLMotionProps } from "framer-motion";

type MotionDivProps = HTMLMotionProps<"div">;

export type AnimationProps = {
  initial: MotionDivProps["initial"];
  animate: MotionDivProps["animate"];
  exit: MotionDivProps["exit"];
  transition?: MotionDivProps["transition"];
};

// Base fade animation
export const fadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Fade with configurable duration
export const createFade = (duration = 0.6, delay = 0): AnimationProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration, delay, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: duration * 0.5 } },
});

// Fade with scale effect
export const fadeInScale: AnimationProps = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// Slide up animation
export const slideUp: AnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Slide down animation
export const slideDown: AnimationProps = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Menu animations
export const menuAnimation: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const menuItemAnimation = (index = 0): AnimationProps => ({
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
});

export const backdropAnimation: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const dividerAnimation: AnimationProps = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 },
  exit: { opacity: 0, scaleY: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

// Contact form animations
export const contactFormAnimation: AnimationProps = {
  initial: { opacity: 0, scale: 0.96, x: 18 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.96, x: 18, transition: { duration: 0.7, ease: "easeInOut" } },
  transition: { duration: 0.7, ease: "easeInOut" },
};

export const infoBoxAnimation: AnimationProps = {
  initial: { opacity: 0, scale: 0.93, y: -8, x: -15 },
  animate: { opacity: 1, scale: 1, y: 0, x: 0 },
  exit: { opacity: 0, scale: 0.93, y: -8, x: -15, transition: { duration: 0.6, ease: "easeInOut" } },
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 },
};

// Slideshow animations
export const slideshowAnimation: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

// Header animation
export const headerAnimation: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.8 },
};

// Gallery/Grid animations
export const galleryItemAnimation = (index = 0): AnimationProps => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.05, ease: "easeOut" },
  },
  exit: { opacity: 0 },
});

export const carouselAnimation: AnimationProps = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

// Tagline/text animations
export const taglineAnimation: AnimationProps = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

// Flower animations
export const flowerAnimation = (delay = 0): AnimationProps => ({
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 0.65,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
  exit: { opacity: 0 },
});

// Start button animations
export const startButtonAnimation: AnimationProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// About page animations
export const aboutTextAnimation = (index = 0): AnimationProps => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
  },
  exit: { opacity: 0 },
});

// Content switcher animation
export const contentSwitcherAnimation: AnimationProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

// Stagger children helper
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ============================================
// Home Flowers Animations
// ============================================

export interface FlowerConfig {
  className: string;
  imageSrc: string;
  floatDelay: number;
  initial: MotionDivProps["initial"];
  animate: MotionDivProps["animate"];
  exit: MotionDivProps["exit"];
  transition: MotionDivProps["transition"];
}

export const homeFlowerContainerProps: Record<string, FlowerConfig> = {
  flower1: {
    className: "fixed top-28 right-12 w-12 md:w-14 lg:w-16 z-10",
    imageSrc: "/images/galleries/flower.png",
    floatDelay: 0,
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.25, delay: 0.35, ease: "easeInOut" } },
    transition: { duration: 0.7, delay: 0.15, ease: "easeOut" },
  },
  flower2: {
    className: "fixed bottom-32 left-8 w-10 md:w-12 lg:w-14 z-10",
    imageSrc: "/images/galleries/flower.png",
    floatDelay: 0.5,
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.25, delay: 0.05, ease: "easeInOut" } },
    transition: { duration: 0.7, delay: 0.05, ease: "easeOut" },
  },
  flower3: {
    className: "fixed top-1/3 left-6 w-8 md:w-10 lg:w-12 z-10",
    imageSrc: "/images/galleries/flower-3.png",
    floatDelay: 1,
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3, delay: 0.17, ease: "easeInOut" } },
    transition: { duration: 0.7, delay: 0.25, ease: "easeOut" },
  },
  flower4: {
    className: "fixed bottom-24 right-16 w-8 md:w-10 lg:w-12 z-10",
    imageSrc: "/images/galleries/flower-3.png",
    floatDelay: 1.5,
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.25, delay: 0.25, ease: "easeInOut" } },
    transition: { duration: 0.7, delay: 0.35, ease: "easeOut" },
  },
};

// ============================================
// Work/Grid Animations
// ============================================

export const gridItemAnimationProps = (index: number): AnimationProps => ({
  initial: { opacity: 0, y: 10 + index * 1.3, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut", delay: index * 0.04 },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.4, ease: "easeInOut" } },
});

// ============================================
// Work/Gallery Animations
// ============================================

export const galleryAnimationProps: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.55 } },
  transition: { duration: 0.8 },
};

// ============================================
// Work/GalleryRows Animations
// ============================================

export const galleryRowsFrameAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.96, x: 18 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.96, x: 18, transition: { duration: 0.7, ease: "easeInOut" } },
  transition: { duration: 0.7, ease: "easeInOut" },
};

export const galleryRowsDescriptionAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.93, y: -8, x: -15 },
  animate: { opacity: 1, scale: 1, y: 0, x: 0 },
  exit: { opacity: 0, scale: 0.93, y: -8, x: -15, transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 } },
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 },
};

// ============================================
// Work/Carousel Animations
// ============================================

export const carouselAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.98, y: -8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.7, ease: "easeInOut" } },
  transition: { duration: 0.8, ease: "easeInOut" },
};

export const carouselSlideAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { opacity: { duration: 0.7 }, scale: { duration: 0.7 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export const carouselTitleAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.97, x: 7, y: -5 },
  animate: { opacity: 1, scale: 1, x: 0, y: 0 },
  transition: { duration: 0.73, delay: 0.15 },
  exit: { opacity: 0, transition: { duration: 0.54 } },
};

export const carouselSubTitleAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.97, x: -6, y: -5 },
  animate: { opacity: 1, scale: 1, x: 0, y: 0 },
  transition: { duration: 0.76, delay: 0.15 },
  exit: { opacity: 0, transition: { duration: 0.57 } },
};

export const carouselDescriptionAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.97, x: -7, y: -5 },
  animate: { opacity: 1, scale: 1, x: 0, y: 0 },
  transition: { duration: 0.73, delay: 0.15 },
  exit: { opacity: 0, transition: { duration: 0.54 } },
};

// ============================================
// AboutMe Animations
// ============================================

export const aboutMeFadeInAnimationProps: AnimationProps = {
  initial: { opacity: 0, y: 9 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const aboutMeTextBlockAnimationProps: AnimationProps = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: "easeInOut" },
  exit: { opacity: 0, y: 9, transition: { duration: 0.45 } },
};

// ============================================
// Contact Animations
// ============================================

export const contactFormAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.96, x: 18 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.96, x: 18, transition: { duration: 0.7, ease: "easeInOut" } },
  transition: { duration: 0.7, ease: "easeInOut" },
};

export const contactInfoBoxAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.93, y: -8, x: -15 },
  animate: { opacity: 1, scale: 1, y: 0, x: 0 },
  exit: { opacity: 0, scale: 0.93, y: -8, x: -15, transition: { duration: 0.6, ease: "easeInOut" } },
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 },
};

export const contactFadeInScaleAnimationProps: AnimationProps = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
  transition: { duration: 0.6, ease: "easeInOut" },
};

export const contactFadeInAnimationProps: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
  transition: { duration: 0.6, ease: "easeInOut" },
};
