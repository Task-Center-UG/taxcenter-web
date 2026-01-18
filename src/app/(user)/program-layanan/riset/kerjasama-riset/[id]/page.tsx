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
  ExternalLink,
  Tag,
  Share2,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ResearchCategory = {
  id: number;
  title: string;
};

type ResearchDetail = {
  id: number;
  title: string;
  description: string;
  cta_url: string;
  created_at: string;
  updated_at: string;
  research_category_id: number;
  ResearchCategory: ResearchCategory;
  created_by: Creator;
  updated_by: Creator;
};

export default function DetailKerjasamaRiset() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<ResearchDetail>({
    key: ["research-detail", id],
    url: `/research/${id}`,
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#F97316]" />
        <p className="text-gray-500 font-medium">
          Memuat detail kerjasama riset...
        </p>
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
        <p className="text-gray-500 max-w-md mb-8">
          Maaf, data kerjasama riset yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/program-layanan/riset/kerjasama-riset"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[70px] lg:pt-[120px] w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/program-layanan/riset/kerjasama-riset"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Kerjasama Riset
          </Link>

          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
              <Tag className="w-3.5 h-3.5" />
              {data.ResearchCategory?.title || "Umum"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F97316]" />
              <span>
                Oleh:{" "}
                <span className="font-semibold text-gray-700">
                  {data.created_by?.full_name}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F97316]" />
              <span>{formatDate(data.created_at)}</span>
            </div>
            {data.updated_at !== data.created_at && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" />
                <span>Update: {formatDate(data.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 shadow-sm overflow-hidden">
              <div className="text-center">
                <span className="text-sm font-medium">Gambar Riset</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Deskripsi Lengkap
              </h3>
              <article className="prose prose-orange max-w-none text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                {data.description}
              </article>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-32">
              <h4 className="font-bold text-gray-900 mb-2">Aksi Riset</h4>
              <p className="text-sm text-gray-500 mb-6">
                Tertarik dengan kerjasama riset ini? Silakan kunjungi tautan
                berikut untuk informasi lebih lanjut.
              </p>

              {data.cta_url ? (
                <Link
                  href={data.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg mb-4"
                >
                  Buka Link Riset <ExternalLink className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 font-bold py-3 px-4 rounded-lg cursor-not-allowed mb-4"
                >
                  Link Tidak Tersedia
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
