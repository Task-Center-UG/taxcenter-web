"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  picture_url: string;
  created_at: string;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type GalleryResponse = {
  gallerys: GalleryItem[];
  paging: PagingInfo;
};

const API_BASE_URL = "https://dev.api.taxcenterug.com";

export default function FotoKegiatan() {
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const { data, isLoading, isError } = useGetData<GalleryResponse>({
    key: ["gallery", page.toString()],
    url: "/gallery",
    params: {
      page,
      size: pageSize,
      sort_by: "created_at",
      order: "desc",
    },
  });

  const items = data?.gallerys || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder-image.jpg";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

  return (
    <>
      <PageHeaderHero title="FOTO KEGIATAN" />

      <section className="py-16 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto">
          {isError && (
            <div className="text-center py-10 text-red-500">
              Gagal memuat galeri kegiatan.
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              Belum ada foto kegiatan.
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg shadow-md overflow-hidden bg-white flex flex-col h-full hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-[250px] bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                    <Image
                      src={getImageUrl(item.picture_url)}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      width={300}
                      height={200}
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-justify line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && paging.total_pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-9 w-9 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-slate-600 px-2">
                Halaman {page} dari {paging.total_pages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page >= paging.total_pages}
                onClick={() => setPage((p) => p + 1)}
                className="h-9 w-9 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
