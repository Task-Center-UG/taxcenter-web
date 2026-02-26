"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type AfternoonTalkItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  video_url: string;
  created_at: string;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type AfternoonTalkResponse = {
  afternoonTalks: AfternoonTalkItem[];
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

const BincangSore = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const pageSize = 6;

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
      search: debouncedQuery || undefined,
      sort_by,
      order,
    };
  }, [page, debouncedQuery, sort]);

  const { data, isLoading, isError } = useGetData<AfternoonTalkResponse>({
    key: ["afternoon-talk", JSON.stringify(apiParams)],
    url: "/afternoon-talk",
    params: apiParams,
  });

  const items = data?.afternoonTalks || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder-video.jpg";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

  return (
    <>
      <div className="relative max-w-full overflow-hidden select-none">
        <PageHeaderHero
          title="BINCANG SORE & PODCAST"
          subtitle={
            <>
              Program diskusi yang membahas berbagai topik seputar perpajakan
              dan isu terkait secara ringan dan informatif. Kegiatan ini menjadi
              ruang berbagi wawasan dan perspektif bersama narasumber yang
              dihadirkan
            </>
          }
          innerClassName="min-h-[260px] lg:min-h-[300px]"
        >
          <div className="flex justify-center items-center mt-5 gap-3 w-full max-w-xl">
            <div className="relative w-full md:w-2/3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari topik bincang sore..."
                className="rounded-full h-9 bg-white border-slate-300 text-sm pl-4 pr-9"
              />
              <div className="absolute right-3 top-2 text-slate-400">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </div>
            </div>

            <div className="w-[140px]">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="rounded-full h-9 bg-[#2A176F] text-white border-none hover:opacity-90">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terbaru">Terbaru</SelectItem>
                  <SelectItem value="terlama">Terlama</SelectItem>
                  <SelectItem value="az">A - Z</SelectItem>
                  <SelectItem value="za">Z - A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PageHeaderHero>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 pb-16">
        {isError && (
          <div className="text-center text-red-500 py-10">
            Gagal memuat video.
          </div>
        )}
        {!isLoading && !isError && items.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            Tidak ada video ditemukan.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full h-[200px] bg-[#D9D9D9] flex items-center justify-center overflow-hidden group">
                <Image
                  src={getImageUrl(item.image_url)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={225}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-end mt-2">
                  <Link href={`/edukasi-pajak/bincang-sore/${item.id}`} passHref>
                    <Button className="rounded-full cursor-pointer px-12 bg-[#F97316] text-white text-sm font-semibold hover:bg-orange-600">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
    </>
  );
};

export default BincangSore;
