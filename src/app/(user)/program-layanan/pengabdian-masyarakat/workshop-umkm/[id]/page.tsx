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
    title: "Detail Workshop Umkm",
    description: "Detail Workshop Umkm di Tax Center Gunadarma.",
    path: `/program-layanan/pengabdian-masyarakat/workshop-umkm/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail workshop umkm", "program layanan", "pengabdian masyarakat", "workshop umkm"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
