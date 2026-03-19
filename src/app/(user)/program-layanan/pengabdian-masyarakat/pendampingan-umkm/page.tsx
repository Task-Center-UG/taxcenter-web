import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/pendampingan-umkm/pendampingan-umkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Pendampingan Umkm",
  description: "Informasi pendampingan umkm di Tax Center Gunadarma.",
  path: "/program-layanan/pengabdian-masyarakat/pendampingan-umkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "pendampingan umkm", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
