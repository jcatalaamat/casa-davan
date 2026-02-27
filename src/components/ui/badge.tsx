import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-body transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-terracotta text-cream",
        secondary: "bg-sage text-cream",
        outline: "border border-terracotta text-terracotta bg-transparent",
        dietary:
          "bg-sage-light/60 text-forest border border-sage",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
