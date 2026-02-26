"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Tag,
  User,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ResearchCategory = {
  id: number;
  title: string;
};

type ResearchItem = {
  id: number;
  title: string;
  description: string;
  cta_url: string;
  created_at: string;
  updated_at: string;
  research_category_id: number;
  ResearchCategory: ResearchCategory;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type ResearchResponse = {
  research: ResearchItem[];
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

export default function KerjasamaRiset() {
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

  const { data, isLoading, isError } = useGetData<ResearchResponse>({
    key: ["research-list", JSON.stringify(apiParams)],
    url: "/research",
    params: apiParams,
  });

  const items = data?.research || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <PageHeaderHero
        title="KERJASAMA RISET"
        innerClassName="min-h-[200px] md:min-h-[240px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Cari kerjasama riset..."
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
            <div className="text-center text-red-500 py-20 bg-white rounded-lg border border-red-100">
              Gagal memuat data riset. Silakan coba lagi nanti.
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-gray-100">
              Tidak ada data kerjasama riset yang ditemukan.
            </div>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
              className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 md:p-6 flex-shrink-0 flex items-center justify-center bg-gray-50 md:border-r border-gray-100">
                <div className="w-full h-40 md:w-48 md:h-40 bg-[#D9D9D9] rounded-lg flex items-center justify-center text-gray-400">
                  <span className="text-xs font-medium">Image Placeholder</span>
                </div>
              </div>

              <div className="flex-1 py-5 px-5 md:px-8 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-md font-medium">
                    <Tag className="w-3 h-3" />
                    {item.ResearchCategory?.title || "Umum"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.created_by?.full_name}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F97316] transition-colors">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/program-layanan/riset/kerjasama-riset/${item.id}`}
                    className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium text-sm py-2 px-6 rounded-full transition-colors"
                  >
                    Lihat Detail <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

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

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                Halaman {page}
              </span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm font-medium text-gray-500">
                {paging.total_pages}
              </span>
            </div>

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
    </div>
  );
}
