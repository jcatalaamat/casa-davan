import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductGrid } from "@/components/boutique/product-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: `${t("title")} | DaVan Mystique Boutique`,
    description: t("subtitle"),
  };
}

export default function ShopPage() {
  const t = useTranslations("shop");

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
