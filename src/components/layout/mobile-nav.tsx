"use client";

import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, INSTAGRAM } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { LanguageSwitcher } from "./language-switcher";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring" as const,
      damping: 30,
      stiffness: 300,
    },
  },
} as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
} as const;

interface NavSectionProps {
  title: string;
  items: ReadonlyArray<{ readonly key: string; readonly href: string }>;
  t: ReturnType<typeof useTranslations<"nav">>;
  onClose: () => void;
}

function NavSection({ title, items, t, onClose }: NavSectionProps) {
  return (
    <div>
      <motion.h3
        variants={itemVariants}
        className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-terracotta"
      >
        {title}
      </motion.h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <motion.li key={item.key} variants={itemVariants}>
            <Link
              href={item.href as "/" | "/about" | "/locations" | "/contact" | "/menu" | "/gallery" | "/workspace" | "/shop" | "/collections" | "/our-craft"}
              onClick={onClose}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-base font-medium text-charcoal transition-colors",
                "hover:bg-sand/60 active:bg-sand/80"
              )}
            >
              {t(item.key as Parameters<typeof t>[0])}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav");

  function handleClose() {
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  "fixed inset-y-0 right-0 z-50 w-full max-w-sm",
                  "bg-cream shadow-2xl",
                  "flex flex-col",
                  "focus:outline-none"
                )}
              >
                <Dialog.Title className="sr-only">
                  Navigation menu
                </Dialog.Title>

                {/* Header */}
                <div className="flex items-center justify-between border-b border-sand px-6 py-4">
                  <span className="font-heading text-xl font-semibold text-charcoal">
                    Menu
                  </span>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className={cn(
                        "rounded-lg p-2 text-charcoal transition-colors",
                        "hover:bg-sand/60 active:bg-sand/80",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      )}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Nav links */}
                <motion.nav
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex-1 overflow-y-auto px-6 py-6"
                  aria-label="Mobile navigation"
                >
                  <div className="space-y-6">
                    {/* Home */}
                    <motion.div variants={itemVariants}>
                      <Link
                        href="/"
                        onClick={handleClose}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-base font-medium text-charcoal transition-colors",
                          "hover:bg-sand/60 active:bg-sand/80"
                        )}
                      >
                        {t("home")}
                      </Link>
                    </motion.div>

                    {/* Bistro section */}
                    <NavSection
                      title={t("bistro")}
                      items={NAV_ITEMS.bistro}
                      t={t}
                      onClose={handleClose}
                    />

                    {/* Boutique section */}
                    <NavSection
                      title={t("boutique")}
                      items={NAV_ITEMS.boutique}
                      t={t}
                      onClose={handleClose}
                    />

                    {/* Main links */}
                    <div className="border-t border-sand pt-6">
                      <ul className="space-y-1">
                        {NAV_ITEMS.main.map((item) => (
                          <motion.li key={item.key} variants={itemVariants}>
                            <Link
                              href={item.href as "/about" | "/locations" | "/contact"}
                              onClick={handleClose}
                              className={cn(
                                "block rounded-lg px-3 py-2.5 text-base font-medium text-charcoal transition-colors",
                                "hover:bg-sand/60 active:bg-sand/80"
                              )}
                            >
                              {t(item.key as Parameters<typeof t>[0])}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.nav>

                {/* Footer area */}
                <div className="border-t border-sand px-6 py-4">
                  <div className="flex items-center justify-between">
                    <LanguageSwitcher variant="full" />

                    <div className="flex items-center gap-3">
                      <a
                        href={INSTAGRAM.bistro}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Bistro"
                        className={cn(
                          "rounded-lg p-2 text-charcoal transition-colors",
                          "hover:bg-sand/60 hover:text-terracotta"
                        )}
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href={INSTAGRAM.boutique}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Boutique"
                        className={cn(
                          "rounded-lg p-2 text-charcoal transition-colors",
                          "hover:bg-sand/60 hover:text-terracotta"
                        )}
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
