import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/pengabdian-masyarakat/foto-produk/[id]/foto-produk-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Foto Produk",
    description: "Lihat detail dokumentasi foto produk dalam program pengabdian masyarakat Tax Center Gunadarma untuk mendukung visibilitas dan branding UMKM.",
    path: `/program-layanan/pengabdian-masyarakat/foto-produk/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail foto produk", "program layanan", "pengabdian masyarakat", "foto produk"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
