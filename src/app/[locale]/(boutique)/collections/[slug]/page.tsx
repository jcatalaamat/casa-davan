import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductGrid } from "@/components/boutique/product-grid";

export async function generateMetadata(): Promise<Metadata> {
  // TODO: fetch collection from Sanity
  return {
    title: `Collection | DaVan Mystique Boutique`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  // TODO: fetch collection from Sanity
  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeader title="Collection" subtitle={`Viewing: ${slug}`} />
        <div className="mt-12">
          <ProductGrid collectionSlug={slug} />
        </div>
      </div>
    </div>
  );
}
