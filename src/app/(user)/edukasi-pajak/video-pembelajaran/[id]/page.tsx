import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/video-pembelajaran/[id]/video-pembelajaran-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Video Pembelajaran",
    description: "Lihat detail video pembelajaran Tax Center Gunadarma yang membahas materi, contoh kasus, dan penjelasan praktis seputar perpajakan.",
    path: `/edukasi-pajak/video-pembelajaran/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail video pembelajaran", "video pembelajaran"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
