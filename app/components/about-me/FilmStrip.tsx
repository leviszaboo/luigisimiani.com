"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { useEffect } from "react";

interface FilmStripSource {
  url: string;
  base64?: string;
}

interface FilmStripProps {
  sources: FilmStripSource[];
}

export default function FilmStrip({ sources }: FilmStripProps) {
  const images = sources.slice(0, 6);
  // Duplicate for seamless loop
  const duplicatedImages = [...images, ...images];

  const { scrollYProgress } = useScroll();

  // Continuous drift - never stops
  const driftOffset = useMotionValue(0);

  // Parallax derived from scroll (0 to -25%)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -25]);

  // Always drift - never pause
  useEffect(() => {
    let animationId: number;
    const speed = 0.006;

    const tick = () => {
      const current = driftOffset.get();
      let next = current - speed;
      // Loop seamlessly
      if (next < -50) next += 50;
      driftOffset.set(next);
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [driftOffset]);

  // Combine: constant drift + parallax layered on top
  const combinedY = useTransform(
    [driftOffset, parallaxY] as MotionValue<number>[],
    ([drift, parallax]: number[]) => `${drift + parallax}%`
  );

  return (
    <div className="h-full w-full overflow-hidden">
      <motion.div
        className="flex flex-col will-change-transform"
        style={{ y: combinedY }}
      >
        {duplicatedImages.map((source, index) => (
          <div
            key={`${source.url}-${index}`}
            className="relative shrink-0 w-full aspect-[3/4]"
          >
            <Image
              src={source.url}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              placeholder={source.base64 ? "blur" : "empty"}
              blurDataURL={source.base64}
              priority={index < 2}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
