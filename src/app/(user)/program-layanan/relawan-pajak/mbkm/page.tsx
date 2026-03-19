import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/mbkm/mbkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Mbkm",
  description: "Informasi mbkm di Tax Center Gunadarma.",
  path: "/program-layanan/relawan-pajak/mbkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "mbkm", "program layanan", "relawan pajak"],
});

export default function Page() {
  return <PageView />;
}
