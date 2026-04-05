import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/agenda-kegiatan/agenda-kegiatan-page";

export const metadata: Metadata = createPageMetadata({
  title: "Agenda Kegiatan",
  description: "Temukan agenda kegiatan terbaru Tax Center Gunadarma berisi jadwal acara, seminar, pelatihan, dan program perpajakan yang sedang berlangsung.",
  path: "/kegiatan-berita/agenda-kegiatan",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "agenda kegiatan", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
