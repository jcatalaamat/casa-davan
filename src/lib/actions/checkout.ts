"use server";

import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/types/cart";

export async function createCheckoutSession(
  items: CartItem[],
  locale: string = "es"
) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/cart`,
    shipping_address_collection: {
      allowed_countries: ["MX", "US", "CA"],
    },
    locale: locale === "es" ? "es" : "en",
  });

  return { url: session.url };
}
