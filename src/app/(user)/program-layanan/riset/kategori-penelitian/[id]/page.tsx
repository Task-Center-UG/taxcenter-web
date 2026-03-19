"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ResearchCategoryDetail = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by_id: number;
  updated_by_id: number;
  created_by: Creator;
  updated_by: Creator;
};

export default function DetailKategoriPenelitian() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<ResearchCategoryDetail>({
    key: ["research-category-detail", id],
    url: `/research-category/${id}`,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#F97316]" />
        <p className="text-gray-500 font-medium">Memuat detail...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Tidak Ditemukan
        </h2>
        <Link
          href="/program-layanan/riset/kategori-penelitian"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[100px] lg:pt-[170px] pb-16 min-h-screen bg-[#F8F9FD]">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="mb-8">
          <Link
            href="/program-layanan/riset/kategori-penelitian"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2A176F] font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Kategori Penelitian
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

        <div className="mx-auto">
          <article
            className="prose prose-sm md:prose-base max-w-none bg-white p-6 rounded shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#2A176F]"
            dangerouslySetInnerHTML={{ __html: data.description || "-" }}
          />
        </div>
      </div>
    </div>
  );
}
