import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/kerjasama-riset/[id]/kerjasama-riset-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Kerja Sama Riset",
    description: "Lihat detail kerja sama riset Tax Center Gunadarma yang memuat informasi kolaborasi, fokus kajian, dan kontribusi pada pengembangan perpajakan.",
    path: `/program-layanan/riset/kerjasama-riset/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail kerjasama riset", "program layanan", "riset", "kerjasama riset"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
