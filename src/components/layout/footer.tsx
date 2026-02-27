import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Instagram } from "lucide-react";
import { SITE_NAME, INSTAGRAM } from "@/lib/constants";

type StaticPathname = "/" | "/about" | "/locations" | "/contact" | "/menu" | "/gallery" | "/workspace" | "/shop" | "/collections" | "/cart" | "/checkout" | "/checkout/success" | "/size-guide" | "/our-craft" | "/privacy" | "/terms" | "/shipping";

interface FooterLink {
  label: string;
  href: StaticPathname;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-cream/70 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const bistroLinks: FooterLink[] = [
    { label: nav("menu"), href: "/menu" },
    { label: nav("gallery"), href: "/gallery" },
    { label: nav("workspace"), href: "/workspace" },
  ];

  const boutiqueLinks: FooterLink[] = [
    { label: nav("shop"), href: "/shop" },
    { label: nav("collections"), href: "/collections" },
    { label: nav("ourCraft"), href: "/our-craft" },
    { label: nav("sizeGuide"), href: "/size-guide" },
  ];

  const companyLinks: FooterLink[] = [
    { label: nav("about"), href: "/about" },
    { label: nav("locations"), href: "/locations" },
    { label: nav("contact"), href: "/contact" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
    { label: t("shipping"), href: "/shipping" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream">
      {/* Main footer content */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold tracking-tight text-cream transition-colors hover:text-gold"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-3 font-accent text-lg text-cream/80">
              {t("tagline")}
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM.bistro}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Bistro - @casadavanmazunte"
                className="rounded-lg p-2 text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM.boutique}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Boutique - @davan_mystique"
                className="rounded-lg p-2 text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bistro column */}
          <FooterColumn title={t("bistro")} links={bistroLinks} />

          {/* Boutique column */}
          <FooterColumn title={t("boutique")} links={boutiqueLinks} />

          {/* Company column */}
          <FooterColumn title={t("company")} links={companyLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-cream/50">
            &copy; {currentYear} {SITE_NAME}. {t("rights")}.
          </p>
          <p className="text-xs text-cream/40">
            Bistro &amp; Boutique &mdash; Costa Oaxaquena
          </p>
        </div>
      </div>
    </footer>
  );
}
