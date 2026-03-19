import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/workshop/workshop-page";

export const metadata: Metadata = createPageMetadata({
  title: "Workshop",
  description: "Informasi workshop di Tax Center Gunadarma.",
  path: "/program-layanan/riset/program-kegiatan/workshop",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "workshop", "program layanan", "riset", "program kegiatan"],
});

export default function Page() {
  return <PageView />;
}
