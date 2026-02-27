export type Locale = "es" | "en";

export interface LocaleString {
  es: string;
  en: string;
}

export interface LocaleText {
  es: string;
  en: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: LocaleString;
}

export interface GeoPoint {
  _type: "geopoint";
  lat: number;
  lng: number;
}

export interface Location {
  _id: string;
  name: LocaleString;
  slug: { current: string };
  type: "bistro" | "boutique" | "both";
  address: LocaleString;
  geopoint: GeoPoint;
  hours: LocaleString;
  phone?: string;
  whatsapp?: string;
  email?: string;
  images: SanityImage[];
  features: LocaleString[];
}

export interface MenuCategory {
  _id: string;
  name: LocaleString;
  slug: { current: string };
  icon?: string;
  image?: SanityImage;
  order: number;
}

export interface MenuItem {
  _id: string;
  name: LocaleString;
  description: LocaleText;
  price: number;
  image?: SanityImage;
  category: MenuCategory;
  dietaryTags: string[];
  available: boolean;
}

export interface GalleryImage {
  _id: string;
  image: SanityImage;
  alt: LocaleString;
  caption?: LocaleString;
  category: "food" | "drinks" | "atmosphere";
  order: number;
}

export interface Review {
  _id: string;
  name: string;
  quote: LocaleText;
  rating: number;
  source: string;
  date: string;
  featured: boolean;
}

export interface ProductCategory {
  _id: string;
  name: LocaleString;
  slug: { current: string };
  description?: LocaleText;
  image?: SanityImage;
}

export interface Collection {
  _id: string;
  name: LocaleString;
  slug: { current: string };
  description?: LocaleText;
  featuredImage?: SanityImage;
  season?: string;
  active: boolean;
}

export interface ProductSize {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: LocaleString;
  slug: { current: string };
  description: LocaleText;
  price: number;
  compareAtPrice?: number;
  stripePriceId: string;
  images: SanityImage[];
  category: ProductCategory;
  collection?: Collection;
  sizes: ProductSize[];
  materials?: LocaleText;
  careInstructions?: LocaleText;
  tags?: string[];
}

export interface TeamMember {
  _id: string;
  name: string;
  role: LocaleString;
  photo: SanityImage;
  bio: LocaleText;
}

export interface SiteSettings {
  _id: string;
  name: string;
  tagline: LocaleString;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: {
    bistro: string;
    boutique: string;
  };
  currency: string;
  announcementBar?: LocaleString;
}
