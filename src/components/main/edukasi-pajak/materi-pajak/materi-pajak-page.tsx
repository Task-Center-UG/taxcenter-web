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
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/common/page-header-hero";
import { resolveMediaUrl } from "@/lib/media-url";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type TaxMaterialItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  file_url: string;
  file_download_url: string;
  created_at: string;
  created_by: Creator;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type TaxMaterialResponse = {
  mappedMaterials: TaxMaterialItem[];
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

const MateriPajakPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);
  const pageSize = 8;

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

  const { data, isLoading, isError } = useGetData<TaxMaterialResponse>({
    key: ["tax-material", JSON.stringify(apiParams)],
    url: "/tax-material",
    params: apiParams,
  });

  const items = data?.mappedMaterials || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  return (
    <>
      <div className="relative max-w-full overflow-hidden select-none">
        <PageHeaderHero
          title="MATERI PAJAK"
          subtitle={
            <>
              Kumpulan materi perpajakan yang dapat diakses sebagai referensi
              pembelajaran bagi mahasiswa dan masyarakat. Materi tersebut memuat
              konsep serta ketentuan umum perpajakan untuk mendukung pemahaman
              terhadap peraturan yang berlaku.
            </>
          }
          innerClassName="min-h-[260px] lg:min-h-[300px]"
        >
          <div className="flex justify-center items-center mt-5 gap-3 w-full max-w-xl">
            <div className="relative w-full md:w-2/3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari materi..."
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

      <div className="page-shell pb-16">
        {isError && (
          <div className="text-center text-red-500 py-10">
            Gagal memuat data.
          </div>
        )}
        {!isLoading && !isError && items.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            Data tidak ditemukan.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-white">
                <Image
                  src={resolveMediaUrl(item.image_url, "/placeholder.png")}
                  alt={item.title}
                  fill
                  className="object-contain"
                  loading="lazy"
                  unoptimized
                />
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 line-clamp-2 md:text-xl">
                  {item.title}
                </h3>
                <div className="flex justify-end mt-auto">
                  <Link href={`/edukasi-pajak/materi-pajak/${item.id}`}>
                    <Button className="rounded-full cursor-pointer px-6 bg-[#F97316] text-white text-sm font-medium hover:bg-orange-600">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </>
  );
};

export default MateriPajakPage;
