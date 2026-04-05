import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/relawan-pajak/[id]/relawan-pajak-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Relawan Pajak",
    description: "Lihat detail program atau kegiatan Relawan Pajak Tax Center Gunadarma, termasuk informasi pelaksanaan, manfaat, dan peran peserta di lapangan.",
    path: `/program-layanan/relawan-pajak/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail relawan pajak", "program layanan", "relawan pajak"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
