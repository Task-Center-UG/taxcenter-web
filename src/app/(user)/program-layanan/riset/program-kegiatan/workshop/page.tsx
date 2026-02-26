"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type TrainingItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type TrainingListResponse = {
  trainings: TrainingItem[];
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

export default function WorkshopListPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  const { data, isLoading, isError } = useGetData<TrainingListResponse>({
    key: ["list-training", JSON.stringify(apiParams)],
    url: "/training",
    params: apiParams,
  });

  const items = data?.trainings || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <PageHeaderHero
        title="WORKSHOP & PELATIHAN"
        innerClassName="min-h-[200px] md:min-h-[240px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Cari topik workshop..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isError && (
            <div className="col-span-full text-center py-20 text-red-500 bg-white rounded-xl border border-red-100">
              Gagal memuat data workshop.
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-100">
              Tidak ada workshop yang ditemukan.
            </div>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group h-full"
            >
              <div className="relative h-52 bg-gray-200 overflow-hidden">
                {item.image_url ? (
                  <Image
                    src={getImageUrl(item.image_url)!}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#F97316]" />
                    {formatDate(item.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.created_by?.full_name}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Link
                    href={`/program-layanan/riset/program-kegiatan/workshop/${item.id}`}
                    className="inline-flex items-center gap-2 text-[#F97316] font-semibold text-sm hover:text-orange-700 transition-colors"
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
    </div>
  );
}
