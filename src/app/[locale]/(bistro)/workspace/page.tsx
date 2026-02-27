import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Wifi, Clock, Coffee, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workspace" });
  return {
    title: `${t("title")} | Casa DaVan Bistro`,
    description: t("subtitle"),
  };
}

export default function WorkspacePage() {
  const t = useTranslations("workspace");

  const features = [
    {
      icon: Wifi,
      title: t("features.wifi"),
      description: t("features.wifiDescription"),
    },
    {
      icon: Clock,
      title: t("features.hours"),
      description: t("features.hoursDescription"),
    },
    {
      icon: Coffee,
      title: t("features.food"),
      description: t("features.foodDescription"),
    },
    {
      icon: Sparkles,
      title: t("features.atmosphere"),
      description: t("features.atmosphereDescription"),
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-sage-light/30 p-3">
                <feature.icon className="h-6 w-6 text-forest" />
              </div>
              <h3 className="heading-4 mb-2">{feature.title}</h3>
              <p className="text-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-forest p-8 text-center text-cream sm:p-12">
          <h3 className="heading-3 mb-4">WiFi Starlink</h3>
          <p className="mx-auto max-w-2xl text-lg text-cream/80">
            {t("features.wifiDescription")}
          </p>
        </div>
      </div>
    </div>
  );
}
