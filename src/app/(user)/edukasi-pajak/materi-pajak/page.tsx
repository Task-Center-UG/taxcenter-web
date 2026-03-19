import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/materi-pajak/materi-pajak-page";

export const metadata: Metadata = createPageMetadata({
  title: "Materi Pajak",
  description: "Informasi materi pajak di Tax Center Gunadarma.",
  path: "/edukasi-pajak/materi-pajak",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "materi pajak"],
});

export default function Page() {
  return <PageView />;
}
