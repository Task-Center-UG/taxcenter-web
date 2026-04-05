import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "./types";
import { get_image_url } from "./utils";

interface LatestNewsSectionProps {
  beritaData: NewsItem[];
}

export default function LatestNewsSection({
  beritaData,
}: LatestNewsSectionProps) {
  return (
    <section className="section-shell w-full items-center justify-center">
      <div className="page-shell section-stack">
        <h2 className="section-title mb-5 text-[#2A176F]">
          Berita dan Artikel Terbaru
        </h2>
        <p className="section-copy mb-10 max-w-4xl text-center">
          Berisi informasi terbaru mengenai kegiatan, program, dan aktivitas
          yang diselenggarakan oleh Tax Center Universitas Gunadarma.
        </p>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beritaData.map((item) => (
            <article key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-white">
                <Image
                  src={get_image_url(item.image_url)}
                  alt={item.title}
                  fill
                  className="object-contain sm:object-cover"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
              <p className="text-sm text-black">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="mt-3 text-lg font-extrabold leading-snug text-[#FE8100] md:text-xl">
                {item.title}
              </h3>
              </div>
            </article>
          ))}
        </div>
        <Link href="/kegiatan-berita/agenda-kegiatan">
          <Button
            size="lg"
            className="mt-8 h-11 rounded-md bg-[#2A176F] px-8 font-bold text-white hover:opacity-80 md:mt-10 cursor-pointer"
          >
            Lihat Selengkapnya
          </Button>
        </Link>
      </div>
    </section>
  );
}
