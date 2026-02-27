import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import type { Location } from "@/types/index";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getTypeBadgeProps(type: Location["type"]) {
  switch (type) {
    case "bistro":
      return { label: "Bistro", className: "bg-terracotta text-cream" };
    case "boutique":
      return { label: "Boutique", className: "bg-sage text-cream" };
    case "both":
      return { label: "Bistro + Boutique", className: "bg-forest text-cream" };
  }
}

function getGoogleMapsUrl(lat: number, lng: number, name: string) {
  const query = encodeURIComponent(name);
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=&center=${lat},${lng}`;
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LocationCardProps {
  location: Location;
  locale: "es" | "en";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LocationCard({ location, locale }: LocationCardProps) {
  const name = location.name[locale];
  const address = location.address[locale];
  const hours = location.hours[locale];
  const features = location.features.map((f) => f[locale]);
  const typeBadge = getTypeBadgeProps(location.type);

  return (
    <Card className="group flex flex-col overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {location.images.length > 0 ? (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-sand",
              "transition-colors duration-300 group-hover:bg-sand/80"
            )}
          >
            <svg
              className="h-12 w-12 text-clay/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sand">
            <svg
              className="h-12 w-12 text-clay/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <Badge className={typeBadge.className}>{typeBadge.label}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="heading-4">{name}</CardTitle>

        <CardDescription className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
          <span>{address}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        {/* Hours */}
        <div className="flex items-start gap-1.5 text-sm text-charcoal/70">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
          <span>{hours}</span>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {features.map((feature, i) => (
              <li key={i}>
                <Badge variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Get directions link */}
        <a
          href={getGoogleMapsUrl(
            location.geopoint.lat,
            location.geopoint.lng,
            name
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-body text-sm font-medium",
            "border-2 border-terracotta text-terracotta bg-transparent",
            "transition-colors hover:bg-terracotta hover:text-cream",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          )}
        >
          <MapPin className="h-4 w-4" />
          {locale === "es" ? "Cómo llegar" : "Get directions"}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </CardContent>
    </Card>
  );
}
