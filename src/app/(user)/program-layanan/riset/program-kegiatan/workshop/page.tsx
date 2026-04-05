import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/workshop/workshop-page";

export const metadata: Metadata = createPageMetadata({
  title: "Workshop Riset",
  description: "Informasi workshop riset Tax Center Gunadarma yang dirancang untuk memperkuat kapasitas penelitian, analisis, dan penulisan di bidang perpajakan.",
  path: "/program-layanan/riset/program-kegiatan/workshop",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "workshop", "program layanan", "riset", "program kegiatan"],
});

export default function Page() {
  return <PageView />;
}
