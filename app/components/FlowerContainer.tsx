import { motion, type HTMLMotionProps } from "framer-motion";
import type { Ref } from "react";

type MotionDivProps = HTMLMotionProps<"div">;

export interface FlowerContainerProps {
  className?: string;
  imageClassName?: string;
  imageSrc: string;
  id?: string;
  initial?: MotionDivProps["initial"];
  animate?: MotionDivProps["animate"];
  exit?: MotionDivProps["exit"];
  transition?: MotionDivProps["transition"];
  onClick?: () => void;
  forwardedRef?: Ref<HTMLDivElement>;
}

export default function FlowerContainer({
  className,
  imageClassName,
  imageSrc,
  id,
  initial,
  animate,
  exit,
  transition,
  onClick,
  forwardedRef,
}: FlowerContainerProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onClick={onClick}
      ref={forwardedRef}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`flower ${imageClassName}`} src={imageSrc} alt="flower" />
    </motion.div>
  );
}
