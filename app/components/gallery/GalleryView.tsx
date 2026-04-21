"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import JSZip from "jszip";
import { useUI } from "@/app/context/UIContext";
import type { Gallery } from "@/app/types/content";

interface GalleryViewProps {
  gallery: Gallery;
  isDownloadable?: boolean;
}

export default function GalleryView({
  gallery,
  isDownloadable = false,
}: GalleryViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { isMenuVisible } = useUI();

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.imageUrls.length);
    }
  }, [selectedIndex, gallery.imageUrls.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? gallery.imageUrls.length - 1 : selectedIndex - 1
      );
    }
  }, [selectedIndex, gallery.imageUrls.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  const handleDownloadAll = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const zip = new JSZip();
      const totalImages = gallery.imageUrls.length;

      for (let i = 0; i < totalImages; i++) {
        const url = gallery.imageUrls[i];
        const response = await fetch(url);
        const blob = await response.blob();

        // Extract filename from URL or generate one
        const urlParts = url.split("/");
        const originalName = decodeURIComponent(urlParts[urlParts.length - 1]);
        const extension = originalName.split(".").pop() || "jpg";
        const filename = `${gallery.title.replace(/[^a-zA-Z0-9]/g, "_")}_${String(i + 1).padStart(3, "0")}.${extension}`;

        zip.file(filename, blob);
        setDownloadProgress(Math.round(((i + 1) / totalImages) * 100));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(content);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${gallery.title.replace(/[^a-zA-Z0-9]/g, "_")}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.div
          className="min-h-screen p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <header className="max-w-7xl mx-auto pt-20 pb-8">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Link
                href="/gallery"
                className="retro text-[10px] text-white/70 hover:text-white transition-colors"
              >
                ← Back
              </Link>

              {/* Right side: category badge & download */}
              <div className="flex items-center gap-4">
                {/* Category badge */}
                {gallery.category && (
                  <span className="retro text-[9px] uppercase tracking-widest text-white/50 border border-white/30 px-2 py-0.5">
                    {typeof gallery.category === "string"
                      ? gallery.category
                      : gallery.category[0]}
                  </span>
                )}

                {/* Download button */}
                {isDownloadable && (
                  <button
                    onClick={handleDownloadAll}
                    disabled={isDownloading}
                    className="retro text-[9px] uppercase tracking-widest text-white/70 hover:text-white border border-white/30 hover:border-white/50 px-2 py-0.5 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isDownloading ? (
                      <>
                        <span className="inline-block w-2.5 h-2.5 border border-white/50 border-t-white animate-spin" />
                        <span>{downloadProgress}%</span>
                      </>
                    ) : (
                      "Download ↓"
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Title & subtitle - centered below */}
            <div className="text-center mt-8">
              <h1 className="text-sm uppercase tracking-widest">
                {gallery.title}
              </h1>
              {gallery.subTitle && (
                <p className="text-[10px] text-white/50 mt-1">{gallery.subTitle}</p>
              )}
            </div>
          </header>

          {/* Image grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-7xl mx-auto">
            {gallery.imageUrls.map((url, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={url}
                  alt={`${gallery.title} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                className="fixed inset-0 bg-black/95 z-[10001] flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white text-2xl hover:text-white/70 z-20 w-10 h-10 flex items-center justify-center"
                  onClick={closeLightbox}
                >
                  ✕
                </button>

                {/* Main image area */}
                <div className="flex-1 flex items-center justify-center px-16 py-4">
                  {/* Previous button */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-white/70 z-20 w-12 h-12 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                  >
                    ‹
                  </button>

                  {/* Image container */}
                  <div className="relative w-full h-full max-w-6xl pointer-events-none">
                    <Image
                      src={gallery.imageUrls[selectedIndex]}
                      alt={`${gallery.title} - Image ${selectedIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Next button */}
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-white/70 z-20 w-12 h-12 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* Counter */}
                <div className="text-center py-2">
                  <span className="retro text-[8px] text-white/70">
                    {selectedIndex + 1} / {gallery.imageUrls.length}
                  </span>
                </div>

                {/* Thumbnails */}
                <div
                  className="h-24 px-4 pb-4 flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-2 overflow-x-auto max-w-full py-2 px-4">
                    {gallery.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        className={`relative w-16 h-16 flex-shrink-0 overflow-hidden transition-all ${
                          index === selectedIndex
                            ? "ring-2 ring-white opacity-100"
                            : "opacity-50 hover:opacity-80"
                        }`}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <Image
                          src={url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
