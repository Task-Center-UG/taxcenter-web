"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
} from "lucide-react";
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

const API_BASE_URL = "https://stag.api.taxcenterug.com";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function FotoKegiatan() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const pageSize = 9;

  const apiParams = useMemo(() => {
    let sort_by = "created_at";
    let order = "desc";
    if (sort === "terlama") order = "asc";
    if (sort === "az") {
      sort_by = "title";
      order = "asc";
    }
    if (sort === "za") {
      sort_by = "title";
      order = "desc";
    }
    return {
      page,
      size: pageSize,
      title: debouncedQuery || undefined,
      sort_by,
      order,
    };
  }, [page, pageSize, debouncedQuery, sort]);

  const { data, isLoading, isError } = useGetData<GalleryResponse>({
    key: ["gallery", JSON.stringify(apiParams)],
    url: "/gallery",
    params: apiParams,
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
          <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
            <Input
              placeholder="Cari foto kegiatan..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="flex-1 border-0 shadow-none focus-visible:ring-0 h-12"
            />

            <div className="flex items-center w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200">
              <div className="relative w-full sm:w-auto">
                <Select
                  value={sort}
                  onValueChange={(value) => {
                    setSort(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="border-0 shadow-none focus:ring-0 h-12 rounded-none sm:rounded-r-none w-full sm:w-[160px]">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terbaru">Terbaru...</SelectItem>
                    <SelectItem value="terlama">Terlama...</SelectItem>
                    <SelectItem value="az">A - Z</SelectItem>
                    <SelectItem value="za">Z - A</SelectItem>
                  </SelectContent>
                </Select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="bg-[#F97316] text-white p-3 sm:rounded-r-md w-full sm:w-auto flex justify-center items-center h-12">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

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
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
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
                    <div className="flex justify-end mt-auto">
                      <Link
                        href={`/galeri/foto-kegiatan/${item.id}`}
                        className="inline-flex items-center gap-2 text-[#F97316] font-semibold text-sm hover:underline"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && paging.total_pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>
              <span className="text-sm font-medium text-gray-600">
                Halaman {page} dari {paging.total_pages}
              </span>
              <button
                onClick={() =>
                  setPage((p) => Math.min(paging.total_pages, p + 1))
                }
                disabled={page === paging.total_pages}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
