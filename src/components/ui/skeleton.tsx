import * as React from "react";
import { cn } from "@/lib/utils/cn";

type SkeletonProps = React.ComponentProps<"div">;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-lg bg-sand/70", className)}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonProps };
