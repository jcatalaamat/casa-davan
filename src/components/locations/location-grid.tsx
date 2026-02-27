import { LOCATIONS } from "@/lib/constants";
import { LocationCard } from "./location-card";
import type { Location } from "@/types/index";

/* ------------------------------------------------------------------ */
/*  Placeholder data (will be replaced with Sanity data)               */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_LOCATIONS: Location[] = [
  {
    _id: "loc-mazunte",
    name: { es: "Casa DaVan Mazunte", en: "Casa DaVan Mazunte" },
    slug: { current: "mazunte" },
    type: "both",
    address: {
      es: "Calle del Rinconcito s/n, Mazunte, Oaxaca, México",
      en: "Calle del Rinconcito s/n, Mazunte, Oaxaca, Mexico",
    },
    geopoint: {
      _type: "geopoint",
      lat: LOCATIONS.mazunte.lat,
      lng: LOCATIONS.mazunte.lng,
    },
    hours: {
      es: "Lunes a Domingo: 8:30 AM - 10:30 PM",
      en: "Monday to Sunday: 8:30 AM - 10:30 PM",
    },
    phone: "+529581234567",
    whatsapp: "+529581234567",
    email: "mazunte@casadavan.com",
    images: [],
    features: [
      { es: "Bistro", en: "Bistro" },
      { es: "Boutique", en: "Boutique" },
      { es: "Wi-Fi gratuito", en: "Free Wi-Fi" },
      { es: "Terraza", en: "Terrace" },
      { es: "Pizza al horno", en: "Wood-fired pizza" },
    ],
  },
  {
    _id: "loc-zipolite",
    name: { es: "DaVan Boutique Zipolite", en: "DaVan Boutique Zipolite" },
    slug: { current: "zipolite" },
    type: "boutique",
    address: {
      es: "Calle Principal, Playa Zipolite, Oaxaca, México",
      en: "Calle Principal, Playa Zipolite, Oaxaca, Mexico",
    },
    geopoint: {
      _type: "geopoint",
      lat: LOCATIONS.zipolite.lat,
      lng: LOCATIONS.zipolite.lng,
    },
    hours: {
      es: "Lunes a Sábado: 10:00 AM - 7:00 PM",
      en: "Monday to Saturday: 10:00 AM - 7:00 PM",
    },
    phone: "+529587654321",
    email: "zipolite@casadavan.com",
    images: [],
    features: [
      { es: "Boutique", en: "Boutique" },
      { es: "Ropa artesanal", en: "Artisan clothing" },
      { es: "Accesorios", en: "Accessories" },
    ],
  },
  {
    _id: "loc-cdmx",
    name: { es: "DaVan Boutique Roma Norte", en: "DaVan Boutique Roma Norte" },
    slug: { current: "roma-norte-cdmx" },
    type: "boutique",
    address: {
      es: "Calle Orizaba 123, Col. Roma Norte, CDMX, México",
      en: "Calle Orizaba 123, Col. Roma Norte, CDMX, Mexico",
    },
    geopoint: {
      _type: "geopoint",
      lat: LOCATIONS.cdmx.lat,
      lng: LOCATIONS.cdmx.lng,
    },
    hours: {
      es: "Lunes a Sábado: 11:00 AM - 8:00 PM, Domingo: 12:00 PM - 6:00 PM",
      en: "Monday to Saturday: 11:00 AM - 8:00 PM, Sunday: 12:00 PM - 6:00 PM",
    },
    phone: "+525512345678",
    email: "cdmx@casadavan.com",
    images: [],
    features: [
      { es: "Boutique", en: "Boutique" },
      { es: "Colecciones exclusivas", en: "Exclusive collections" },
      { es: "Estilismo personal", en: "Personal styling" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LocationGridProps {
  locale: "es" | "en";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LocationGrid({ locale }: LocationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {PLACEHOLDER_LOCATIONS.map((location) => (
        <LocationCard key={location._id} location={location} locale={locale} />
      ))}
    </div>
  );
}
