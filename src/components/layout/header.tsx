"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ShoppingBag, ChevronDown } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

interface DropdownItem {
  readonly key: string;
  readonly href: string;
}

interface NavDropdownProps {
  label: string;
  items: ReadonlyArray<DropdownItem>;
  t: ReturnType<typeof useTranslations<"nav">>;
  pathname: string;
}

function NavDropdown({ label, items, t, pathname }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = items.some((item) => pathname.startsWith(item.href));

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-sand/60 active:bg-sand/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          isActive ? "text-terracotta" : "text-charcoal"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-sand bg-cream p-1.5 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href as "/" | "/about" | "/locations" | "/contact" | "/menu" | "/gallery" | "/workspace" | "/shop" | "/collections" | "/our-craft"}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-sand/60 active:bg-sand/80",
                pathname.startsWith(item.href)
                  ? "text-terracotta"
                  : "text-charcoal"
              )}
            >
              {t(item.key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  // Close mobile nav on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileNavOpen(false); }, [pathname]);

  const itemCount = totalItems();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-sand bg-cream/90 backdrop-blur-md"
            : "bg-cream"
        )}
      >
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-xl font-semibold tracking-tight text-charcoal transition-colors hover:text-terracotta lg:text-2xl"
            >
              {SITE_NAME}
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              <NavDropdown
                label={t("bistro")}
                items={NAV_ITEMS.bistro}
                t={t}
                pathname={pathname}
              />

              <NavDropdown
                label={t("boutique")}
                items={NAV_ITEMS.boutique}
                t={t}
                pathname={pathname}
              />

              {NAV_ITEMS.main.map((item) => (
                <Link
                  key={item.key}
                  href={item.href as "/about" | "/locations" | "/contact"}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-sand/60 active:bg-sand/80",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                    pathname.startsWith(item.href)
                      ? "text-terracotta"
                      : "text-charcoal"
                  )}
                >
                  {t(item.key as Parameters<typeof t>[0])}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Language switcher - desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher variant="full" />
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`${t("cart")}${itemCount > 0 ? ` (${itemCount})` : ""}`}
                className={cn(
                  "relative rounded-lg p-2 text-charcoal transition-colors",
                  "hover:bg-sand/60 active:bg-sand/80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                )}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span
                    className={cn(
                      "absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full",
                      "bg-terracotta text-[10px] font-bold leading-none text-cream"
                    )}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "rounded-lg p-2 text-charcoal transition-colors lg:hidden",
                  "hover:bg-sand/60 active:bg-sand/80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
