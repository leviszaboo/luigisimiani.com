"use client";

import { useUI } from "@/app/context/UIContext";
import { AnimatePresence } from "framer-motion";
import GridItem from "./GridItem";
import type { Gallery } from "@/app/types/content";

interface ProjectGridProps {
  docs: Gallery[];
}

export default function ProjectGrid({ docs }: ProjectGridProps) {
  const { isMenuVisible } = useUI();

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <div className="project-grid">
          {docs.map((doc, index) => (
            <GridItem doc={doc} key={doc.id} index={index} />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
