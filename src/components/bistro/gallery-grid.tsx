"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Lightbox, type LightboxImage } from "./lightbox";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GalleryCategory = "all" | "food" | "drinks" | "atmosphere";

interface GalleryItem extends LightboxImage {
  aspectRatio: "square" | "portrait" | "landscape";
}

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                   */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_IMAGES: GalleryItem[] = [
  {
    id: "g-1",
    alt: "Acai bowl with fresh fruit",
    category: "food",
    aspectRatio: "square",
  },
  {
    id: "g-2",
    alt: "Tropical smoothie trio",
    category: "drinks",
    aspectRatio: "portrait",
  },
  {
    id: "g-3",
    alt: "Bistro terrace at sunset",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g-4",
    alt: "Wood-fired pizza fresh from the oven",
    category: "food",
    aspectRatio: "landscape",
  },
  {
    id: "g-5",
    alt: "Iced matcha coconut latte",
    category: "drinks",
    aspectRatio: "square",
  },
  {
    id: "g-6",
    alt: "Jungle garden seating area",
    category: "atmosphere",
    aspectRatio: "portrait",
  },
  {
    id: "g-7",
    alt: "Dragon fruit bowl closeup",
    category: "food",
    aspectRatio: "portrait",
  },
  {
    id: "g-8",
    alt: "Oaxacan pour over coffee",
    category: "drinks",
    aspectRatio: "square",
  },
  {
    id: "g-9",
    alt: "String lights in the evening",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g-10",
    alt: "Chef plating a dish",
    category: "food",
    aspectRatio: "square",
  },
  {
    id: "g-11",
    alt: "Fresh juice preparation",
    category: "drinks",
    aspectRatio: "landscape",
  },
  {
    id: "g-12",
    alt: "Mazunte ocean view from the bistro",
    category: "atmosphere",
    aspectRatio: "portrait",
  },
];

const FILTER_CATEGORIES: GalleryCategory[] = [
  "all",
  "food",
  "drinks",
  "atmosphere",
];

const ASPECT_CLASSES: Record<GalleryItem["aspectRatio"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GalleryGrid() {
  const t = useTranslations("gallery.categories");
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === "all"
      ? PLACEHOLDER_IMAGES
      : PLACEHOLDER_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  }, [filteredImages.length]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTER_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={cn(
              "rounded-full px-5 py-2 font-body text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              activeFilter === category
                ? "bg-terracotta text-cream"
                : "text-charcoal/60 hover:text-charcoal hover:bg-sand/60"
            )}
          >
            {t(category)}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <motion.div
        layout
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                )}
              >
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                      ASPECT_CLASSES[image.aspectRatio]
                    )}
                  />
                ) : (
                  <div
                    className={cn(
                      "flex w-full items-center justify-center bg-sand transition-colors duration-300 group-hover:bg-sand/80",
                      ASPECT_CLASSES[image.aspectRatio]
                    )}
                  >
                    <svg
                      className="h-8 w-8 text-clay/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/50 to-transparent",
                    "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  )}
                >
                  <p className="p-4 font-body text-sm text-cream">
                    {image.alt}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </div>
  );
}
