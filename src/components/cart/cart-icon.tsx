"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/stores/cart";
import { CartDrawer } from "@/components/cart/cart-drawer";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CartIcon() {
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const count = totalItems();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md p-2 text-charcoal transition-colors",
          "hover:bg-sand/60 hover:text-charcoal",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        )}
        aria-label={`Cart (${count} items)`}
      >
        <ShoppingBag className="h-5 w-5" />

        {count > 0 && (
          <span
            className={cn(
              "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full",
              "bg-terracotta text-[10px] font-bold text-cream font-body",
              "animate-in zoom-in-50 duration-200"
            )}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
