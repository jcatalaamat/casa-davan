import type { Metadata } from "next";
import { ProductDetail } from "@/components/boutique/product-detail";

export async function generateMetadata(): Promise<Metadata> {
  // TODO: fetch product from Sanity for dynamic metadata
  return {
    title: `Product | DaVan Mystique Boutique`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // TODO: fetch product from Sanity
  // const product = await getProduct(slug);
  // if (!product) notFound();

  return (
    <div className="section-padding">
      <div className="container-wide">
        <ProductDetail slug={slug} locale={locale} />
      </div>
    </div>
  );
}
