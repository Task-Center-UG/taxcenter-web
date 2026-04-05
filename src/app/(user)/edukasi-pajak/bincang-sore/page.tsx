import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/bincang-sore/bincang-sore-page";

export const metadata: Metadata = createPageMetadata({
  title: "Bincang Sore",
  description: "Ikuti program Bincang Sore Tax Center Gunadarma yang menghadirkan obrolan edukatif, insight praktis, dan pembahasan isu perpajakan terkini.",
  path: "/edukasi-pajak/bincang-sore",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "bincang sore"],
});

export default function Page() {
  return <PageView />;
}
