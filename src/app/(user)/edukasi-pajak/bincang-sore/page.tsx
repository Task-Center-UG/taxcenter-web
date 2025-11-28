import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bincang Sore",
  description: "Bincang Sore",
};

const bincangSoreData = [
  {
    id: 1,
    image: "/",
    title: "Video 1",
    category: "Kategori",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
  },
  {
    id: 2,
    image: "/",
    title: "Video 2",
    category: "Kategori",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
  },
  {
    id: 3,
    image: "/",
    title: "Video 3",
    category: "Kategori",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
  },
  {
    id: 4,
    image: "/",
    title: "Video 4",
    category: "Kategori",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
  },
];

const BincangSore = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[250px] lg:h-[280px] flex flex-col items-center justify-center text-slate-900">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            Bincang Sore & Podcast
          </h1>

          <p className="text-sm md:text-base text-center mx-4 md:mx-0 max-w-3xl font-normal leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. <br /> Lorem Ipsum has been the industry’s standard dummy
            text ever since <br /> the 1500s, when an unknown printer took.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center mt-5 gap-4 md:gap-6">
            <Link href="/" passHref>
              <Button className="rounded-full cursor-pointer px-6 md:px-7 h-8 md:h-9 bg-[#2A176F] text-white hover:opacity-30">
                Filter 1
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button className="rounded-full cursor-pointer px-6 md:px-7 h-8 md:h-9 bg-[#2A176F] text-white hover:opacity-30">
                Filter 2
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button className="rounded-full cursor-pointer px-6 md:px-7 h-8 md:h-9 bg-[#2A176F] text-white hover:opacity-30">
                Filter 3
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {bincangSoreData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-auto object-contain bg-[#D9D9D9]"
                width={100}
                height={50}
                loading="lazy"
              />

              {/* Content Card */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  {item.category && (
                    <p className="text-sm md:text-sm text-slate-500">
                      {item.category}
                    </p>
                  )}
                </div>

                <p className="text-smtext-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-end mt-2">
                  <Link href="/" passHref>
                    <Button className="rounded-full cursor-pointer px-12 bg-[#F1C40F] text-black text-sm font-semibold hover:bg-[#f7c933]">
                      Lihat Video
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BincangSore;
