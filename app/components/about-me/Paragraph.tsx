"use client"

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Word from './Word';

interface ParagraphProps {
  text: string;
}

export default function Paragraph({ text }: ParagraphProps) {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['0.15 0.9', 'start 0.25']
  })

  const words = text.split(" ");

  const len = words.length < 25 ? 25 : words.length

  return (
    <motion.div className="text-sm leading-relaxed">
      <motion.p
        ref={element}
        className="flex flex-wrap"
      >
        {
          words.map((word, i) => {
            const start = i / ( len );
            const end = start + (1 / ( len))

            return (
              <Word
                key={i}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {word}
              </Word>
            )
          })
        }
      </motion.p>
    </motion.div>
  )
}
