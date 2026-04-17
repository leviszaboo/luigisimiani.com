"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMenuStore } from "@/app/context/UIContext";
import {
  buildLayoutRows,
  getColSpanClass,
  getAspectClass,
} from "./layoutUtils";

function imageSizesFor(size) {
  switch (size) {
    case "full":
      return "(max-width: 768px) 100vw, 1280px";
    case "half":
      return "(max-width: 768px) 100vw, 640px";
    case "third":
      return "(max-width: 768px) 100vw, 480px";
    default:
      return "(max-width: 768px) 100vw, 640px";
  }
}

export default function FeaturedWork({ galleries, quotes = [] }) {
  const { isMenuVisible } = useMenuStore();

  const rows = useMemo(
    () => buildLayoutRows(galleries ?? [], quotes ?? []),
    [galleries, quotes]
  );

  if (rows.length === 0) return null;

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.section
          className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8 lg:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.header
            className="max-w-7xl mx-auto mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="retro text-lg uppercase tracking-widest">
              Featured Work
            </h2>
          </motion.header>

          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-6 lg:gap-8">
            {rows.map((row, rowIdx) => {
              if (row.type === "quote") {
                return (
                  <motion.blockquote
                    key={`quote-${rowIdx}`}
                    className="py-16 md:py-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 max-w-4xl">
                      &ldquo;{row.data.text}&rdquo;
                    </p>
                    {row.data.author && (
                      <cite className="block mt-6 retro text-xs uppercase tracking-widest text-white/50 not-italic">
                        — {row.data.author}
                      </cite>
                    )}
                  </motion.blockquote>
                );
              }

              return (
                <div
                  key={`row-${rowIdx}`}
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 lg:gap-8"
                >
                  {row.items.map((gallery, itemIdx) => {
                    const size = gallery.displaySize ?? "half";
                    return (
                      <motion.article
                        key={gallery.id}
                        className={getColSpanClass(size)}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.6,
                          delay: itemIdx * 0.08,
                        }}
                      >
                        <Link
                          href={`/gallery/${gallery.id}`}
                          className="block group"
                        >
                          <div
                            className={`relative overflow-hidden ${getAspectClass(size)}`}
                          >
                            <Image
                              src={gallery.coverPhoto || gallery.imageUrls[0]}
                              alt={gallery.title}
                              fill
                              sizes={imageSizesFor(size)}
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                              <div className="md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <h3 className="text-sm md:text-base uppercase tracking-wider text-white font-medium">
                                  {gallery.title}
                                </h3>
                                {gallery.subTitle && (
                                  <p className="text-xs text-white/60 mt-1">
                                    {gallery.subTitle}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <motion.div
            className="max-w-7xl mx-auto mt-20 md:mt-32 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/gallery"
              className="inline-block retro text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1"
            >
              View All Work
            </Link>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
