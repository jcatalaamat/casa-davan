import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sizeGuide" });
  return {
    title: `${t("title")} | DaVan Mystique Boutique`,
  };
}

export default function SizeGuidePage() {
  const t = useTranslations("sizeGuide");

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-sand">
                <th className="px-4 py-3 font-heading font-semibold">{t("measurements")}</th>
                <th className="px-4 py-3 font-heading font-semibold">XS</th>
                <th className="px-4 py-3 font-heading font-semibold">S</th>
                <th className="px-4 py-3 font-heading font-semibold">M</th>
                <th className="px-4 py-3 font-heading font-semibold">L</th>
                <th className="px-4 py-3 font-heading font-semibold">XL</th>
              </tr>
            </thead>
            <tbody>
              {/* Size chart data will come from Sanity */}
              <tr className="border-b border-sand/50">
                <td className="px-4 py-3 font-medium">Bust (cm)</td>
                <td className="px-4 py-3">82</td>
                <td className="px-4 py-3">86</td>
                <td className="px-4 py-3">90</td>
                <td className="px-4 py-3">96</td>
                <td className="px-4 py-3">102</td>
              </tr>
              <tr className="border-b border-sand/50">
                <td className="px-4 py-3 font-medium">Waist (cm)</td>
                <td className="px-4 py-3">64</td>
                <td className="px-4 py-3">68</td>
                <td className="px-4 py-3">72</td>
                <td className="px-4 py-3">78</td>
                <td className="px-4 py-3">84</td>
              </tr>
              <tr className="border-b border-sand/50">
                <td className="px-4 py-3 font-medium">Hip (cm)</td>
                <td className="px-4 py-3">88</td>
                <td className="px-4 py-3">92</td>
                <td className="px-4 py-3">96</td>
                <td className="px-4 py-3">102</td>
                <td className="px-4 py-3">108</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
