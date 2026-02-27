import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: `${t("terms")} | Casa DaVan` };
}

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow prose-davan">
        <h1 className="heading-2 mb-8">Terms & Conditions</h1>
        <p>Last updated: February 2026</p>

        <h2>General</h2>
        <p>
          By using our website and purchasing products from DaVan Mystique Boutique,
          you agree to these terms and conditions.
        </p>

        <h2>Products</h2>
        <p>
          All products are handmade and may have slight variations in color and
          texture. This is a feature of artisanal, naturally-dyed clothing, not a defect.
        </p>

        <h2>Returns & Exchanges</h2>
        <p>
          We accept returns within 14 days of delivery for unworn items in original
          condition. Contact us at hello@casadavan.com to initiate a return.
        </p>

        <h2>Pricing</h2>
        <p>
          All prices are listed in Mexican Pesos (MXN). Prices are subject to change
          without notice.
        </p>
      </div>
    </div>
  );
}
