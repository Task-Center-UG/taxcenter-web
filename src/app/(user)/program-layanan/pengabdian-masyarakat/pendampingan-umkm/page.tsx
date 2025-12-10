"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type PendampinganItem = {
  id: number;
  title: string;
  description: string;
  images: number; // jumlah gambar dalam carousel
};

// Data dummy dalam format JSON
const pendampinganData: PendampinganItem[] = [
  {
    id: 1,
    title: "Pendampingan Support System",
    description:
      "Sistem pendampingan yang dirancang khusus untuk membantu UMKM dalam mengembangkan sistem manajemen bisnis yang efektif. Program ini mencakup konsultasi strategi bisnis, penyusunan rencana pengembangan usaha, dan implementasi sistem administrasi yang terstruktur.",
    images: 3,
  },
  {
    id: 2,
    title: "Pendampingan Pembukuan",
    description:
      "Program pendampingan komprehensif dalam pengelolaan keuangan dan pembukuan UMKM. Meliputi pelatihan pencatatan transaksi, penyusunan laporan keuangan sederhana, pemahaman arus kas, serta tips mengelola keuangan usaha dengan baik dan benar sesuai standar akuntansi.",
    images: 3,
  },
  {
    id: 3,
    title: "Pendampingan Marketing Digital",
    description:
      "Pendampingan intensif untuk meningkatkan kemampuan pemasaran digital UMKM. Program ini mengajarkan strategi media sosial, optimasi marketplace, teknik digital advertising, content creation, dan analisis performa kampanye pemasaran online.",
    images: 3,
  },
  {
    id: 4,
    title: "Pendampingan Legalitas Usaha",
    description:
      "Bimbingan lengkap dalam mengurus legalitas dan perizinan usaha. Mencakup pengurusan NIB, NPWP, izin usaha, sertifikasi halal, dan dokumen legal lainnya. Program ini membantu UMKM memahami regulasi dan memenuhi persyaratan hukum yang diperlukan.",
    images: 3,
  },
];

function CarouselDots({
  totalSlides,
  currentIndex,
}: {
  totalSlides: number;
  currentIndex: number;
}) {
  return (
    <div className="flex justify-center gap-2 mt-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            currentIndex === index ? "bg-slate-800 w-6" : "bg-slate-300"
          )}
        />
      ))}
    </div>
  );
}

function PendampinganCard({ title, description, images }: PendampinganItem) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: images }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-48 bg-gray-300"></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <CarouselDots totalSlides={images} currentIndex={current} />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function PendampinganUMKM() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      {/* Header */}
      <div className="relative w-full bg-[#D9D9D9] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PENDAMPINGAN UMKM
          </h1>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Program pendampingan komprehensif untuk membantu UMKM berkembang
            melalui bimbingan langsung dari para ahli di berbagai bidang, mulai
            dari manajemen, keuangan, pemasaran, hingga legalitas usaha.
          </p>
        </div>
      </div>

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white bg-opacity-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pendampinganData.map((item) => (
            <PendampinganCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
