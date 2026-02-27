import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: `${t("privacy")} | Casa DaVan` };
}

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow prose-davan">
        <h1 className="heading-2 mb-8">Privacy Policy</h1>
        <p>Last updated: February 2026</p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide when placing orders, subscribing to our
          newsletter, or contacting us. This includes name, email, shipping address,
          and payment information (processed securely by Stripe).
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to process orders, send order confirmations,
          respond to inquiries, and send newsletter updates (with your consent).
        </p>

        <h2>Data Protection</h2>
        <p>
          We implement industry-standard security measures. Payment processing is
          handled by Stripe and we never store credit card information on our servers.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at hello@casadavan.com.
        </p>
      </div>
    </div>
  );
}
