"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/stores/cart";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const t = useTranslations("cart");
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-narrow text-center">
          <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-charcoal/20" />
          <h1 className="heading-2 mb-4">{t("empty")}</h1>
          <p className="mb-8 text-charcoal/60">{t("emptyDescription")}</p>
          <Link
            href="/shop"
            className="inline-flex rounded-full bg-terracotta px-6 py-3 text-cream transition-colors hover:bg-terracotta-dark"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-wide">
        <h1 className="heading-2 mb-8">{t("title")}</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={`${item.productId}-${item.size}`} item={item} />
            ))}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
