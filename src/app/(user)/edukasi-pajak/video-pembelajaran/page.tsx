import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/video-pembelajaran/video-pembelajaran-page";

export const metadata: Metadata = createPageMetadata({
  title: "Video Pembelajaran",
  description: "Informasi video pembelajaran di Tax Center Gunadarma.",
  path: "/edukasi-pajak/video-pembelajaran",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "video pembelajaran"],
});

export default function Page() {
  return <PageView />;
}
