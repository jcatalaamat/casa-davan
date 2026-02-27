import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/about": {
      es: "/nosotros",
      en: "/about",
    },
    "/locations": {
      es: "/ubicaciones",
      en: "/locations",
    },
    "/contact": {
      es: "/contacto",
      en: "/contact",
    },
    "/menu": "/menu",
    "/gallery": {
      es: "/galeria",
      en: "/gallery",
    },
    "/workspace": {
      es: "/espacio-de-trabajo",
      en: "/workspace",
    },
    "/shop": {
      es: "/tienda",
      en: "/shop",
    },
    "/shop/[slug]": {
      es: "/tienda/[slug]",
      en: "/shop/[slug]",
    },
    "/collections": {
      es: "/colecciones",
      en: "/collections",
    },
    "/collections/[slug]": {
      es: "/colecciones/[slug]",
      en: "/collections/[slug]",
    },
    "/cart": {
      es: "/carrito",
      en: "/cart",
    },
    "/checkout": "/checkout",
    "/checkout/success": "/checkout/success",
    "/size-guide": {
      es: "/guia-de-tallas",
      en: "/size-guide",
    },
    "/our-craft": {
      es: "/nuestro-arte",
      en: "/our-craft",
    },
    "/privacy": {
      es: "/privacidad",
      en: "/privacy",
    },
    "/terms": {
      es: "/terminos",
      en: "/terms",
    },
    "/shipping": {
      es: "/envios",
      en: "/shipping",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
