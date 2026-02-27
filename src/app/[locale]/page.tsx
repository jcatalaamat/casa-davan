import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BrandStory } from "@/components/sections/brand-story";
import { BusinessCards } from "@/components/sections/business-cards";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { InstagramSection } from "@/components/sections/instagram-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <BusinessCards />
      <Testimonials />
      <Newsletter />
      <InstagramSection />
    </>
  );
}
