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
    <div className="relative pt-[70px] lg:pt-[117px] xl:pt-[160px] max-w-full overflow-hidden select-none">
      <div
        className="relative w-full aspect-[2/1] overflow-hidden xl:px-16"
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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 w-auto h-1 rounded-full overflow-hidden">
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

        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center text-white select-none h-full">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-md leading-tight">
            {activeSlide?.title ||
              "Tax Center Gunadarma Bersinergi Membangun Indonesia"}
          </h2>
          <p className="mt-6 text-sm md:text-lg font-semibold max-w-4xl drop-shadow-lg">
            {activeSlide?.description || fallback_slides[0].description}
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
              className="bg-orange-400 hover:bg-[#e26100] text-white font-bold h-11 px-10 rounded-md mt-6 md:mt-20 cursor-pointer"
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
          className=" absolute left-4 top-1/2 -translate-y-1/2 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300 pointer-events-auto"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          aria-label="Next Slide"
          onClick={() => {
            nextSlide();
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-[#F1C40F] rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300 pointer-events-auto"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
