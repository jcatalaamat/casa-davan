"use client";

import { useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LightboxImage {
  id: string;
  src?: string;
  alt: string;
  category: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [onPrev, onNext, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {/* Overlay */}
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm"
            />
          </Dialog.Overlay>

          {/* Content */}
          <Dialog.Content
            aria-label="Image lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center focus-visible:outline-none"
          >
            <motion.div
              key={currentImage?.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex h-full w-full items-center justify-center p-4 sm:p-8 lg:p-16"
            >
              {/* Image display */}
              <div className="relative max-h-full max-w-full overflow-hidden rounded-lg">
                {currentImage?.src ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[60vh] w-[80vw] max-w-3xl items-center justify-center rounded-lg bg-sand">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-clay/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                        />
                      </svg>
                      <p className="mt-3 font-body text-sm text-charcoal/40">
                        {currentImage?.alt}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/70 px-4 py-1.5 font-body text-sm text-cream/80">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Close button */}
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "absolute right-4 top-4 z-50 rounded-full p-2",
                  "bg-charcoal/50 text-cream/80 transition-colors",
                  "hover:bg-charcoal/70 hover:text-cream",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                )}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>

            {/* Previous button */}
            <button
              type="button"
              onClick={onPrev}
              disabled={images.length <= 1}
              className={cn(
                "absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full p-2",
                "bg-charcoal/50 text-cream/80 transition-colors",
                "hover:bg-charcoal/70 hover:text-cream",
                "disabled:pointer-events-none disabled:opacity-30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={onNext}
              disabled={images.length <= 1}
              className={cn(
                "absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full p-2",
                "bg-charcoal/50 text-cream/80 transition-colors",
                "hover:bg-charcoal/70 hover:text-cream",
                "disabled:pointer-events-none disabled:opacity-30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </Dialog.Content>
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
