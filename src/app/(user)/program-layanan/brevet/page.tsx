import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/brevet/brevet-page";

export const metadata: Metadata = createPageMetadata({
  title: "Brevet",
  description: "Informasi brevet di Tax Center Gunadarma.",
  path: "/program-layanan/brevet",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "brevet", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
