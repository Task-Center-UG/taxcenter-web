import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { SliderItem } from "./types";
import { fallback_slides, get_image_url } from "./utils";

interface HeroSliderSectionProps {
  slides: SliderItem[];
}

export default function HeroSliderSection({ slides }: HeroSliderSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeSlide = slides[currentSlide];
  const activeTitle =
    activeSlide?.title ||
    "Tax Center Gunadarma Bersinergi Membangun Indonesia";
  const activeDescription =
    activeSlide?.description || fallback_slides[0].description;

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [slides.length]);

  return (
    <div className="relative max-w-full overflow-hidden pt-[calc(var(--site-header-offset)+0.25rem)] select-none">
      <div
        className="relative w-full overflow-hidden aspect-[2/1] xl:px-12"
        aria-label="Image slider"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full xl:gap-[70px]"
          style={{ transform: `translateX(-${currentSlide * 105}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full min-w-full h-full"
            >
              <Image
                src={get_image_url(slide.picture_url)}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="brightness-[0.7] transition-all duration-700"
                priority={index === 0}
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        <div className="absolute bottom-4 left-1/2 z-20 flex h-1 w-auto -translate-x-1/2 gap-2 overflow-hidden rounded-full sm:bottom-6">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full cursor-pointer transition-all duration-500 ease-in-out ${
                idx === currentSlide
                  ? "w-12 lg:w-20 xl:w-34 bg-[#FF7002]"
                  : "w-6 lg:w-14 xl:w-28 bg-white opacity-70"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-end px-12 pb-7 text-center text-white select-none sm:justify-center sm:px-6 sm:pb-0 md:px-8">
          <h2 className="max-w-[16ch] text-lg font-bold leading-snug drop-shadow-md [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden sm:max-w-5xl sm:text-[2.25rem] sm:leading-tight sm:[-webkit-line-clamp:unset] md:text-5xl lg:text-6xl">
            {activeTitle}
          </h2>
          <p className="mt-2 max-w-[30ch] text-xs font-medium leading-5 text-white/90 drop-shadow-lg [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden sm:mt-4 sm:max-w-3xl sm:text-[15px] sm:leading-7 sm:[-webkit-line-clamp:unset] md:mt-6 md:text-lg">
            {activeDescription}
          </p>
          <Link
            href={activeSlide?.cta_url || "/"}
            target={activeSlide?.cta_url?.startsWith("http") ? "_blank" : "_self"}
            rel={
              activeSlide?.cta_url?.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
          >
            <Button
              size="lg"
              className="mt-5 hidden h-10 rounded-md bg-orange-400 px-6 text-sm font-bold text-white hover:bg-[#e26100] sm:inline-flex sm:px-8 md:mt-8 md:h-11 md:px-10 md:text-base cursor-pointer"
            >
              Selengkapnya
            </Button>
          </Link>
        </div>

        <button
          aria-label="Previous Slide"
          onClick={() => {
            prevSlide();
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
          }}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#868686] bg-opacity-50 px-2 py-1.5 text-white shadow-md transition-colors duration-300 pointer-events-auto hover:bg-[#626262] hover:text-yellow-300 sm:left-4 sm:px-2.5 sm:py-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          aria-label="Next Slide"
          onClick={() => {
            nextSlide();
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
          }}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#868686] bg-opacity-50 px-2 py-1.5 text-white shadow-md transition-colors duration-300 pointer-events-auto hover:bg-[#626262] hover:text-[#F1C40F] sm:right-4 sm:px-2.5 sm:py-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
