import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/kategori-penelitian/kategori-penelitian-page";

export const metadata: Metadata = createPageMetadata({
  title: "Kategori Penelitian",
  description: "Temukan kategori penelitian Tax Center Gunadarma untuk menjelajahi topik kajian perpajakan, kebijakan fiskal, dan isu ekonomi yang relevan.",
  path: "/program-layanan/riset/kategori-penelitian",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "kategori penelitian", "program layanan", "riset"],
});

export default function Page() {
  return <PageView />;
}
