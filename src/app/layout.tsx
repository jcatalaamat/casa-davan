import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa DaVan | Bistro & Boutique",
  description: "Somos almas místicas. Bistro y boutique en la costa oaxaqueña.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
