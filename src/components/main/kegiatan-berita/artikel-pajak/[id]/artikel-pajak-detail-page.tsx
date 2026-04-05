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

export default function ArtikelPajakDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<any>({
    key: ["article-detail", id],
    url: `/article/${id}`,
  });

  const article = data?.article || data;

  if (isLoading) {
    return (
      <div className="detail-shell flex items-center justify-center">
        <p className="text-neutral-500">Memuat data artikel...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="detail-shell flex flex-col items-center justify-center gap-4">
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
    <div className="detail-shell bg-[#F8F9FD]">
      <div className="detail-container">
        
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

        
        <div className="mx-auto mb-10 max-w-4xl text-center">
          {article.category && (
            <span className="mb-4 inline-block rounded-full bg-[#2A176F] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {article.category}
            </span>
          )}
          <h1 className="detail-title mb-4 capitalize">
            {article.title}
          </h1>
        </div>

        
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
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

          <div className="flex items-center gap-2 text-gray-600 transition-colors hover:text-black">
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

        
        {article.image_url && (
          <div className="detail-media mb-10">
            <Image
              src={getImageUrl(article.image_url)}
              alt={article.title}
              fill
              className="object-contain sm:object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="mx-auto">
          {article.description && (
            <article
              className="detail-card prose prose-sm md:prose-base max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#2A176F]"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
