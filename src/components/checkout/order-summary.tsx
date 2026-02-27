"use client";

import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils/formatPrice";

export function OrderSummary() {
  const t = useTranslations("cart");
  const { items, totalPrice } = useCartStore();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="heading-4 mb-4">Order Summary</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex justify-between text-sm"
          >
            <span className="text-charcoal/70">
              {item.name} ({item.size}) x{item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-sand pt-4">
        <div className="flex justify-between font-semibold">
          <span>{t("title")}</span>
          <span>{formatPrice(totalPrice())}</span>
        </div>
      </div>
    </div>
  );
}
