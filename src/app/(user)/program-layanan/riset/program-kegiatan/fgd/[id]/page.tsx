import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/fgd/[id]/fgd-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail FGD",
    description: "Lihat detail kegiatan FGD Tax Center Gunadarma yang merangkum tema diskusi, peserta, dan hasil pembahasan terkait perpajakan.",
    path: `/program-layanan/riset/program-kegiatan/fgd/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail fgd", "program layanan", "riset", "program kegiatan", "fgd"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
