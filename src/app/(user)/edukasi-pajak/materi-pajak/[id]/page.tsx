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
  ExternalLink,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type TaxMaterialDetail = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  file_url: string;
  file_download_url: string;
  created_at: string;
  updated_at: string;
  created_by: Creator;
};

const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}/${path}`;
};

export default function MateriPajakDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<TaxMaterialDetail>({
    key: ["tax-material-detail", id],
    url: `/tax-material/${id}`,
  });

  const item = data;

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
        <p className="text-gray-500 font-medium">Memuat detail materi...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Tidak Ditemukan
        </h2>
        <Link
          href="/edukasi-pajak/materi-pajak"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Materi Pajak
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[70px] lg:pt-[120px] w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/edukasi-pajak/materi-pajak"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Materi Pajak
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F97316]" />
              <span>{item.created_by?.full_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F97316]" />
              <span>{formatDate(item.created_at)}</span>
            </div>
            {item.updated_at !== item.created_at && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" />
                <span>Diupdate: {formatDate(item.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="w-full h-[280px] md:h-[430px] bg-gray-200 rounded-2xl relative overflow-hidden shadow-sm border border-gray-100 mb-8">
          {item.image_url ? (
            <Image
              src={getImageUrl(item.image_url)}
              alt={item.title}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-sm font-medium">Gambar Tidak Tersedia</span>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Deskripsi Materi
          </h3>
          <article
            className="prose prose-sm md:prose-base max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-[#F97316]"
            dangerouslySetInnerHTML={{ __html: item.description || "-" }}
          />
        </div>

        <div className="flex justify-end">
          <Link href={item.file_download_url || item.file_url} target="_blank">
            <button className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
              Lihat Materi <ExternalLink className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

