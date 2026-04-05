import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/artikel-pajak/artikel-pajak-page";

export const metadata: Metadata = createPageMetadata({
  title: "Artikel Pajak",
  description: "Baca artikel pajak Tax Center Gunadarma yang membahas isu perpajakan, regulasi, edukasi, dan insight praktis untuk mahasiswa serta masyarakat.",
  path: "/kegiatan-berita/artikel-pajak",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "artikel pajak", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
