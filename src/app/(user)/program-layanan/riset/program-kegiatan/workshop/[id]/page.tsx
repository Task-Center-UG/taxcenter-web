import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/program-layanan/riset/program-kegiatan/workshop/[id]/workshop-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Workshop",
    description: "Detail Workshop di Tax Center Gunadarma.",
    path: `/program-layanan/riset/program-kegiatan/workshop/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail workshop", "program layanan", "riset", "program kegiatan", "workshop"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
