"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/cn";
import { PriceDisplay } from "@/components/ui/price-display";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/stores/cart";
import { ProductImages } from "@/components/boutique/product-images";
import { SizeSelector } from "@/components/boutique/size-selector";
import type { ProductSize } from "@/types/index";

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                   */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_PRODUCT = {
  _id: "prod-001",
  name: { es: "Vestido Tierra", en: "Earth Dress" },
  slug: { current: "vestido-tierra" },
  description: {
    es: "Vestido fluido con tintes naturales de la tierra. Confeccionado artesanalmente en India con algodón orgánico. Inspirado en los tonos del desierto oaxaqueño, esta pieza es perfecta para el calor costero.",
    en: "Flowing dress with natural earth dyes. Artisanally crafted in India with organic cotton. Inspired by the tones of the Oaxacan desert, this piece is perfect for coastal warmth.",
  },
  price: 2800,
  compareAtPrice: 3200,
  stripePriceId: "price_placeholder",
  images: [] as string[],
  category: { name: { es: "Vestidos", en: "Dresses" } },
  sizes: [
    { size: "XS", stock: 2 },
    { size: "S", stock: 5 },
    { size: "M", stock: 3 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 1 },
  ] as ProductSize[],
  materials: {
    es: "100% algodón orgánico certificado GOTS. Tintes naturales derivados de plantas: indigo, cúrcuma y raíz de rubia. Botones de coco natural.",
    en: "100% GOTS-certified organic cotton. Natural plant-derived dyes: indigo, turmeric, and madder root. Natural coconut buttons.",
  },
  careInstructions: {
    es: "Lavar a mano con agua fría. No usar blanqueador. Secar a la sombra. Planchar a baja temperatura. Los tintes naturales pueden variar ligeramente con el tiempo, añadiendo carácter a la prenda.",
    en: "Hand wash in cold water. Do not bleach. Dry in shade. Iron at low temperature. Natural dyes may vary slightly over time, adding character to the garment.",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ProductDetailProps {
  slug: string;
  locale: string;
}

export function ProductDetail({ slug: _slug, locale }: ProductDetailProps) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Use placeholder data (in production, this would come from a fetch/query based on slug)
  const product = PLACEHOLDER_PRODUCT;
  const lang = locale as "es" | "en";

  const handleAddToCart = () => {
    if (!selectedSize) return;

    setIsAdding(true);

    addItem({
      productId: product._id,
      name: product.name[lang],
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: "",
      slug: product.slug.current,
      stripePriceId: product.stripePriceId,
    });

    // Brief visual feedback
    setTimeout(() => setIsAdding(false), 1200);
  };

  const selectedSizeStock = product.sizes.find(
    (s) => s.size === selectedSize
  )?.stock;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: Images */}
      <ProductImages images={product.images} />

      {/* Right: Product info */}
      <div className="flex flex-col">
        {/* Category */}
        <Badge variant="outline" className="mb-3 w-fit">
          {product.category.name[lang]}
        </Badge>

        {/* Name */}
        <h1 className="font-heading text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
          {product.name[lang]}
        </h1>

        {/* Price */}
        <div className="mt-4">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="text-xl"
          />
        </div>

        {/* Description */}
        <p className="mt-6 font-body leading-relaxed text-charcoal/70">
          {product.description[lang]}
        </p>

        {/* Size selector */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-body text-sm font-medium text-charcoal">
              {t("selectSize")}
            </span>
            <Link
              href="/size-guide"
              className="font-body text-sm text-terracotta underline-offset-4 hover:underline"
            >
              {t("sizeGuide")}
            </Link>
          </div>
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
          {selectedSize && selectedSizeStock !== undefined && selectedSizeStock > 0 && (
            <p className="mt-2 font-body text-xs text-sage">
              {tCommon("inStock")} ({selectedSizeStock})
            </p>
          )}
        </div>

        {/* Add to cart */}
        <Button
          className="mt-8 w-full"
          size="lg"
          disabled={!selectedSize || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? tCommon("loading") : t("addToCart")}
        </Button>

        {/* Tabs: Materials, Care Instructions */}
        <Tabs.Root defaultValue="description" className="mt-10">
          <Tabs.List
            className="flex border-b border-sand"
            aria-label="Product details"
          >
            {(
              [
                { value: "description", label: t("description") },
                { value: "materials", label: t("materials") },
                { value: "care", label: t("careInstructions") },
              ] as const
            ).map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "relative px-4 py-3 font-body text-sm font-medium text-charcoal/50 transition-colors",
                  "hover:text-charcoal",
                  "data-[state=active]:text-terracotta",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
                  "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta after:opacity-0 after:transition-opacity",
                  "data-[state=active]:after:opacity-100"
                )}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content
            value="description"
            className="pt-6 font-body text-sm leading-relaxed text-charcoal/70"
          >
            {product.description[lang]}
          </Tabs.Content>

          <Tabs.Content
            value="materials"
            className="pt-6 font-body text-sm leading-relaxed text-charcoal/70"
          >
            {product.materials[lang]}
          </Tabs.Content>

          <Tabs.Content
            value="care"
            className="pt-6 font-body text-sm leading-relaxed text-charcoal/70"
          >
            {product.careInstructions[lang]}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
