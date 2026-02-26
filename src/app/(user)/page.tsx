"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetData } from "@/hooks/use-get-data";
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

const API_BASE_URL = "https://stag.api.taxcenterug.com";

interface SliderItem {
  title: string;
  picture_url: string;
  cta_url: string;
  description: string;
}

interface AwardItem {
  id: number;
  title: string;
  picture_url: string;
}

interface AwardResponse {
  awards: AwardItem[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

interface NewsItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
}

interface NewsResponse {
  news: NewsItem[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

const fallbackSlides: SliderItem[] = [
  {
    title: "Tax Center Gunadarma Bersinergi Membangun Indonesia",
    description:
      "Tax Center Universitas Gunadarma merupakan suatu Lembaga yang langsung di bawah rektor yang memiliki fungsi sebagai pusat pengkajian, pendidikan, pelatihan dan sosialisasi perpajakan di lingkungan perguruan tinggi dan masyarakat yang dilakukan secara mandiri.",
    cta_url: "/",
    picture_url: "/assets/images/carousel-bg.png",
  },
];

const divisiData = [
  {
    icon: faUsers,
    title: "Divisi Inklusi",
    description:
      "Meningkatkan kesadaran pajak mahasiswa melalui integrasi kurikulum dan kolaborasi dengan Direktorat Jenderal Pajak.",
  },
  {
    icon: faAward,
    title: "Divisi Brevet",
    description:
      "Menyelenggarakan kelas dan pelatihan pajak bagi mahasiswa dan masyarakat umum.",
  },
  {
    icon: faHandshake,
    title: "Divisi Relawan Pajak",
    description:
      "Mengoordinasikan pendampingan pelaporan pajak kepada masyarakat.",
  },
  {
    icon: faVideo,
    title: "Divisi Multimedia",
    description:
      "Memproduksi dan mempublikasikan konten edukasi perpajakan melalui berbagai media digital.",
  },
  {
    icon: faLaptop,
    title: "Divisi IT",
    description: "Mengembangkan dan membangun aplikasi yang bermanfaat.",
  },
  {
    icon: faGlobe,
    title: "Divisi Abdimas",
    description:
      "Menyelenggarakan program pendampingan UMKM, foto produk, dan workshop pengembangan usaha.",
  },
  {
    icon: faUserFriends,
    title: "Divisi Humas dan Kerjasama",
    description:
      "Membangun komunikasi dan kemitraan strategis dengan berbagai pihak.",
  },
  {
    icon: faClipboardList,
    title: "Divisi Tax Clinic",
    description:
      "Menyediakan layanan konsultasi dan pendampingan perpajakan profesional.",
  },
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const getImageUrl = (url: string) => {
  if (!url) return "/assets/images/carousel-bg.png";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/assets/")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  if (url.startsWith("/")) return url;
  return `${API_BASE_URL}/${url}`;
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function PenghargaanCarousel({ awardsData }: { awardsData: AwardItem[] }) {
  const itemsPerSlide = 3;
  const chunks = chunkArray(awardsData, itemsPerSlide);
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
                    <div
                      key={item.id}
                      className="flex flex-col items-start w-full"
                    >
                      <div className="relative w-full h-auto rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={getImageUrl(item.picture_url)}
                          alt={item.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-auto"
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
                if (slideIntervalRef.current)
                  clearInterval(slideIntervalRef.current);
              }}
              className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-3 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              aria-label="Next Slide"
              onClick={() => {
                nextSlide();
                if (slideIntervalRef.current)
                  clearInterval(slideIntervalRef.current);
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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { data: slidersResponse } = useGetData<SliderItem[]>({
    key: ["home-sliders"],
    url: "/sliders",
  });
  const { data: awardsResponse } = useGetData<AwardResponse>({
    key: ["home-awards"],
    url: "/awards",
    params: {
      page: 1,
      size: 9,
      sort_by: "created_at",
      order: "desc",
    },
  });
  const { data: newsResponse } = useGetData<NewsResponse>({
    key: ["home-news"],
    url: "/news",
    params: {
      page: 1,
      size: 3,
      sort_by: "created_at",
      order: "desc",
    },
  });

  const slides = slidersResponse?.length ? slidersResponse : fallbackSlides;
  const awardsData = awardsResponse?.awards || [];
  const beritaData = newsResponse?.news || [];
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
    <>
      <div className="relative pt-[70px] lg:pt-[117px] xl:pt-[160px] max-w-full overflow-hidden select-none">
        <div
          className="relative w-full h-[500px] md:h-[600px] lg:h-[660px] xl:h-[580px] overflow-hidden xl:px-16"
          aria-label="Image slider"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out w-full h-full xl:gap-[70px]"
            style={{ transform: `translateX(-${currentSlide * 105}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full min-w-full h-[520px] md:h-[620px] lg:h-[580px]"
              >
                <Image
                  src={getImageUrl(slide.picture_url)}
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
              {activeSlide?.description || fallbackSlides[0].description}
            </p>
            <Link
              href={activeSlide?.cta_url || "/"}
              target={
                activeSlide?.cta_url?.startsWith("http") ? "_blank" : "_self"
              }
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
              if (slideIntervalRef.current)
                clearInterval(slideIntervalRef.current);
            }}
            className=" absolute left-4 top-1/2 -translate-y-1/2 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300 pointer-events-auto"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

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

      <section className="bg-[#F5FAFF] w-full h-[550px] md:h-[715px] overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center mt-12">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Company Profile
          </h2>
          <p className="text-sm md:text-base max-w-5xl mb-7 mx-5">
            Tax Center Universitas Gunadarma merupakan pusat kegiatan edukasi
            dan pelayanan perpajakan yang berperan dalam meningkatkan literasi,
            kompetensi, dan kesadaran pajak di lingkungan akademik dan
            masyarakat.
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

      <section className="w-full overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center my-12">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Divisi Tax Center Gunadarma
          </h2>
          <p className="text-sm md:text-base max-w-5xl mb-12 mx-5">
            Tax Center Universitas Gunadarma memiliki beberapa divisi yang
            saling mendukung dalam menjalankan program edukasi, pelatihan,
            pelayanan, dan pengabdian di bidang perpajakan.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 max-w-6xl mx-auto">
            {divisiData.map(({ icon, title, description }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 w-full sm:w-[45%] md:w-[30%]"
              >
                <div className="bg-yellow-400 w-20 h-20 flex justify-center items-center rounded-full mb-4 drop-shadow-md">
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-black text-3xl"
                  />
                </div>
                <h3 className="font-bold mb-2 text-md md:text-lg">{title}</h3>
                <p className="text-xs md:text-sm mb-4 max-w-[300px]">
                  {description}
                </p>
                <Link href="/tentang-kami/tim-kami">
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

      <PenghargaanCarousel awardsData={awardsData} />

      <section className="w-full pb-12 items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-5 mt-12">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Berita dan Artikel Terbaru
          </h2>
          <p className="text-sm md:text-base max-w-5xl mb-12 mx-5 text-center">
            Berisi informasi terbaru mengenai kegiatan, program, dan aktivitas
            yang diselenggarakan oleh Tax Center Universitas Gunadarma.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2 xl:px-0">
            {beritaData.map((item) => (
              <article key={item.id} className="flex flex-col">
                <div className="relative w-full h-56 md:h-64 rounded-md overflow-hidden border border-gray-300">
                  <Image
                    src={getImageUrl(item.image_url)}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm text-black">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-6 font-extrabold text-[#FE8100] text-xl md:text-2xl">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
          <Link href="/kegiatan-berita/agenda-kegiatan">
            <Button
              size="lg"
              className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-11 cursor-pointer"
            >
              Lihat Selengkapnya
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[#F5FAFF] w-full py-12">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
            Peraturan Perpajakan
          </h2>
          <p className="text-sm md:text-base max-w-5xl mx-5">
            Menyediakan akses informasi terkait peraturan perpajakan melalui
            website khusus yang dikembangkan sebagai referensi bagi mahasiswa
            dan masyarakat.
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
