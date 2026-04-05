import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/workshop-umkm/[id]/workshop-umkm-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Workshop UMKM",
    description: "Lihat detail workshop UMKM Tax Center Gunadarma yang membahas pengembangan usaha, strategi pemasaran, dan literasi perpajakan.",
    path: `/program-layanan/pengabdian-masyarakat/workshop-umkm/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail workshop umkm", "program layanan", "pengabdian masyarakat", "workshop umkm"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
