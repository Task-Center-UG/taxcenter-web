import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/non-mbkm/non-mbkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Non Mbkm",
  description: "Informasi non mbkm di Tax Center Gunadarma.",
  path: "/program-layanan/relawan-pajak/non-mbkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "non mbkm", "program layanan", "relawan pajak"],
});

export default function Page() {
  return <PageView />;
}
