import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/publikasi/publikasi-page";

export const metadata: Metadata = createPageMetadata({
  title: "Publikasi",
  description: "Jelajahi publikasi Tax Center Gunadarma yang memuat hasil kajian, artikel ilmiah, dan materi informatif terkait perpajakan dan kebijakan fiskal.",
  path: "/kegiatan-berita/publikasi",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "publikasi", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
