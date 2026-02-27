import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";
import type Stripe from "stripe";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Send confirmation email
      if (session.customer_details?.email) {
        await resend.emails.send({
          from: "Casa DaVan <noreply@casadavan.com>",
          to: [session.customer_details.email],
          subject: "Order Confirmation - DaVan Mystique Boutique",
          text: `Thank you for your order!\n\nOrder ID: ${session.id}\nTotal: ${((session.amount_total || 0) / 100).toFixed(2)} MXN\n\nWe'll send you tracking information once your order ships.\n\nWith love,\nCasa DaVan`,
        });
      }

      // Notify business
      await resend.emails.send({
        from: "Casa DaVan <noreply@casadavan.com>",
        to: ["hello@casadavan.com"],
        subject: `New Order: ${session.id}`,
        text: `New order received!\n\nCustomer: ${session.customer_details?.name || "N/A"}\nEmail: ${session.customer_details?.email || "N/A"}\nTotal: ${((session.amount_total || 0) / 100).toFixed(2)} MXN\nSession ID: ${session.id}`,
      });
    } catch (emailError) {
      console.error("Failed to send order emails:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}
