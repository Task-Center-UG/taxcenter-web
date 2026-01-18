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
  Hash,
  FileText,
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
    <div className="relative pt-[70px] lg:pt-[120px] w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/program-layanan/riset/kategori-penelitian"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-4 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Detail Kategori Penelitian
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-[#F97316]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Judul Kategori
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {data.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Hash className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  ID Kategori
                </span>
              </div>
              <p className="text-gray-900 font-mono font-medium text-lg">
                {data.id}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Dibuat Oleh
                </span>
              </div>
              <p className="text-gray-900 font-medium">
                {data.created_by?.full_name}
                <span className="text-gray-400 text-sm font-normal ml-1">
                  (@{data.created_by?.username})
                </span>
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Tanggal Dibuat
                </span>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(data.created_at)}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Terakhir Update
                </span>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(data.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
