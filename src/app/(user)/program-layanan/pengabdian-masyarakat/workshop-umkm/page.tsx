import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/workshop-umkm/workshop-umkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Workshop Umkm",
  description: "Informasi workshop umkm di Tax Center Gunadarma.",
  path: "/program-layanan/pengabdian-masyarakat/workshop-umkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "workshop umkm", "program layanan", "pengabdian masyarakat"],
});

export default function Page() {
  return <PageView />;
}
