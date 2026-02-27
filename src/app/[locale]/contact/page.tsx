import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("title")} | Casa DaVan`,
    description: t("subtitle"),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
