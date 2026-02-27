"use client";

import { cn } from "@/lib/utils/cn";

interface SizeOption {
  size: string;
  stock: number;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(({ size, stock }) => {
        const isOutOfStock = stock === 0;
        const isSelected = selectedSize === size;

        return (
          <button
            key={size}
            type="button"
            disabled={isOutOfStock}
            onClick={() => onSelect(size)}
            className={cn(
              "relative inline-flex h-11 w-14 items-center justify-center rounded-lg border-2 font-body text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              isSelected
                ? "border-terracotta bg-terracotta text-cream"
                : "border-sand bg-white text-charcoal hover:border-terracotta/40",
              isOutOfStock &&
                "cursor-not-allowed border-sand/50 bg-sand/30 text-charcoal/30 hover:border-sand/50"
            )}
          >
            {size}
            {isOutOfStock && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="absolute h-px w-[70%] rotate-[-20deg] bg-charcoal/30" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
