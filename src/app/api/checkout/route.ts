import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      stripePriceId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  locale: z.enum(["es", "en"]).default("es"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, locale } = checkoutSchema.parse(body);

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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid checkout data" },
        { status: 400 }
      );
    }
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
