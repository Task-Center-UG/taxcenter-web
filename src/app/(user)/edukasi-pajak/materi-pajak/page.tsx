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
import PageHeaderHero from "@/components/PageHeaderHero";

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

const API_BASE_URL = "https://dev.api.taxcenterug.com";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const MateriPajak = () => {
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

  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

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

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
            >
              <div className="w-full h-[150px] bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                <Image
                  src={getImageUrl(item.image_url)}
                  alt={item.title}
                  className="w-auto h-full object-contain"
                  width={150}
                  height={100}
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                  {item.description}
                </p>
                <div className="flex justify-end mt-auto">
                  <Link
                    href={item.file_download_url || item.file_url}
                    target="_blank"
                    passHref
                  >
                    <Button className="rounded-full cursor-pointer px-6 bg-[#F1C40F] text-black text-sm font-medium hover:bg-[#f7c933]">
                      Lihat Materi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && paging.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 w-9 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-slate-600 px-2">
              Page {page} of {paging.total_pages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= paging.total_pages}
              onClick={() => setPage((p) => p + 1)}
              className="h-9 w-9 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MateriPajak;
