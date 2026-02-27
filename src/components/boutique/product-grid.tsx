"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ProductCard } from "@/components/boutique/product-card";
import { Filters } from "@/components/boutique/filters";

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                   */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_PRODUCTS = [
  {
    id: "1",
    name: "Vestido Tierra",
    slug: "vestido-tierra",
    price: 2800,
    category: "Dresses",
    categorySlug: "dresses",
    collectionSlug: "spring-ritual",
  },
  {
    id: "2",
    name: "Blusa Luna",
    slug: "blusa-luna",
    price: 1600,
    compareAtPrice: 2000,
    category: "Tops",
    categorySlug: "tops",
    collectionSlug: "spring-ritual",
  },
  {
    id: "3",
    name: "Pantalon Sage",
    slug: "pantalon-sage",
    price: 2200,
    category: "Bottoms",
    categorySlug: "bottoms",
    collectionSlug: "earth-tones",
  },
  {
    id: "4",
    name: "Kimono Solstice",
    slug: "kimono-solstice",
    price: 3400,
    category: "Outerwear",
    categorySlug: "outerwear",
    collectionSlug: "earth-tones",
  },
  {
    id: "5",
    name: "Top Amanecer",
    slug: "top-amanecer",
    price: 1200,
    compareAtPrice: 1500,
    category: "Tops",
    categorySlug: "tops",
    collectionSlug: "spring-ritual",
  },
  {
    id: "6",
    name: "Falda Mareas",
    slug: "falda-mareas",
    price: 1900,
    category: "Bottoms",
    categorySlug: "bottoms",
    collectionSlug: "coastal-breeze",
  },
  {
    id: "7",
    name: "Vestido Ritual",
    slug: "vestido-ritual",
    price: 3200,
    category: "Dresses",
    categorySlug: "dresses",
    collectionSlug: "coastal-breeze",
  },
  {
    id: "8",
    name: "Chal Espiritu",
    slug: "chal-espiritu",
    price: 1800,
    compareAtPrice: 2400,
    category: "Accessories",
    categorySlug: "accessories",
    collectionSlug: "earth-tones",
  },
];

const CATEGORIES = [
  { slug: "dresses", name: "Dresses" },
  { slug: "tops", name: "Tops" },
  { slug: "bottoms", name: "Bottoms" },
  { slug: "outerwear", name: "Outerwear" },
  { slug: "accessories", name: "Accessories" },
];

type SortOption = "newest" | "price-asc" | "price-desc" | "featured";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ProductGridProps {
  collectionSlug?: string;
}

export function ProductGrid({ collectionSlug }: ProductGridProps) {
  const t = useTranslations("shop");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((c) => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSortBy("newest");
  };

  const filteredProducts = useMemo(() => {
    let products = [...PLACEHOLDER_PRODUCTS];

    // Filter by collection
    if (collectionSlug) {
      products = products.filter((p) => p.collectionSlug === collectionSlug);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        selectedCategories.includes(p.categorySlug)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      case "newest":
      default:
        break;
    }

    return products;
  }, [selectedCategories, sortBy, collectionSlug]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Filter sidebar */}
      <aside className="w-full shrink-0 lg:w-64">
        <Filters
          categories={CATEGORIES}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          onReset={handleResetFilters}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-charcoal/60 font-body">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {/* Sort dropdown */}
          <Select.Root
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <Select.Trigger
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-sand bg-cream px-4 py-2",
                "font-body text-sm text-charcoal transition-colors",
                "hover:border-terracotta/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream"
              )}
              aria-label={t("filters.sortBy")}
            >
              <Select.Value placeholder={t("filters.sortBy")} />
              <Select.Icon>
                <ChevronDown className="h-4 w-4 text-charcoal/60" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="z-50 overflow-hidden rounded-lg border border-sand bg-white shadow-lg"
                position="popper"
                sideOffset={4}
              >
                <Select.Viewport className="p-1">
                  {(
                    [
                      { value: "newest", label: t("filters.newest") },
                      { value: "price-asc", label: t("filters.priceLowHigh") },
                      {
                        value: "price-desc",
                        label: t("filters.priceHighLow"),
                      },
                      { value: "featured", label: t("filters.featured") },
                    ] as const
                  ).map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-md px-8 py-2",
                        "font-body text-sm text-charcoal outline-none",
                        "data-[highlighted]:bg-sand/60 data-[highlighted]:text-charcoal"
                      )}
                    >
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <Check className="h-3.5 w-3.5 text-terracotta" />
                      </Select.ItemIndicator>
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  compareAtPrice: product.compareAtPrice,
                  category: product.category,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-body text-charcoal/60">{t("noProducts")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
