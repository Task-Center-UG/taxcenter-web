import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/publikasi/[id]/publikasi-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Publikasi",
    description: "Lihat detail publikasi Tax Center Gunadarma untuk membaca ringkasan, topik, dan informasi karya ilmiah atau materi perpajakan yang diterbitkan.",
    path: `/kegiatan-berita/publikasi/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail publikasi", "kegiatan berita", "publikasi"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
