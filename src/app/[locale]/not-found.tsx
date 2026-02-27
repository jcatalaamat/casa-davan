import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="heading-1 mb-4 text-terracotta">404</h1>
      <p className="heading-3 mb-2">{t("notFound")}</p>
      <p className="mb-8 text-charcoal/60">{t("notFoundDescription")}</p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-terracotta px-6 py-3 text-cream transition-colors hover:bg-terracotta-dark"
      >
        {t("backToHome")}
      </Link>
    </div>
  );
}
