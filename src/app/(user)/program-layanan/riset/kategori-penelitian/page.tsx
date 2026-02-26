"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ResearchCategoryItem = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type ResearchCategoryResponse = {
  researchCategory: ResearchCategoryItem[];
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

export default function KategoriPenelitian() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  React.useEffect(() => {
    setPage(1);
  }, [debouncedQuery, sort]);

  const apiParams = useMemo(() => {
    let sort_by = "created_at";
    let order = "desc";

    if (sort === "terlama") {
      order = "asc";
    } else if (sort === "az") {
      sort_by = "title";
      order = "asc";
    } else if (sort === "za") {
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

  const { data, isLoading, isError } = useGetData<ResearchCategoryResponse>({
    key: ["research-category", JSON.stringify(apiParams)],
    url: "/research-category",
    params: apiParams,
  });

  const items = data?.researchCategory || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  return (
    <div className="relative w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <PageHeaderHero
        title="KATEGORI PENELITIAN"
        innerClassName="min-h-[200px] md:min-h-[240px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Pencarian berdasarkan judul penelitian.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400 w-full"
          />

          <div className="flex items-center w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200">
            <div className="relative w-full sm:w-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-transparent py-3 pl-4 pr-10 outline-none text-gray-600 cursor-pointer w-full sm:w-auto"
              >
                <option value="terbaru">Terbaru...</option>
                <option value="terlama">Terlama...</option>
                <option value="az">A - Z</option>
                <option value="za">Z - A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button className="bg-[#F97316] hover:bg-orange-600 text-white p-3 sm:rounded-r-md transition-colors w-full sm:w-auto flex justify-center items-center">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {isError && (
            <div className="text-center text-red-500 py-20">
              Gagal memuat data penelitian.
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Tidak ada hasil penelitian yang ditemukan.
            </div>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 md:p-6 flex-shrink-0 flex items-center justify-center bg-white">
                <div className="w-full h-48 md:w-56 md:h-48 bg-[#D9D9D9] rounded-md"></div>
              </div>

              <div className="flex-1 py-4 px-4 md:py-6 md:pr-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify mb-4 line-clamp-3">
                  {item.description
                    ? item.description
                    : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It has survived not only five centuries, but also the leap into electronic typesetting."}
                </p>
                <div>
                  <Link
                    href={`/program-layanan/riset/kategori-penelitian/${item.id}`}
                    className="inline-block bg-[#F97316] hover:bg-orange-600 text-white font-medium text-sm py-2 px-8 rounded-full transition-colors"
                  >
                    Lihat
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!isLoading && paging.total_pages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-600 px-4">
              Halaman {page} dari {paging.total_pages}
            </span>

            <button
              onClick={() =>
                setPage((p) => Math.min(paging.total_pages, p + 1))
              }
              disabled={page === paging.total_pages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
