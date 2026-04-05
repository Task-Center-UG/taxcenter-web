import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/pendampingan-umkm/[id]/pendampingan-umkm-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Pendampingan UMKM",
    description: "Lihat detail kegiatan pendampingan UMKM Tax Center Gunadarma yang berfokus pada penguatan usaha, administrasi, dan pemahaman perpajakan.",
    path: `/program-layanan/pengabdian-masyarakat/pendampingan-umkm/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail pendampingan umkm", "program layanan", "pengabdian masyarakat", "pendampingan umkm"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
