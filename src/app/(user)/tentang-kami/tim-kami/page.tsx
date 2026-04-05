import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/tim-kami/tim-kami-page";

export const metadata: Metadata = createPageMetadata({
  title: "Tim Kami",
  description: "Kenali tim Tax Center Gunadarma yang berperan dalam pengelolaan program, layanan, riset, dan kegiatan edukasi perpajakan.",
  path: "/tentang-kami/tim-kami",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "tim kami", "tentang kami"],
});

export default function Page() {
  return <PageView />;
}
