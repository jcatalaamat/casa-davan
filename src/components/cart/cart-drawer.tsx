"use client";

import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/stores/cart";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const t = useTranslations("cart");
  const items = useCartStore((s) => s.items);
  const isEmpty = items.length === 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-charcoal/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* Content - slides from right */}
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl",
                  "focus:outline-none"
                )}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sand px-6 py-4">
                  <Dialog.Title className="font-heading text-lg font-semibold text-charcoal">
                    {t("title")}
                  </Dialog.Title>
                  <Dialog.Close
                    className={cn(
                      "rounded-md p-2 text-charcoal/50 transition-colors",
                      "hover:bg-sand/60 hover:text-charcoal",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    )}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Dialog.Close>
                </div>

                {/* Body */}
                {isEmpty ? (
                  <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <ShoppingBag className="mb-4 h-12 w-12 text-charcoal/15" />
                    <p className="font-heading text-lg font-semibold text-charcoal">
                      {t("empty")}
                    </p>
                    <p className="mt-2 max-w-xs font-body text-sm text-charcoal/50">
                      {t("emptyDescription")}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      asChild
                      onClick={() => onOpenChange(false)}
                    >
                      <Link href="/shop">{t("continueShopping")}</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Items list */}
                    <div className="flex-1 overflow-y-auto px-6">
                      <div className="divide-y divide-sand">
                        {items.map((item) => (
                          <CartItem
                            key={`${item.productId}-${item.size}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Footer with summary */}
                    <div className="border-t border-sand px-6 py-6">
                      <CartSummary />
                      <div className="mt-3 text-center">
                        <button
                          type="button"
                          onClick={() => onOpenChange(false)}
                          className="font-body text-sm text-terracotta underline-offset-4 hover:underline"
                        >
                          {t("continueShopping")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
