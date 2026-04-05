import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/seminar/[id]/seminar-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Seminar",
    description: "Lihat detail seminar Tax Center Gunadarma, termasuk tema, narasumber, jadwal, dan pembahasan isu perpajakan yang diangkat.",
    path: `/kegiatan-berita/seminar/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail seminar", "kegiatan berita", "seminar"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
