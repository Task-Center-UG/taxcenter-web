"use client";

import React, { useMemo, useState } from "react";
import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/PageHeaderHero";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
} from "lucide-react";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

interface Article {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  category?: string;
}

interface ArticleResponse {
  articles: Article[];
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
  return `${API_BASE_URL}/uploads/article/${url}`;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function ArtikelPajak() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const pageSize = 8;

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

  const { data, isLoading, isError } = useGetData<ArticleResponse>({
    key: ["articles-list", JSON.stringify(apiParams)],
    url: "/article",
    params: apiParams,
  });

  const articles = data?.articles || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  return (
    <>
      <PageHeaderHero
        title="ARTIKEL PAJAK"
        subtitle={
          <>
            Koleksi artikel perpajakan terkini yang membahas berbagai topik
            seputar perpajakan di Indonesia. Dapatkan wawasan dan pengetahuan
            mendalam <br /> dari para ahli pajak.
          </>
        }
        innerClassName="min-h-[260px] lg:min-h-[300px]"
      />

      <section className="px-4 md:px-6 xl:px-20 mb-16 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
            <input
              type="text"
              placeholder="Cari artikel pajak..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400 w-full"
            />

            <div className="flex items-center w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200">
              <div className="relative w-full sm:w-auto">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="appearance-none bg-transparent py-3 pl-4 pr-10 outline-none text-gray-600 cursor-pointer w-full sm:w-auto hover:bg-gray-50 transition-colors"
                >
                  <option value="terbaru">Terbaru...</option>
                  <option value="terlama">Terlama...</option>
                  <option value="az">A - Z</option>
                  <option value="za">Z - A</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="bg-[#F97316] text-white p-3 sm:rounded-r-md w-full sm:w-auto flex justify-center items-center">
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
              <p className="text-red-500">Gagal memuat data artikel.</p>
            </div>
          )}

          {!isLoading && !isError && articles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {articles.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#D9D9D9] w-full h-[220px] relative">
                    {item.image_url ? (
                      <Image
                        src={getImageUrl(item.image_url)}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {item.category && (
                        <span className="text-xs px-2 py-1 bg-[#2A176F] text-white rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex justify-end">
                      <Link href={`/kegiatan-berita/artikel-pajak/${item.id}`}>
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
              <p className="text-neutral-500">Memuat data artikel...</p>
            </div>
          )}

          {!isLoading && !isError && articles.length === 0 && (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-neutral-500">Belum ada artikel tersedia.</p>
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
