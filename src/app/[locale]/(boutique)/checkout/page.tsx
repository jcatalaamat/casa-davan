"use client";

import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart";
import { CartSummary } from "@/components/cart/cart-summary";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-narrow text-center">
          <h1 className="heading-2">{t("title")}</h1>
          <p className="mt-4 text-charcoal/60">No items in cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-wide">
        <h1 className="heading-2 mb-8">{t("title")}</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div>
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
