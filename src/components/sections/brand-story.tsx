import { useTranslations } from "next-intl";

export function BrandStory() {
  const t = useTranslations("home.brandStory");

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column - heading and accent */}
          <div>
            <p className="font-accent text-2xl text-terracotta mb-4">
              Casa DaVan
            </p>
            <h2 className="heading-2 text-charcoal">{t("title")}</h2>
          </div>

          {/* Right column - description */}
          <div>
            <p className="text-lg text-charcoal/70 font-body leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
