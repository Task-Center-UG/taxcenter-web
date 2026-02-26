"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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

const API_BASE_URL = "https://stag.api.taxcenterug.com";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type TaxVolunteerActivityDetail = {
  id: number;
  title: string;
  description: string;
  category:
    | "SPT_ASSISTANT"
    | "PUBLIC_RELATIONS_FUNCTION"
    | "SUPPORTING_ACTIVITIES"
    | "BUSINESS_DEVELOPMENT_SERVICES";
  image_url: string;
  created_at: string;
  updated_at: string;
  created_by?: Creator;
  updated_by?: Creator;
};

const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
  if (path.startsWith("uploads/")) return `${API_BASE_URL}/${path}`;
  return `${API_BASE_URL}/${path}`;
};

const categoryLabel: Record<TaxVolunteerActivityDetail["category"], string> = {
  SPT_ASSISTANT: "Asistensi SPT",
  PUBLIC_RELATIONS_FUNCTION: "Fungsi Kehumasan",
  SUPPORTING_ACTIVITIES: "Supporting Activities",
  BUSINESS_DEVELOPMENT_SERVICES: "Business Development Services",
};

export default function RelawanActivityDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<any>({
    key: ["tax-volunteer-activity-detail", id],
    url: `/tax-volunteer-activities/${id}`,
  });

  const detail: TaxVolunteerActivityDetail | undefined =
    data?.taxVolunteerActivity || data;

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
        <p className="text-gray-500 font-medium">
          Memuat detail kegiatan relawan...
        </p>
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
          href="/program-layanan/relawan-pajak"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Relawan Pajak
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[70px] lg:pt-[120px] w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/program-layanan/relawan-pajak"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Relawan Pajak
          </Link>

          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold">
              {categoryLabel[detail.category] || detail.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {detail.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F97316]" />
              <span>{detail.created_by?.full_name || "Admin Tax Center"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F97316]" />
              <span>{formatDate(detail.created_at)}</span>
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
        <div className="w-full h-[280px] md:h-[430px] bg-gray-200 rounded-2xl relative overflow-hidden shadow-sm border border-gray-100 mb-8">
          {detail.image_url ? (
            <Image
              src={getImageUrl(detail.image_url)}
              alt={detail.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-sm font-medium">Gambar Tidak Tersedia</span>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Deskripsi Kegiatan
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

