export const SITE_NAME = "Casa DaVan";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://casadavan.com";

export const WHATSAPP_NUMBER = "+529581234567";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`;

export const INSTAGRAM = {
  bistro: "https://instagram.com/casadavanmazunte",
  boutique: "https://instagram.com/davan_mystique",
} as const;

export const LOCATIONS = {
  mazunte: {
    lat: 15.6673,
    lng: -96.5553,
    name: "Mazunte",
  },
  zipolite: {
    lat: 15.6583,
    lng: -96.5253,
    name: "Zipolite",
  },
  cdmx: {
    lat: 19.4179,
    lng: -99.1609,
    name: "Roma Norte, CDMX",
  },
} as const;

export const BISTRO_HOURS = "8:30 AM - 10:30 PM";

export const SHIPPING_COUNTRIES = ["MX", "US", "CA"] as const;

export const CURRENCY = "MXN";

export const NAV_ITEMS = {
  bistro: [
    { key: "menu" as const, href: "/menu" as const },
    { key: "gallery" as const, href: "/gallery" as const },
    { key: "workspace" as const, href: "/workspace" as const },
  ],
  boutique: [
    { key: "shop" as const, href: "/shop" as const },
    { key: "collections" as const, href: "/collections" as const },
    { key: "ourCraft" as const, href: "/our-craft" as const },
  ],
  main: [
    { key: "about" as const, href: "/about" as const },
    { key: "locations" as const, href: "/locations" as const },
    { key: "contact" as const, href: "/contact" as const },
  ],
} as const;
