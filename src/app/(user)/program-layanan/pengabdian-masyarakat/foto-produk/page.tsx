import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/foto-produk/foto-produk-page";

export const metadata: Metadata = createPageMetadata({
  title: "Foto Produk",
  description: "Lihat dokumentasi foto produk dari program pengabdian masyarakat Tax Center Gunadarma yang mendukung promosi dan penguatan UMKM binaan.",
  path: "/program-layanan/pengabdian-masyarakat/foto-produk",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "foto produk", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
