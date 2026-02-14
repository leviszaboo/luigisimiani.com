"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMenuStore } from "@/app/context/UIContext";

// Normalize tags - handles both array elements and comma-separated strings
function hasTag(gallery, tag) {
  if (!gallery.tags) return false;
  const normalized = [];
  for (const t of gallery.tags) {
    const parts = t.split(",").map((p) => p.trim().toLowerCase());
    normalized.push(...parts.filter(Boolean));
  }
  return normalized.includes(tag.toLowerCase());
}

/**
 * Get the featured image for a gallery by variant.
 * Desktop: landscape (featuredImage.desktop → coverPhoto → first image)
 * Mobile: portrait (featuredImage.mobile → coverPhoto → first image)
 */
function getFeaturedImage(gallery, variant) {
  if (variant === "desktop") {
    return (
      gallery.featuredImage?.desktop ||
      gallery.coverPhoto ||
      gallery.imageUrls?.[0]
    );
  }
  return (
    gallery.featuredImage?.mobile ||
    gallery.coverPhoto ||
    gallery.imageUrls?.[0]
  );
}

/**
 * Get column span class based on display size (6-column grid)
 */
function getColSpan(gallery) {
  const size = gallery.displaySize;
  if (hasTag(gallery, "hero") || size === "full") return "md:col-span-6";
  if (size === "third") return "md:col-span-2";
  return "md:col-span-3"; // half (default)
}

/**
 * Get aspect ratio classes based on display size.
 * Desktop: landscape ratios. Mobile: portrait when separate image exists.
 */
function getDesktopAspect(gallery) {
  const size = gallery.displaySize;
  if (hasTag(gallery, "hero") || size === "full") return "aspect-[21/9]";
  if (size === "third") return "aspect-[4/5]";
  return "aspect-[3/2]";
}

export default function FeaturedWork({
  galleries,
  quotes = [],
  title = "Featured Work",
}) {
  const { isMenuVisible } = useMenuStore();

  // Build feed: galleries with interspersed quotes
  const feedItems = useMemo(() => {
    if (!galleries?.length) return [];

    const items = [];
    let quoteIndex = 0;

    galleries.forEach((g, i) => {
      items.push({ type: "gallery", data: g });

      // Insert a quote after every 2nd gallery if quotes remain
      if (
        quotes.length > 0 &&
        (i + 1) % 2 === 0 &&
        quoteIndex < quotes.length
      ) {
        items.push({ type: "quote", data: quotes[quoteIndex] });
        quoteIndex++;
      }
    });

    return items;
  }, [galleries, quotes]);

  if (feedItems.length === 0) return null;

  return (
    <AnimatePresence>
      {!isMenuVisible && (
        <motion.section
          className="bg-[#0a0a0a] py-32 px-8 md:px-16 lg:px-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Section header */}
          <motion.header
            className="max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="retro text-lg uppercase tracking-widest">
              {title}
            </h2>
          </motion.header>

          {/* Portfolio grid — 6-column system */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
            {feedItems.map((item, index) => {
              if (item.type === "quote") {
                return (
                  <motion.blockquote
                    key={`quote-${index}`}
                    className="col-span-1 md:col-span-6 py-16 md:py-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 max-w-4xl">
                      &ldquo;{item.data.text}&rdquo;
                    </p>
                    {item.data.author && (
                      <cite className="block mt-8 retro text-xs uppercase tracking-widest text-white/50 not-italic">
                        — {item.data.author}
                      </cite>
                    )}
                  </motion.blockquote>
                );
              }

              const gallery = item.data;
              const colSpan = getColSpan(gallery);
              const desktopAspect = getDesktopAspect(gallery);
              const isFullWidth =
                hasTag(gallery, "hero") || gallery.displaySize === "full";

              const desktopSrc = getFeaturedImage(gallery, "desktop");
              const mobileSrc = getFeaturedImage(gallery, "mobile");
              const hasMobileVariant =
                gallery.featuredImage?.mobile &&
                gallery.featuredImage.mobile !== desktopSrc;

              return (
                <motion.article
                  key={gallery.id}
                  className={`relative col-span-1 ${colSpan}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                >
                  <Link href={`/gallery/${gallery.id}`} className="block group">
                    {/* Desktop: landscape featured image */}
                    <div
                      className={`relative overflow-hidden ${desktopAspect} ${hasMobileVariant ? "hidden md:block" : ""}`}
                    >
                      <Image
                        src={desktopSrc}
                        alt={gallery.title}
                        fill
                        sizes={
                          isFullWidth
                            ? "100vw"
                            : gallery.displaySize === "third"
                              ? "(max-width: 768px) 100vw, 33vw"
                              : "(max-width: 768px) 100vw, 50vw"
                        }
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <h3 className="text-sm md:text-base uppercase tracking-wider text-white">
                          {gallery.title}
                        </h3>
                        {gallery.subTitle && (
                          <p className="text-xs text-white/60 mt-1">
                            {gallery.subTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mobile: portrait featured image (only when a separate mobile image is set) */}
                    {hasMobileVariant && (
                      <div className="relative overflow-hidden aspect-[3/4] md:hidden">
                        <Image
                          src={mobileSrc}
                          alt={gallery.title}
                          fill
                          sizes="100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-sm uppercase tracking-wider text-white">
                            {gallery.title}
                          </h3>
                          {gallery.subTitle && (
                            <p className="text-xs text-white/60 mt-1">
                              {gallery.subTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {/* View all link */}
          <motion.div
            className="max-w-7xl mx-auto mt-24 text-center"
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
