import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/profil/profil-page";

export const metadata: Metadata = createPageMetadata({
  title: "Profil",
  description: "Informasi profil di Tax Center Gunadarma.",
  path: "/tentang-kami/profil",

  keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "profil", "tentang kami"],
});

export default function Page() {
  return <PageView />;
}
