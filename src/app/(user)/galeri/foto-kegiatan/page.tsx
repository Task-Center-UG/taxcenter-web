import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foto Kegiatan",
  description: "Foto Kegiatan",
};

const dummyData = [
  {
    title: "Kegiatan 1",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
  {
    title: "Kegiatan 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/",
  },
  {
    title: "Kegiatan 3",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
  {
    title: "Kegiatan 4",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
  {
    title: "Kegiatan 5",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/",
  },
  {
    title: "Kegiatan 6",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
  {
    title: "Kegiatan 7",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/",
  },
  {
    title: "Kegiatan 8",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
  {
    title: "Kegiatan 9",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/",
  },
];

export default function FotoKegiatan() {
  return (
    <>
      {/* Header Section */}
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[150px] md:h-[200px] bg-[#D9D9D9] flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold">FOTO KEGIATAN</h1>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {dummyData.map((item, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md overflow-hidden"
              >
                <Image 
                    src={item.image}
                    alt={item.title}
                    className="w-auto object-contain bg-[#D9D9D9]"
                    width={150}
                    height={100}
                    loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}