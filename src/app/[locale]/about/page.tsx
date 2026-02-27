import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("title")} | Casa DaVan`,
    description: t("philosophy.description"),
  };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title={t("title")} />

        <div className="mx-auto mt-16 max-w-3xl space-y-16">
          <section>
            <h2 className="heading-3 mb-4 text-terracotta">{t("philosophy.title")}</h2>
            <p className="text-lg leading-relaxed text-charcoal/80">
              {t("philosophy.description")}
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4 text-terracotta">{t("mission.title")}</h2>
            <p className="text-lg leading-relaxed text-charcoal/80">
              {t("mission.description")}
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-8 text-center">{t("team.title")}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team members will be fetched from Sanity */}
              <div className="text-center text-charcoal/40">
                <div className="mx-auto mb-4 h-48 w-48 rounded-full bg-sand" />
                <p className="font-heading text-lg font-semibold">Team Member</p>
                <p className="text-sm text-charcoal/60">Role</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
