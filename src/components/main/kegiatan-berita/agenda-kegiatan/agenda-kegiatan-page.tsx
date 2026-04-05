"use client";

import React, { useMemo, useState } from "react";
import { useGetData } from "@/hooks/use-get-data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/common/page-header-hero";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
} from "lucide-react";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/uploads/news/${url}`;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function AgendaKegiatanPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const pageSize = 6;

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
  }, [page, debouncedQuery, sort]);

  const { data, isLoading, isError } = useGetData<NewsResponse>({
    key: ["news-list", JSON.stringify(apiParams)],
    url: "/news",
    params: apiParams,
  });

  const newsData = data?.news || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  return (
    <>
      <PageHeaderHero
        title="AGENDA KEGIATAN"
        subtitle={
          <>
            Informasi lengkap mengenai kegiatan dan berita terbaru dari Tax
            Center Universitas Gunadarma. Ikuti perkembangan dan update terkini
            seputar <br /> perpajakan dan kegiatan akademik.
          </>
        }
        innerClassName="min-h-[220px] lg:min-h-[240px]"
      />

      <section className="section-shell">
        <div className="page-shell-tight">
          <div className="toolbar-shell">
            <input
              type="text"
              placeholder="Cari agenda kegiatan..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="toolbar-input flex-1 outline-none"
            />

            <div className="toolbar-control-group">
              <div className="relative w-full sm:w-auto">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="min-h-11 w-full cursor-pointer appearance-none bg-transparent py-3 pl-4 pr-10 text-sm text-gray-600 outline-none transition-colors hover:bg-gray-50 sm:w-auto"
                >
                  <option value="terbaru">Terbaru...</option>
                  <option value="terlama">Terlama...</option>
                  <option value="az">A - Z</option>
                  <option value="za">Z - A</option>
                </select>
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
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-red-500">Gagal memuat data berita.</p>
            </div>
          )}

          {!isLoading && !isError && newsData.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsData.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[3/2] w-full bg-white">
                    {item.image_url ? (
                      <Image
                        src={getImageUrl(item.image_url)}
                        alt={item.title}
                        fill
                        className="object-contain sm:object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex justify-end">
                      <Link
                        href={`/kegiatan-berita/agenda-kegiatan/${item.id}`}
                      >
                        <Button
                          variant="link"
                          className="text-[#2A176F] font-semibold p-0 hover:underline hover:text-[#2A176F] cursor-pointer"
                        >
                          Selengkapnya &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-neutral-500">Memuat data...</p>
            </div>
          )}

          {!isLoading && !isError && newsData.length === 0 && (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-neutral-500">Belum ada berita tersedia.</p>
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
