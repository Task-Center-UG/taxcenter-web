import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/home-page";

export const metadata: Metadata = createPageMetadata({
  title: "Beranda",
  description: "Informasi beranda di Tax Center Gunadarma.",
  path: "/",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "beranda"],
});

export default function Page() {
  return <PageView />;
}
