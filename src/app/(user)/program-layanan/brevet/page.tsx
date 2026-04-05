import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/brevet/brevet-page";

export const metadata: Metadata = createPageMetadata({
  title: "Brevet",
  description: "Pelajari program Brevet di Tax Center Gunadarma yang dirancang untuk meningkatkan kompetensi perpajakan melalui pembelajaran terstruktur dan aplikatif.",
  path: "/program-layanan/brevet",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "brevet", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
