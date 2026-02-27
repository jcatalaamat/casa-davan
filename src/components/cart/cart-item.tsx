"use client";

import { Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/stores/cart";
import { Link } from "@/i18n/navigation";
import type { CartItem as CartItemType } from "@/types/cart";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <Link
        href={{ pathname: "/shop/[slug]", params: { slug: item.slug } }}
        className="shrink-0"
      >
        <div className="h-20 w-20 overflow-hidden rounded-lg">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sand">
              <svg
                className="h-6 w-6 text-charcoal/15"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={{ pathname: "/shop/[slug]", params: { slug: item.slug } }}
              className="font-heading text-sm font-semibold text-charcoal leading-tight hover:text-terracotta transition-colors"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 font-body text-xs text-charcoal/50">
              {item.size}
            </p>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeItem(item.productId, item.size)}
            className={cn(
              "shrink-0 rounded-md p-1 text-charcoal/30 transition-colors",
              "hover:bg-sand/60 hover:text-charcoal/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            )}
            aria-label={`Remove ${item.name}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom row: quantity + price */}
        <div className="mt-2 flex items-center justify-between">
          {/* Quantity controls */}
          <div className="inline-flex items-center rounded-lg border border-sand">
            <button
              type="button"
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              className={cn(
                "flex h-8 w-8 items-center justify-center text-charcoal/60 transition-colors",
                "hover:bg-sand/60 hover:text-charcoal",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta"
              )}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="flex h-8 w-8 items-center justify-center font-body text-sm font-medium text-charcoal">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              className={cn(
                "flex h-8 w-8 items-center justify-center text-charcoal/60 transition-colors",
                "hover:bg-sand/60 hover:text-charcoal",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta"
              )}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <span className="font-heading text-sm font-semibold text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
