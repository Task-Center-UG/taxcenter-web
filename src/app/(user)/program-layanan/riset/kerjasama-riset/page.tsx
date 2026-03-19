import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/kerjasama-riset/kerjasama-riset-page";

export const metadata: Metadata = createPageMetadata({
  title: "Kerjasama Riset",
  description: "Informasi kerjasama riset di Tax Center Gunadarma.",
  path: "/program-layanan/riset/kerjasama-riset",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "kerjasama riset", "program layanan", "riset"],
});

export default function Page() {
  return <PageView />;
}
