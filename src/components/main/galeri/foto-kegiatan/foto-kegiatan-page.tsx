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
import PageHeaderHero from "@/components/common/page-header-hero";
import { resolveMediaUrl } from "@/lib/media-url";

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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function FotoKegiatanPage() {
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

  return (
    <>
      <PageHeaderHero title="FOTO KEGIATAN" />

      <section className="section-shell">
        <div className="page-shell-tight">
          <div className="toolbar-shell">
            <Input
              placeholder="Cari foto kegiatan..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="toolbar-input flex-1 border-0 shadow-none focus-visible:ring-0"
            />

            <div className="toolbar-control-group">
              <div className="relative w-full sm:w-auto">
                <Select
                  value={sort}
                  onValueChange={(value) => {
                    setSort(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-11 w-full border-0 shadow-none focus:ring-0 sm:w-[160px]">
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

              <div className="flex min-h-11 w-full items-center justify-center rounded-b-xl bg-[#F97316] p-3 text-white sm:w-auto sm:rounded-b-none sm:rounded-r-xl">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-white">
                    <Image
                      src={resolveMediaUrl(item.picture_url, "/placeholder-image.jpg")}
                      alt={item.title}
                      className="h-full w-full object-contain sm:object-cover"
                      width={300}
                      height={200}
                      loading="lazy"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900">
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
            <div className="pagination-shell mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
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
                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
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
