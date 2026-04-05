import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/fgd/fgd-page";

export const metadata: Metadata = createPageMetadata({
  title: "FGD",
  description: "Informasi FGD Tax Center Gunadarma yang menghadirkan forum diskusi terarah untuk membahas isu perpajakan, riset, dan rekomendasi kebijakan.",
  path: "/program-layanan/riset/program-kegiatan/fgd",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "fgd", "program layanan", "riset", "program kegiatan"],
});

export default function Page() {
  return <PageView />;
}
