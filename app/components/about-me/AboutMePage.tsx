"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/app/context/UIContext";
import HeroSection from "./HeroSection";
import ScrollingQuote from "./ScrollingQuote";
import LinkToContact from './LinkToContact';
import FilmStrip from "./FilmStrip";

interface Source {
  url: string;
  base64?: string;
}

interface Paragraph {
  value: string;
  highlightWords?: string[];
}

interface AboutMePageProps {
  paragraphs: Paragraph[];
  sources: Source[];
}

export default function AboutMePage({ paragraphs, sources }: AboutMePageProps) {
  const { isMenuVisible } = useUI();

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fixed background film strip that covers the entire page */}
          <div className="fixed inset-0 z-0">
            <FilmStrip sources={sources} />
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Scrollable content */}
          <div className="relative z-10">
            <HeroSection />
            <ScrollingQuote paragraphs={paragraphs} />
            <LinkToContact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
