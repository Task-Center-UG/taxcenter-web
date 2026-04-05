import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/bincang-sore/[id]/bincang-sore-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Bincang Sore",
    description: "Lihat detail sesi Bincang Sore Tax Center Gunadarma, termasuk topik diskusi, narasumber, dan poin edukasi perpajakan yang dibahas.",
    path: `/edukasi-pajak/bincang-sore/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail bincang sore", "bincang sore"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
