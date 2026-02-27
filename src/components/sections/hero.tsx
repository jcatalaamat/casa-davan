"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const SLIDE_COUNT = 4;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  const t = useTranslations("home.hero");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] h-full bg-gradient-to-br from-cream via-sand/60 to-sand"
            >
              {/* Placeholder slide - replace with images */}
              <div className="h-full w-full bg-sand/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/80 via-cream/60 to-cream/90" />

      {/* Content */}
      <motion.div
        className="container-wide relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="font-accent text-2xl text-terracotta sm:text-3xl mb-4"
          variants={itemVariants}
        >
          Casa DaVan
        </motion.p>

        <motion.h1
          className="heading-1 text-charcoal max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {t("tagline")}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-charcoal/70 font-body leading-relaxed"
          variants={itemVariants}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button asChild size="lg">
            <Link href="/menu">{t("ctaBistro")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">{t("ctaBoutique")}</Link>
          </Button>
        </motion.div>

        {/* Carousel dots */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? "w-8 bg-terracotta"
                  : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              )}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
