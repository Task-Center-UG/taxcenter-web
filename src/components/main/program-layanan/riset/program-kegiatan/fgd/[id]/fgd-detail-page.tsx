"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Loader2, AlertCircle } from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type FgdDetail = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  created_by: Creator;
  updated_by: Creator;
};

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  return `${API_BASE_URL}/${url}`;
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function FgdDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetData<FgdDetail>({
    key: ["detail-fgd", id],
    url: `/fgd/${id}`,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px] lg:pt-[170px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] lg:pt-[200px] gap-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-neutral-500">Data FGD tidak ditemukan.</p>
        <Link
          href="/program-layanan/riset/program-kegiatan/fgd"
          className="text-blue-600 underline"
        >
          Kembali ke FGD
        </Link>
      </div>
    );
  }

  const plainDescription = stripHtml(data.description || "-");

  return (
    <div className="relative pt-[100px] lg:pt-[170px] pb-16 min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="mb-8">
          <Link
            href="/program-layanan/riset/program-kegiatan/fgd"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2A176F] font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke FGD
          </Link>
        </div>

        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            {data.title}
          </h1>
        </div>

        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black inline-flex items-center gap-2">
              <User className="h-4 w-4 text-[#F97316]" />
              {data.created_by?.full_name || "Admin Tax Center"}
            </span>
            <span className="text-sm text-gray-500 mt-1 inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#F97316]" />
              {new Date(data.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {data.image_url && (
          <div className="relative w-full aspect-[3/2] mb-12 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={getImageUrl(data.image_url)}
              alt={data.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="mx-auto">
          <article className="prose prose-sm md:prose-base max-w-none bg-white p-6 rounded shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900">
            {plainDescription}
          </article>
        </div>
      </div>
    </div>
  );
}
