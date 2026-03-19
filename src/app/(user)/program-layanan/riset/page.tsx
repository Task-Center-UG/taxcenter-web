import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/riset-page";

export const metadata: Metadata = createPageMetadata({
  title: "Riset",
  description: "Informasi riset di Tax Center Gunadarma.",
  path: "/program-layanan/riset",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "riset", "program layanan"],
});

export default function Page() {
  return <PageView />;
}
