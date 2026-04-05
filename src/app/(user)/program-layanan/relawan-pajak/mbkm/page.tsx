import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/mbkm/mbkm-page";

export const metadata: Metadata = createPageMetadata({
  title: "Relawan Pajak MBKM",
  description: "Pelajari program Relawan Pajak MBKM Tax Center Gunadarma yang menggabungkan pengalaman lapangan, pengabdian, dan pembelajaran perpajakan berbasis praktik.",
  path: "/program-layanan/relawan-pajak/mbkm",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "mbkm", "program layanan", "relawan pajak"],
});

export default function Page() {
  return <PageView />;
}
