import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/pendampingan-umkm/pendampingan-umkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Pendampingan UMKM",
  description: "Informasi program pendampingan UMKM oleh Tax Center Gunadarma yang membantu peningkatan kapasitas usaha, legalitas, dan literasi perpajakan.",
  path: "/program-layanan/pengabdian-masyarakat/pendampingan-umkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "pendampingan umkm", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
