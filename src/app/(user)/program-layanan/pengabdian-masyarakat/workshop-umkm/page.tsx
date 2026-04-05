import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/workshop-umkm/workshop-umkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Workshop UMKM",
  description: "Jelajahi workshop UMKM Tax Center Gunadarma yang menghadirkan pelatihan praktis, pengembangan usaha, dan edukasi perpajakan untuk pelaku UMKM.",
  path: "/program-layanan/pengabdian-masyarakat/workshop-umkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "workshop umkm", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
