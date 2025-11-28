"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBullhorn,
  faChevronLeft,
  faChevronRight,
  faClipboardList,
  faGlobe,
  faHandshake,
  faLaptop,
  faUserFriends,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const slides = [
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png",
  "/assets/images/carousel-bg.png"
];

const divisiData = [
  {
    icon: faUsers,
    title: "Divisi Inklusi",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faAward,
    title: "Divisi Brevet",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faHandshake,
    title: "Divisi Relawan Pajak",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faVideo,
    title: "Divisi Multimedia",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faLaptop,
    title: "Divisi IT",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faGlobe,
    title: "Divisi Abdimas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faBullhorn,
    title: "Divisi Digital Marketing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faUserFriends,
    title: "Divisi Humas dan Kerjasama",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: faClipboardList,
    title: "Divisi Tax Clinic",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const awardsData = [
  {
    src: "/assets/images/",
    alt: "Penghargaan 1",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: "/assets/images/",
    alt: "Penghargaan 2",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: "/assets/images/",
    alt: "Penghargaan 3",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: "/assets/images/",
    alt: "Penghargaan 4",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: "/assets/images/",
    alt: "Penghargaan 5",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    src: "/assets/images/",
    alt: "Penghargaan 6",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const beritaData = [
  {
    image: "/assets/images/",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    image: "/assets/images/",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    image: "/assets/images/",
    date: "12 April 2025",
    title: "What Is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

function PenghargaanCarousel() {
  const itemsPerSlide = 3;
  const chunks = chunkArray(awardsData, itemsPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? chunks.length - 1 : prev - 1))
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [chunks.length]);

  // Carousel Section Penghargaan
  return (
    <section className="bg-[#F5FAFF] w-full h-[560px] md:h-[600px] overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center mt-12">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Penghargaan
        </h2>
        <p className="text-sm md:text-base max-w-5xl mb-14 md:mb-20 mx-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
      {/* Carousel Container */}
      <div className="relative w-full select-none overflow-hidden px-8 md:px-16 xl:px-20">
        {/* Slide Show */}
        <div className="relative w-full select-none overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${chunks.length * 50}%` }}
        >
          {chunks.map((group, idx) => (
            <div key={idx} className="flex justify-between min-w-full gap-x-6">
              {group.map(({ src, alt, description }, i) => (
                <div key={i} className="flex flex-col items-start w-1/3">
                  <div className="relative w-full h-[140px] sm:h-[160px] md:h-[200px] rounded-md overflow-hidden border border-gray-200">
                    <Image 
                      src={src} 
                      alt={alt} 
                      fill 
                      style={{ objectFit: "cover" }} 
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-left text-xs sm:text-sm md:text-base font-normal max-w-[550px]">{description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
        {/* Prev Button */}
        <button
          aria-label="Previous Slide"
          onClick={() => {
            prevSlide();
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
          }}
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {/* Next Button */}
        <button
          aria-label="Next Slide"
          onClick={() => {
            nextSlide();
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
          }}
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  { /* Auto slide carousel */ }
  useEffect(() => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [currentSlide]);

  return (
    <>
      <div className="relative pt-[70px] lg:pt-[117px] xl:pt-[160px] max-w-full overflow-hidden select-none">
        {/* Slider Container */}
        <div
          className="relative w-full h-[500px] md:h-[600px] lg:h-[660px] xl:h-[580px] overflow-hidden xl:px-16"
          aria-label="Image slider"
        >
          {/* Carousel shadcn.ui */}
          <div
            className="flex transition-transform duration-700 ease-in-out w-full h-full xl:gap-[70px]"
            style={{ transform: `translateX(-${currentSlide * 105}%)` }}
          >
            {slides.map((src, index) => (
              <div
                key={index}
                className="relative w-full min-w-full h-[520px] md:h-[620px] lg:h-[580px]"
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="brightness-[0.7] transition-all duration-700"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Indicator garis */}
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

          {/* Konten carousel */}
          <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center text-white select-none h-full">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-md leading-tight">
              Tax Center Gunadarma Besinergi <br /> Membangun Indonesia
            </h2>
            <p className="mt-6 text-sm md:text-lg font-semibold max-w-4xl drop-shadow-lg">
              Tax Center Universitas Gunadarma merupakan suatu Lembaga yang
              langsung di bawah rektor yang memiliki fungsi sebagai pusat
              pengkajian, pendidikan, pelatihan dan sosialisasi perpajakan di
              lingkungan perguruan tinggi dan masyarakat yang dilakukan secara
              mandiri.
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-orange-400 hover:bg-[#e26100] text-white font-bold h-11 px-10 rounded-md mt-6 md:mt-20 cursor-pointer"
              >
                Selengkapnya
              </Button>
            </Link>
          </div>

          {/* Prev Button */}
          <button
            aria-label="Previous Slide"
            onClick={() => {
              prevSlide();
              if (slideIntervalRef.current)
                clearInterval(slideIntervalRef.current);
            }}
            className=" absolute left-4 top-1/2 -translate-y-1/2 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300 pointer-events-auto"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* Next Button */}
          <button
            aria-label="Next Slide"
            onClick={() => {
              nextSlide();
              if (slideIntervalRef.current)
                clearInterval(slideIntervalRef.current);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-[#F1C40F] rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300 pointer-events-auto"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="flex justify-center text-center border-t-1 border-b-3 w-full">
        <h2 className="font-bold sm:text-xl md:text-2xl lg:text-3xl text-[#FE8100] my-12">
          Tax Center Gunadarma Bersinergi Membangun Indonesia
        </h2>
      </div>
      
      {/* Mitra Kerjasama */}
      <section className="flex flex-col justify-center items-center my-12">
        <h2 className="font-bold text-center text-2xl lg:text-3xl mb-8">
          Mitra Kerjasama Tax Center Gunadarma
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-20 px-2">
          <Image
            src="/assets/images/mitra/djp.png"
            alt="Tax Center Gunadarma Logo"
            width={60}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/pertapsi.png"
            alt="Tax Center Gunadarma Logo"
            width={95}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/majalah-pajak.png"
            alt="Tax Center Gunadarma Logo"
            width={200}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/hivefive.png"
            alt="Tax Center Gunadarma Logo"
            width={140}
            height={48}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/ddtc.png"
            alt="Tax Center Gunadarma Logo"
            width={140}
            height={96}
            loading="lazy"
          />
        </div>
      </section>

      {/* Company Profile */}
      <section className="bg-[#F5FAFF] w-full h-[550px] md:h-[715px] overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center mt-12">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Company Profile
          </h2>
          <p className="text-sm md:text-base max-w-5xl mb-7 mx-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
          <div className="px-5">
            <video 
            controls
            className="w-2xl md:w-4xl xl:w-5xl h-60 sm:h-67 md:h-102 lg:h-107 rounded-md border border-gray-300 shadow-sm object-cover"
            preload="lazy"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Divisi Tax Center */}
      <section className="w-full overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center my-12">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Divisi Tax Center Gunadarma
          </h2>
          <p className="text-sm md:text-base max-w-5xl mb-12 mx-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 md:gap-y-14 justify-center max-w-6xl mx-auto">
            {divisiData.map(({ icon, title, description }, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
              <div className="bg-yellow-400 w-20 h-20 flex justify-center items-center rounded-full mb-4 drop-shadow-md">
                <FontAwesomeIcon icon={icon} className="text-black text-3xl"/>
              </div>
              <h3 className="font-bold mb-2 text-md md:text-lg">{title}</h3>
              <p className="text-xs md:text-sm mb-4 max-w-[300px]">{description}</p>
              <Link href="/">
                <Button
                  size="sm"
                  className="bg-[#FE8100] hover:bg-[#e26100] text-white font-semibold rounded-full px-5 h-8 cursor-pointer"
                >
                  Lihat Detail
                </Button>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penghargaan */}
      <PenghargaanCarousel />

      {/* Berita dan Artikel */}
      <section className="w-full pb-12 items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-5 mt-12">
            <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
              Berita dan Artikel Terbaru
            </h2>
            <p className="text-sm md:text-base max-w-5xl mb-12 mx-5 text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2 xl:px-0">
              {beritaData.map(({ image, date, title, description }, idx) => (
                <article key={idx} className="flex flex-col">
                  <div className="relative w-full h-56 md:h-64 rounded-md overflow-hidden border border-gray-300">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      style={{ objectFit: "cover" }}
                      // priority={idx === 0}
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-sm text-black">{date}</p>
                  <h3 className="mt-6 font-extrabold text-[#FE8100] text-xl md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base font-normal text-justify">
                    {description}
                  </p>
                </article>
              ))}
            </div>
            <Link href="/">
              <Button
                size="lg"
                className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-11 cursor-pointer"
                >
                Lihat Selengkapnya
              </Button>
            </Link>
          </div>
      </section>

      {/* Peraturan Perpajakan */}
      <section className="bg-[#F5FAFF] w-full py-12">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Peraturan Perpajakan
          </h2>
          <p className="text-sm md:text-base max-w-5xl mx-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
          <Link href="/" target="_blank">
            <Button
              size="lg"
              className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-12 cursor-pointer"
            >
              Website Advance Search
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}