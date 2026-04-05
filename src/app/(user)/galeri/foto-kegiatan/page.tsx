import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/galeri/foto-kegiatan/foto-kegiatan-page";

export const metadata: Metadata = createPageMetadata({
  title: "Foto Kegiatan",
  description: "Lihat galeri foto kegiatan Tax Center Gunadarma yang mendokumentasikan seminar, pelatihan, pengabdian, dan aktivitas edukasi perpajakan.",
  path: "/galeri/foto-kegiatan",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "foto kegiatan", "galeri"],
});

export default function Page() {
  return <PageView />;
}
