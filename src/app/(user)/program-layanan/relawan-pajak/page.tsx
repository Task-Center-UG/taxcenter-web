import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/relawan-pajak-page";

export const metadata: Metadata = createPageMetadata({
  title: "Relawan Pajak",
  description: "Temukan informasi program Relawan Pajak Tax Center Gunadarma, mulai dari kegiatan, pendaftaran, hingga kontribusi edukasi perpajakan kepada masyarakat.",
  path: "/program-layanan/relawan-pajak",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "relawan pajak", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
