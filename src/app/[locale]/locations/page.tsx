import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { LocationGrid } from "@/components/locations/location-grid";
import type { Locale } from "@/types/index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations" });
  return {
    title: `${t("title")} | Casa DaVan`,
    description: t("subtitle"),
  };
}

export default function LocationsPage() {
  const t = useTranslations("locations");
  const locale = useLocale() as Locale;

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-16">
          <LocationGrid locale={locale} />
        </div>
      </div>
    </div>
  );
}
