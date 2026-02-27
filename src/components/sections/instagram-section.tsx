import { useTranslations } from "next-intl";
import { Instagram } from "lucide-react";
import { INSTAGRAM } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/section-header";

const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: `post-${i + 1}`,
}));

export function InstagramSection() {
  const t = useTranslations("home.instagram");

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <SectionHeader title={t("title")} className="mb-10" />

        {/* Instagram handles */}
        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={INSTAGRAM.bistro}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-charcoal/70 transition-colors hover:text-terracotta"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-body text-base font-medium">
              {t("bistro")}
            </span>
          </a>
          <a
            href={INSTAGRAM.boutique}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-charcoal/70 transition-colors hover:text-terracotta"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-body text-base font-medium">
              {t("boutique")}
            </span>
          </a>
        </div>

        {/* Placeholder image grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {PLACEHOLDER_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-sand transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Placeholder content - replace with actual Instagram images */}
              <div className="flex h-full w-full items-center justify-center">
                <Instagram className="h-8 w-8 text-charcoal/10" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30">
                <Instagram className="h-6 w-6 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
