import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/publikasi/publikasi-page";

export const metadata: Metadata = createPageMetadata({
  title: "Publikasi",
  description: "Informasi publikasi di Tax Center Gunadarma.",
  path: "/kegiatan-berita/publikasi",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "publikasi", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
