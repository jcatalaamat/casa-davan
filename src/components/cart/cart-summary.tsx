"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const totalPrice = useCartStore((s) => s.totalPrice);
  const items = useCartStore((s) => s.items);

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            stripePriceId: item.stripePriceId,
            quantity: item.quantity,
          })),
          locale,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setIsLoading(false);
    }
  };

  const subtotal = totalPrice();

  return (
    <div className="space-y-4">
      {/* Subtotal */}
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-charcoal/60">
          {tCommon("subtotal")}
        </span>
        <span className="font-heading text-sm font-semibold text-charcoal">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-sand" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-heading text-base font-semibold text-charcoal">
          {tCommon("total")}
        </span>
        <span className="font-heading text-lg font-semibold text-charcoal">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Checkout button */}
      {showCheckoutButton && (
        <Button
          className={cn("mt-4 w-full")}
          size="lg"
          disabled={items.length === 0 || isLoading}
          onClick={handleCheckout}
        >
          {isLoading ? tCommon("loading") : t("checkout")}
        </Button>
      )}
    </div>
  );
}
