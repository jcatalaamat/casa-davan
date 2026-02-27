import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/bistro/gallery-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: `${t("title")} | Casa DaVan Bistro`,
    description: t("subtitle"),
  };
}

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
}
