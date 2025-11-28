import React from "react";
import { Metadata } from "next";
import CarouselAgenda from "@/components/CarouselAgenda";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description: "Agenda Kegiatan",
};

const carouselImages = [
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
];

const dummyData = [
  {
    image: "/assets/images/foto1.png", 
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "/assets/images/foto2.png", 
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "/assets/images/foto3.png",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "/assets/images/foto4.png",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "/assets/images/foto4.png",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "/assets/images/foto4.png",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

export default function AgendaKegiatan() {
  return (
    <>
      {/* Header Section */}
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[200px] lg:h-[220px] bg-[#D9D9D9] flex flex-col items-center justify-center text-slate-900">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            AGENDA KEGIATAN
          </h1>
          <p className="text-sm md:text-base text-center mx-4 md:mx-0 max-w-3xl font-normal leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. <br /> Lorem Ipsum has been the industry&rsquo;s standard dummy
            text ever since <br /> the 1500s, when an unknown printer took.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="py-16 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-6xl">
              <CarouselAgenda images={carouselImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Kegiatan dan Berita Terbaru Section */}
      <div className="pt-4 pb-12 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">Kegiatan dan Berita Terbaru</h2>
          <div className="flex justify-end mt-2">
            <Link href="/">
              <p className="text-[#F1C40F] text-lg font-semibold">Liat Semua</p>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {dummyData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-[200px] bg-[#D9D9D9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
