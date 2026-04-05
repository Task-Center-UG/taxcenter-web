import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/materi-pajak/materi-pajak-page";

export const metadata: Metadata = createPageMetadata({
  title: "Materi Pajak",
  description: "Akses materi pajak Tax Center Gunadarma untuk belajar konsep, aturan, dan praktik perpajakan melalui konten edukatif yang mudah dipahami.",
  path: "/edukasi-pajak/materi-pajak",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "materi pajak"],
});

export default function Page() {
  return <PageView />;
}
