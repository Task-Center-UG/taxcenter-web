"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  category:
    | "SPT_ASSISTANT"
    | "PUBLIC_RELATIONS_FUNCTION"
    | "SUPPORTING_ACTIVITIES"
    | "BUSINESS_DEVELOPMENT_SERVICES";
  image_url: string;
  created_at: string;
};

type ActivityResponse = {
  taxVolunteerActivities: ActivityItem[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const sectionConfig: Record<
  ActivityItem["category"],
  { title: string; subtitle: string; bg?: string }
> = {
  SPT_ASSISTANT: {
    title: "Asistensi SPT",
    subtitle:
      "Kegiatan Asistensi SPT Tahunan berupaya untuk memberikan pemahaman yang memadai mengenai materi Pajak tentang pengisian SPT Tahunan kepada Wajib Pajak yang memiliki kewajiban melaporkannya.",
    bg: "bg-[#F5FAFF]",
  },
  PUBLIC_RELATIONS_FUNCTION: {
    title: "Fungsi Kehumasan",
    subtitle:
      "Kegiatan Fungsi Kehumasan memberikan pemahaman mengenai Kehumasan dan branding instansi Direktorat Jenderal Pajak kepada masyarakat luas yang dapat terimplementasi oleh Relawan Pajak.",
  },
  SUPPORTING_ACTIVITIES: {
    title: "SUPPORTING ACTIVITIES",
    subtitle:
      "Kegiatan Supporting Activities bertujuan membantu Wajib Pajak dalam memberikan pengetahuan perpajakan yang diperlukan atau kegiatan lain yang dilakukan selain kegiatan utama.",
    bg: "bg-[#F5FAFF]",
  },
  BUSINESS_DEVELOPMENT_SERVICES: {
    title: "Business Development Services (BDS)",
    subtitle:
      "Kegiatan Asistensi Business Development Services bertujuan memberikan pemahaman konseptual dan pengalaman praktik aspek bisnis UMKM kepada pelaku usaha binaan.",
  },
};

const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
  if (path.startsWith("uploads/")) return `${API_BASE_URL}/${path}`;
  return `${API_BASE_URL}/${path}`;
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function RelawanPajak() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const pageSize = 12;

  const apiParams = useMemo(
    () => ({
      page,
      size: pageSize,
      search: debouncedQuery || undefined,
      sort_by: "created_at",
      order: "desc",
    }),
    [page, debouncedQuery]
  );

  const { data, isLoading, isError } = useGetData<ActivityResponse>({
    key: ["tax-volunteer-activities", JSON.stringify(apiParams)],
    url: "/tax-volunteer-activities",
    params: apiParams,
  });

  const items = data?.taxVolunteerActivities || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  const grouped = useMemo(() => {
    return {
      SPT_ASSISTANT: items.filter((i) => i.category === "SPT_ASSISTANT"),
      PUBLIC_RELATIONS_FUNCTION: items.filter(
        (i) => i.category === "PUBLIC_RELATIONS_FUNCTION"
      ),
      SUPPORTING_ACTIVITIES: items.filter(
        (i) => i.category === "SUPPORTING_ACTIVITIES"
      ),
      BUSINESS_DEVELOPMENT_SERVICES: items.filter(
        (i) => i.category === "BUSINESS_DEVELOPMENT_SERVICES"
      ),
    };
  }, [items]);

  return (
    <>
      <PageHeaderHero
        title="RELAWAN PAJAK"
        subtitle="Program relawan pajak yang melibatkan mahasiswa untuk memberikan asistensi perpajakan kepada masyarakat."
      />

      <section className="w-full bg-[#2A176F]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="text-white flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6">
              KEGIATAN RELAWAN PAJAK
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-white/90 max-w-xl mb-5 md:mb-7 text-center md:text-justify">
              Kegiatan Relawan Pajak adalah program yang melibatkan mahasiswa
              untuk membantu masyarakat dalam pelaporan SPT Tahunan.
            </p>

            <div className="flex flex-wrap gap-3 text-center">
              <Link
                href="/program-layanan/relawan-pajak/mbkm"
                className="inline-flex items-center justify-center rounded-md bg-[#FF8A00] hover:bg-[#E67A00] text-white text-xs md:text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                Daftar Relawan Pajak <br /> MBKM
              </Link>
              <Link
                href="/program-layanan/relawan-pajak/non-mbkm"
                className="inline-flex items-center justify-center rounded-md bg-[#FF8A00] hover:bg-[#E67A00] text-white text-xs md:text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                Daftar Relawan Pajak <br /> Non-MBKM
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-white/95 mx-auto sm:max-w-sm md:max-w-md aspect-[4/3] lg:-right-9 overflow-hidden">
              <Image
                src="/assets/images/program-dan-layanan/relawan-pajak/01-relawan-pajak.png"
                alt="Relawan Pajak"
                fill
                className="object-cover object-center rounded-2xl"
                priority
                quality={95}
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 md:px-6 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kegiatan relawan pajak..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-gray-300 py-3 pl-4 pr-11 text-sm outline-none focus:border-[#F97316]"
            />
            <Search className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[240px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center min-h-[240px]">
          <p className="text-red-500">Gagal memuat data kegiatan relawan.</p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        (Object.keys(sectionConfig) as ActivityItem["category"][]).map(
          (category) => {
            const cfg = sectionConfig[category];
            const sectionItems = grouped[category];

            return (
              <section key={category} className={`w-full ${cfg.bg || "bg-white"}`}>
                <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
                      {cfg.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed mx-auto md:mx-0 text-center md:text-left">
                      {cfg.subtitle}
                    </p>
                  </div>

                  {sectionItems.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada data.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                      {sectionItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
                        >
                          <div className="relative w-full aspect-[4/3] bg-[#D9D9D9]">
                            <Image
                              src={getImageUrl(item.image_url)}
                              alt={item.title}
                              fill
                              className="object-cover"
                              quality={95}
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                              unoptimized
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-slate-900 line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                              {stripHtml(item.description)}
                            </p>
                            <div className="mt-4 flex justify-end">
                              <Link
                                href={`/program-layanan/relawan-pajak/${item.id}`}
                                className="text-sm font-semibold text-[#F97316] hover:underline"
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }
        )}

      {!isLoading && paging.total_pages > 1 && (
        <div className="flex items-center justify-center gap-4 py-10">
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
            onClick={() => setPage((p) => Math.min(paging.total_pages, p + 1))}
            disabled={page === paging.total_pages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
