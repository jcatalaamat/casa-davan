"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Category {
  slug: string;
  name: string;
}

interface FiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categorySlug: string) => void;
  onReset: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Filters({
  categories,
  selectedCategories,
  onCategoryChange,
  onReset,
}: FiltersProps) {
  const t = useTranslations("shop.filters");
  const tCommon = useTranslations("common");

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="space-y-8">
      {/* Category filter */}
      <div>
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-charcoal">
          {t("category")}
        </h3>
        <div className="space-y-3">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category.slug);

            return (
              <div key={category.slug} className="flex items-center gap-3">
                <Checkbox.Root
                  id={`category-${category.slug}`}
                  checked={isChecked}
                  onCheckedChange={() => onCategoryChange(category.slug)}
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                    isChecked
                      ? "border-terracotta bg-terracotta"
                      : "border-sand bg-white hover:border-terracotta/40"
                  )}
                >
                  <Checkbox.Indicator>
                    <Check className="h-3.5 w-3.5 text-cream" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                  htmlFor={`category-${category.slug}`}
                  className="cursor-pointer font-body text-sm text-charcoal/80 transition-colors hover:text-charcoal"
                >
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price range placeholder */}
      <div>
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-charcoal">
          {t("priceRange")}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min"
              className={cn(
                "w-full rounded-lg border border-sand bg-cream px-3 py-2 font-body text-sm text-charcoal",
                "placeholder:text-charcoal/40 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              )}
              min={0}
            />
          </div>
          <span className="font-body text-sm text-charcoal/40">-</span>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max"
              className={cn(
                "w-full rounded-lg border border-sand bg-cream px-3 py-2 font-body text-sm text-charcoal",
                "placeholder:text-charcoal/40 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              )}
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Reset filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="w-full text-terracotta hover:text-terracotta-dark"
        >
          {tCommon("filter")} &mdash; Reset
        </Button>
      )}
    </div>
  );
}
