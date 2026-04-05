import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/galeri/foto-kegiatan/[id]/foto-kegiatan-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Foto Kegiatan",
    description: "Lihat detail dokumentasi foto kegiatan Tax Center Gunadarma untuk mengetahui momen pelaksanaan acara, peserta, dan aktivitas di lapangan.",
    path: `/galeri/foto-kegiatan/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail foto kegiatan", "galeri", "foto kegiatan"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
