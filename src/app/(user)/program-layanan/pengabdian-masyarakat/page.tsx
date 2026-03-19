import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/pengabdian-masyarakat-page";

export const metadata: Metadata = createPageMetadata({
  title: "Pengabdian Masyarakat",
  description: "Informasi pengabdian masyarakat di Tax Center Gunadarma.",
  path: "/program-layanan/pengabdian-masyarakat",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "pengabdian masyarakat", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
