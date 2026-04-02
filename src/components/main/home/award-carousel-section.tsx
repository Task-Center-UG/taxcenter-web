import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { AwardItem } from "./types";
import { chunk_array, get_image_url } from "./utils";

interface AwardCarouselSectionProps {
  awardsData: AwardItem[];
}

export default function AwardCarouselSection({
  awardsData,
}: AwardCarouselSectionProps) {
  const itemsPerSlide = 3;
  const chunks = chunk_array(awardsData, itemsPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    if (chunks.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? chunks.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (chunks.length <= 1) return;
    setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (chunks.length <= 1) return;
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [chunks.length]);

  return (
    <section className="bg-[#F5FAFF] w-full pb-16 overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center mt-12">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Penghargaan
        </h2>
        <p className="text-sm md:text-base max-w-5xl mb-14 md:mb-20 mx-5">
          Menampilkan berbagai penghargaan dan apresiasi sebagai bentuk
          pengakuan atas kontribusi dan kinerja Tax Center dalam bidang edukasi
          dan pelayanan perpajakan.
        </p>
      </div>
      <div className="relative w-full select-none overflow-hidden px-8 md:px-16 xl:px-20">
        <div className="relative w-full select-none overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${Math.max(chunks.length, 1) * 100}%`,
            }}
          >
            {chunks.length > 0 ? (
              chunks.map((group, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full"
                >
                  {group.map((item) => (
                    <div key={item.id} className="flex flex-col items-start w-full">
                      <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={get_image_url(item.picture_url)}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <p className="mt-3 text-left text-xs sm:text-sm md:text-base font-normal w-full">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex justify-center min-w-full gap-x-6">
                <p className="text-neutral-500 text-sm md:text-base py-8">
                  Belum ada data penghargaan.
                </p>
              </div>
            )}
          </div>
        </div>

        {chunks.length > 1 && (
          <>
            <button
              aria-label="Previous Slide"
              onClick={() => {
                prevSlide();
                if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
              }}
              className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-3 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              aria-label="Next Slide"
              onClick={() => {
                nextSlide();
                if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
              }}
              className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-3 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
