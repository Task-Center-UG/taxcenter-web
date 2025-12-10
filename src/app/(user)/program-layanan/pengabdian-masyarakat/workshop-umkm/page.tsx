"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type WorkshopItem = {
  id: number;
  title: string;
  description: string;
  images: number; // jumlah gambar dalam carousel
};

// Data dummy dalam format JSON
const workshopData: WorkshopItem[] = [
  {
    id: 1,
    title: "Workshop Kepatuhan Pelaporan",
    description:
      "Workshop intensif yang membahas tata cara pelaporan pajak dan administrasi keuangan untuk UMKM. Peserta akan mempelajari jenis-jenis laporan yang wajib dibuat, cara pengisian SPT, serta tips menjaga kepatuhan perpajakan usaha kecil dan menengah.",
    images: 3,
  },
  {
    id: 2,
    title: "Workshop Manajemen Digital",
    description:
      "Pelatihan komprehensif tentang pengelolaan bisnis menggunakan tools digital modern. Mencakup penggunaan aplikasi manajemen stok, sistem POS (Point of Sale), CRM sederhana, dan platform kolaborasi untuk meningkatkan efisiensi operasional UMKM.",
    images: 3,
  },
  {
    id: 3,
    title: "Workshop Analisis Pajak",
    description:
      "Workshop khusus yang membahas strategi perencanaan pajak untuk UMKM, perhitungan PPh Final, PPN, serta insentif pajak yang tersedia. Peserta akan belajar cara mengoptimalkan kewajiban pajak secara legal dan memahami regulasi perpajakan terbaru.",
    images: 3,
  },
  {
    id: 4,
    title: "Workshop Strategi Branding",
    description:
      "Pelatihan praktis dalam membangun brand identity untuk produk UMKM. Meliputi desain logo, pemilihan warna brand, storytelling produk, packaging design, dan strategi positioning di pasar. Workshop ini membantu UMKM menciptakan brand yang kuat dan memorable.",
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

function WorkshopCard({ title, description, images }: WorkshopItem) {
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

export default function WorkshopUMKM() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      {/* Header */}
      <div className="relative w-full bg-[#D9D9D9] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">WORKSHOP UMKM</h1>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Berbagai workshop dan pelatihan praktis yang dirancang khusus untuk
            meningkatkan kompetensi dan keterampilan pelaku UMKM dalam mengelola
            dan mengembangkan usaha mereka.
          </p>
        </div>
      </div>

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white bg-opacity-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopData.map((item) => (
            <WorkshopCard
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
