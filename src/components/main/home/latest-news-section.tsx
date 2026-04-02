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
    <section className="w-full pb-12 items-center justify-center">
      <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-5 mt-12">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Berita dan Artikel Terbaru
        </h2>
        <p className="text-sm md:text-base max-w-5xl mb-12 mx-5 text-center">
          Berisi informasi terbaru mengenai kegiatan, program, dan aktivitas
          yang diselenggarakan oleh Tax Center Universitas Gunadarma.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2 xl:px-0">
          {beritaData.map((item) => (
            <article key={item.id} className="flex flex-col">
              <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden border border-gray-300">
                <Image
                  src={get_image_url(item.image_url)}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  unoptimized
                />
              </div>
              <p className="mt-3 text-sm text-black">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="mt-6 font-extrabold text-[#FE8100] text-xl md:text-2xl">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
        <Link href="/kegiatan-berita/agenda-kegiatan">
          <Button
            size="lg"
            className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-11 cursor-pointer"
          >
            Lihat Selengkapnya
          </Button>
        </Link>
      </div>
    </section>
  );
}
