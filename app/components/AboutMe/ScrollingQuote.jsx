"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function QuoteWord({ children, range, progress, highlight }) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      className={`inline-block mr-3 ${highlight ? "text-white" : "text-neutral-500"}`}
      style={{ opacity }}
    >
      {children}
    </motion.span>
  );
}

function QuoteParagraph({ text, highlightWords = [] }) {
  const element = useRef(null);
  // Progress runs from when the paragraph's top enters the viewport (85%
  // down) to when its bottom has scrolled past the top third (30% down),
  // so the reveal keeps pace with normal reading speed instead of
  // finishing while the lower lines are still offscreen.
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.85", "end 0.3"],
  });

  const words = text.split(" ");
  const n = words.length;
  // Each word's reveal window overlaps with the next so the transition
  // between words cross-fades rather than snaps.
  const window = 2 / n;

  return (
    <p ref={element} className="flex flex-wrap text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-32 lg:mb-[50vh]">
      {words.map((word, i) => {
        const start = i / n;
        const end = Math.min(start + window, 1);
        const isHighlighted = highlightWords.length === 0 || highlightWords.some((hw) => word.includes(hw));

        return (
          <QuoteWord key={i} range={[start, end]} progress={scrollYProgress} highlight={isHighlighted}>
            {word}
          </QuoteWord>
        );
      })}
    </p>
  );
}

export default function ScrollingQuote({ paragraphs }) {
  return (
    <section className="min-h-screen px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 py-32">
      <div className="max-w-4xl">
        {paragraphs.map((paragraph, index) => (
          <QuoteParagraph
            key={index}
            text={paragraph.value}
            highlightWords={paragraph.highlightWords || []}
          />
        ))}
      </div>
    </section>
  );
}
