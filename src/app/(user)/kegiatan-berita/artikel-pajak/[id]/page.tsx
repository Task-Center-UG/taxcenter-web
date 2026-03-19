import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/artikel-pajak/[id]/artikel-pajak-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Artikel Pajak",
    description: "Detail Artikel Pajak di Tax Center Gunadarma.",
    path: `/kegiatan-berita/artikel-pajak/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail artikel pajak", "kegiatan berita", "artikel pajak"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
