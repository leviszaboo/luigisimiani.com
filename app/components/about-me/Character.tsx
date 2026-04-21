import { motion, useTransform, type MotionValue } from 'framer-motion'

interface CharacterProps {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

export default function Character({ children, range, progress }: CharacterProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span className="inline-block" style={{opacity}}>
      {children}
    </motion.span>
  )
}
