import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/seminar/seminar-page";

export const metadata: Metadata = createPageMetadata({
  title: "Seminar",
  description: "Informasi seminar di Tax Center Gunadarma.",
  path: "/kegiatan-berita/seminar",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "seminar", "kegiatan berita"],
});

export default function Page() {
  return <PageView />;
}
