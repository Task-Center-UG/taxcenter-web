import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/agenda-kegiatan/agenda-kegiatan-page";

export const metadata: Metadata = createPageMetadata({
  title: "Agenda Kegiatan",
  description: "Informasi agenda kegiatan di Tax Center Gunadarma.",
  path: "/kegiatan-berita/agenda-kegiatan",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "agenda kegiatan", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
