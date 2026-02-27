import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CheckCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout.success" });
  return {
    title: `${t("title")} | DaVan Mystique Boutique`,
  };
}

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout.success" });
  const { session_id } = await searchParams;

  return (
    <div className="section-padding">
      <div className="container-narrow text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-sage" />
        <h1 className="heading-2 mb-4">{t("title")}</h1>
        <p className="mb-2 text-lg text-charcoal/70">{t("description")}</p>
        {session_id && (
          <p className="mb-8 text-sm text-charcoal/50">
            {t("orderNumber")}: {session_id}
          </p>
        )}
        <Link
          href="/shop"
          className="inline-flex rounded-full bg-terracotta px-6 py-3 text-cream transition-colors hover:bg-terracotta-dark"
        >
          {t("backToShop")}
        </Link>
      </div>
    </div>
  );
}
