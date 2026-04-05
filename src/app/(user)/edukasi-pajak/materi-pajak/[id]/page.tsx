import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/edukasi-pajak/materi-pajak/[id]/materi-pajak-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Materi Pajak",
    description: "Baca detail materi pajak Tax Center Gunadarma yang menyajikan penjelasan terstruktur mengenai konsep, aturan, dan praktik perpajakan.",
    path: `/edukasi-pajak/materi-pajak/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail materi pajak", "materi pajak"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
