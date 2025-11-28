import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Materi Pajak",
  description: "Materi Pajak",
};

interface MateriItem {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const materiList: MateriItem[] = [
  {
    id: 1,
    image: "/",
    title: "Materi 1",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-1",
  },
  {
    id: 2,
    image: "/",
    title: "Materi 2",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-2",
  },
  {
    id: 3,
    image: "/",
    title: "Materi 3",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-3",
  },
  {
    id: 4,
    image: "/",
    title: "Materi 4",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-4",
  },
  {
    id: 5,
    image: "/",
    title: "Materi 5",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-5",
  },
  {
    id: 6,
    image: "/",
    title: "Materi 6",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-6",
  },
  {
    id: 7,
    image: "/",
    title: "Materi 7",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-7",
  },
  {
    id: 8,
    image: "/",
    title: "Materi 8",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    slug: "materi-8",
  },
];

const MateriPajak = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[250px] lg:h-[280px] flex flex-col items-center justify-center text-slate-900">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            Materi Pajak
          </h1>
          <p className="text-sm md:text-base text-center mx-4 md:mx-0 max-w-3xl font-normal leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. <br />
            Lorem Ipsum has been the industry’s standard dummy text ever since{" "}
            <br />
            the 1500s, when an unknown printer took.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center mt-5 gap-4 md:gap-6">
            {[1, 2, 3].map((item) => (
              <Link href="/" key={item} passHref>
                <Button className="rounded-full px-6 md:px-7 h-8 md:h-9 bg-[#2A176F] text-white hover:opacity-30 cursor-pointer">
                  Filter {item}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Materi List */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
          {materiList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-auto object-contain bg-[#D9D9D9]"
                width={150}
                height={100}
                loading="lazy"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <Link href="/" passHref>
                    <Button className="rounded-full cursor-pointer px-6 bg-[#F1C40F] text-black text-sm font-medium hover:bg-[#f7c933]">
                      Lihat Materi
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

export default MateriPajak;
