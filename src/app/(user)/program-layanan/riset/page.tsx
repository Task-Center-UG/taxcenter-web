import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/riset-page";

export const metadata: Metadata = createPageMetadata({
  title: "Riset",
  description: "Eksplorasi program riset Tax Center Gunadarma yang mendorong kajian, publikasi, dan kolaborasi ilmiah di bidang perpajakan serta kebijakan fiskal.",
  path: "/program-layanan/riset",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "riset", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
