"use client";

import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

interface News {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/uploads/news/${url}`;
};

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<any>({
    key: ["news-detail", id],
    url: `/news/${id}`,
  });

  const news = data?.news || data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px] lg:pt-[170px]">
        <p className="text-neutral-500">Memuat data berita...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] lg:pt-[200px] gap-4">
        <p className="text-neutral-500">Berita tidak ditemukan.</p>
        <Link
          href="/kegiatan-berita/agenda-kegiatan"
          className="text-blue-600 underline"
        >
          Kembali ke Agenda Kegiatan
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[100px] lg:pt-[170px] pb-16 min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Back Button - Top Left */}
        <div className="mb-8">
          <Link
            href="/kegiatan-berita/agenda-kegiatan"
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
            Kembali ke Agenda Kegiatan
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-4 capitalize">
            {news.title}
          </h1>
        </div>

        {/* Metadata Section */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black">
              Admin Tax Center
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {new Date(news.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black transition-colors">
            <span className="text-sm font-medium">Share</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-share-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
            </svg>
          </div>
        </div>

        {/* Featured Image */}
        {news.image_url && (
          <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={getImageUrl(news.image_url)}
              alt={news.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="mx-auto">
          {news.description && (
            <article
              className="prose prose-sm md:prose-base max-w-none bg-white p-6 rounded shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#2A176F]"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
