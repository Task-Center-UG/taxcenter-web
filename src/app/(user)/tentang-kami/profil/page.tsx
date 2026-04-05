import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/profil/profil-page";

export const metadata: Metadata = createPageMetadata({
  title: "Profil Tax Center",
  description: "Pelajari profil Tax Center Gunadarma sebagai pusat edukasi, layanan, riset, dan pengabdian perpajakan yang mendukung kampus dan masyarakat.",
  path: "/tentang-kami/profil",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "profil", "tentang kami"],
});

export default function Page() {
  return <PageView />;
}
