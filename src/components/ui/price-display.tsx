import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

type PriceDisplayProps = React.ComponentProps<"div"> & {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  locale?: string;
};

const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      className,
      price,
      compareAtPrice,
      currency = "MXN",
      locale = "es-MX",
      ...props
    },
    ref
  ) => {
    const hasDiscount =
      compareAtPrice !== undefined && compareAtPrice > price;

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-baseline gap-2 font-body", className)}
        {...props}
      >
        <span
          className={cn(
            "text-lg font-semibold",
            hasDiscount ? "text-terracotta" : "text-charcoal"
          )}
        >
          {formatPrice(price, currency, locale)}
        </span>

        {hasDiscount && (
          <span className="text-sm text-charcoal/40 line-through">
            {formatPrice(compareAtPrice, currency, locale)}
          </span>
        )}
      </div>
    );
  }
);
PriceDisplay.displayName = "PriceDisplay";

export { PriceDisplay };
export type { PriceDisplayProps };
