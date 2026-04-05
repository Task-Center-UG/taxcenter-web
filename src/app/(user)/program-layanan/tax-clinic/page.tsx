import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/tax-clinic/tax-clinic-page";

export const metadata: Metadata = createPageMetadata({
  title: "Tax Clinic",
  description: "Informasi layanan Tax Clinic Tax Center Gunadarma untuk konsultasi, pendampingan, dan edukasi perpajakan bagi sivitas akademika serta masyarakat.",
  path: "/program-layanan/tax-clinic",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "tax clinic", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
