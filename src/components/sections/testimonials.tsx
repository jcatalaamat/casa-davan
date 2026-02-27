"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils/cn";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  rating: number;
  source: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "El mejor poke bowl que he probado en Mexico. El ambiente es increible y el WiFi Starlink es un game changer para trabajar.",
    name: "Sofia M.",
    rating: 5,
    source: "Google",
  },
  {
    id: "2",
    quote:
      "La ropa de DaVan Mystique es preciosa. Se nota la calidad artesanal y los tintes naturales le dan un toque unico.",
    name: "Carlos R.",
    rating: 5,
    source: "Instagram",
  },
  {
    id: "3",
    quote:
      "Un lugar magico en Mazunte. Las pizzas artesanales son deliciosas y el cafe de especialidad es el mejor de la costa.",
    name: "Ana L.",
    rating: 4,
    source: "TripAdvisor",
  },
  {
    id: "4",
    quote:
      "Encontre las piezas perfectas para mi viaje. Ropa comoda, etica y con un estilo que no encuentras en ningun otro lado.",
    name: "Marco T.",
    rating: 5,
    source: "Google",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-gold text-gold"
              : "fill-none text-charcoal/20"
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

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
    <section className="section-padding bg-cream-dark">
      <div className="container-wide">
        <SectionHeader title={t("title")} className="mb-12" />

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="flex h-full flex-col rounded-xl border border-sand bg-white p-6 shadow-sm">
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="mt-4 flex-1 text-base text-charcoal/80 font-body leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center justify-between border-t border-sand pt-4">
                    <span className="text-sm font-medium text-charcoal">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-charcoal/40 font-body">
                      {testimonial.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? "w-8 bg-terracotta"
                  : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              )}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
