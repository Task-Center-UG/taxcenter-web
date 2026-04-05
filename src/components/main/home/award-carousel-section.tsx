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
    <section className="section-shell w-full overflow-hidden bg-[#F5FAFF]">
      <div className="page-shell section-stack">
        <h2 className="section-title mb-5 text-[#2A176F]">
          Penghargaan
        </h2>
        <p className="section-copy mb-10 max-w-4xl md:mb-14">
          Menampilkan berbagai penghargaan dan apresiasi sebagai bentuk
          pengakuan atas kontribusi dan kinerja Tax Center dalam bidang edukasi
          dan pelayanan perpajakan.
        </p>
      </div>
      <div className="page-shell relative w-full select-none overflow-hidden">
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
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <Image
                          src={get_image_url(item.picture_url)}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                          className="object-contain sm:object-cover"
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
              className="absolute left-1 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#868686] bg-opacity-50 px-2.5 py-2 text-white shadow-md transition-colors duration-300 hover:bg-[#626262] hover:text-yellow-300 sm:left-2 md:left-4 cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              aria-label="Next Slide"
              onClick={() => {
                nextSlide();
                if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
              }}
              className="absolute right-1 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#868686] bg-opacity-50 px-2.5 py-2 text-white shadow-md transition-colors duration-300 hover:bg-[#626262] hover:text-yellow-300 sm:right-2 md:right-4 cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
