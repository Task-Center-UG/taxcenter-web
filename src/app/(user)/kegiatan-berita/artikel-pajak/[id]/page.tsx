"use client";

import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE_URL = "https://dev.api.taxcenterug.com";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  picture_url: string;
  created_at: string;
  updated_at: string;
  author?: string;
  category?: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<{ article: Article }>({
    key: ["article-detail", id],
    url: `/article/${id}`,
  });

  const article = data?.article;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[70px] lg:pt-[120px]">
        <p className="text-neutral-500">Memuat data artikel...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] lg:pt-[120px] gap-4">
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
    <div className="relative pt-[70px] lg:pt-[120px] pb-20">
      {/* Header Section */}
      <div className="w-full bg-[#D9D9D9] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-black">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm md:text-base text-gray-700">
            <span>
              {new Date(article.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {article.author && (
              <>
                <span>•</span>
                <span>Oleh: {article.author}</span>
              </>
            )}
            {article.category && (
              <>
                <span>•</span>
                <span className="px-3 py-1 bg-[#2A176F] text-white rounded-full text-xs">
                  {article.category}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-5xl px-4 sm:px-8 mt-12 md:mt-16">
        {/* Featured Image */}
        {article.picture_url && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`${API_BASE_URL}/${article.picture_url}`}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {article.description && (
          <div className="mb-8 p-6 bg-gray-50 border-l-4 border-[#2A176F] rounded">
            <p className="text-lg text-gray-700 font-medium leading-relaxed italic">
              {article.description}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none text-neutral-700 leading-relaxed text-justify"
          dangerouslySetInnerHTML={{
            __html: article.content || article.description,
          }}
        />

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/kegiatan-berita/artikel-pajak"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
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
      </div>
    </div>
  );
}
