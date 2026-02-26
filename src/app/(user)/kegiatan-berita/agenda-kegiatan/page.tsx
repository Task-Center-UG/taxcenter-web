"use client";

import React from "react";
import { useGetData } from "@/hooks/use-get-data";
import CarouselAgenda from "@/components/CarouselAgenda";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/PageHeaderHero";

const API_BASE_URL = "https://dev.api.taxcenterug.com";

const carouselImages = [
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
];

interface News {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface NewsResponse {
  news: News[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/uploads/news/${url}`;
};

export default function AgendaKegiatan() {
  const { data, isLoading } = useGetData<NewsResponse>({
    key: ["news-list"],
    url: "/news",
    params: {
      page: 1,
      size: 6,
      sort_by: "created_at",
      order: "desc",
    },
  });

  const newsData = data?.news || [];

  return (
    <>
      {/* Header Section */}
      <PageHeaderHero
        title="AGENDA KEGIATAN"
        subtitle={
          <>
            Informasi lengkap mengenai kegiatan dan berita terbaru dari Tax
            Center Universitas Gunadarma. Ikuti perkembangan dan update
            terkini seputar <br /> perpajakan dan kegiatan akademik.
          </>
        }
        innerClassName="min-h-[220px] lg:min-h-[240px]"
      />

      {/* Carousel Section */}
      <section className="mt-6 mb-16 px-4 md:px-16 xl:px-32 overflow-hidden">
        <div className="container mx-auto ove">
          <div className="flex justify-center">
            <div className="relative w-full max-w-6xl">
              <CarouselAgenda images={carouselImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Kegiatan dan Berita Terbaru Section */}
      <div className="pt-4 pb-12 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Kegiatan dan Berita Terbaru
          </h2>
          <div className="flex justify-end mt-2">
            <Link href="/kegiatan-berita/agenda-kegiatan">
              <p className="text-[#F1C40F] text-lg font-semibold hover:underline">
                Lihat Semua
              </p>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-500">Memuat data...</p>
            </div>
          ) : newsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {newsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-[200px] bg-[#D9D9D9]">
                    {item.image_url ? (
                      <Image
                        src={getImageUrl(item.image_url)}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg"
                        loading="lazy"
                        unoptimized // Bypass optimasi server-side untuk menghindari error private IP
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="text-xl font-bold mt-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 mb-3 text-justify line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex justify-end">
                      <Link
                        href={`/kegiatan-berita/agenda-kegiatan/${item.id}`}
                      >
                        <Button
                          variant="link"
                          className="text-[#2A176F] font-semibold p-0 hover:underline hover:text-[#2A176F] cursor-pointer"
                        >
                          Selengkapnya →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-500">Belum ada berita tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

