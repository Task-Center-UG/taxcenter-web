"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowRight,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/common/page-header-hero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ResearchCategoryDetail = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by_id: number;
  updated_by_id: number;
  created_by: Creator;
  updated_by: Creator;
};

type ResearchItem = {
  id: number;
  title: string;
  description: string;
  cta_url: string;
  created_at: string;
  updated_at: string;
  research_category_id: number;
  ResearchCategory: {
    id: number;
    title: string;
  };
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

const stripHtml = (value?: string) =>
  (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function KategoriPenelitianDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const categoryId = Number(id);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useGetData<ResearchCategoryDetail>({
    key: ["research-category-detail", id],
    url: `/research-category/${id}`,
  });

  React.useEffect(() => {
    setPage(1);
  }, [debouncedQuery, sort, id]);

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
      research_category_id: Number.isNaN(categoryId) ? undefined : categoryId,
    };
  }, [page, pageSize, debouncedQuery, sort, categoryId]);

  const {
    data: researchData,
    isLoading: isLoadingResearch,
    isError: isErrorResearch,
  } = useGetData<ResearchResponse>({
    key: ["research-by-category", id, JSON.stringify(apiParams)],
    url: "/research",
    params: apiParams,
    options: {
      enabled: !Number.isNaN(categoryId),
    },
  });

  const items = researchData?.research || [];
  const paging = researchData?.paging || {
    page: 1,
    total_pages: 1,
    total_items: 0,
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#F97316]" />
        <p className="text-gray-500 font-medium">Memuat kategori penelitian...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Tidak Ditemukan
        </h2>
        <Link
          href="/program-layanan/riset/kategori-penelitian"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] pb-20">
      <PageHeaderHero
        title={data.title}
        subtitle={
          stripHtml(data.description) ||
          "Daftar penelitian yang menggunakan kategori ini."
        }
        innerClassName="min-h-[220px] md:min-h-[260px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/program-layanan/riset/kategori-penelitian"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F97316] font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Kategori Penelitian
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            <Tag className="h-4 w-4" />
            {paging.total_items} penelitian ditemukan
          </div>
        </div>

        <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder={`Cari penelitian pada kategori ${data.title}...`}
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

            <div className="bg-[#F97316] text-white p-3 sm:rounded-r-md w-full sm:w-auto flex justify-center items-center">
              {isLoadingResearch ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isErrorResearch && (
            <div className="text-center text-red-500 py-20 bg-white rounded-lg border border-red-100">
              Gagal memuat daftar penelitian. Silakan coba lagi nanti.
            </div>
          )}

          {!isLoadingResearch && !isErrorResearch && items.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-gray-100">
              Belum ada penelitian pada kategori ini.
            </div>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="py-5 px-5 md:px-8 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-md font-medium">
                    <Tag className="w-3 h-3" />
                    {item.ResearchCategory?.title || data.title}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.created_by?.full_name || "Admin Tax Center"}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F97316] transition-colors">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
                  {stripHtml(item.description) || "Belum ada deskripsi penelitian."}
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

        {!isLoadingResearch && paging.total_pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
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
                setPage((current) => Math.min(paging.total_pages, current + 1))
              }
              disabled={page === paging.total_pages}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Tentang Kategori
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {stripHtml(data.description) ||
              "Kategori ini digunakan untuk mengelompokkan penelitian berdasarkan topik atau fokus kajiannya."}
          </p>
        </div>
      </div>
    </div>
  );
}
