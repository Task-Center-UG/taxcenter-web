import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/taxbot/taxbot-page";

export const metadata: Metadata = createPageMetadata({
  title: "TaxBot AI",
  description: "Asisten tanya-jawab AI perpajakan dari Tax Center Gunadarma.",
  path: "/program-layanan/taxbot", // Sesuaikan rutenya jika masuk ke program-layanan
  keywords: ["tax center gunadarma", "taxbot", "asisten pajak ai"],
});

export default function Page() {
  return <PageView />;
}