import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/kegiatan-berita/agenda-kegiatan/[id]/agenda-kegiatan-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Agenda Kegiatan",
    description: "Detail Agenda Kegiatan di Tax Center Gunadarma.",
    path: `/kegiatan-berita/agenda-kegiatan/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail agenda kegiatan", "kegiatan berita", "agenda kegiatan"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
