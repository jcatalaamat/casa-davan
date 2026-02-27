"use client";

import { useTranslations } from "next-intl";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/cn";
import { MenuCard } from "./menu-card";

/* ------------------------------------------------------------------ */
/*  Placeholder data                                                   */
/* ------------------------------------------------------------------ */

interface PlaceholderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietaryTags: string[];
  image?: string;
}

interface PlaceholderCategory {
  id: string;
  slug: string;
  nameKey: string;
  items: PlaceholderItem[];
}

const PLACEHOLDER_CATEGORIES: PlaceholderCategory[] = [
  {
    id: "cat-bowls",
    slug: "bowls",
    nameKey: "bowls",
    items: [
      {
        id: "item-1",
        name: "Acai Bowl",
        description:
          "Acai blended with banana and topped with granola, fresh fruit, coconut flakes, and honey.",
        price: 165,
        dietaryTags: ["Vegan", "Gluten-free"],
      },
      {
        id: "item-2",
        name: "Dragon Fruit Bowl",
        description:
          "Vibrant pitaya base with mango, banana, chia seeds, and house-made granola.",
        price: 175,
        dietaryTags: ["Vegan"],
      },
      {
        id: "item-3",
        name: "Green Power Bowl",
        description:
          "Spinach, avocado, and banana blend topped with seeds, coconut, and agave.",
        price: 155,
        dietaryTags: ["Vegan", "Gluten-free"],
      },
    ],
  },
  {
    id: "cat-smoothies",
    slug: "smoothies",
    nameKey: "smoothies",
    items: [
      {
        id: "item-4",
        name: "Tropical Sunrise",
        description:
          "Mango, pineapple, passion fruit, and coconut milk blended to perfection.",
        price: 95,
        dietaryTags: ["Vegan", "Gluten-free"],
      },
      {
        id: "item-5",
        name: "Green Detox",
        description:
          "Spinach, celery, green apple, ginger, and lemon for a fresh start.",
        price: 85,
        dietaryTags: ["Vegan", "Gluten-free"],
      },
      {
        id: "item-6",
        name: "Cacao Energizer",
        description:
          "Raw cacao, banana, almond butter, dates, and oat milk.",
        price: 105,
        dietaryTags: ["Vegan"],
      },
    ],
  },
  {
    id: "cat-coffee",
    slug: "coffee",
    nameKey: "coffee",
    items: [
      {
        id: "item-7",
        name: "Oaxacan Pour Over",
        description:
          "Single-origin beans from the Sierra Madre, hand-brewed pour over.",
        price: 65,
        dietaryTags: [],
      },
      {
        id: "item-8",
        name: "Horchata Latte",
        description:
          "House-made horchata blended with espresso, served hot or iced.",
        price: 85,
        dietaryTags: ["Vegetarian"],
      },
      {
        id: "item-9",
        name: "Matcha Coconut",
        description:
          "Ceremonial-grade matcha whisked with coconut milk and a touch of agave.",
        price: 90,
        dietaryTags: ["Vegan", "Gluten-free"],
      },
    ],
  },
  {
    id: "cat-pizzas",
    slug: "pizzas",
    nameKey: "pizzas",
    items: [
      {
        id: "item-10",
        name: "Margherita Oaxaquena",
        description:
          "San Marzano tomatoes, fresh mozzarella, Oaxacan basil, and olive oil on sourdough crust.",
        price: 195,
        dietaryTags: ["Vegetarian"],
      },
      {
        id: "item-11",
        name: "Fungi Selvatica",
        description:
          "Wild mushroom medley, truffle oil, garlic confit, and aged parmesan.",
        price: 215,
        dietaryTags: ["Vegetarian"],
      },
      {
        id: "item-12",
        name: "Huerto del Chef",
        description:
          "Seasonal roasted vegetables, pesto, goat cheese, and arugula.",
        price: 205,
        dietaryTags: ["Vegetarian"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MenuGrid() {
  const t = useTranslations("menu");

  return (
    <Tabs.Root defaultValue={PLACEHOLDER_CATEGORIES[0].slug}>
      {/* Category tab triggers */}
      <Tabs.List
        className={cn(
          "mb-8 flex flex-wrap justify-center gap-2",
          "border-b border-sand pb-4"
        )}
        aria-label={t("categories")}
      >
        {PLACEHOLDER_CATEGORIES.map((category) => (
          <Tabs.Trigger
            key={category.id}
            value={category.slug}
            className={cn(
              "rounded-full px-5 py-2 font-body text-sm font-medium transition-colors",
              "text-charcoal/60 hover:text-charcoal hover:bg-sand/60",
              "data-[state=active]:bg-terracotta data-[state=active]:text-cream",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            )}
          >
            {t(category.nameKey)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Category content panels */}
      {PLACEHOLDER_CATEGORIES.map((category) => (
        <Tabs.Content
          key={category.id}
          value={category.slug}
          className="focus-visible:outline-none"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <MenuCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                dietaryTags={item.dietaryTags}
                image={item.image}
              />
            ))}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
