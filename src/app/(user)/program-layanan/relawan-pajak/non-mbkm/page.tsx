import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/non-mbkm/non-mbkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Relawan Pajak Non-MBKM",
  description: "Informasi program Relawan Pajak Non-MBKM Tax Center Gunadarma bagi mahasiswa yang ingin berkontribusi dalam edukasi dan layanan perpajakan.",
  path: "/program-layanan/relawan-pajak/non-mbkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "non mbkm", "program layanan", "relawan pajak"],
});

export default function Page() {
  return <PageView />;
}
