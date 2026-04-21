import { motion, useTransform, type MotionValue } from 'framer-motion'

interface WordProps {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

export default function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span className="inline-block mr-2" style={{ opacity }}>
      {children}
    </motion.span>
  )
}
