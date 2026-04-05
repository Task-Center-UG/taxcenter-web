import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/mitra-kerjasama/mitra-kerjasama-page";

export const metadata: Metadata = createPageMetadata({
  title: "Mitra Kerja Sama",
  description: "Temukan mitra kerja sama Tax Center Gunadarma dari berbagai institusi, organisasi, dan dunia usaha yang mendukung program perpajakan.",
  path: "/tentang-kami/mitra-kerjasama",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "mitra kerjasama", "tentang kami"],
});

export default function Page() {
  return <PageView />;
}
