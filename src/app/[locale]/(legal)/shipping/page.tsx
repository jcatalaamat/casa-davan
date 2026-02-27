import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: `${t("shipping")} | Casa DaVan` };
}

export default function ShippingPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow prose-davan">
        <h1 className="heading-2 mb-8">Shipping Information</h1>
        <p>Last updated: February 2026</p>

        <h2>Shipping Destinations</h2>
        <p>We currently ship to Mexico, the United States, and Canada.</p>

        <h2>Shipping Times</h2>
        <ul>
          <li><strong>Mexico:</strong> 3-7 business days</li>
          <li><strong>United States:</strong> 7-14 business days</li>
          <li><strong>Canada:</strong> 7-14 business days</li>
        </ul>

        <h2>Shipping Costs</h2>
        <p>
          Shipping costs are calculated at checkout based on destination and order
          weight. Free shipping on orders over $2,000 MXN within Mexico.
        </p>

        <h2>Tracking</h2>
        <p>
          Once your order ships, you will receive a tracking number via email.
        </p>
      </div>
    </div>
  );
}
