import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/navigation";

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                   */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_COLLECTIONS = [
  {
    id: "col-1",
    name: "Spring Ritual",
    slug: "spring-ritual",
    description:
      "Flowing silhouettes and earth tones inspired by the rituals of renewal. Hand-dyed with turmeric, indigo, and pomegranate.",
  },
  {
    id: "col-2",
    name: "Earth Tones",
    slug: "earth-tones",
    description:
      "A return to the raw beauty of the land. Neutral palettes drawn from the Oaxacan desert and Pacific coast.",
  },
  {
    id: "col-3",
    name: "Coastal Breeze",
    slug: "coastal-breeze",
    description:
      "Light, breathable pieces designed for life by the ocean. Organic cotton and linen in oceanic hues.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CollectionGrid() {
  const t = useTranslations("collections");

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PLACEHOLDER_COLLECTIONS.map((collection) => (
        <Link
          key={collection.id}
          href={{
            pathname: "/collections/[slug]",
            params: { slug: collection.slug },
          }}
          className="group block"
        >
          <div className="overflow-hidden rounded-xl border border-sand bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg">
            {/* Image placeholder */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center bg-sand",
                  "transition-all duration-500 group-hover:bg-sand/80 group-hover:scale-105"
                )}
              >
                <svg
                  className="h-14 w-14 text-charcoal/15"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />

              {/* Overlay text */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-2xl font-semibold text-cream">
                  {collection.name}
                </h3>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <p className="mb-4 font-body text-sm leading-relaxed text-charcoal/60 line-clamp-2">
                {collection.description}
              </p>
              <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-terracotta transition-colors group-hover:text-terracotta-dark">
                {t("viewCollection")}
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
