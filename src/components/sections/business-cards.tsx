import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface BusinessCardProps {
  title: string;
  description: string;
  href: "/" | "/menu" | "/shop" | "/about" | "/locations" | "/contact" | "/gallery" | "/workspace" | "/collections" | "/cart" | "/checkout" | "/size-guide" | "/our-craft";
  ctaLabel: string;
  className?: string;
}

function BusinessCard({
  title,
  description,
  href,
  ctaLabel,
  className,
}: BusinessCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] w-full bg-sand/50 transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-accent text-2xl text-charcoal/20">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="heading-3 text-charcoal">{title}</h3>
        <p className="mt-3 flex-1 text-base text-charcoal/60 font-body leading-relaxed">
          {description}
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BusinessCards() {
  const t = useTranslations("home.businesses");
  const nav = useTranslations("nav");

  return (
    <section className="section-padding bg-gradient-to-b from-cream to-cream-dark">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <BusinessCard
            title={t("bistroTitle")}
            description={t("bistroDescription")}
            href="/menu"
            ctaLabel={nav("menu")}
          />
          <BusinessCard
            title={t("boutiqueTitle")}
            description={t("boutiqueDescription")}
            href="/shop"
            ctaLabel={nav("shop")}
          />
        </div>
      </div>
    </section>
  );
}
