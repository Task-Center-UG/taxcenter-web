"use client";

import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

interface Seminar {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/uploads/seminar/${url}`;
};

export default function SeminarDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<any>({
    key: ["seminar-detail", id],
    url: `/seminar/${id}`,
  });

  const seminar: Seminar = data?.seminar || data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px] lg:pt-[170px]">
        <p className="text-neutral-500">Memuat data seminar...</p>
      </div>
    );
  }

  if (error || !seminar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] lg:pt-[200px] gap-4">
        <p className="text-neutral-500">Seminar tidak ditemukan.</p>
        <Link href="/kegiatan-berita/seminar" className="text-blue-600 underline">
          Kembali ke Seminar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[100px] lg:pt-[170px] pb-16 min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="mb-8">
          <Link
            href="/kegiatan-berita/seminar"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2A176F] font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Kembali ke Seminar
          </Link>
        </div>

        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-4 capitalize">
            {seminar.title}
          </h1>
        </div>

        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black">Admin Tax Center</span>
            <span className="text-sm text-gray-500 mt-1">
              {new Date(seminar.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {seminar.image_url && (
          <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={getImageUrl(seminar.image_url)}
              alt={seminar.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="mx-auto">
          {seminar.description && (
            <article
              className="prose prose-sm md:prose-base max-w-none bg-white p-6 rounded shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#2A176F]"
              dangerouslySetInnerHTML={{ __html: seminar.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

