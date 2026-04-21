"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useUI } from "@/app/context/UIContext";

import { galleryAnimationProps } from "@/lib/animations";
import GalleryRow from "./GalleryRow";
import FadeIn from "../FadeIn";

interface GalleryDoc {
  id: string;
  title: string;
  subTitle?: string;
  description?: string;
  imageUrls: string[];
  descriptionLayout?: string;
  base64?: string[];
}

interface GalleryProps {
  docs: GalleryDoc[];
}

export default function Gallery({ docs }: GalleryProps) {
  const { isMenuVisible } = useUI();

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.section className="sec-work" {...galleryAnimationProps}>
          <div className="gallery">
            {docs.map((doc) => (
              <FadeIn key={doc.id}>
                <GalleryRow
                  doc={doc}
                  title={doc.title}
                  subtitle={doc.subTitle}
                  description={doc.description}
                />
              </FadeIn>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
