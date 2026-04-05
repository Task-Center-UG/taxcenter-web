import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/video-pembelajaran/video-pembelajaran-page";

export const metadata: Metadata = createPageMetadata({
  title: "Video Pembelajaran",
  description: "Tonton video pembelajaran Tax Center Gunadarma untuk memahami topik perpajakan melalui materi visual yang ringkas, praktis, dan informatif.",
  path: "/edukasi-pajak/video-pembelajaran",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "video pembelajaran"],
});

export default function Page() {
  return <PageView />;
}
