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
  CheckCircle2,
  Info,
} from "lucide-react";
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

export default function FgdDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetData<FgdDetail>({
    key: ["detail-fgd", id],
    url: `/fgd/${id}`,
  });

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

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
        <p className="text-gray-500 font-medium">Memuat detail FGD...</p>
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
          href="/program-layanan/riset/program-kegiatan/fgd"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors mt-4"
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
            href="/program-layanan/riset/program-kegiatan/fgd"
            className="inline-flex items-center text-gray-500 hover:text-[#F97316] transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke FGD
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
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
                <span>Diupdate: {formatDate(data.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-2xl relative overflow-hidden shadow-sm border border-gray-100">
              {data.image_url ? (
                <Image
                  src={getImageUrl(data.image_url)!}
                  alt={data.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-4xl mb-2">🖼️</span>
                  <span className="text-sm font-medium">
                    Gambar Tidak Tersedia
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Deskripsi Kegiatan
              </h3>
              <article className="prose prose-orange max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-justify">
                {data.description}
              </article>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-32">
              <h4 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#F97316]" />
                Informasi Program
              </h4>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Status
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      Aktif / Tersedia
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Penyelenggara
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      Tax Center Gunadarma
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Tanggal Publikasi
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {formatDate(data.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed text-center">
                  Untuk informasi lebih lanjut mengenai kegiatan ini, silakan
                  hubungi admin atau kunjungi sekretariat Tax Center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
