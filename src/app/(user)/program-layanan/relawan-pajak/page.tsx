import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/relawan-pajak-page";

export const metadata: Metadata = createPageMetadata({
  title: "Relawan Pajak",
  description: "Informasi relawan pajak di Tax Center Gunadarma.",
  path: "/program-layanan/relawan-pajak",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "relawan pajak", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
