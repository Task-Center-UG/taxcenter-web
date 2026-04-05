import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/program-kegiatan-page";

export const metadata: Metadata = createPageMetadata({
  title: "Program Kegiatan Riset",
  description: "Jelajahi program kegiatan riset Tax Center Gunadarma seperti seminar, workshop, dan forum diskusi yang mendukung pengembangan kajian perpajakan.",
  path: "/program-layanan/riset/program-kegiatan",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "program kegiatan", "program layanan", "riset"],
});

export default function Page() {
  return <PageView />;
}
