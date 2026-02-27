"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/i18n/routing";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "icon" | "text" | "full";
}

export function LanguageSwitcher({
  className,
  variant = "full",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale: Locale = locale === "es" ? "en" : "es";

  function handleSwitch() {
    // pathname from usePathname may include dynamic segments; cast is safe here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={`Switch to ${nextLocale === "en" ? "English" : "Espanol"}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
        "text-charcoal hover:bg-sand/60 active:bg-sand/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        className
      )}
    >
      {variant !== "text" && <Globe className="h-4 w-4" />}
      {variant !== "icon" && (
        <span className="uppercase">{nextLocale}</span>
      )}
    </button>
  );
}
