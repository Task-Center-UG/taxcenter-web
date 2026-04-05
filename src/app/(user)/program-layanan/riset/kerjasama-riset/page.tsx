import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/kerjasama-riset/kerjasama-riset-page";

export const metadata: Metadata = createPageMetadata({
  title: "Kerja Sama Riset",
  description: "Informasi kerja sama riset Tax Center Gunadarma yang membuka kolaborasi penelitian perpajakan dengan akademisi, institusi, dan mitra terkait.",
  path: "/program-layanan/riset/kerjasama-riset",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "kerjasama riset", "program layanan", "riset"],
});

export default function Page() {
  return <PageView />;
}
