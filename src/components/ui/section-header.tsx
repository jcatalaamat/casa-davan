import * as React from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = React.ComponentProps<"div"> & {
  title: string;
  subtitle?: string;
  accent?: string;
};

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, accent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-center", className)}
        {...props}
      >
        {accent && (
          <p className="font-accent text-xl text-terracotta mb-2">
            {accent}
          </p>
        )}

        <h2 className="heading-2 text-charcoal">{title}</h2>

        {subtitle && (
          <p className="mt-3 max-w-2xl mx-auto text-base text-charcoal/60 font-body leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
export type { SectionHeaderProps };
