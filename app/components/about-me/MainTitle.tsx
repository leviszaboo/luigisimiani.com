import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MainTitle() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 7000], [0, -2500]);

  return (
    <div className='relative h-[50vh] flex flex-col items-center justify-center'>
      <motion.div ref={ref} style={{y: y1}} className="w-full relative">
        <div className="text-2xl md:text-3xl uppercase text-center font-bold tracking-[0.2em] text-white">
          About <span className="text-[#ffd700]">Me</span>
        </div>
      </motion.div>
    </div>
  )
}
