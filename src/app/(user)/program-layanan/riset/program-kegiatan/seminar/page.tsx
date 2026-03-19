import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/seminar/seminar-page";

export const metadata: Metadata = createPageMetadata({
  title: "Seminar",
  description: "Informasi seminar di Tax Center Gunadarma.",
  path: "/program-layanan/riset/program-kegiatan/seminar",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "seminar", "program layanan", "riset", "program kegiatan"],
});

export default function Page() {
  return <PageView />;
}
