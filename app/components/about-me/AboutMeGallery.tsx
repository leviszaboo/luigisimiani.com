"use client";

import FadeIn from "../FadeIn";
import { motion } from "framer-motion";
import { aboutMeFadeInAnimationProps as fadeInAnimationProps } from "@/lib/animations";
import Image from "../Image";

interface Source {
  url: string;
  aspectRatio: number;
  base64?: string;
}

interface AboutMeGalleryProps {
  sources: Source[];
}

export default function AboutMeGallery({ sources }: AboutMeGalleryProps) {
  return (
    <motion.div className="flex-1 flex flex-col gap-8 items-center" {...fadeInAnimationProps}>
      {sources.map((source) => {
        return (
          <FadeIn key={source.url} className="w-full flex justify-center">
            <Image
              src={source.url}
              alt=""
              width={1000}
              height={1000 / source.aspectRatio}
              placeholder="blur"
              blurDataURL={source.base64}
              className="w-4/5 h-auto"
            />
          </FadeIn>
        );
      })}
    </motion.div>
  );
}
