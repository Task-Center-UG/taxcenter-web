import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/fgd/fgd-page";

export const metadata: Metadata = createPageMetadata({
  title: "Fgd",
  description: "Informasi fgd di Tax Center Gunadarma.",
  path: "/program-layanan/riset/program-kegiatan/fgd",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "fgd", "program layanan", "riset", "program kegiatan"],
});

export default function Page() {
  return <PageView />;
}
