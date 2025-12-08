"use client";

import React from "react";
import Image from "next/image";
import { useGetData } from "@/hooks/use-get-data";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TaxClinicService {
  id: number;
  title: string;
  category: string;
  video_url: string;
  created_at: string;
}

interface TaxClinicResponse {
  taxClinicServices: TaxClinicService[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

interface CategoriesResponse {
  taxClinicCategories: string[];
}

const getYouTubeEmbedUrl = (url: string) => {
  try {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || "";
    } else if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    return null;
  }
};

export default function TaxClinic() {
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetData<CategoriesResponse>({
      key: ["tax-clinic-categories"],
      url: "/tax-clinic-service/categories",
    });

  const { data: serviceData, isLoading: isLoadingServices } =
    useGetData<TaxClinicResponse>({
      key: ["tax-clinic-service-all"],
      url: "/tax-clinic-service",
      params: {
        page: 1,
        size: 100,
      },
    });

  const isLoading = isLoadingCategories || isLoadingServices;

  const formatCategoryName = (cat: string) => {
    switch (cat) {
      case "CORETAX":
        return "Coretax";
      case "NPWP_CREATION":
        return "Pembuatan NPWP";
      case "SPT_FILLING":
        return "Pengisian SPT";
      case "E_BILLING_CREATION":
        return "Pembuatan E-Billing";
      default:
        return cat.replace(/_/g, " ");
    }
  };

  return (
    <>
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[150px] md:h-[200px] bg-[#D9D9D9] flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            TAX CLINIC
          </h1>
        </div>
      </div>

      <section className="py-12 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-3/4">
            <p className="text-sm md:text-base lg:text-lg text-gray-700 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis alias, beatae sunt aut labore error quas dignissimos
              perspiciatis, quidem minus veritatis dolorum in facilis laudantium
              voluptas! Adipisci eum expedita perspiciatis iste voluptatum eius.
              Distinctio odio aperiam corrupti! Voluptates, deserunt quae?
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/assets/images/tax-clinic.png"
              alt="Tax Clinic"
              className="w-auto h-auto"
              width={350}
              height={300}
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-16 xl:px-32 bg-[#F5FAFF]">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          LAYANAN
        </h2>
        <h2 className="text-xl md:text-2xl font-semibold text-[#2A176F] mb-8">
          Informasi dan Edukasi
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-10 w-10 animate-spin text-[#2A176F]" />
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {categoriesData?.taxClinicCategories.map((category, index) => {
              const relevantVideos = serviceData?.taxClinicServices.filter(
                (service) => service.category === category
              );

              return (
                <AccordionItem
                  key={category}
                  value={`item-${index}`}
                  className="border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      "bg-[#2A176F] text-white px-6 py-4 rounded-lg hover:bg-[#20115b] hover:no-underline transition-all [&[data-state=open]]:rounded-b-none"
                    )}
                  >
                    <span className="text-base md:text-lg font-semibold">
                      {formatCategoryName(category)}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="bg-white border-x border-b border-[#2A176F] rounded-b-lg p-6">
                    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {relevantVideos && relevantVideos.length > 0 ? (
                        relevantVideos.map((video) => {
                          const embedUrl = getYouTubeEmbedUrl(video.video_url);
                          return (
                            <div key={video.id} className="space-y-2">
                              {embedUrl ? (
                                <>
                                  <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                      src={embedUrl}
                                      title={video.title}
                                      className="absolute top-0 left-0 w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                  <h4 className="font-semibold text-lg text-gray-800">
                                    {video.title}
                                  </h4>
                                </>
                              ) : (
                                <div className="text-center py-8 text-gray-500 italic bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                  Video untuk kategori ini belum tersedia.
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-span-1 lg:col-span-2 text-center py-8 text-gray-500 italic bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          Video untuk kategori ini belum tersedia.
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </section>

      <section className="py-12 px-4 md:px-16 xl:px-32 bg-white">
        <h2 className="text-xl md:text-2xl font-bold text-[#2A176F] mb-8">
          Asistensi Pelaporan Perpajakan
        </h2>
        <div className="flex flex-col gap-6">
          <div className="border-[#FE8100] border-2 p-6 lg:px-10 rounded-md text-justify hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[#FE8100]">WP OP</h3>
            <p className="text-sm md:text-base text-gray-700">
              Layanan asistensi pelaporan SPT Tahunan...
            </p>
          </div>
          <div className="border-[#FE8100] border-2 p-6 lg:px-10 rounded-md text-justify hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[#FE8100]">
              WP Badan
            </h3>
            <p className="text-sm text-gray-700">
              Konsultasi dan panduan pelaporan SPT Tahunan...
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
