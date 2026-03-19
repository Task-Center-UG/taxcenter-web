"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type PublicationDetail = {
  id: number;
  title: string;
  description: string;
  year: number;
  created_at: string;
  updated_at: string;
  created_by: Creator;
  updated_by: Creator;
};

export default function PublikasiDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<any>({
    key: ["publication-detail", id],
    url: `/publication/${id}`,
  });

  const detail: PublicationDetail | undefined = data?.publication || data;

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#F97316]" />
        <p className="text-gray-500 font-medium">Memuat detail publikasi...</p>
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Tidak Ditemukan
        </h2>
        <Link
          href="/kegiatan-berita/publikasi"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Publikasi
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[70px] lg:pt-[120px] w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/kegiatan-berita/publikasi"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Publikasi
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {detail.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F97316]" />
              <span>{detail.created_by?.full_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F97316]" />
              <span>{formatDate(detail.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-orange-50 text-orange-700 font-semibold">
                Tahun {detail.year}
              </span>
            </div>
            {detail.updated_at !== detail.created_at && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" />
                <span>Diupdate: {formatDate(detail.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Konten Publikasi
          </h3>
          <article
            className="prose prose-sm md:prose-base max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#F97316]"
            dangerouslySetInnerHTML={{ __html: detail.description || "-" }}
          />
        </div>
      </div>
    </div>
  );
}

