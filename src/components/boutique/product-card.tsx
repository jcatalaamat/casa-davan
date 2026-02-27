import { cn } from "@/lib/utils/cn";
import { PriceDisplay } from "@/components/ui/price-display";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    category: string;
    image?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const hasSale =
    product.compareAtPrice !== undefined && product.compareAtPrice > product.price;

  return (
    <Link
      href={{ pathname: "/shop/[slug]", params: { slug: product.slug } }}
      className="group block"
    >
      <div className="overflow-hidden rounded-xl border border-sand bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center bg-sand",
                "transition-colors duration-300 group-hover:bg-sand/80"
              )}
            >
              <svg
                className="h-12 w-12 text-charcoal/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {hasSale && <Badge variant="default">Sale</Badge>}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <Badge variant="outline" className="mb-2 text-[10px]">
            {product.category}
          </Badge>

          <h3 className="font-heading text-base font-semibold leading-tight text-charcoal line-clamp-1">
            {product.name}
          </h3>

          <div className="mt-2">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
