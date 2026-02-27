"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { items } = useCartStore();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
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
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="heading-3 mb-6">{t("title")}</h2>
      <p className="mb-8 text-charcoal/60">
        {t("redirecting")}
      </p>
      <Button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        size="lg"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("redirecting")}
          </>
        ) : (
          t("title")
        )}
      </Button>
    </div>
  );
}
