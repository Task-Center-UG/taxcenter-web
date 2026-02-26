"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import PageHeaderHero from "@/components/PageHeaderHero";

type Creator = {
  id: number;
  username: string;
  full_name: string;
};

type ProgramItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  created_by: Creator;
};

type TrainingResponse = {
  trainings: ProgramItem[];
};

type FgdResponse = {
  fgds: ProgramItem[];
};

type SeminarResponse = {
  seminars: ProgramItem[];
};

const API_BASE_URL = "https://dev.api.taxcenterug.com";

function ProgramCard({ item, href }: { item: ProgramItem; href: string }) {
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/${path}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  console.log(getImageUrl(item.image_url));

  return (
    <Card className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {item.image_url ? (
          <Image
            src={getImageUrl(item.image_url) || ""}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar className="w-3 h-3 text-[#F97316]" />
          <span>{formatDate(item.created_at)}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <span className="text-xs font-medium text-gray-500">
            Oleh: {item.created_by?.full_name}
          </span>
        </div>
      </div>
    </Card>
  );
}

function SectionWrapper({
  title,
  linkHref,
  isLoading,
  isEmpty,
  children,
}: {
  title: string;
  linkHref: string;
  isLoading: boolean;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-[#F97316] pl-4">
          {title}
        </h2>
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-[#F97316] font-semibold hover:text-orange-700 transition-colors group text-sm md:text-base"
        >
          Lihat Selengkapnya
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[350px] bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500">
          Belum ada data untuk kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProgramKegiatan() {
  const commonParams = {
    page: 1,
    size: 3,
    sort_by: "created_at",
    order: "desc",
  };

  const { data: trainingData, isLoading: loadTraining } =
    useGetData<TrainingResponse>({
      key: ["training-home"],
      url: "/training",
      params: commonParams,
    });

  const { data: fgdData, isLoading: loadFgd } = useGetData<FgdResponse>({
    key: ["fgd-home"],
    url: "/fgd",
    params: commonParams,
  });

  const { data: seminarData, isLoading: loadSeminar } =
    useGetData<SeminarResponse>({
      key: ["seminar-home"],
      url: "/seminar",
      params: commonParams,
    });

  return (
    <div className="relative w-full min-h-screen bg-[#F8F9FA] pb-20 select-none">
      <PageHeaderHero
        title="PROGRAM DAN KEGIATAN RISET"
        innerClassName="min-h-[200px] md:min-h-[240px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionWrapper
          title="Workshop & Pelatihan"
          linkHref="/program-layanan/riset/program-kegiatan/workshop"
          isLoading={loadTraining}
          isEmpty={!trainingData?.trainings?.length}
        >
          {trainingData?.trainings?.map((item) => (
            <ProgramCard
              key={item.id}
              item={item}
              href="/program-layanan/riset/program-kegiatan/workshop"
            />
          ))}
        </SectionWrapper>

        <SectionWrapper
          title="Focus Group Discussion (FGD)"
          linkHref="/program-layanan/riset/program-kegiatan/fgd"
          isLoading={loadFgd}
          isEmpty={!fgdData?.fgds?.length}
        >
          {fgdData?.fgds?.map((item) => (
            <ProgramCard
              key={item.id}
              item={item}
              href="/program-layanan/riset/program-kegiatan/fgd"
            />
          ))}
        </SectionWrapper>

        <SectionWrapper
          title="Seminar Nasional & Internasional"
          linkHref="/program-layanan/riset/program-kegiatan/seminar"
          isLoading={loadSeminar}
          isEmpty={!seminarData?.seminars?.length}
        >
          {seminarData?.seminars?.map((item) => (
            <ProgramCard
              key={item.id}
              item={item}
              href="/program-layanan/riset/program-kegiatan/seminar"
            />
          ))}
        </SectionWrapper>
      </div>
    </div>
  );
}
