import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/foto-produk/foto-produk-page";

export const metadata: Metadata = createPageMetadata({
  title: "Foto Produk",
  description: "Informasi foto produk di Tax Center Gunadarma.",
  path: "/program-layanan/pengabdian-masyarakat/foto-produk",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "foto produk", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
