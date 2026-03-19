import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageView from "@/components/main/tentang-kami/tim-kami/[id]/tim-kami-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Detail Tim Kami",
    description: "Detail Tim Kami di Tax Center Gunadarma.",
    path: `/tentang-kami/tim-kami/${id}`,

    keywords: ["tax center gunadarma", "edukasi pajak", "pelayanan pajak", "detail tim kami", "tentang kami", "tim kami"],
  });
}

export default function Page({ params }: PageProps) {
  return <PageView {...({ params } as any)} />;
}
