import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/mitra-kerjasama/mitra-kerjasama-page";

export const metadata: Metadata = createPageMetadata({
  title: "Mitra Kerjasama",
  description: "Informasi mitra kerjasama di Tax Center Gunadarma.",
  path: "/tentang-kami/mitra-kerjasama",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "mitra kerjasama", "tentang kami"],
});

export default function Page() {
  return <PageView />;
}
