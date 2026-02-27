import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Leaf, Heart, Globe, Palette } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourCraft" });
  return {
    title: `${t("title")} | DaVan Mystique Boutique`,
    description: t("subtitle"),
  };
}

export default function OurCraftPage() {
  const t = useTranslations("ourCraft");

  const values = [
    {
      icon: Leaf,
      title: "Natural Dyes",
      description: "Every color in our garments comes from nature — plants, minerals, and earth pigments processed by hand.",
    },
    {
      icon: Heart,
      title: "Artisan Made",
      description: "Our clothing is crafted by skilled artisans in India who carry forward generations of textile knowledge.",
    },
    {
      icon: Globe,
      title: "Sustainable",
      description: "From raw materials to final stitch, we minimize environmental impact at every step of production.",
    },
    {
      icon: Palette,
      title: "Nature-Inspired",
      description: "Each design draws from the beauty of the natural world — ocean waves, jungle canopy, desert sunsets.",
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto mt-12 max-w-3xl">
          <p className="text-center text-lg leading-relaxed text-charcoal/80">
            {t("story")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-terracotta/10 p-3">
                <value.icon className="h-6 w-6 text-terracotta" />
              </div>
              <h3 className="heading-4 mb-2">{value.title}</h3>
              <p className="text-charcoal/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
