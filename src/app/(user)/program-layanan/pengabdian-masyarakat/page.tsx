import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/pengabdian-masyarakat-page";

export const metadata: Metadata = createPageMetadata({
  title: "Pengabdian Masyarakat",
  description: "Jelajahi program pengabdian masyarakat Tax Center Gunadarma yang menghadirkan edukasi, pendampingan, dan pemberdayaan perpajakan berbasis kebutuhan lapangan.",
  path: "/program-layanan/pengabdian-masyarakat",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "pengabdian masyarakat", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
