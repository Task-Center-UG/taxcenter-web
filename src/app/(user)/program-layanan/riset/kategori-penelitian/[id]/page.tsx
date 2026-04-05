import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/kategori-penelitian/[id]/kategori-penelitian-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Daftar Penelitian Berdasarkan Kategori",
    description: "Lihat daftar penelitian berdasarkan kategori di Tax Center Gunadarma untuk menemukan topik, kajian, dan publikasi perpajakan yang relevan.",
    path: `/program-layanan/riset/kategori-penelitian/${id}`,

    keywords: [
      "tax center gunadarma",
      "edukasi pajak",
      "pelayanan pajak",
      "daftar penelitian kategori",
      "program layanan",
      "riset",
      "kategori penelitian",
    ],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
