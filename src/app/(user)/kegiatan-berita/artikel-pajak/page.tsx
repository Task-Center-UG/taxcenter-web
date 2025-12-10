"use client";

import React from "react";
import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "https://dev.api.taxcenterug.com";

interface Article {
  id: number;
  title: string;
  description: string;
  picture_url: string;
  created_at: string;
  category?: string;
}

export default function ArtikelPajak() {
  const { data, isLoading, error } = useGetData<any>({
    key: ["articles-list"],
    url: "/article",
    params: {
      page: 1,
      size: 8,
      sort_by: "created_at",
      order: "desc",
    },
  });

  // Debug: Log the response to see structure
  React.useEffect(() => {
    if (data) {
      console.log("Articles API Response:", data);
      console.log("Articles data structure:", Object.keys(data));
    }
    if (error) {
      console.error("Articles API Error:", error);
    }
  }, [data, error]);

  const articles =
    data?.articles ||
    data?.data ||
    data?.items ||
    (Array.isArray(data) ? data : []);

  return (
    <>
      {/* Header Section */}
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[250px] lg:h-[280px] flex flex-col items-center justify-center text-slate-900">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            ARTIKEL PAJAK
          </h1>
          <p className="text-sm md:text-base text-center mx-4 md:mx-0 max-w-3xl font-normal leading-relaxed">
            Koleksi artikel perpajakan terkini yang membahas berbagai topik
            seputar perpajakan di Indonesia. <br /> Dapatkan wawasan dan
            pengetahuan mendalam dari para ahli pajak.
          </p>
          <div className="flex justify-center mt-4">
            <Link href="/" passHref>
              <Button className="rounded-full px-6 md:px-7 h-8 md:h-9 bg-[#2A176F] text-white hover:opacity-30">
                Sort
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="px-4 md:px-6 xl:px-40 mb-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-500">Memuat data artikel...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {articles.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#D9D9D9] w-full h-[200px] relative">
                    {item.picture_url ? (
                      <Image
                        src={`${API_BASE_URL}/${item.picture_url}`}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {item.category && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs px-2 py-1 bg-[#2A176F] text-white rounded-full">
                            {item.category}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 text-justify line-clamp-3">
                      {item.description}
                    </p>

                    {/* Button Selengkapnya */}
                    <Link href={`/kegiatan-berita/artikel-pajak/${item.id}`}>
                      <Button
                        variant="link"
                        className="text-[#2A176F] font-semibold p-0 mt-3 hover:underline"
                      >
                        Selengkapnya →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-500">Belum ada artikel tersedia.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
