"use client";

import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  author?: string;
  category?: string;
}

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/uploads/article/${url}`;
};

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<any>({
    key: ["article-detail", id],
    url: `/article/${id}`,
  });

  const article = data?.article || data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[70px] lg:pt-[120px]">
        <p className="text-neutral-500">Memuat data artikel...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[100px] lg:pt-[180px] gap-4">
        <p className="text-neutral-500">Artikel tidak ditemukan.</p>
        <Link
          href="/kegiatan-berita/artikel-pajak"
          className="text-blue-600 underline"
        >
          Kembali ke Artikel Pajak
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[100px] lg:pt-[170px] pb-16 min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Back Button - Top Left */}
        <div className="mb-8">
          <Link
            href="/kegiatan-berita/artikel-pajak"
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
            Kembali ke Artikel Pajak
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          {article.category && (
            <span className="inline-block px-3 py-1 bg-[#2A176F] text-white rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
              {article.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-4 capitalize">
            {article.title}
          </h1>
        </div>

        {/* Metadata Section */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black">
              {article.author || "Admin Tax Center"}
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {new Date(article.created_at).toLocaleDateString("id-ID", {
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
        {article.image_url && (
          <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={getImageUrl(article.image_url)}
              alt={article.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Descriptions & Content */}
        <div className="mx-auto">
          {article.description && (
            <div className="p-6 bg-white border-l-4 border-[#2A176F] rounded shadow-sm">
              <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                {article.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
