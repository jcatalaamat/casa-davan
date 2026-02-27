import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://casadavan.com";

  const staticPages = [
    "",
    "/nosotros",
    "/ubicaciones",
    "/contacto",
    "/menu",
    "/galeria",
    "/espacio-de-trabajo",
    "/tienda",
    "/colecciones",
    "/guia-de-tallas",
    "/nuestro-arte",
    "/privacidad",
    "/terminos",
    "/envios",
  ];

  const esPages = staticPages.map((path) => ({
    url: `${siteUrl}/es${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${siteUrl}/es${path}`,
        en: `${siteUrl}/en${path.replace("/nosotros", "/about").replace("/ubicaciones", "/locations").replace("/contacto", "/contact").replace("/galeria", "/gallery").replace("/espacio-de-trabajo", "/workspace").replace("/tienda", "/shop").replace("/colecciones", "/collections").replace("/guia-de-tallas", "/size-guide").replace("/nuestro-arte", "/our-craft").replace("/privacidad", "/privacy").replace("/terminos", "/terms").replace("/envios", "/shipping")}`,
      },
    },
  }));

  return esPages;
}
